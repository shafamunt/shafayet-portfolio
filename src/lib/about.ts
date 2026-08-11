/**
 * The personal half of the About page — the parts a resume has no room for.
 *
 * Photos are NOT listed here. Drop image files into `public/images/me/` and
 * they appear automatically; see `src/lib/photos.ts`.
 */

export type Interest = {
  /** Short label, e.g. "Football". */
  label: string;
  /** One line. Specific beats generic — "left back, Sunday league" not "sports". */
  detail: string;
  /** Any emoji. Rendered large above the label. */
  emoji: string;
};

export type Watch = {
  title: string;
  year?: number;
  kind: "film" | "series" | "anime";
  /** Poster filename inside `public/images/watches/`. */
  poster: string;
};

export const interests: Interest[] = [
  {
    emoji: "🏎️",
    label: "Formula SAE",
    detail:
      "Lap-timing DAQ and HV work on Michigan's electric race car — where embedded meets the track.",
  },
  {
    emoji: "🔌",
    label: "Boards & firmware",
    detail:
      "Schematic to solder: Altium layouts, SMT assembly at MESH, and C/C++ on the wire.",
  },
  {
    emoji: "🏫",
    label: "Shipping for real users",
    detail:
      "A school platform with 70+ people logging in — RLS, Edge Functions, and tests that gate Monday morning.",
  },
  {
    emoji: "🛠️",
    label: "Hardware help desk",
    detail:
      "Shift lead at Michigan ITS — escalations, mentoring, and keeping the floor moving.",
  },
];

/**
 * Posters live in `public/images/watches/`. Empty until posters are added.
 */
export const watches: Watch[] = [];

/** Line above the watches grid. */
export const watchesIntro = "Favorites rotate — more soon.";
