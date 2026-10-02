import type { CardSize } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A single cell of the bento grid: owns the column/row span and the
 * scroll-in animation, so `ProjectCard` stays layout-agnostic and can be
 * reused in any container.
 *
 * Animation is CSS progressive enhancement — resting state is fully visible.
 */
const spanClasses: Record<CardSize, string> = {
  sm: "md:col-span-2",
  md: "md:col-span-3",
  lg: "md:col-span-4",
  wide: "md:col-span-6",
  tall: "md:col-span-2 md:row-span-2",
};

export function BentoItem({
  size = "md",
  index = 0,
  className,
  children,
}: {
  size?: CardSize;
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  // Cap the stagger so cards far down the page do not sit blank while
  // a long delay chain plays out.
  const delay = Math.min(index, 5) * 0.07;

  return (
    <div
      className={cn("reveal-on-scroll", spanClasses[size], className)}
      style={
        delay > 0
          ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
