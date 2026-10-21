import type { Project } from "./schema";

/** Recruiter-facing status label. Finished coursework reads “Completed”, not “Archived”. */
export function statusLabel(status: Project["status"]): string | null {
  if (status === "live") return null;
  if (status === "in-progress") return "In progress";
  return "Completed";
}
