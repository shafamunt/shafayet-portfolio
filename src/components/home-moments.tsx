import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { getHomeMoments } from "@/lib/photos";

/**
 * Compact, static photo strip for the homepage — not a carousel.
 * Captions stay literal to existing filenames / About material.
 */
export function HomeMoments() {
  const moments = getHomeMoments();
  if (moments.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {moments.map((photo, i) => (
        <Reveal key={photo.src} delay={i * 0.06}>
          <figure className="group overflow-hidden rounded-card border border-border bg-surface/40">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                quality={90}
                // Wider than the CSS box so 2x/3x DPR still gets a sharp source;
                // these JPEGs are already capped in photos:optimize.
                sizes="(min-width: 768px) 28vw, 90vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="px-3 py-2.5 font-mono text-[0.625rem] uppercase tracking-widest text-subtle">
              {photo.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
