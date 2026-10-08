// Illustrated stand-ins for project covers and gallery slots.
// Each drawing is original SVG in the same technical-diagram language as
// faiyajr.dev (dark ground, dot grid, teal / peach / mint, mono caption),
// then rasterised with sharp.
//
//   node scripts/generate-covers.mjs
//
// Drop a real photo at the same path and it replaces the illustration.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "package.json"));
const sharp = require("sharp");

const W = 1600;
const H = 900;

const C = {
  bg: "#0c1a1d",
  bg2: "#10262a",
  grid: "#16343a",
  teal: "#1f9a9c",
  tealDim: "#14585a",
  mint: "#d1e8e2",
  peach: "#ffcb9a",
  copper: "#b9835a",
  muted: "#5f7b77",
  red: "#e0707a",
};

const MONO = "'Cascadia Mono', 'DejaVu Sans Mono', monospace";
const SANS = "'DejaVu Sans', 'Liberation Sans', sans-serif";

function frame(inner, label, glow = C.teal) {
  let dots = "";
  for (let x = 40; x < W; x += 40) {
    for (let y = 40; y < H; y += 40) {
      dots += `<circle cx="${x}" cy="${y}" r="1.15" fill="${C.grid}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="72%" cy="28%" r="72%">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.bg2}"/><stop offset="1" stop-color="${C.bg}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#ground)"/>
  ${dots}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${inner}
  <text x="64" y="${H - 48}" font-family="${MONO}" font-size="22" fill="${C.muted}" letter-spacing="3">${label}</text>
</svg>`;
}

function panel(x, y, w, h, r = 22) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${C.bg}" stroke="${C.grid}" stroke-width="3"/>`;
}

/** Darul Uloom platform: five anonymous access tiers and redacted rows. */
function dumCover() {
  let s = panel(80, 70, 280, 700);
  s += `<text x="110" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">ACCESS</text>`;
  for (let i = 0; i < 5; i++) {
    const y = 170 + i * 108;
    const on = i === 1;
    s += `<rect x="110" y="${y}" width="220" height="84" rx="16" fill="${on ? C.teal : "none"}" stroke="${on ? C.teal : C.tealDim}" stroke-width="3" opacity="${on ? 0.9 : 1}"/>`;
    s += `<text x="140" y="${y + 52}" font-family="${MONO}" font-size="28" fill="${on ? C.bg : C.mint}">0${i + 1}</text>`;
    s += `<rect x="210" y="${y + 32}" width="${70 + (i % 3) * 12}" height="14" rx="7" fill="${on ? C.bg : C.muted}" opacity="${on ? 0.55 : 0.45}"/>`;
  }

  s += panel(400, 70, 1120, 700);
  s += `<text x="440" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">RECORDS · REDACTED</text>`;
  s += `<rect x="1280" y="100" width="190" height="48" rx="24" fill="none" stroke="${C.peach}" stroke-width="3"/>`;
  s += `<text x="1375" y="132" text-anchor="middle" font-family="${MONO}" font-size="18" fill="${C.peach}" letter-spacing="2">70+ USERS</text>`;

  for (let i = 0; i < 6; i++) {
    const y = 180 + i * 88;
    s += `<circle cx="470" cy="${y + 28}" r="22" fill="${[C.teal, C.copper, C.peach, C.mint][i % 4]}" opacity="0.85"/>`;
    s += `<rect x="516" y="${y + 10}" width="${180 + (i % 4) * 40}" height="16" rx="8" fill="${C.muted}" opacity="0.45"/>`;
    s += `<rect x="516" y="${y + 36}" width="${120 + (i % 3) * 30}" height="12" rx="6" fill="${C.tealDim}" opacity="0.8"/>`;
    const bars = [0.72, 0.54, 0.88, 0.41, 0.66, 0.8][i];
    s += `<rect x="1100" y="${y + 16}" width="340" height="22" rx="11" fill="${C.bg2}"/>`;
    s += `<rect x="1100" y="${y + 16}" width="${340 * bars}" height="22" rx="11" fill="${bars > 0.75 ? C.teal : C.copper}"/>`;
  }
  return frame(s, "FIVE ACCESS LEVELS · ROW-LEVEL SECURITY", C.teal);
}

/** Same product, five different densities of UI — no invented role names. */
function dumRoles() {
  let s = "";
  for (let i = 0; i < 5; i++) {
    const x = 90 + i * 300;
    s += panel(x, 90, 260, 640, 28);
    s += `<text x="${x + 130}" y="150" text-anchor="middle" font-family="${MONO}" font-size="22" fill="${C.peach}" letter-spacing="2">LEVEL 0${i + 1}</text>`;
    const blocks = [2, 3, 4, 5, 6][i];
    for (let b = 0; b < blocks; b++) {
      const y = 190 + b * 80;
      s += `<rect x="${x + 28}" y="${y}" width="204" height="58" rx="12" fill="${C.bg2}" stroke="${b === 0 ? C.teal : C.grid}" stroke-width="2"/>`;
      s += `<rect x="${x + 46}" y="${y + 22}" width="${90 + ((i + b) % 3) * 24}" height="12" rx="6" fill="${C.muted}" opacity="0.55"/>`;
    }
  }
  return frame(s, "ONE CODEBASE · FIVE DIFFERENT VIEWS", C.peach);
}

/** Architecture: UI → edge functions → Postgres policies. No student rows. */
function dumRls() {
  const box = (x, y, title, sub, color) => `
    ${panel(x, y, 1280, 160)}
    <circle cx="${x + 80}" cy="${y + 80}" r="28" fill="none" stroke="${color}" stroke-width="4"/>
    <text x="${x + 140}" y="${y + 74}" font-family="${SANS}" font-size="36" font-weight="700" fill="${C.mint}">${title}</text>
    <text x="${x + 140}" y="${y + 114}" font-family="${MONO}" font-size="22" fill="${color}">${sub}</text>`;
  let s = box(160, 80, "React", "role-differentiated UI", C.teal);
  s += `<path d="M 800 240 v 36" stroke="${C.peach}" stroke-width="4" fill="none"/>`;
  s += box(160, 276, "Edge Functions", "auth + privileged operations", C.peach);
  s += `<path d="M 800 436 v 36" stroke="${C.peach}" stroke-width="4" fill="none"/>`;
  s += box(160, 472, "PostgreSQL", "row-level security on every table", C.copper);
  for (let i = 0; i < 4; i++) {
    s += `<rect x="${1040 + i * 70}" y="530" width="18" height="28" rx="3" fill="none" stroke="${C.mint}" stroke-width="3"/>`;
    s += `<path d="M ${1049 + i * 70} 530 v -10 a 12 12 0 0 1 24 0 v 10" fill="none" stroke="${C.mint}" stroke-width="3"/>`;
  }
  return frame(s, "UI → EDGE → POLICIES  ·  NO LIVE ROWS", C.copper);
}

/** Breadboard photosensor bench: beam, sensor, microcontroller. */
function daqBench() {
  let s = panel(80, 80, 1440, 680);
  // breadboard holes
  for (let row = 0; row < 14; row++) {
    for (let col = 0; col < 22; col++) {
      const x = 140 + col * 28;
      const y = 160 + row * 36;
      if (col === 10 || col === 11) continue;
      s += `<circle cx="${x}" cy="${y}" r="4" fill="${C.tealDim}"/>`;
    }
  }
  // photosensor module
  s += `<rect x="220" y="280" width="160" height="90" rx="10" fill="${C.bg2}" stroke="${C.peach}" stroke-width="4"/>`;
  s += `<text x="300" y="332" text-anchor="middle" font-family="${MONO}" font-size="18" fill="${C.peach}">SENSOR</text>`;
  // beam
  s += `<line x1="380" y1="325" x2="1088" y2="325" stroke="${C.peach}" stroke-width="6" stroke-dasharray="14 12" stroke-linecap="round"/>`;
  s += `<polygon points="1096,325 1064,310 1064,340" fill="${C.peach}"/>`;
  // car block crossing the beam
  s += `<rect x="1040" y="250" width="280" height="150" rx="18" fill="${C.bg2}" stroke="${C.mint}" stroke-width="4"/>`;
  s += `<circle cx="1100" cy="400" r="28" fill="none" stroke="${C.mint}" stroke-width="5"/>`;
  s += `<circle cx="1260" cy="400" r="28" fill="none" stroke="${C.mint}" stroke-width="5"/>`;
  s += `<text x="1180" y="330" text-anchor="middle" font-family="${MONO}" font-size="20" fill="${C.mint}">VEHICLE</text>`;
  // mcu
  s += `<rect x="560" y="480" width="220" height="120" rx="14" fill="${C.bg}" stroke="${C.teal}" stroke-width="4"/>`;
  s += `<text x="670" y="548" text-anchor="middle" font-family="${MONO}" font-size="26" fill="${C.teal}">MCU</text>`;
  s += `<path d="M 300 370 v 170 h 260" fill="none" stroke="${C.teal}" stroke-width="4"/>`;
  return frame(s, "PHOTOSENSOR  ·  BEAM BREAK  ·  BENCH", C.peach);
}

/** Schematic sheet beside a simple two-layer board outline. */
function daqAltium() {
  let s = panel(70, 80, 720, 680);
  s += `<text x="100" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">SCHEMATIC</text>`;
  // resistor
  s += `<path d="M 140 280 h 40 l 16 -28 l 28 56 l 28 -56 l 28 56 l 28 -56 l 16 28 h 40" fill="none" stroke="${C.mint}" stroke-width="4" stroke-linejoin="round"/>`;
  s += `<text x="230" y="250" text-anchor="middle" font-family="${MONO}" font-size="18" fill="${C.muted}">R</text>`;
  // sensor symbol
  s += `<circle cx="560" cy="280" r="46" fill="none" stroke="${C.peach}" stroke-width="4"/>`;
  s += `<path d="M 530 300 l 30 -40 l 30 40" fill="none" stroke="${C.peach}" stroke-width="4"/>`;
  s += `<line x1="400" y1="280" x2="514" y2="280" stroke="${C.mint}" stroke-width="4"/>`;
  // mcu box
  s += `<rect x="180" y="430" width="420" height="200" rx="12" fill="${C.bg2}" stroke="${C.teal}" stroke-width="4"/>`;
  s += `<text x="390" y="540" text-anchor="middle" font-family="${MONO}" font-size="28" fill="${C.teal}">TRIGGER</text>`;
  for (let i = 0; i < 5; i++) {
    s += `<rect x="${230 + i * 70}" y="418" width="16" height="24" fill="${C.copper}"/>`;
    s += `<rect x="${230 + i * 70}" y="618" width="16" height="24" fill="${C.copper}"/>`;
  }

  s += panel(830, 80, 700, 680);
  s += `<text x="860" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">LAYOUT</text>`;
  s += `<rect x="940" y="200" width="480" height="460" rx="8" fill="#0a1618" stroke="${C.copper}" stroke-width="6"/>`;
  s += `<path d="M 1020 300 h 180 v 120 h 140 v 160 h -200" fill="none" stroke="${C.teal}" stroke-width="8" stroke-linejoin="round"/>`;
  s += `<rect x="1040" y="420" width="90" height="60" fill="${C.bg2}" stroke="${C.peach}" stroke-width="3"/>`;
  s += `<circle cx="1280" cy="560" r="18" fill="none" stroke="${C.mint}" stroke-width="4"/>`;
  return frame(s, "ALTIUM  ·  SCHEMATIC AND LAYOUT", C.teal);
}

/** Formula-style side view crossing a start/finish beam. No invented lap time. */
function daqCar() {
  let s = "";
  s += `<line x1="1180" y1="120" x2="1180" y2="760" stroke="${C.peach}" stroke-width="8" stroke-dasharray="16 14"/>`;
  s += `<text x="1200" y="160" font-family="${MONO}" font-size="18" fill="${C.peach}" letter-spacing="2">BEAM</text>`;
  // body
  s += `<path d="M 220 560
    L 340 560 L 420 470 L 620 430 L 860 430 L 980 500 L 1240 520 L 1320 560
    L 1320 620 L 220 620 Z" fill="${C.bg2}" stroke="${C.mint}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<path d="M 520 470 L 600 390 L 820 380 L 900 450" fill="none" stroke="${C.teal}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<circle cx="460" cy="620" r="70" fill="${C.bg}" stroke="${C.copper}" stroke-width="8"/>`;
  s += `<circle cx="1100" cy="620" r="70" fill="${C.bg}" stroke="${C.copper}" stroke-width="8"/>`;
  s += `<circle cx="460" cy="620" r="22" fill="${C.copper}"/>`;
  s += `<circle cx="1100" cy="620" r="22" fill="${C.copper}"/>`;
  // rear wing
  s += `<path d="M 250 500 h 80 M 250 470 h 110 M 250 440 h 70" stroke="${C.peach}" stroke-width="6" stroke-linecap="round"/>`;
  s += panel(80, 140, 420, 120, 18);
  s += `<text x="110" y="188" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="2">AT THE LINE</text>`;
  s += `<text x="110" y="230" font-family="${MONO}" font-size="32" fill="${C.mint}">edge → time</text>`;
  return frame(s, "FSAE  ·  START / FINISH TRIGGER", C.mint);
}

/** Scope capture of a clean rising edge. */
function daqScope() {
  let s = panel(80, 70, 1440, 700);
  for (let x = 160; x <= 1440; x += 80) {
    s += `<line x1="${x}" y1="120" x2="${x}" y2="700" stroke="${C.grid}" stroke-width="1"/>`;
  }
  for (let y = 160; y <= 700; y += 80) {
    s += `<line x1="140" y1="${y}" x2="1460" y2="${y}" stroke="${C.grid}" stroke-width="1"/>`;
  }
  s += `<line x1="140" y1="520" x2="1460" y2="520" stroke="${C.tealDim}" stroke-width="2"/>`;
  let d = "M 180 520";
  for (let x = 180; x <= 640; x += 8) d += ` L ${x} 520`;
  for (let x = 640; x <= 760; x += 4) {
    const t = (x - 640) / 120;
    const y = 520 - t * 280;
    d += ` L ${x} ${y.toFixed(1)}`;
  }
  for (let x = 760; x <= 1420; x += 8) d += ` L ${x} 240`;
  s += `<path d="${d}" fill="none" stroke="${C.peach}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`;
  s += `<line x1="700" y1="140" x2="700" y2="700" stroke="${C.teal}" stroke-width="2" stroke-dasharray="6 8"/>`;
  s += `<text x="716" y="180" font-family="${MONO}" font-size="20" fill="${C.teal}">TRIG</text>`;
  s += `<text x="160" y="160" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="2">CH1  BEAM</text>`;
  return frame(s, "SCOPE  ·  RISING EDGE AT THE LINE", C.peach);
}

/** Top-down board with a few packages and solder joints. */
function meshBoard() {
  let s = "";
  s += `<rect x="260" y="80" width="1080" height="700" rx="16" fill="#0a1618" stroke="${C.copper}" stroke-width="8"/>`;
  // copper pour hint
  s += `<rect x="300" y="120" width="1000" height="620" rx="8" fill="${C.copper}" opacity="0.08"/>`;
  // ICs
  const chips = [
    [420, 200, 280, 140],
    [820, 220, 200, 110],
    [480, 460, 360, 160],
  ];
  chips.forEach(([x, y, w, h], i) => {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${C.bg2}" stroke="${i === 0 ? C.teal : C.mint}" stroke-width="4"/>`;
    const pins = Math.floor(w / 36);
    for (let p = 0; p < pins; p++) {
      s += `<rect x="${x + 16 + p * 34}" y="${y - 14}" width="10" height="16" fill="${C.peach}"/>`;
      s += `<rect x="${x + 16 + p * 34}" y="${y + h - 2}" width="10" height="16" fill="${C.peach}"/>`;
    }
  });
  // through-hole pads
  for (let i = 0; i < 8; i++) {
    const x = 1180;
    const y = 180 + i * 64;
    s += `<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${C.copper}" stroke-width="4"/>`;
    s += `<circle cx="${x}" cy="${y}" r="5" fill="${C.peach}"/>`;
  }
  s += `<text x="340" y="700" font-family="${MONO}" font-size="20" fill="${C.muted}" letter-spacing="2">SMT PACKAGES + THROUGH-HOLE PADS</text>`;
  return frame(s, "MESH  ·  ASSEMBLY PRACTICE", C.copper);
}

/** Workshop sheet: footprint courtyard and a short net list. */
function meshAltium() {
  let s = panel(70, 80, 860, 680);
  s += `<text x="100" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">FOOTPRINT</text>`;
  s += `<rect x="220" y="220" width="520" height="360" rx="4" fill="none" stroke="${C.tealDim}" stroke-width="2" stroke-dasharray="8 8"/>`;
  for (let i = 0; i < 8; i++) {
    s += `<rect x="${280 + (i % 2) * 360}" y="${280 + Math.floor(i / 2) * 70}" width="70" height="28" rx="3" fill="${C.copper}" opacity="0.85"/>`;
  }
  s += `<rect x="400" y="340" width="180" height="120" fill="${C.bg2}" stroke="${C.mint}" stroke-width="3"/>`;

  s += panel(970, 80, 560, 680);
  s += `<text x="1000" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">NETS</text>`;
  const nets = ["SENSOR → R1", "R1 → NET_A", "NET_A → U1.3", "U1.8 → GND", "U1.1 → 3V3"];
  nets.forEach((net, i) => {
    const y = 210 + i * 90;
    s += `<text x="1020" y="${y}" font-family="${MONO}" font-size="26" fill="${i % 2 ? C.peach : C.mint}">${net}</text>`;
  });
  return frame(s, "SCHEMATIC  ·  FOOTPRINT  ·  LAYOUT", C.teal);
}

/** Noisy field beside a smoothed heatmap. Values are illustrative, not data. */
function radiation() {
  let s = "";
  const cell = 22;
  const cols = 22;
  const rows = 26;
  const field = (i, j) =>
    Math.exp(-((i - 10) ** 2 + (j - 14) ** 2) / 40) * 0.9 +
    Math.exp(-((i - 18) ** 2 + (j - 6) ** 2) / 18) * 0.45;
  const hue = (v) =>
    v > 0.7 ? C.red : v > 0.5 ? C.peach : v > 0.28 ? C.copper : v > 0.12 ? C.teal : C.tealDim;
  // deterministic noise from a tiny hash so the raw panel is stable
  const noise = (i, j) => {
    const n = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
    return (n - Math.floor(n) - 0.5) * 0.55;
  };
  const lx = 90;
  const rx = 860;
  const oy = 120;
  s += `<text x="${lx}" y="90" font-family="${MONO}" font-size="20" fill="${C.muted}" letter-spacing="2">RAW</text>`;
  s += `<text x="${rx}" y="90" font-family="${MONO}" font-size="20" fill="${C.muted}" letter-spacing="2">HEATMAP</text>`;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const clean = field(i, j);
      const noisy = Math.max(0, Math.min(1, clean + noise(i, j)));
      s += `<rect x="${lx + j * cell}" y="${oy + i * cell}" width="${cell - 3}" height="${cell - 3}" rx="2" fill="${C.mint}" opacity="${(0.08 + noisy * 0.7).toFixed(2)}"/>`;
      s += `<rect x="${rx + j * cell}" y="${oy + i * cell}" width="${cell - 2}" height="${cell - 2}" fill="${hue(clean)}" opacity="${(0.4 + clean * 0.55).toFixed(2)}"/>`;
    }
  }
  return frame(s, "MATRIX FILTER  →  HSV HEATMAP", C.red);
}

/** Human and AI behind one player interface, trick in the middle. */
function cardEngine() {
  const card = (x, y, rank, suit, red, rot) => {
    const col = red ? C.red : C.bg;
    return `<g transform="rotate(${rot} ${x + 70} ${y + 100})">
      <rect x="${x}" y="${y}" width="150" height="210" rx="16" fill="${C.mint}" stroke="#9fb8b2" stroke-width="3"/>
      <text x="${x + 16}" y="${y + 48}" font-family="${SANS}" font-size="36" font-weight="700" fill="${col}">${rank}</text>
      <text x="${x + 18}" y="${y + 84}" font-family="${SANS}" font-size="28" fill="${col}">${suit}</text>
      <text x="${x + 75}" y="${y + 140}" text-anchor="middle" font-family="${SANS}" font-size="64" fill="${col}">${suit}</text>
    </g>`;
  };
  let s = "";
  s += panel(80, 80, 420, 220, 20);
  s += `<text x="110" y="150" font-family="${MONO}" font-size="20" fill="${C.muted}" letter-spacing="2">PLAYER</text>`;
  s += `<text x="110" y="210" font-family="${SANS}" font-size="48" font-weight="700" fill="${C.mint}">Human</text>`;
  s += panel(1100, 80, 420, 220, 20);
  s += `<text x="1130" y="150" font-family="${MONO}" font-size="20" fill="${C.muted}" letter-spacing="2">PLAYER</text>`;
  s += `<text x="1130" y="210" font-family="${SANS}" font-size="48" font-weight="700" fill="${C.peach}">AI</text>`;
  s += card(470, 300, "A", "♠", false, -8);
  s += card(640, 320, "Q", "♥", true, 4);
  s += card(820, 300, "10", "♣", false, 10);
  s += `<text x="800" y="620" text-anchor="middle" font-family="${MONO}" font-size="20" fill="${C.muted}" letter-spacing="3">SAME INTERFACE</text>`;
  return frame(s, "EUCHRE  ·  POLYMORPHIC PLAYERS", C.copper);
}

/** Solar chassis on the left, moisture-gated valve on the right. */
function solarIrrigation() {
  let s = panel(70, 80, 700, 680);
  s += `<text x="100" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">SOLAR CHASSIS</text>`;
  // top-view chassis
  s += `<path d="M 180 280 h 480 l 40 80 v 200 h -560 v -200 z" fill="${C.bg2}" stroke="${C.mint}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<rect x="230" y="330" width="380" height="160" rx="8" fill="${C.teal}" opacity="0.35" stroke="${C.teal}" stroke-width="4"/>`;
  for (let i = 0; i < 5; i++) {
    s += `<line x1="${250 + i * 70}" y1="340" x2="${250 + i * 70}" y2="480" stroke="${C.teal}" stroke-width="3" opacity="0.8"/>`;
  }
  s += `<circle cx="250" cy="600" r="36" fill="none" stroke="${C.copper}" stroke-width="6"/>`;
  s += `<circle cx="590" cy="600" r="36" fill="none" stroke="${C.copper}" stroke-width="6"/>`;

  s += panel(810, 80, 720, 680);
  s += `<text x="840" y="130" font-family="${MONO}" font-size="18" fill="${C.muted}" letter-spacing="3">IRRIGATION</text>`;
  // plant
  s += `<path d="M 1040 620 v -180" stroke="${C.teal}" stroke-width="6" stroke-linecap="round"/>`;
  s += `<ellipse cx="980" cy="420" rx="50" ry="28" fill="${C.teal}" opacity="0.8"/>`;
  s += `<ellipse cx="1100" cy="400" rx="54" ry="30" fill="${C.mint}" opacity="0.7"/>`;
  // soil + probe
  s += `<rect x="900" y="620" width="280" height="70" rx="8" fill="${C.copper}" opacity="0.45"/>`;
  s += `<rect x="1120" y="480" width="16" height="160" rx="4" fill="${C.peach}"/>`;
  s += `<text x="1160" y="540" font-family="${MONO}" font-size="20" fill="${C.peach}">MOISTURE</text>`;
  // valve state
  s += `<rect x="900" y="180" width="520" height="120" rx="18" fill="${C.bg2}" stroke="${C.teal}" stroke-width="3"/>`;
  s += `<text x="930" y="230" font-family="${MONO}" font-size="22" fill="${C.muted}">IF SOIL IS DRY</text>`;
  s += `<text x="930" y="270" font-family="${SANS}" font-size="32" font-weight="700" fill="${C.mint}">open the valve</text>`;
  return frame(s, "3D CHASSIS  ·  WATER ONLY WHEN ASKED", C.teal);
}

const files = {
  "dum-platform/cover.png": dumCover,
  "dum-platform/roles.png": dumRoles,
  "dum-platform/rls.png": dumRls,
  "mracing-daq/bench.jpg": daqBench,
  "mracing-daq/altium.png": daqAltium,
  "mracing-daq/car.jpg": daqCar,
  "mracing-daq/scope.png": daqScope,
  "mesh/board.jpg": meshBoard,
  "mesh/altium.png": meshAltium,
  "radiation-heatmap/before-after.png": radiation,
  "card-engine/cover.png": cardEngine,
  "solar-irrigation/cover.png": solarIrrigation,
};

for (const [rel, draw] of Object.entries(files)) {
  const dest = path.join("public/images/projects", rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const svg = draw();
  const image = sharp(Buffer.from(svg));
  if (rel.endsWith(".jpg")) {
    await image.jpeg({ quality: 90, mozjpeg: true }).toFile(dest);
  } else {
    await image.png({ compressionLevel: 9 }).toFile(dest);
  }
  console.log("wrote", rel);
}
