"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import type { ArchNode } from "@/lib/content/projects";

const kindStyle: Record<ArchNode["kind"], { bg: string; tag: string }> = {
  input: { bg: "bg-ivory", tag: "Input" },
  ui: { bg: "bg-blush", tag: "Interface" },
  api: { bg: "bg-peri", tag: "API" },
  guard: { bg: "bg-rose", tag: "Guard" },
  ai: { bg: "bg-bubblegum", tag: "AI step" },
  process: { bg: "bg-[#e3e5fc]", tag: "Processing" },
  storage: { bg: "bg-lavender", tag: "Storage" },
  output: { bg: "bg-ink text-paper", tag: "Output" },
};

export default function ArchitectureExplorer({ nodes, caption }: { nodes: ArchNode[]; caption: string }) {
  const [active, setActive] = useState(nodes[0].id);
  const current = nodes.find((n) => n.id === active)!;
  const idx = nodes.findIndex((n) => n.id === active);

  return (
    <div className="rounded-[28px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
      <ol className="no-scrollbar flex gap-0 overflow-x-auto pb-2" aria-label="System layers – select one for details">
        {nodes.map((n, i) => {
          const on = n.id === active;
          const k = kindStyle[n.kind];
          return (
            <li key={n.id} className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={() => setActive(n.id)}
                onMouseEnter={() => setActive(n.id)}
                aria-pressed={on}
                className={clsx(
                  "relative w-[136px] rounded-2xl p-3.5 text-left transition-all duration-300",
                  k.bg,
                  on ? "-translate-y-1 shadow-[0_16px_30px_-16px_rgba(48,42,75,.6)] ring-2 ring-ink" : "opacity-80 ring-1 ring-ink/10 hover:opacity-100",
                )}
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] opacity-70">{String(i + 1).padStart(2, "0")} · {k.tag}</span>
                <span className="mt-1.5 block font-display text-[15px] font-bold leading-tight">{n.label}</span>
                <span className="mt-1 block truncate font-mono text-[10.5px] opacity-75">{n.tech}</span>
              </button>
              {i < nodes.length - 1 && (
                <span className="relative mx-1 block h-px w-5 bg-ink/25" aria-hidden>
                  <span className={clsx("absolute -top-[3px] h-[7px] w-[7px] rounded-full transition-colors", i < idx ? "bg-pink-deep" : "bg-ink/20")} style={{ left: "calc(50% - 3px)" }} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 grid gap-4 rounded-2xl bg-ivory p-5 md:grid-cols-[1fr_auto] md:items-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-pink-deep">{current.tech}</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-tight">{current.label}</p>
            <p className="mt-2 max-w-[70ch] text-ink-soft">{current.detail}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-2">
          <button type="button" onClick={() => setActive(nodes[Math.max(idx - 1, 0)].id)} disabled={idx === 0} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold disabled:opacity-30">Previous</button>
          <button type="button" onClick={() => setActive(nodes[Math.min(idx + 1, nodes.length - 1)].id)} disabled={idx === nodes.length - 1} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper disabled:opacity-30">Next step</button>
        </div>
      </div>
      <p className="mt-3 px-1 font-mono text-xs text-ink-soft">{caption}</p>
    </div>
  );
}
