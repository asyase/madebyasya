"use client";
import ProjectCard from "./ProjectCard";
import { designSystemProjects, projects } from "@/lib/content/projects";

// Curated entry point to the design system case studies. The cards reuse the index's
// project records, so numbers, links and covers stay the same as in the full grid.
export default function FeaturedDesignSystems() {
  const [lead, ...rest] = designSystemProjects;
  if (!lead) return null;

  return (
    <section id="featured-design-systems" className="scroll-mt-20 bg-ivory py-16 md:py-24" aria-labelledby="featured-ds-title">
      <div className="frame">
        <p className="eyebrow text-pink-deep">Featured · {designSystemProjects.length} case studies</p>
        <h2 id="featured-ds-title" className="mt-4 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.9] tracking-tightest">
          Featured <span className="serif-accent font-normal text-lav-deep">design system</span> projects
        </h2>
        <p className="mt-6 max-w-[56ch] text-lg text-ink-soft">
          Exploring scalable design systems, AI-assisted workflows and accessible product experiences.
        </p>

        <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:gap-y-20">
          <div className="md:col-span-2">
            <ProjectCard project={lead} index={projects.indexOf(lead)} variant="wide" highlights />
          </div>
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} variant="standard" highlights />
          ))}
        </div>
      </div>
    </section>
  );
}
