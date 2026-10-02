/**
 * Structured resume data, rendered on /experience and the home timeline.
 *
 * The PDF in `public/resume/` is the canonical download; this is the
 * crawlable web version. Keep the two in sync.
 */

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  url?: string;
  points: string[];
  tech?: string[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location?: string;
  details?: string[];
};

export type Award = {
  title: string;
  issuer?: string;
  date: string;
  location?: string;
  description?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

/**
 * Single graduation string for the site struct, education block, and JSON-LD.
 * Change this once — nowhere else may hardcode a graduation month/year.
 */
export const expectedGraduation = "Expected May 2028";

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/**
 * Turn "May 2026" / "2025" / "Present" into a sortable number.
 * "Present" sorts above every real date so ongoing roles win a tie.
 */
function toSortKey(value: string): number {
  const text = value.trim().toLowerCase();
  if (text === "present" || text === "current") return Number.MAX_SAFE_INTEGER;

  const year = Number(/\d{4}/.exec(text)?.[0] ?? 0);
  const month = MONTHS.findIndex((m) => text.startsWith(m));
  return year * 12 + (month === -1 ? 0 : month);
}

/**
 * Experience in true reverse-chronological order: most recent start first,
 * ties broken by whichever role is still running.
 */
export function getExperience(): Experience[] {
  return [...experience].sort(
    (a, b) => toSortKey(b.start) - toSortKey(a.start) || toSortKey(b.end) - toSortKey(a.end),
  );
}

export const experience: Experience[] = [
  {
    company: "Darul Uloom Michigan",
    role: "Software Engineering Intern",
    start: "May 2026",
    end: "Present",
    location: "Warren, MI",
    points: [
      "Built and shipped a role-based educational platform now in production with 70+ users across 5 access levels.",
      "Designed a 30+ table PostgreSQL schema with Row-Level Security governing access at the row level.",
      "Wrote serverless Edge Functions handling authentication and privileged operations.",
      "Set up CI/CD on GitHub Actions with 75+ automated tests gating deploys.",
    ],
    tech: ["TypeScript", "React", "Supabase", "PostgreSQL", "Vite", "CI/CD"],
  },
  {
    company: "University of Michigan - ITS",
    role: "Computer Consultant II · Shift Lead",
    start: "Aug 2025",
    end: "Present",
    location: "Ann Arbor, MI",
    points: [
      "Promoted to Consultant II to mentor new staff, deliver peer feedback, and manage advanced customer escalations.",
      "Resolve hardware and software issues through in-person and virtual technical support across personal and departmental tickets.",
    ],
    tech: ["Troubleshooting", "Hardware Support", "Consulting", "Mentorship"],
  },
  {
    company: "MRacing FSAE (Formula SAE Electric)",
    role: "Vehicle Software · Instrumentation · Powertrain · Level 2 High Voltage (600V)",
    start: "Aug 2025",
    end: "Present",
    location: "Ann Arbor, MI",
    points: [
      "Prototype a lap-trigger data acquisition system using breadboards and photosensors to detect vehicle passing for lap timing.",
      "Hold Level 2 High Voltage (600V) certification for 600V system maintenance; completed Altium Designer training for PCB layout.",
      "Contribute to weekly technical design reviews on CAN bus communication and embedded control strategies.",
    ],
    tech: ["C++", "CAN Bus", "Embedded Systems", "Altium", "PCB Design"],
  },
  {
    company: "Michigan Embedded Systems Hub (MESH)",
    role: "Member and Authorized Laboratory User",
    start: "Jan 2026",
    end: "Present",
    location: "Ann Arbor, MI",
    points: [
      "Complete workshops on PCB design covering schematic capture, component footprint selection, and board layout.",
      "Build hardware fabrication skills through hands-on SMT and Through-Hole soldering training.",
    ],
    tech: ["PCB Design", "Altium", "SMT", "Soldering"],
  },
];

export const education: Education[] = [
  {
    school: "University of Michigan, Ann Arbor",
    degree: "B.S.E. in Computer Engineering",
    start: "2025",
    end: expectedGraduation,
    location: "Ann Arbor, MI",
    details: [
      "GPA 3.5 · Dean's List",
      "Coursework: Data Structures; Discrete Math; Intro to Programming (C++, MATLAB, Python); Differential Equations",
      "In progress (Fall 2026): EECS 270 · Logic Design; PHYSICS 240/241 · Electricity & Magnetism + Lab",
    ],
  },
];

export const awards: Award[] = [
  {
    title: "Dean's List",
    issuer: "University of Michigan",
    date: "Dec 2025",
    location: "Ann Arbor, MI",
    description: "Academic distinction for Fall 2025 term.",
  },
  {
    title: "Level 2 High Voltage (600V)",
    issuer: "MRacing FSAE",
    date: "2025",
    location: "Ann Arbor, MI",
    description:
      "Level 2 High Voltage (600V) certification for 600V system maintenance on MRacing FSAE's electric vehicle.",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C++", "Verilog", "Python", "MATLAB", "SQL", "TypeScript", "JavaScript"],
  },
  {
    label: "Hardware & CAD",
    items: ["PCB Design", "Altium", "Soldering (SMT/Through-Hole)", "TinkerCAD", "PrusaSlicer"],
  },
  {
    label: "Frameworks & Tools",
    items: ["CAN Bus", "Git", "CI/CD", "PostgreSQL", "React", "Supabase", "Vite"],
  },
  {
    label: "Certifications",
    items: [
      "Level 2 High Voltage (600V)",
      "CompTIA IT Fundamentals Pro",
      "CompTIA Security Pro",
    ],
  },
];
