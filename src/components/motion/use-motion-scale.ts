"use client";

/**
 * Timing multiplier for motion transitions.
 *
 * Always 1. The OS `prefers-reduced-motion` setting is intentionally ignored
 * so the headline cycle, slideshows, and other motion still play.
 *
 * Safe to read during render. Do not branch markup on it.
 */
export function useMotionScale(): number {
  return 1;
}

/**
 * Boolean form, for gating behaviour: autoplaying a slideshow, cycling a
 * headline, running a canvas loop, tilting on hover.
 */
export function useMotionEnabled(): boolean {
  return true;
}
