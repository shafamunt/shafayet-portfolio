"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { BlurCycle } from "@/components/motion/blur-cycle";
import { StructCard } from "@/components/struct-card";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient accent wash behind the headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[64rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl [background:radial-gradient(ellipse_at_center,var(--color-accent-soft),transparent_65%)]"
      />

      <div className="container-page relative pb-16 pt-14 md:pb-24 md:pt-20">
        {/* `grid-cols-1` is not cosmetic. Without it there is no
            grid-template-columns below lg, so the single implicit column is
            `auto` — content-sized — and inflates to the max-content of its
            widest descendant, dragging the whole column past the screen.
            Tailwind compiles grid-cols-N to repeat(N, minmax(0, 1fr)), and
            that 0 floor is what keeps the track tied to the container instead
            of to its contents. It is also why lg:grid-cols-12 never broke. */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Left: name, typing line, intro ── */}
          {/* min-w-0: a grid item refuses to shrink below its min-content size
              by default, which lets a long headline push the column wider than
              the page instead of wrapping inside it. */}
          <div className="min-w-0 lg:col-span-7">
            <p
              className="hero-enter eyebrow mb-7 flex items-center gap-2"
              style={{ "--enter-delay": "0s" } as React.CSSProperties}
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              Embedded · Michigan CE · {site.location}
            </p>

            <h1
              className="hero-enter font-display text-display-lg font-semibold text-foreground [overflow-wrap:break-word]"
              style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
            >
              {/* `break-words` is a backstop: at the smallest widths the longest
                  headline phrase has no slack, and a word breaking mid-way is a
                  better failure than one running off the side of the screen. */}
              <span className="text-accent">{site.firstName}</span>
              <br />
              <BlurCycle phrases={site.headlinePhrases} className="text-foreground" />
            </h1>

            <p
              className="hero-enter mt-8 max-w-xl text-lead text-muted"
              style={{ "--enter-delay": "0.22s" } as React.CSSProperties}
            >
              {site.intro}
            </p>

            <div
              className="hero-enter mt-9 flex flex-wrap items-center gap-3"
              style={{ "--enter-delay": "0.32s" } as React.CSSProperties}
            >
              <Magnetic>
                <Link href="/projects" className={cn(buttonVariants({ size: "lg" }))}>
                  See projects
                  <ArrowUpRight className="size-[1.125rem]" />
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={site.resumePath}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Resume
                </a>
              </Magnetic>
            </div>

            <ul
              className="hero-enter mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ "--enter-delay": "0.42s" } as React.CSSProperties}
            >
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-subtle transition-colors hover:text-foreground"
                  >
                    <social.icon className="size-3.5" strokeWidth={1.75} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: the C++ struct ── */}
          <div
            className="hero-enter-struct lg:col-span-5"
            style={{ "--enter-delay": "0.25s" } as React.CSSProperties}
          >
            <StructCard />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="hero-enter container-page hidden items-center gap-2 pb-10 font-mono text-[0.6875rem] uppercase tracking-widest text-subtle md:flex"
        style={{ "--enter-delay": "0.6s" } as React.CSSProperties}
      >
        <ArrowDown className="size-3.5 animate-bounce" />
        Scroll
      </div>
    </section>
  );
}
