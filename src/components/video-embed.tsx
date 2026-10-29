"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Inline video player for portfolio embeds (not a background).
 * Muted by default so autoplay works; controls stay available.
 */
export function VideoEmbed({
  src,
  poster,
  caption,
  credit,
  creditHref,
  className,
}: {
  src: string;
  poster?: string;
  caption?: string;
  credit?: string;
  creditHref?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onReady = () => setReady(true);
    if (el.readyState >= 2) onReady();
    else el.addEventListener("loadeddata", onReady, { once: true });
    return () => el.removeEventListener("loadeddata", onReady);
  }, [src]);

  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden rounded-card border border-border bg-surface">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- static public poster
          <img
            src={poster}
            alt=""
            className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
            decoding="async"
          />
        ) : null}
        <video
          ref={videoRef}
          className="relative z-[1] size-full object-cover"
          src={src}
          poster={poster}
          controls
          playsInline
          muted
          loop
          preload="metadata"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-muted">
          {caption ? <span>{caption}</span> : <span />}
          {credit && creditHref ? (
            <a
              href={creditHref}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono uppercase tracking-widest text-subtle underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground"
            >
              {credit}
            </a>
          ) : credit ? (
            <span className="font-mono uppercase tracking-widest text-subtle">{credit}</span>
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
