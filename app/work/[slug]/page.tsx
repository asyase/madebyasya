import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import CaseStudy from "@/components/CaseStudy";
import { getProject, projects } from "@/lib/content/projects";

export const dynamicParams = false;

// Projects with their own route under app/work/<slug>/.
const DEDICATED = ["ai-ready-design-system", "from-chaos-to-consistency", "from-prompt-to-product"];

export function generateStaticParams() {
  return projects.filter((p) => !DEDICATED.includes(p.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const cover = p.shots[0]?.src;
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: cover ? [{ url: cover }] : ["/og.png"] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  return (
    <Shell depth={2}>
      <CaseStudy project={p} />
    </Shell>
  );
}
