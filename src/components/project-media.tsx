import Image from "next/image";

import type { Image as ProjectImage } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Project media: real photo when the file exists, otherwise a quiet framed
 * placeholder (no TODO copy on the public site).
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

  const animated = /\.gif$/i.test(image.src);
  const fitClass =
    image.fit === "contain" ? "object-contain object-center" : "object-cover object-top";

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized={animated}
        className={cn(fitClass, className)}
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
      unoptimized={animated}
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
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[10rem] w-full flex-col items-center justify-center border border-dashed border-border-strong bg-[radial-gradient(circle_at_30%_20%,var(--color-accent-soft),transparent_70%)] px-6 py-8",
        className,
      )}
      role="img"
      aria-label={image.alt}
    />
  );
}
