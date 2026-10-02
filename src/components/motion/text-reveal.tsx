"use client";

import { cn } from "@/lib/utils";

/**
 * Headline animation: each word clips up from behind a mask.
 *
 * Resting styles leave every word in its final place. Motion is a CSS
 * progressive enhancement — nothing ships with an off-screen transform in
 * the HTML, so crawlers and no-JS readers see the finished heading.
 *
 * Accessible name lives on `aria-label`; animated spans are aria-hidden so
 * screen readers announce the heading once.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
  id,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
  id?: string;
}) {
  const words = text.split(" ");

  return (
    <Tag id={id} aria-label={text} className={className}>
      <span aria-hidden className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="overflow-hidden py-[0.06em] pr-[0.26em]">
            <span
              className="reveal-word inline-block"
              style={
                {
                  "--word-index": i,
                  "--word-base-delay": `${delay}s`,
                } as React.CSSProperties
              }
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Same effect, but triggered when scrolled into view instead of on mount. */
export function TextRevealOnScroll({
  text,
  className,
  as: Tag = "h2",
  id,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  id?: string;
}) {
  const words = text.split(" ");

  return (
    <Tag id={id} aria-label={text} className={cn(className)}>
      <span aria-hidden className="inline-flex flex-wrap">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="overflow-hidden py-[0.06em] pr-[0.26em]">
            <span
              className="reveal-word-scroll inline-block"
              style={{ "--word-index": i } as React.CSSProperties}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
