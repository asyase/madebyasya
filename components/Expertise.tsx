"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { skillGroups, type Skill } from "@/lib/content/skills";
import { projects, getProject } from "@/lib/content/projects";
import { useHref } from "@/lib/paths";
import Reveal from "./Reveal";

const practices = [
  { verb: "design", line: "I can design it.", text: "Research, flows, wireframes and visual systems – people first.", filter: "design", tone: "bg-blush" },
  { verb: "build", line: "I can build it.", text: "Frontend, backend, databases and integrations that hold real business logic.", filter: "fullstack", tone: "bg-peri" },
  { verb: "smarter", line: "I can make it smarter.", text: "LLM features, evaluation and automation – tested and guarded.", filter: "ai", tone: "bg-rose" },
] as const;

const tone = {
  pink: { head: "bg-blush", chip: "hover:bg-blush focus-visible:bg-blush", active: "bg-bubblegum" },
  lavender: { head: "bg-peri", chip: "hover:bg-peri focus-visible:bg-peri", active: "bg-lavender" },
  rose: { head: "bg-rose", chip: "hover:bg-rose focus-visible:bg-rose", active: "bg-bubblegum/70" },
  peri: { head: "bg-[#e3e5fc]", chip: "hover:bg-peri focus-visible:bg-peri", active: "bg-peri" },
  ink: { head: "bg-ink text-paper", chip: "hover:bg-ink/10 focus-visible:bg-ink/10", active: "bg-ink text-paper" },
};

export default function Expertise() {
  const href = useHref();
  const [active, setActive] = useState<{ group: string; skill: Skill } | null>(null);

  return (
    <section id="expertise" className="relative scroll-mt-20 py-20 md:py-32" aria-labelledby="expertise-title">
      <div className="frame">
        <p className="eyebrow text-pink-deep">Expertise</p>
        <h2 id="expertise-title" className="mt-4 max-w-5xl font-display text-[clamp(2.6rem,6.4vw,6rem)] font-extrabold leading-[0.9] tracking-tightest">
          Design it. Build it. <span className="serif-accent font-normal text-pink-deep">Make it smarter.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {practices.map((p, i) => {
            const count = projects.filter((x) => x.categories.includes(p.filter)).length;
            return (
              <Reveal key={p.verb} delay={i * 90}>
                <a href={href(`/work/#${p.filter}`)} className={clsx("group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] p-6 md:p-8", p.tone)} data-cursor={`${count} projects`}>
                  <span className="font-mono text-xs text-ink-soft">0{i + 1} / {count} projects</span>
                  <div className="mt-16">
                    <p className="font-display text-3xl font-bold leading-none tracking-tight md:text-4xl">{p.line}</p>
                    <p className="mt-3 text-ink-soft">{p.text}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    See the work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-24 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h3 className="font-display text-3xl font-bold tracking-tight md:text-5xl">Capability map</h3>
            <p className="mt-3 max-w-[52ch] text-ink-soft">No percentages. Hover or tap a skill to see where I used it.</p>
          </div>
          <ul className="flex flex-wrap gap-4 text-sm" aria-label="Legend">
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ink" aria-hidden /> Commercial work</li>
            <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink" aria-hidden /> Projects & courses</li>
          </ul>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((g, gi) => {
            const t = tone[g.tone];
            const current = active?.group === g.id ? active.skill : null;
            const linked = current?.slug ? getProject(current.slug) : null;
            return (
              <Reveal
                key={g.id}
                delay={gi * 60}
                className={clsx(
                  "flex flex-col overflow-hidden rounded-[24px] bg-paper ring-1 ring-ink/10",
                  gi < 3 ? "lg:col-span-2" : "lg:col-span-3",
                )}
              >
                <div className={clsx("flex items-baseline justify-between px-5 py-4", t.head)}>
                  <h4 className="font-display text-xl font-bold tracking-tight">{g.title}</h4>
                  <span className="font-mono text-[11px] opacity-70">{g.skills.length}</span>
                </div>
                <ul className="flex flex-wrap gap-2 p-5">
                  {g.skills.map((s) => {
                    const on = current?.name === s.name;
                    return (
                      <li key={s.name}>
                        <button
                          type="button"
                          aria-pressed={on}
                          aria-describedby={`inspector-${g.id}`}
                          onMouseEnter={() => setActive({ group: g.id, skill: s })}
                          onFocus={() => setActive({ group: g.id, skill: s })}
                          onClick={() => setActive({ group: g.id, skill: s })}
                          className={clsx(
                            "inline-flex items-center gap-2 rounded-full border border-ink/12 px-3 py-1.5 text-[0.85rem] font-medium transition-colors",
                            on ? t.active : t.chip,
                          )}
                        >
                          <span className={clsx("h-2 w-2 shrink-0 rounded-full", s.level === "pro" ? "bg-current" : "border-[1.5px] border-current")} aria-hidden />
                          {s.name}
                          <span className="sr-only">{s.level === "pro" ? " (commercial)" : " (projects)"}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div id={`inspector-${g.id}`} aria-live="polite" className="mt-auto min-h-[112px] border-t border-dashed border-ink/15 px-5 py-4">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={current?.name ?? "idle"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                      {current ? (
                        <>
                          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                            {current.name} · {current.level === "pro" ? "commercial" : "project"}
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed">{current.evidence}</p>
                          {linked && (
                            <a href={href(`/work/${linked.slug}/`)} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-pink-deep underline-offset-4 hover:underline">
                              {linked.title.split(" – ")[0]} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                            </a>
                          )}
                        </>
                      ) : (
                        <p className="serif-accent text-2xl leading-tight text-ink-soft">{g.tagline}</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
