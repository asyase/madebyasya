"use client";
import CaseStudy from "@/components/CaseStudy";
import { getProject } from "@/lib/content/projects";
import { promptWidgets } from "./widgets";

/** The shared case-study template, with this project's sections plugged in. */
export default function PromptCaseStudy() {
  return <CaseStudy project={getProject("from-prompt-to-product")!} widgets={promptWidgets} />;
}
