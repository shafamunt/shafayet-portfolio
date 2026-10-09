import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { BlurReveal } from "@/components/motion/blur-reveal";
import { PhotoSlideshow } from "@/components/photo-slideshow";
import { SectionHeading } from "@/components/section-heading";
import { SpotifyPanel } from "@/components/spotify-panel";
import { WatchesGrid } from "@/components/watches-grid";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { interests, watchesIntro } from "@/lib/about";
import { getMusicLibrary } from "@/lib/music";
import { getPhotos } from "@/lib/photos";
import { getWatches } from "@/lib/watches";
import { skills } from "@/lib/resume";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  description: site.bio[0],
};

export default function AboutPage() {
  const photos = getPhotos();
  const watches = getWatches();
  const music = getMusicLibrary();

  return (
    <div className="container-page py-16 md:py-24">
      {/* ── Intro ── */}
      <header className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
          </Reveal>
          <BlurReveal
            text={site.name}
            as="h1"
            className="font-display text-display-lg text-foreground"
          />
          <Reveal delay={0.2}>
            <div className="mt-8 space-y-5 text-lead text-muted">
              {site.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.resumePath}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(buttonVariants())}
              >
                <Download className="size-4" />
                Resume (PDF)
              </a>
              <Link
                href="/experience"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Experience
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal from="right" delay={0.15} className="lg:col-span-5">
          <dl className="space-y-6 rounded-card border border-border bg-surface/50 p-6 backdrop-blur-sm">
            {skills.map((group) => (
              <div key={group.label}>
                <dt className="eyebrow mb-3">{group.label}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* ── Photos ── */}
      <section className="mt-24 md:mt-32" aria-labelledby="photos-heading">
        <SectionHeading
          eyebrow="In the wild"
          title="Some photos."
          titleId="photos-heading"
          description={
            photos.length === 0
              ? "Drop files into public/images/me/ — see MEDIA_TODO.md."
              : undefined
          }
        />
        {photos.length > 0 ? (
          <PhotoSlideshow photos={photos} />
        ) : (
          <div className="rounded-card border border-dashed border-border-strong bg-surface/30 px-6 py-16 text-center">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
              Media TODO
            </p>
            <p className="mt-3 text-sm text-muted">
              Add 4–8 photos to <code className="text-foreground">public/images/me/</code>{" "}
              (headshot, lab, MRacing, campus).
            </p>
          </div>
        )}
      </section>

      {/* ── Beyond code ── */}
      <section className="mt-24 md:mt-32" aria-labelledby="beyond-heading">
        <SectionHeading
          eyebrow="Beyond code"
          title="The rest of it."
          titleId="beyond-heading"
          description="Everything a resume has no room for."
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:content-start">
            {interests.map((interest, i) => (
              <StaggerItem key={interest.label} index={i}>
                <div className="h-full rounded-card border border-border bg-surface/50 p-6 backdrop-blur-sm transition-colors hover:border-border-strong">
                  <span aria-hidden className="text-3xl">
                    {interest.emoji}
                  </span>
                  <p className="mt-4 font-display text-xl text-foreground">{interest.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{interest.detail}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal from="right" delay={0.1} className="lg:col-span-5">
            <SpotifyPanel library={music.tracks} artists={music.topArtists} />
          </Reveal>
        </div>
      </section>

      {/* ── Watches ── */}
      {watches.length > 0 && (
        <section className="mt-24 md:mt-32" aria-labelledby="watches-heading">
          <SectionHeading
            eyebrow="On screen"
            title="Watches."
            titleId="watches-heading"
            description={watchesIntro}
          />
          <WatchesGrid watches={watches} />
        </section>
      )}

      {/* ── Contact ── */}
      <section className="mt-24 md:mt-32" aria-labelledby="contact-heading">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              title="Say hello."
              titleId="contact-heading"
              description="Open to internships, contract work, and interesting problems. Goes straight to my inbox."
              className="mb-8"
            />
            <Reveal delay={0.2}>
              <ul className="divide-y divide-border border-y border-border">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-center gap-3">
                        <social.icon className="size-4 text-subtle" strokeWidth={1.75} />
                        <span className="text-[0.9375rem] text-foreground">{social.label}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted">
                        <span className="hidden truncate sm:inline">{social.handle}</span>
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal from="right" delay={0.15} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
