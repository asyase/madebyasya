"use client";
// Widgets for the "From Prompt to Product" draft case study (11 sections).
import type { WidgetId } from "@/lib/content/projects";
import { AiCouldntDecide, Components, Generations, Lessons, Outcome, Overview, Refinement, Roles, Testing, Variables } from "./Sections";
import Prototype from "./Prototype";

export const promptWidgets: Partial<Record<WidgetId, React.ComponentType>> = {
  "pp-overview": Overview,
  "pp-roles": Roles,
  "pp-generations": Generations,
  "pp-refinement": Refinement,
  "pp-components": Components,
  "pp-variables": Variables,
  "pp-prototype": Prototype,
  "pp-testing": Testing,
  "pp-ai-decide": AiCouldntDecide,
  "pp-lessons": Lessons,
  "pp-outcome": Outcome,
};
