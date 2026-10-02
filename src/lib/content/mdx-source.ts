import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import {
  projectFrontmatterSchema,
  type Image,
  type Project,
} from "./schema";

/**
 * Local MDX content source.
 *
 * Reads `content/projects/*.mdx` at build time. Files beginning with `_` are
 * ignored, so `_TEMPLATE.mdx` can live alongside real entries.
 */

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Mark cover/gallery images pending when the file under `public/` is missing.
 * Declaring a path + todo in frontmatter is enough to render a framed slot;
 * adding the bytes later turns the slot into a photo with no code change.
 */
function resolveImage(image: {
  src: string;
  alt: string;
  caption?: string;
  todo?: string;
}): Image {
  const onDisk =
    image.src.startsWith("/") &&
    fs.existsSync(path.join(PUBLIC_DIR, image.src.replace(/^\//, "")));

  return {
    src: image.src,
    alt: image.alt,
    caption: image.caption,
    todo: image.todo,
    pending: !onDisk,
  };
}

function readProjectFile(filename: string): Project {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    // Fail the build loudly rather than shipping a half-rendered card.
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in content/projects/${filename}:\n${issues}`);
  }

  const { cover, gallery, ...rest } = parsed.data;

  return {
    ...rest,
    cover: cover ? resolveImage(cover) : undefined,
    gallery: gallery.map(resolveImage),
    slug,
    body: content.trim(),
  };
}

export function loadProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
    .map(readProjectFile)
    .filter((p) => !p.draft);
}
