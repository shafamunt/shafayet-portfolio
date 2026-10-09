# Media & content TODO (your side)

The PR wires visual-heavy case studies and deep write-ups. Team photos for
MRacing are already pulled from [mracing.engin.umich.edu](https://www.mracing.engin.umich.edu/)
(same idea as Matthew using SPARK site media). Everything below is **what you
still need to drop in** — replace the file at the path; no code change.

## Priority 1 — makes the site feel finished

| Done? | Drop file at | What to shoot / export |
| --- | --- | --- |
| ☐ | `public/images/me/` (4–8 files) | Headshot + life/lab (FSAE, MESH, campus). Filename becomes alt text, e.g. `mracing-shop.jpg` |
| ☐ | `public/images/projects/mracing-daq/bench.jpg` | Your photosensor breadboard / bench prototype |
| ☐ | `public/images/projects/mracing-daq/altium.png` | Altium schematic or PCB layout screenshot |
| ☐ | `public/images/projects/mracing-daq/scope.png` | Scope capture of the trigger edge |
| ☐ | `public/images/projects/dum-platform/cover.png` (+ `roles.png`, `rls.png`) | Redacted UI screenshots — no student names/grades/faces |

## Priority 2 — class / course projects (Matthew-parity)

| Done? | Drop file at | What to shoot / export |
| --- | --- | --- |
| ☐ | `public/images/projects/fpga-calculator/cover.png` | FPGA board photo or GIF (`3 + (−4) = −1` style) |
| ☐ | `public/images/projects/fpga-calculator/datapath.png` | Datapath block diagram from your notes |
| ☐ | `public/images/projects/fpga-calculator/io-map.png` | KEY/SW I/O map figure |
| ☐ | `public/images/projects/led-matrix-games/cover.png` | Lit LED matrix + MCU on the table |
| ☐ | `public/images/projects/led-matrix-games/wiring.png` | Wiring close-up |
| ☐ | `public/images/projects/solar-irrigation/cover.png` | Best single photo of chassis or irrigation |
| ☐ | `public/images/projects/solar-irrigation/chassis.png` | 3D-printed solar chassis |
| ☐ | `public/images/projects/solar-irrigation/irrigation.png` | Moisture sensor + valve / pump rig |
| ☐ | `public/images/projects/radiation-heatmap/before-after.png` | Real MATLAB before/after if shareable |
| ☐ | `public/images/projects/radiation-heatmap/kernel.png` | Kernel coefficient figure |
| ☐ | `public/images/projects/mesh/board.jpg` | Board you assembled or reworked at MESH |
| ☐ | `public/images/projects/mesh/altium.png` | Workshop schematic / layout screenshot |

## Priority 3 — optional polish

| Done? | Item |
| --- | --- |
| ☐ | Confirm FPGA calculator write-up matches **your** lab (bit widths, Booth vs array, board model) in `content/projects/fpga-calculator.mdx` |
| ☐ | Confirm LED matrix games page matches what you actually built (or set `draft: true` / delete) in `content/projects/led-matrix-games.mdx` |
| ☐ | Optional terminal GIF for card engine → `public/images/projects/card-engine/cover.png` |
| ☐ | Watches posters → `public/images/watches/` if you want that About section live |
| ☐ | Spotify env vars if the About music panel should be live in prod |
| ☐ | LinkedIn titles/dates synced with `/experience` |
| ☐ | Replace MRacing **team** photos with your own track/shop shots when you have them (paths under `mracing-daq/team-*.jpg`) |

## Already filled (no action unless you want upgrades)

- MRacing cover + gallery team cars / pit / group from the public team site
- MRacing signal-path diagram (`signal-path.png`)
- Deep MDX for MRacing, ENGR 100, FPGA, LED matrix, heatmap, MESH, card engine
- Hero role stack + “open to” line
- Project pages: gallery above the write-up for visual-first reading

## How to add a photo

```bash
# example
cp ~/Desktop/bench.jpg public/images/projects/mracing-daq/bench.jpg
```

Commit and push — captions that say TODO clear once the real file is at that
path (or edit the caption in the project’s `.mdx` frontmatter).
