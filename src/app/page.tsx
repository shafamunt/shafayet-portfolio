import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BentoGrid } from "@/components/bento-grid";
import { BentoItem } from "@/components/bento-item";
import { EmptyState } from "@/components/empty-state";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { HomeMoments } from "@/components/home-moments";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { VideoEmbed } from "@/components/video-embed";
import { getAllProjects, getAllTech, getFeaturedProjects } from "@/lib/content";
import { getHomeMoments } from "@/lib/photos";
import { getExperience } from "@/lib/resume";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const all = getAllProjects();
  const featured = getFeaturedProjects().slice(0, 3);
  const rest = all
    .filter((p) => !featured.some((f) => f.slug === p.slug))
    .sort((a, b) => a.order - b.order);
  const tech = getAllTech().slice(0, 16);
  const moments = getHomeMoments();

  return (
    <>
      <Hero />

      <section className="container-page py-12 md:py-16" aria-labelledby="work-heading">
        <SectionHeading
          eyebrow="Projects"
          title="Selected builds."
          titleId="work-heading"
          description="Production school platform, FPGA calculator, and MRacing lap-trigger work in progress — completed vs in-progress labeled on each card."
          action={{ label: "All projects", href: "/projects" }}
        />

        {featured.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} size="md" priority={i === 0} />
            ))}
          </div>
        )}
      </section>

      {moments.length > 0 && (
        <section className="container-page py-12 md:py-16" aria-labelledby="moments-heading">
          <SectionHeading
            eyebrow="Moments"
            title="A few frames."
            titleId="moments-heading"
            description="From lab benches and presentation nights — more on About."
            action={{ label: "About", href: "/about" }}
          />
          <HomeMoments />
        </section>
      )}

      {rest.length > 0 && (
        <section className="container-page py-12 md:py-16" aria-labelledby="more-heading">
          <SectionHeading eyebrow="More" title="Elsewhere in the lab." titleId="more-heading" />
          <BentoGrid>
            {rest.map((project, i) => (
              <BentoItem key={project.slug} size={project.size} index={i}>
                <ProjectCard project={project} />
              </BentoItem>
            ))}
          </BentoGrid>
        </section>
      )}

      <section className="container-page py-10 md:py-14" aria-labelledby="track-film-heading">
        <SectionHeading
          eyebrow="Team context"
          title="MRacing on track."
          titleId="track-film-heading"
          description="Public team film for competition context — not a demo of my lap-trigger prototype."
        />
        <Reveal>
          <VideoEmbed
            src={site.showcaseVideo.src}
            poster={site.showcaseVideo.poster}
            caption={site.showcaseVideo.caption}
            credit={site.showcaseVideo.credit}
            creditHref={site.showcaseVideo.creditHref}
          />
        </Reveal>
      </section>

      <section className="container-page py-12 md:py-16" aria-labelledby="experience-heading">
        <SectionHeading
          eyebrow="Experience"
          title="Roles & teams."
          titleId="experience-heading"
          description="Darul Uloom internship, Michigan ITS shift lead, MRacing FSAE, and MESH lab training."
          action={{ label: "Full experience", href: "/experience" }}
        />
        <ExperienceTimeline experience={getExperience()} compact />
      </section>

      {tech.length > 0 && (
        <section className="container-page py-12 md:py-16" aria-labelledby="stack-heading">
          <SectionHeading eyebrow="Stack" title="Tools I reach for." titleId="stack-heading" />
          <Reveal>
            <ul className="flex flex-wrap gap-2.5">
              {tech.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-surface/40 px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      <section className="container-page py-12 md:py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-border bg-surface/40 px-6 py-14 text-center md:px-16 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 opacity-50 blur-3xl [background:radial-gradient(ellipse_at_center,var(--color-accent-soft),transparent_70%)]"
            />
            <p className="eyebrow relative mb-5">Contact</p>
            <h2 className="relative mx-auto max-w-3xl font-display text-display-md font-semibold text-foreground">
              Summer 2027 — let&apos;s talk.
            </h2>
            <p className="relative mx-auto mt-5 max-w-lg text-lead text-muted">
              {site.openTo} Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-foreground underline decoration-accent decoration-[1.5px] underline-offset-4"
              >
                {site.email}
              </a>{" "}
              or use the form.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
                Get in touch
                <ArrowUpRight className="size-[1.125rem]" />
              </Link>
              <a
                href={site.resumePath}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Download resume
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
