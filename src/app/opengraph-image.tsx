import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

/** Social preview card, generated at build time. */
export const dynamic = "force-static";
export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050c17",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#22d3ee" }} />
          <div style={{ fontSize: 24, color: "#a7bed4", letterSpacing: 2 }}>
            {site.title.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              color: "#e8f1fa",
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            {site.headline}
          </div>
          <div style={{ fontSize: 30, color: "#a7bed4" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#6b8299" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
