import "server-only";

import fs from "node:fs";
import path from "node:path";

/**
 * Photos for the About page.
 *
 * Reads whatever is in `public/images/me/` at build time — no config, no list
 * to keep in sync. Drop files in, they show up; remove them, they vanish.
 *
 * Alt text comes from the filename, so name files descriptively:
 *   `climbing-in-colorado.jpg`  →  "Climbing in colorado"
 * A file named `IMG_4821.jpg` still renders, it just gets a generic label.
 */

const PHOTOS_DIR = path.join(process.cwd(), "public", "images", "me");
const IMAGE_RE = /\.(png|jpe?g|webp|avif)$/i;

export type Photo = {
  src: string;
  alt: string;
};

export type HomeMoment = Photo & {
  /** Short caption under the homepage strip — literal, not invented lore. */
  caption: string;
  /** CSS object-position when the card aspect crops the source. */
  objectPosition?: string;
};

/**
 * Curated homepage moments. Filenames must exist under `public/images/me/`.
 * Captions stay close to the filename so nothing personal is invented.
 * Missing files are skipped at build time.
 */
const HOME_MOMENT_SPECS: ReadonlyArray<{
  file: string;
  caption: string;
  alt: string;
  objectPosition?: string;
}> = [
  {
    file: "engr100-lab-bench.jpg",
    caption: "ENGR 100 lab bench",
    alt: "ENGR 100 lab bench",
  },
  {
    file: "science-fair-presentation.jpg",
    caption: "Science fair presentation",
    alt: "Creatine Conundrum science fair board with both presenters",
    // Keep both people + board in the 4:5 card crop.
    objectPosition: "center 42%",
  },
  {
    file: "presentation-night-warren.jpg",
    caption: "Presentation night, Warren",
    alt: "Presentation night in Warren",
    objectPosition: "center 38%",
  },
  {
    file: "graduation-day.jpg",
    caption: "Graduation day",
    alt: "Graduation day",
    objectPosition: "center 40%",
  },
];

function altFromFilename(filename: string): string {
  const base = filename.replace(IMAGE_RE, "");

  // Camera-roll names carry no meaning — don't pretend otherwise.
  if (/^(img|dsc|pxl|photo)[-_]?\d+$/i.test(base)) return "Photo of Shafayet";

  const words = base.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function getPhotos(): Photo[] {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  return fs
    .readdirSync(PHOTOS_DIR)
    .filter((f) => IMAGE_RE.test(f))
    .sort()
    .map((filename) => ({
      // Encoded because filenames routinely contain spaces.
      src: `/images/me/${encodeURIComponent(filename)}`,
      alt: altFromFilename(filename),
    }));
}

/** Compact static strip for the homepage — only files that are present. */
export function getHomeMoments(): HomeMoment[] {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  return HOME_MOMENT_SPECS.flatMap((spec) => {
    const diskPath = path.join(PHOTOS_DIR, spec.file);
    if (!fs.existsSync(diskPath)) return [];
    return [
      {
        src: `/images/me/${encodeURIComponent(spec.file)}`,
        alt: spec.alt,
        caption: spec.caption,
        objectPosition: spec.objectPosition,
      },
    ];
  });
}
