import type { Metadata } from "next";
import Shell from "@/components/Shell";
import DesignSystemCaseStudy from "@/components/ds-showcase/DesignSystemCaseStudy";
import { getProject } from "@/lib/content/projects";

// Own route (instead of /work/[slug]) so the interactive widgets only ship with this page.
const p = getProject("ai-ready-design-system")!;

export const metadata: Metadata = {
  title: p.title,
  description: p.summary,
  openGraph: { title: p.title, description: p.summary, images: [{ url: p.shots[0].src }] },
};

export default function Page() {
  return (
    <Shell depth={2}>
      <DesignSystemCaseStudy />
    </Shell>
  );
}
