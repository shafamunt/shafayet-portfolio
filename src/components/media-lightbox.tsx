"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";

import type { Image as ProjectImage } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Accessible enlarge-on-click for diagrams and screenshots.
 * Keyboard: Enter/Space open, Escape close. Focus returns to the trigger.
 */
export function MediaLightbox({
  image,
  className,
  frameClassName,
  sizes,
  priority = false,
}: {
  image: ProjectImage;
  className?: string;
  frameClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const fitClass =
    image.fit === "contain" ? "object-contain object-center" : "object-cover object-top";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (image.pending) {
    return (
      <div
        className={cn(
          "relative flex h-full min-h-[10rem] w-full border border-dashed border-border-strong bg-[radial-gradient(circle_at_30%_20%,var(--color-accent-soft),transparent_70%)]",
          frameClassName,
        )}
        role="img"
        aria-label={image.alt}
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block h-full w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Enlarge: ${image.alt}`}
      >
        <span className={cn("relative block h-full w-full", frameClassName)}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes={sizes}
            className={cn(fitClass, "transition-transform duration-500 group-hover:scale-[1.02]")}
          />
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-md border border-border bg-background/80 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-widest text-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Enlarge
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-xl border border-border bg-surface text-foreground hover:border-border-strong"
            aria-label="Close enlarged image"
          >
            <X className="size-5" />
          </button>
          <figure
            className="relative max-h-[min(90vh,56rem)] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-border bg-surface md:aspect-[2/1]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-contain object-center"
                priority
              />
            </div>
            <figcaption id={titleId} className="mt-3 text-center text-sm text-muted">
              {image.caption ?? image.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
