#!/usr/bin/env node
/**
 * Build a static export and deploy to Cloudflare Pages → https://shafam.pages.dev
 * (same free *.pages.dev hosting as tajulharamain.pages.dev).
 *
 * API routes are moved aside for the export build (Pages is static assets only).
 * Contact/Spotify APIs remain available on the Vercel deployment.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const apiDir = path.join(root, "src/app/api");
const apiPark = path.join(root, ".api-park");

function run(cmd, env = {}) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: "inherit", env: { ...process.env, ...env } });
}

try {
  if (fs.existsSync(apiDir)) {
    fs.rmSync(apiPark, { recursive: true, force: true });
    fs.renameSync(apiDir, apiPark);
  }

  run("npx next build", { STATIC_EXPORT: "1" });

  if (!fs.existsSync(path.join(root, "out"))) {
    throw new Error("Expected out/ from next static export");
  }

  run("npx wrangler pages deploy out --project-name=shafam --commit-dirty=true");
} finally {
  if (fs.existsSync(apiPark) && !fs.existsSync(apiDir)) {
    fs.renameSync(apiPark, apiDir);
  }
}
