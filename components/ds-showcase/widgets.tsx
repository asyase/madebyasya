"use client";
// Interactive widgets embedded in the design-system case study.
import type { WidgetId } from "@/lib/content/projects";
import TokenExplorer from "./TokenExplorer";
import MultibrandCompare from "./MultibrandCompare";
import Composer from "./Composer";
import Playground from "./Playground";
import DesignToCode from "./DesignToCode";

export const caseStudyWidgets: Partial<Record<WidgetId, React.ComponentType>> = {
  "ds-tokens": TokenExplorer,
  "ds-multibrand": MultibrandCompare,
  "ds-composer": Composer,
  "ds-playground": Playground,
  "ds-implementation": DesignToCode,
};
