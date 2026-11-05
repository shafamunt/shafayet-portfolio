import type { Project } from "./schema";

/** Recruiter-facing status label — live, in progress, and completed stay distinct. */
export function statusLabel(status: Project["status"]): string | null {
  if (status === "live") return "Live";
  if (status === "in-progress") return "In progress";
  return "Completed";
}
