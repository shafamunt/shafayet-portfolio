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
export const documentTitle = "Shafayet Muntasir — Embedded & Hardware";

/** Path under `public/`. Replace that one PDF to update every Resume link. */
const resumePath = "/resume/shafayet-muntasir-resume.pdf";

export const site = {
  // ── Identity ────────────────────────────────────────────────────────────
  name: "Shafayet Muntasir",
  firstName: "Shafayet",
  title: "Computer Engineering Student & Embedded Builder",
  documentTitle,
  headline: "Building where software meets silicon.",
  intro:
    "I'm Shafayet — building firmware on a Formula SAE car, platforms schools actually use, and boards I route and solder myself. Looking for embedded and systems roles.",

  /** Compact role stack under the hero intro — recruiter scan in one line. */
  roleStack: [
    "SE Intern",
    "MRacing DAQ",
    "ITS Shift Lead",
    "MESH",
  ],

  /** Hiring target shown near CTAs. Update when the season changes. */
  openTo: "Embedded & systems internships · nationwide",

  /**
   * Cycled through by the decode effect under the hero heading.
   * Each one has to read correctly after "I'm Shafayet,".
   */
  headlinePhrases: [
    "building where software meets silicon.",
    "writing firmware for a Formula SAE car.",
    "routing boards and shipping platforms.",
    "open to embedded roles nationwide.",
    "a CE student at Michigan.",
  ],

  location: "Ann Arbor, MI",
  email: "shafam@umich.edu",

  // ── The C++ struct card on the home page ────────────────────────────────
  structName: "Shafayet",
  structFields: [
    { type: "std::string", name: "school", value: "University of Michigan" },
    { type: "std::string", name: "major", value: "Computer Engineering" },
    { type: "std::string", name: "graduation", value: expectedGraduation },
    { type: "std::string", name: "focus", value: "Embedded Systems & Hardware" },
    { type: "std::string", name: "location", value: "Ann Arbor, MI" },
    { type: "std::string", name: "email", value: "shafam@umich.edu" },
    {
      type: "std::vector<std::string>",
      name: "interests",
      value: ["embedded", "PCB", "hardware", "FSAE"],
    },
  ] satisfies StructField[],

  // ── About page bio ──────────────────────────────────────────────────────
  bio: [
    "I'm a Computer Engineering student at the University of Michigan. I like work that sits where software meets silicon — firmware on a Formula SAE car, a grading platform 70+ people log into every week, and boards I route and solder myself.",
    "Right now I'm a Software Engineering Intern at Darul Uloom Michigan, shipping a role-based educational platform in production; a Computer Consultant II and shift lead at Michigan ITS; and on MRacing FSAE building lap-timing DAQ with a Level 2 High Voltage (600V) certification. Out of MESH I'm sharpening PCB layout and SMT assembly skills that feed the racing work.",
    "Based in Ann Arbor, open to embedded and systems internships nationally. Reach me at shafam@umich.edu — or skim the MRacing and course case studies for the long version of how I build.",
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
