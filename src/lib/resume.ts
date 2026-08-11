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
    company: "University of Michigan ITS",
    role: "Computer Consultant II · Shift Lead",
    start: "Aug 2025",
    end: "Present",
    location: "Ann Arbor, MI",
    points: [
      "Promoted to Consultant II and shift lead; mentor newer consultants and deliver peer feedback.",
      "Handle advanced escalations across hardware and software support for the university community.",
      "Run the floor during shifts — triage, assignment, and keeping queue times sane.",
    ],
    tech: ["Troubleshooting", "Hardware Support", "Consulting", "Mentorship"],
  },
  {
    company: "MRacing FSAE (Formula SAE Electric)",
    role: "Vehicle Software · Instrumentation · Powertrain",
    start: "Aug 2025",
    end: "Present",
    location: "Ann Arbor, MI",
    points: [
      "Developing a photosensor lap-trigger data acquisition path for on-car lap timing.",
      "Certified Level 2 High Voltage for work on the car's 600V tractive system.",
      "Participate in weekly CAN bus and embedded control design reviews.",
      "Trained in Altium Designer for the team's board work.",
    ],
    tech: ["C/C++", "CAN Bus", "Embedded Systems", "Altium", "PCB Design"],
  },
  {
    company: "Michigan Embedded Systems Hub (MESH)",
    role: "Authorized Lab User",
    start: "Jan 2026",
    end: "Present",
    location: "Ann Arbor, MI",
    points: [
      "PCB design workshops: schematic capture, footprint selection, and layout.",
      "SMT and through-hole soldering and assembly.",
    ],
    tech: ["PCB Design", "Altium", "SMT", "Soldering"],
  },
];

export const education: Education[] = [
  {
    school: "University of Michigan, Ann Arbor",
    degree: "B.S.E. in Computer Engineering",
    start: "2025",
    end: "May 2029",
    location: "Ann Arbor, MI",
    details: [
      "Dean's List — December 2025",
      "Coursework: EECS 280 · Programming & Data Structures; EECS 203 · Discrete Mathematics; ENGR 101; ENGR 100; Calculus III; Differential Equations",
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
    title: "High Voltage Level 2 Certification",
    issuer: "MRacing FSAE",
    date: "2025",
    location: "Ann Arbor, MI",
    description: "Certified for work on the team's 600V tractive system.",
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C++", "C", "Python", "MATLAB", "SQL", "TypeScript", "JavaScript", "Verilog"],
  },
  {
    label: "Hardware & CAD",
    items: [
      "PCB Design",
      "Altium Designer",
      "SMT Soldering",
      "Through-Hole",
      "CAN Bus",
      "Oscilloscopes",
      "TinkerCAD",
      "PrusaSlicer",
    ],
  },
  {
    label: "Software & Tools",
    items: ["React", "Supabase", "PostgreSQL", "Vite", "Git", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    label: "Certifications",
    items: [
      "High Voltage Level 2 (600V)",
      "CompTIA IT Fundamentals Pro",
      "CompTIA Security Pro",
    ],
  },
];
