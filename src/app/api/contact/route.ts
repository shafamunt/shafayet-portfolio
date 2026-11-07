import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Providers, tried in order:
 *   1. RESEND_API_KEY      → Resend (server-side)
 *   2. FORMSPREE_ENDPOINT  → Formspree (server-side)
 *   3. FormSubmit handoff  → returns 202 so the browser finishes delivery
 *      via formsubmit.co (no API key). Server-side FormSubmit gets blocked
 *      by bot protection on many hosts; the browser Referer works.
 *
 * First FormSubmit submission emails an Activate Form link to
 * CONTACT_TO_EMAIL / site.email — click once, then messages deliver.
 *
 * See .env.example.
 */

export const runtime = "nodejs";

/** Naive fixed-window limiter, per server instance. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mailtoFor(input: {
  to: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `mailto:${input.to}?subject=${encodeURIComponent(input.subject)}&body=${encodeURIComponent(
    `From: ${input.name} <${input.email}>\n\n${input.message}`,
  )}`;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot tripped — return 200 so the bot believes it succeeded.
  if (company) return NextResponse.json({ ok: true });

  const heading = subject?.trim() || `New message from ${name}`;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const mailto = mailtoFor({ to, name, email, subject: heading, message });

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const { error } = await resend.emails.send({
        // `onboarding@resend.dev` is Resend's shared test sender and works
        // with no DNS setup — but it only delivers to the account's own
        // address. Switch to your domain once it is verified.
        from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
        to,
        replyTo: email,
        subject: `[Portfolio] ${heading}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `
          <p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        `,
      });

      if (error) {
        console.error("[contact] resend error:", error);
        return NextResponse.json(
          {
            error: "Could not send right now. Email me directly instead.",
            mailto,
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }

    if (process.env.FORMSPREE_ENDPOINT) {
      const response = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, subject: heading, message }),
      });

      if (!response.ok) {
        console.error("[contact] formspree responded", response.status);
        return NextResponse.json(
          {
            error: "Could not send right now. Email me directly instead.",
            mailto,
          },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error("[contact] unexpected error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong. Email me directly instead.",
        mailto,
      },
      { status: 500 },
    );
  }

  // No server provider configured — validate succeeded; browser finishes
  // delivery through FormSubmit (works without API keys).
  return NextResponse.json(
    {
      handoff: "formsubmit",
      to,
      subject: heading,
      mailto,
    },
    { status: 202 },
  );
}
