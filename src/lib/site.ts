import { Mail, FileText } from "lucide-react";

import { GithubIcon, LinkedinIcon, type IconComponent } from "@/components/icons";

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

export const site = {
  // ── Identity ────────────────────────────────────────────────────────────
  name: "Shafayet Muntasir",
  firstName: "Shafayet",
  title: "Computer Engineering Student & Embedded Builder",
  headline: "Building where software meets silicon.",
  intro:
    "Hey! I'm Shafayet. I build firmware on a race car, platforms schools actually use, and boards I route myself. Hope you enjoy your stay!",

  /**
   * Cycled through by the decode effect under the hero heading.
   * Each one has to read correctly after "I'm Shafayet,".
   */
  headlinePhrases: [
    "a computer engineering student at Michigan.",
    "an embedded systems engineer.",
    "a hardware tinkerer.",
    "a full-stack builder.",
    "a PCB designer.",
  ],

  location: "Ann Arbor, MI",
  email: "shafam@umich.edu",

  // ── The C++ struct card on the home page ────────────────────────────────
  structName: "Shafayet",
  structFields: [
    { type: "std::string", name: "school", value: "University of Michigan" },
    { type: "std::string", name: "major", value: "Computer Engineering" },
    { type: "std::string", name: "graduation", value: "May 2029" },
    { type: "std::string", name: "role", value: "SWE Intern @ Darul Uloom Michigan" },
    { type: "std::string", name: "location", value: "Ann Arbor, MI" },
    { type: "std::string", name: "email", value: "shafam@umich.edu" },
    {
      type: "std::vector<std::string>",
      name: "interests",
      value: ["embedded", "PCB", "full-stack", "FSAE"],
    },
  ] satisfies StructField[],

  // ── About page bio ──────────────────────────────────────────────────────
  bio: [
    "I'm a Computer Engineering student at the University of Michigan. I like work that sits where software meets silicon — firmware on a Formula SAE car, a grading platform 70+ people log into every week, and boards I route and solder myself.",
    "Right now I'm a Software Engineering Intern at Darul Uloom Michigan, shipping a role-based educational platform in production; a Computer Consultant II and shift lead at Michigan ITS; and on MRacing FSAE building lap-timing DAQ with a Level 2 High Voltage cert for the car's 600V system. Out of MESH I'm sharpening PCB layout and SMT assembly skills that feed the racing work.",
    "I'm hunting embedded and systems roles in metro Detroit and beyond. Reach me at shafam@umich.edu.",
  ],

  // ── URLs ────────────────────────────────────────────────────────────────
  /** No trailing slash. Overridden by NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  resumePath: "/resume/shafayet-muntasir-resume.pdf",

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
      href: "/resume/shafayet-muntasir-resume.pdf",
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
