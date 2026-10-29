"use client";
// Interactive widgets embedded in the "From Chaos to Consistency" case study.
import type { WidgetId } from "@/lib/content/projects";
import Audit from "./Audit";
import Consolidation from "./Consolidation";
import BeforeAfter from "./BeforeAfter";
import Accessibility from "./Accessibility";
import DocsGovernance from "./Governance";
import Implementation from "./Implementation";
import Outcomes from "./Outcomes";

export const consistencyWidgets: Partial<Record<WidgetId, React.ComponentType>> = {
  "cc-audit": Audit,
  "cc-consolidation": Consolidation,
  "cc-before-after": BeforeAfter,
  "cc-a11y": Accessibility,
  "cc-docs": DocsGovernance,
  "cc-implementation": Implementation,
  "cc-outcomes": Outcomes,
};
