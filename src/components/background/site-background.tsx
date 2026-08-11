import { ParticleField } from "@/components/background/particle-field";

/**
 * Living blueprint background: cyan glow blobs, dual drafting grid, particles.
 * Fixed and pointer-events-none — see `relative z-10` in `app/layout.tsx`.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -left-[15vw] -top-[20vh] size-[70vw] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--glow-1), transparent 68%)",
          opacity: "var(--glow-opacity)",
          animation: "drift-a 34s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[10vw] top-[25vh] size-[55vw] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--glow-2), transparent 68%)",
          opacity: "calc(var(--glow-opacity) * 0.85)",
          animation: "drift-b 43s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-25vh] left-[20vw] size-[60vw] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--glow-3), transparent 70%)",
          opacity: "calc(var(--glow-opacity) * 0.7)",
          animation: "drift-c 51s ease-in-out infinite",
        }}
      />

      {/* Major drafting grid (120px) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          opacity: "calc(var(--grid-opacity) * 0.55)",
          maskImage: "radial-gradient(ellipse 95% 80% at 50% 40%, #000 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 80% at 50% 40%, #000 25%, transparent 100%)",
        }}
      />
      {/* Fine drafting grid (24px) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: "var(--grid-opacity)",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />

      <ParticleField />
    </div>
  );
}
