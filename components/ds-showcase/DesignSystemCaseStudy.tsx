"use client";
import CaseStudy from "@/components/CaseStudy";
import { getProject } from "@/lib/content/projects";
import { caseStudyWidgets } from "./widgets";

/** The shared case-study template, with this project's interactive widgets plugged in. */
export default function DesignSystemCaseStudy() {
  return <CaseStudy project={getProject("ai-ready-design-system")!} widgets={caseStudyWidgets} />;
}
