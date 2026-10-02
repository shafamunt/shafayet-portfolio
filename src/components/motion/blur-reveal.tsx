"use client";

/**
 * Page-title entrance: each word drops in from above while a heavy blur
 * resolves to sharp — like the headline focusing into place. Plays once.
 *
 * Resting styles leave every word sharp and in place. Motion is CSS
 * progressive enhancement (see `.reveal-blur-word` in globals.css).
 *
 * Accessible name lives on `aria-label`; animated spans are aria-hidden so
 * screen readers announce the heading once.
 */
export function BlurReveal({
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
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pr-[0.26em]">
            <span
              className="reveal-blur-word inline-block"
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
