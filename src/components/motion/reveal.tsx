import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before starting. Use for hand-tuned sequences. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: "bottom" | "left" | "right" | "none";
  as?: "div" | "section" | "li" | "span" | "article";
};

/**
 * Fade-and-rise on first scroll into view.
 *
 * Resting styles are fully visible. The motion is a CSS view-timeline
 * progressive enhancement (see `.reveal-on-scroll` in globals.css) — no
 * inline `opacity: 0`, so no-JS, link previews, and full-page captures
 * always see the content.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  as: Tag = "div",
}: RevealProps) {
  return (
    <Tag
      className={cn(
        "reveal-on-scroll",
        from === "left" && "reveal-from-left",
        from === "right" && "reveal-from-right",
        from === "none" && "reveal-from-none",
        className,
      )}
      style={
        delay > 0
          ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

/** Wrap a list; each `<StaggerItem>` inside animates in sequence. */
export function Stagger({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
}) {
  return <Tag className={cn("reveal-stagger", className)}>{children}</Tag>;
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  /** Caps at 5 so deep list items do not sit blank waiting on a long chain. */
  index?: number;
}) {
  const delay = Math.min(index, 5) * 0.08;

  return (
    <Tag
      className={cn("reveal-on-scroll", className)}
      style={
        delay > 0
          ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
