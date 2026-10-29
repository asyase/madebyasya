"use client";
import CaseStudy from "@/components/CaseStudy";
import { getProject } from "@/lib/content/projects";
import { consistencyWidgets } from "./widgets";

export default function ConsistencyCaseStudy() {
  return <CaseStudy project={getProject("from-chaos-to-consistency")!} widgets={consistencyWidgets} />;
}
