"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FilterBar, { type Filter } from "./FilterBar";
import ProjectCard from "./ProjectCard";
import FeaturedDesignSystems from "./FeaturedDesignSystems";
import { categories, projects, type Category } from "@/lib/content/projects";

const valid = categories.map((c) => c.hash);

export default function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "");
      if (valid.includes(h)) setFilter(h as Filter);
      return valid.includes(h) && h !== "all";
    };
    // A filter link (e.g. /work/#design) opens at the filtered grid, below the featured section.
    // Deferred so it runs after the router's own initial hash scroll.
    const t = read() ? setTimeout(() => document.getElementById("all-projects")?.scrollIntoView(), 0) : undefined;
    window.addEventListener("hashchange", read);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", read);
    };
  }, []);

  function change(f: Filter) {
    setFilter(f);
    try { history.replaceState(null, "", f === "all" ? window.location.pathname : `#${f}`); } catch { /* sandboxed frames */ }
  }

  const list = useMemo(() => projects.filter((p) => filter === "all" || p.categories.includes(filter as Category)), [filter]);

  return (
    <>
      <section className="pb-12 pt-32 md:pt-44" aria-labelledby="work-index-title">
        <div className="frame">
          <p className="eyebrow text-pink-deep">Index of work · {projects.length} projects</p>
          <h1 id="work-index-title" className="mt-4 font-display text-[clamp(3.4rem,12vw,12rem)] font-extrabold leading-[0.82] tracking-tightest">
            All <span className="serif-accent font-normal text-lav-deep">the</span> work
          </h1>
          <p className="mt-8 max-w-[56ch] text-lg text-ink-soft">
            Commercial features, full-stack systems, research-led design and AI experiments. Each case study shows the real status – what is implemented, prototyped or still planned.
          </p>
        </div>
      </section>

      <FeaturedDesignSystems />

      <section id="all-projects" className="scroll-mt-20 pb-20 pt-16 md:pt-24" aria-labelledby="projects-heading">
        <div className="frame">
          <h2 id="projects-heading" className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-none tracking-tightest">
            All {projects.length} projects
          </h2>
          <div className="mb-12 mt-8">
            <FilterBar id="index" value={filter} onChange={change} pool={projects} />
          </div>
          <motion.div layout className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04 }} >
                  <ProjectCard project={p} index={projects.indexOf(p)} variant="standard" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="mt-16 flex items-center gap-1 text-sm text-ink-soft">
            More code on <a className="inline-flex items-center gap-0.5 font-semibold text-ink underline underline-offset-4" href="https://github.com/asyase" target="_blank" rel="noreferrer">GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
          </p>
        </div>
      </section>

    </>
  );
}
