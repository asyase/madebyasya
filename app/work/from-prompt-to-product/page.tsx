import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PromptCaseStudy from "@/components/prompt-showcase/PromptCaseStudy";
import { getProject } from "@/lib/content/projects";

// Own route (instead of /work/[slug]) so the interactive widgets only ship with this page.
// NOT PUBLISHED: production builds remove this page (scripts/publication.config.mjs).
const p = getProject("from-prompt-to-product")!;

export const metadata: Metadata = {
  title: p.title,
  description: p.summary,
  openGraph: { title: p.title, description: p.summary, images: [{ url: p.shots[0].src }] },
};

export default function Page() {
  return (
    <Shell depth={2}>
      <PromptCaseStudy />
    </Shell>
  );
}
