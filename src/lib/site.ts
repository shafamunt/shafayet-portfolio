import { Mail, FileText } from "lucide-react";

import { GithubIcon, LinkedinIcon, type IconComponent } from "@/components/icons";
import { expectedGraduation } from "@/lib/resume";

/**
 * Single source of truth for everything about *you*.
 * The header, footer, hero, about page, metadata, sitemap and OG image all
 * read from here.
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: IconComponent;
  handle?: string;
};

/** One line of the C++ struct rendered on the home page. */
export type StructField = {
  type: string;
  name: string;
  /** A string value is quoted when rendered; an array becomes a brace list. */
  value: string | string[];
};

/** Tab / OG title. Keep in sync with what recruiters should see first. */
export const documentTitle = "Shafayet Muntasir — Embedded · Firmware · Summer 2027";

/** Path under `public/`. Replace that one PDF to update every Resume link. */
const resumePath = "/resume/shafayet-muntasir-resume.pdf";

export const site = {
  // ── Identity ────────────────────────────────────────────────────────────
  name: "Shafayet Muntasir",
  firstName: "Shafayet",
  title: "Computer Engineering Student & Embedded Builder",
  documentTitle,
  headline: "Building where software meets silicon.",
  /** Short hero line — details live in the struct and case studies, not repeated prose. */
  intro:
    "Computer Engineering at Michigan. Firmware, hardware, and software that ships — open for Summer 2027 internships.",

  /** Compact role stack under the hero intro — recruiter scan in one line. */
  roleStack: [
    "SE Intern",
    "MRacing DAQ",
    "ITS Shift Lead",
    "MESH",
  ],

  /**
   * Hiring target — when / what / where + a human signal.
   * Used in the hero, /contact, home CTA, about, and footer.
   */
  openTo:
    "Summer 2027 · embedded, firmware, and automotive internships · nationwide. I read everything.",

  /**
   * Proof strip under the hero grid. Numbers already claimed in case studies /
   * experience — surfaced here so recruiters see them in two seconds.
   */
  heroStats: [
    { value: "70+", label: "Users in production" },
    { value: "Level 2", label: "High Voltage (600V)" },
    { value: "75+", label: "CI tests gating deploys" },
  ],

  /**
   * Homepage embed (not a background) — the scroll-down track film from the
   * MRacing team site. Swap files under `public/videos/` to update.
   */
  showcaseVideo: {
    src: "/videos/mracing-hero.mp4",
    poster: "/videos/mracing-hero-poster.jpg",
    caption: "MRacing FSAE team film (public team site).",
    credit: "mracing.engin.umich.edu",
    creditHref: "https://www.mracing.engin.umich.edu/",
  },

  /**
   * Cycled through by the decode effect under the hero heading.
   * Each one has to read correctly after "I'm Shafayet,".
   */
  headlinePhrases: [
    "building where software meets silicon.",
    "writing firmware for a Formula SAE car.",
    "shipping platforms schools actually use.",
    "open for Summer 2027 embedded roles.",
    "a CE student at Michigan.",
  ],

  location: "Ann Arbor, MI",
  email: "shafam@umich.edu",

  // ── The C++ struct card on the home page ────────────────────────────────
  structName: "Shafayet",
  structFields: [
    { type: "std::string", name: "major", value: "Computer Engineering" },
    { type: "std::string", name: "school", value: "University of Michigan" },
    { type: "std::string", name: "target", value: "Summer 2027 internship" },
    { type: "std::string", name: "focus", value: "Embedded · Firmware · Automotive" },
    {
      type: "std::vector<std::string>",
      name: "now",
      value: ["MRacing DAQ", "SE intern", "MESH"],
    },
  ] satisfies StructField[],

  // ── About page bio ──────────────────────────────────────────────────────
  bio: [
    "I'm a Computer Engineering student at the University of Michigan. I work where software meets silicon — lap-trigger sensing on MRacing FSAE, a school platform in production, and board skills at MESH.",
    "Current roles: Software Engineering Intern at Darul Uloom Michigan; Computer Consultant II and shift lead at Michigan ITS; MRacing FSAE (Level 2 High Voltage / 600V certification). Seeking Summer 2027 embedded, firmware, and automotive internships.",
    "Ann Arbor, MI — shafam@umich.edu.",
  ],
  // ── URLs ────────────────────────────────────────────────────────────────
  /** No trailing slash. Overridden by NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shafam.dev",
  resumePath,

  // ── Social ──────────────────────────────────────────────────────────────
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/shafamunt",
      icon: GithubIcon,
      handle: "@shafamunt",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shafayetmuntasir",
      icon: LinkedinIcon,
      handle: "in/shafayetmuntasir",
    },
    {
      label: "Email",
      href: "mailto:shafam@umich.edu",
      icon: Mail,
      handle: "shafam@umich.edu",
    },
    {
      label: "Resume",
      href: resumePath,
      icon: FileText,
      handle: "PDF",
    },
  ] satisfies SocialLink[],

  // ── Navigation ──────────────────────────────────────────────────────────
  nav: [
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;

/** Person JSON-LD from facts already on the site — no phone, no photo. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: site.title,
    homeLocation: {
      "@type": "Place",
      name: site.location,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Michigan",
    },
    description: `${site.title}. ${expectedGraduation}.`,
    sameAs: [
      "https://github.com/shafamunt",
      "https://www.linkedin.com/in/shafayetmuntasir",
    ],
  };
}
