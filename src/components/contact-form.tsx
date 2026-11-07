"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";

import { FieldError, Input, Label, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { deliverViaFormSubmit } from "@/lib/formsubmit";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

type ContactApiResponse = {
  ok?: boolean;
  error?: string;
  mailto?: string;
  handoff?: "formsubmit";
  to?: string;
  subject?: string;
};

function buildMailto(values: ContactInput, to: string = site.email) {
  const heading = values.subject?.trim() || `Message from ${values.name}`;
  const body = `From: ${values.name} <${values.email}>\n\n${values.message}`;
  return `mailto:${to}?subject=${encodeURIComponent(heading)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [mailtoFallback, setMailtoFallback] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ContactInput) {
    setStatus("sending");
    setServerError(null);
    setMailtoFallback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: ContactApiResponse = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        reset();
        setStatus("sent");
        return;
      }

      if (response.status === 202 && data.handoff === "formsubmit" && data.to) {
        const subject =
          data.subject ?? values.subject?.trim() ?? `Message from ${values.name}`;
        const delivered = await deliverViaFormSubmit({
          to: data.to,
          name: values.name,
          email: values.email,
          subject,
          message: values.message,
        });

        if (delivered.ok) {
          reset();
          setStatus("sent");
          return;
        }

        console.error("[contact] formsubmit handoff failed:", delivered.detail);
        setServerError("Could not send right now. Email me directly instead.");
        setMailtoFallback(data.mailto ?? buildMailto(values, data.to));
        setStatus("error");
        return;
      }

      setServerError(data.error ?? "Could not send your message.");
      setMailtoFallback(data.mailto ?? buildMailto(values));
      setStatus("error");
    } catch {
      setServerError("Network error — check your connection and try again.");
      setMailtoFallback(buildMailto(getValues()));
      setStatus("error");
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-card border border-border bg-surface/40 px-6 py-16 text-center"
            role="status"
          >
            <CheckCircle2 className="mx-auto mb-4 size-7 text-accent" strokeWidth={1.5} />
            <p className="font-display text-2xl text-foreground">Message sent.</p>
            <p className="mt-2 text-sm text-muted">
              I&apos;ll get back to you within a couple of days.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-6"
              onClick={() => setStatus("idle")}
            >
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
                <FieldError>{errors.name?.message}</FieldError>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                <FieldError>{errors.email?.message}</FieldError>
              </div>
            </div>

            <div>
              <Label htmlFor="subject">
                Subject <span className="font-normal text-subtle">(optional)</span>
              </Label>
              <Input
                id="subject"
                placeholder="Contract work, a role, or just saying hi"
                aria-invalid={Boolean(errors.subject)}
                {...register("subject")}
              />
              <FieldError>{errors.subject?.message}</FieldError>
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="What are you working on?"
                aria-invalid={Boolean(errors.message)}
                {...register("message")}
              />
              <FieldError>{errors.message?.message}</FieldError>
            </div>

            {/* Honeypot — hidden from people, irresistible to bots. */}
            <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-[1.125rem] animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <Send className="size-[1.125rem]" />
                  </>
                )}
              </Button>

              {status === "error" && serverError && (
                <div role="alert" className="space-y-2 text-sm">
                  <p className="text-red-500">{serverError}</p>
                  {mailtoFallback && (
                    <a
                      href={mailtoFallback}
                      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                    >
                      <Mail className="size-3.5" />
                      Open email app instead
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
