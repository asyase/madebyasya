"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FilterBar, { type Filter } from "./FilterBar";
import ProjectCard from "./ProjectCard";
import { homeSelection, projects } from "@/lib/content/projects";
import { useHref } from "@/lib/paths";

// Home selection first, then the rest, so every filter still shows a full layout.
const ordered = [...homeSelection, ...projects.filter((p) => !homeSelection.includes(p))];
const LIMIT = 6;

// Layout rhythm: wide, then a tall/standard pair, repeated.
const layout = ["wide", "tall", "standard", "standard", "tall", "wide"] as const;
const spans = ["lg:col-span-12", "lg:col-span-5", "lg:col-span-7 lg:pt-32", "lg:col-span-7", "lg:col-span-5 lg:-mt-24", "lg:col-span-12"];

export default function SelectedWork() {
  const href = useHref();
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(() => ordered.filter((p) => filter === "all" || p.categories.includes(filter)).slice(0, LIMIT), [filter]);
  const total = filter === "all" ? projects.length : projects.filter((p) => p.categories.includes(filter)).length;

  return (
    <section id="work" className="relative scroll-mt-20 bg-ivory py-20 md:py-32" aria-labelledby="work-title">
      <div className="frame">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-pink-deep">Selected work · {list.length} of {total} projects</p>
            <h2 id="work-title" className="mt-4 font-display text-[clamp(3rem,9vw,8.5rem)] font-extrabold leading-[0.85] tracking-tightest">
              Selected <span className="serif-accent font-normal text-lav-deep">work</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-ink-soft">
              Commercial features, award-winning AI, research-led redesigns and real business logic. Each one opens into a case study: problem, approach, architecture and result.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <FilterBar id="home" value={filter} onChange={setFilter} pool={projects} />
        </div>

        <motion.div layout className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-24">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                className={(layout[i] === "wide" ? "md:col-span-2 " : "") + spans[i]}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <ProjectCard project={p} index={projects.indexOf(p)} variant={layout[i]} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            {total > LIMIT ? `${total - LIMIT} more projects on the work page.` : "See every project on the work page."}
          </p>
          <a href={href(`/work/${filter === "all" ? "" : "#" + filter}`)} className="group inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 font-semibold text-paper" data-cursor="All work">
            View all work
            <span className="grid h-9 w-9 place-items-center rounded-full bg-bubblegum text-ink transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
