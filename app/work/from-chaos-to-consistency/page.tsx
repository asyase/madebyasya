import type { Metadata } from "next";
import Shell from "@/components/Shell";
import ConsistencyCaseStudy from "@/components/consistency-showcase/ConsistencyCaseStudy";
import { getProject } from "@/lib/content/projects";

// Own route (instead of /work/[slug]) so the interactive widgets only ship with this page.
const p = getProject("from-chaos-to-consistency")!;

export const metadata: Metadata = {
  title: p.title,
  description: p.summary,
  openGraph: { title: p.title, description: p.summary, images: [{ url: p.shots[0].src }] },
};

export default function Page() {
  return (
    <Shell depth={2}>
      <ConsistencyCaseStudy />
    </Shell>
  );
}
