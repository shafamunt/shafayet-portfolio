import type { NextConfig } from "next";

/** Set STATIC_EXPORT=1 for Cloudflare Pages (same free *.pages.dev model as tajulharamain). */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {
        images: {
          formats: ["image/avif", "image/webp"] as ("image/avif" | "image/webp")[],
          remotePatterns: [
            { protocol: "https" as const, hostname: "i.scdn.co" },
            { protocol: "https" as const, hostname: "mosaic.scdn.co" },
          ],
        },
      }),
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
