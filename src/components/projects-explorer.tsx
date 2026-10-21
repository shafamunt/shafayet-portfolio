"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useMotionScale } from "@/components/motion/use-motion-scale";
import { EmptyState } from "@/components/empty-state";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

type CategoryId = "all" | "embedded" | "software" | "imaging";

const CATEGORIES: { id: CategoryId; label: string; match: (p: Project) => boolean }[] = [
  { id: "all", label: "All", match: () => true },
  {
    id: "embedded",
    label: "Embedded / Hardware",
    match: (p) =>
      p.tech.some((t) =>
        /embed|fpga|verilog|sensor|pcb|altium|micro|arduino|solar|can|rtl|smt|solder/i.test(
          t,
        ),
      ) || /mracing|mesh|solar|fpga/i.test(p.slug),
  },
  {
    id: "software",
    label: "Software",
    match: (p) =>
      p.tech.some((t) =>
        /typescript|react|supabase|postgres|c\+\+|oop|git|vite|ci/i.test(t),
      ) || /dum|card-engine|euchre/i.test(p.slug),
  },
  {
    id: "imaging",
    label: "Image Processing",
    match: (p) =>
      p.tech.some((t) => /matlab|image|signal|vector/i.test(t)) ||
      /radiation/i.test(p.slug),
  },
];

export function ProjectsExplorer({
  projects,
  tech,
}: {
  projects: Project[];
  tech: string[];
}) {
  const [category, setCategory] = useState<CategoryId>("all");
  const [techOpen, setTechOpen] = useState(false);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const scale = useMotionScale();

  const visible = useMemo(() => {
    const byCategory =
      CATEGORIES.find((c) => c.id === category)?.match ?? (() => true);
    return projects.filter((p) => {
      if (!byCategory(p)) return false;
      if (techFilter && !p.tech.includes(techFilter)) return false;
      return true;
    });
  }, [projects, category, techFilter]);

  if (projects.length === 0) return <EmptyState />;

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-4 flex flex-wrap gap-2"
      >
        {CATEGORIES.map((item) => {
          const active = category === item.id && !techFilter;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCategory(item.id);
                setTechFilter(null);
              }}
              aria-pressed={active}
              className={cn(
                "relative rounded-xl px-4 py-2 font-mono text-xs transition-colors duration-200",
                active ? "text-accent-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 -z-10 rounded-xl bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {!active && (
                <span className="absolute inset-0 -z-10 rounded-xl border border-border" />
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      {tech.length > 0 && (
        <div className="mb-10">
          <button
            type="button"
            onClick={() => setTechOpen((v) => !v)}
            className="font-mono text-[0.6875rem] uppercase tracking-widest text-subtle transition-colors hover:text-foreground"
            aria-expanded={techOpen}
          >
            {techOpen ? "Hide technologies" : "More technologies"}
            {techFilter ? ` · ${techFilter}` : ""}
          </button>
          {techOpen && (
            <div
              role="group"
              aria-label="Filter by technology"
              className="mt-3 flex flex-wrap gap-2"
            >
              {tech.map((item) => {
                const active = techFilter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      setTechFilter((current) => (current === item ? null : item))
                    }
                    aria-pressed={active}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 font-mono text-[0.6875rem] transition-colors",
                      active
                        ? "border-accent bg-accent/15 text-foreground"
                        : "border-border text-muted hover:border-border-strong hover:text-foreground",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Coherent two-column desktop / single-column mobile grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              className={cn(
                project.size === "wide" && visible.length > 1
                  ? "md:col-span-2"
                  : undefined,
              )}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 * scale, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={project}
                size={project.size === "wide" ? "wide" : "md"}
                priority={i < 2}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <EmptyState
          title="Nothing in this filter yet"
          hint="Pick another category, or clear the technology filter."
        />
      )}
    </>
  );
}
