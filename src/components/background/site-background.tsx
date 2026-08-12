import { ParticleField } from "@/components/background/particle-field";

/**
 * Warm oxide field: copper/seafoam glows, soft horizontal rules, particles.
 * Fixed and pointer-events-none — see `relative z-10` in `app/layout.tsx`.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -left-[20vw] -top-[25vh] size-[65vw] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--glow-1), transparent 68%)",
          opacity: "var(--glow-opacity)",
          animation: "drift-a 34s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[15vw] top-[15vh] size-[50vw] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, var(--glow-2), transparent 68%)",
          opacity: "calc(var(--glow-opacity) * 0.75)",
          animation: "drift-b 43s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-30vh] left-[30vw] size-[55vw] rounded-full blur-[140px]"
        style={{
          background: "radial-gradient(circle, var(--glow-3), transparent 70%)",
          opacity: "calc(var(--glow-opacity) * 0.55)",
          animation: "drift-c 51s ease-in-out infinite",
        }}
      />

      {/* Soft horizontal instrument lines — not a drafting grid. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 47px, var(--grid-line) 47px, var(--grid-line) 48px)",
          opacity: "var(--grid-opacity)",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 35%, #000 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 35%, #000 20%, transparent 100%)",
        }}
      />

      {/* Sparse diagonal hatch in one corner for depth. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-28deg, transparent, transparent 14px, var(--grid-line) 14px, var(--grid-line) 15px)",
          opacity: "calc(var(--grid-opacity) * 0.45)",
          maskImage: "radial-gradient(ellipse 50% 45% at 85% 80%, #000 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 50% 45% at 85% 80%, #000 0%, transparent 70%)",
        }}
      />

      <ParticleField />
    </div>
  );
}
