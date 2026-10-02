import Image from "next/image";

import type { Image as ProjectImage } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Project media: real photo when the file exists, otherwise a framed TODO
 * slot so hardware reviewers see what belongs there instead of a monogram.
 */
export function ProjectMedia({
  image,
  className,
  sizes,
  priority = false,
  fill = true,
}: {
  image: ProjectImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  if (image.pending) {
    return <MediaSlot image={image} className={className} />;
  }

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover object-top", className)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={1600}
      height={900}
      priority={priority}
      sizes={sizes}
      className={cn("h-auto w-full", className)}
    />
  );
}

export function MediaSlot({
  image,
  className,
}: {
  image: ProjectImage;
  className?: string;
}) {
  const note =
    image.todo ??
    image.caption ??
    `TODO: add ${image.src} — ${image.alt}`;

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[10rem] w-full flex-col items-center justify-center gap-3 border border-dashed border-border-strong bg-[radial-gradient(circle_at_30%_20%,var(--color-accent-soft),transparent_70%)] px-6 py-8 text-center",
        className,
      )}
      role="img"
      aria-label={`${image.alt}. Placeholder — ${note}`}
    >
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-accent">
        Media TODO
      </p>
      <p className="max-w-sm font-display text-lg leading-snug text-foreground md:text-xl">
        {image.alt}
      </p>
      <p className="max-w-md text-xs leading-relaxed text-muted">{note}</p>
      <p className="font-mono text-[0.625rem] text-subtle">{image.src}</p>
    </div>
  );
}
