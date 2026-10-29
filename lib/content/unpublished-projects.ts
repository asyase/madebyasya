// Case studies that are registered but NOT published yet (none at the moment).
// Entries here are listed only in development and `npm run build:preview`; production builds leave
// them out of every page and bundle, and scripts/publication.config.mjs removes and checks their routes.
// To publish one: move its entry into `projects` in projects.ts, add its slug to LOCAL_COVERS /
// CARD_BADGES there, and remove it from scripts/publication.config.mjs.
import type { Project } from "./projects";

export const unpublishedProjects: Project[] = [];
