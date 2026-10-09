"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed muted autoplay loop — same pattern as the MRacing team site hero.
 * Poster shows until the video can play; fails soft if the file is missing.
 */
export function HeroVideo({
  src,
  poster,
  credit,
  creditHref,
}: {
  src: string;
  poster: string;
  credit: string;
  creditHref: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const tryPlay = () => {
      void el.play().then(() => setReady(true)).catch(() => {
        // Autoplay can fail on some browsers until a gesture — poster stays.
      });
    };

    if (el.readyState >= 2) tryPlay();
    else el.addEventListener("loadeddata", tryPlay, { once: true });

    return () => el.removeEventListener("loadeddata", tryPlay);
  }, [src]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Poster always underneath so the first paint is never empty. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- poster is a static public asset, not in the image pipeline */}
      <img
        src={poster}
        alt=""
        className="absolute inset-0 size-full object-cover"
        decoding="async"
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        aria-hidden
      />
      {/* Scrim so type and the struct stay readable over track footage. */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/35 to-background/50" />

      <p className="pointer-events-auto absolute bottom-4 right-4 z-[1] max-w-[16rem] text-right font-mono text-[0.625rem] uppercase tracking-widest text-subtle/90 md:bottom-6 md:right-8">
        <a
          href={creditHref}
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground"
        >
          {credit}
        </a>
      </p>
    </div>
  );
}
