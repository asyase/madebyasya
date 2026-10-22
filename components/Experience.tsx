"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Download, Plus } from "lucide-react";
import { experience, education, type TimelineEntry } from "@/lib/content/experience";
import { site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

function Entry({ e, open, onToggle }: { e: TimelineEntry; open: boolean; onToggle: () => void }) {
  const expandable = e.points.length > 0 || (e.tech?.length ?? 0) > 0;
  return (
    <li className="relative pl-8 md:pl-0">
      <span className={clsx("absolute left-0 top-7 h-3 w-3 -translate-x-[5px] rounded-full ring-4 ring-paper md:hidden", e.kind === "work" ? "bg-bubblegum" : "bg-lavender")} aria-hidden />
      <div className="grid gap-x-8 border-t border-ink/10 py-6 md:grid-cols-[180px_1fr]">
        <p className="font-mono text-sm text-ink-soft tabular-nums">{e.period}</p>
        <div>
          <button
            type="button"
            onClick={expandable ? onToggle : undefined}
            aria-expanded={expandable ? open : undefined}
            aria-controls={`tl-${e.id}`}
            disabled={!expandable}
            className="group flex w-full items-start justify-between gap-4 text-left disabled:cursor-default"
          >
            <span>
              <span className="block font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">{e.title}</span>
              <span className="mt-1 block font-medium text-ink-soft">{e.org}</span>
              <span className="mt-2 block max-w-[60ch] text-ink-soft">{e.summary}</span>
            </span>
            {expandable && (
              <span className={clsx("mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 transition-all group-hover:bg-blush", open && "rotate-45 bg-ink text-paper")}>
                <Plus className="h-4 w-4" aria-hidden />
                <span className="sr-only">{open ? "Collapse" : "Expand"}</span>
              </span>
            )}
          </button>
          <AnimatePresence initial={false}>
            {open && expandable && (
              <motion.div id={`tl-${e.id}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
                <ul className="mt-5 grid max-w-[68ch] gap-2.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.98rem]">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-deep" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                {e.tech && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {e.tech.map((t) => (
                      <li key={t} className="rounded-full bg-peri/60 px-2.5 py-1 font-mono text-[11px]">{t}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  const href = useHref();
  const [open, setOpen] = useState<string | null>("erply");
  const toggle = (id: string) => setOpen((o) => (o === id ? null : id));

  return (
    <section id="experience" className="relative scroll-mt-20 bg-ivory py-20 md:py-32" aria-labelledby="exp-title">
      <div className="frame">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-pink-deep">Experience & education</p>
            <h2 id="exp-title" className="mt-4 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-extrabold leading-[0.88] tracking-tightest">
              The path <span className="serif-accent font-normal text-lav-deep">so far</span>
            </h2>
          </div>
          <a href={href(site.cv)} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper hover:bg-pink-deep" data-cursor="PDF">
            Download resume <Download className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="mt-14 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h3 className="eyebrow mb-2 flex items-center gap-2 text-ink"><span className="h-2 w-2 rounded-full bg-bubblegum" aria-hidden /> Work</h3>
            <ol className="relative border-l border-ink/10 md:border-0">
              {experience.map((e) => <Entry key={e.id} e={e} open={open === e.id} onToggle={() => toggle(e.id)} />)}
            </ol>
          </div>
          <div className="lg:col-span-4">
            <h3 className="eyebrow mb-2 flex items-center gap-2 text-ink"><span className="h-2 w-2 rounded-full bg-lavender" aria-hidden /> Education</h3>
            <ol>
              {education.map((e) => (
                <li key={e.id} className="border-t border-ink/10 py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-display text-xl font-bold leading-tight tracking-tight">{e.title}</p>
                    <p className="shrink-0 whitespace-nowrap font-mono text-xs text-ink-soft tabular-nums">{e.period}</p>
                  </div>
                  <p className="text-sm font-medium text-ink-soft">{e.org}</p>
                  {(e.points[0] ?? e.summary) && <p className="mt-2 text-sm text-ink-soft">{e.points[0] ?? e.summary}</p>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
