"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { categories, type Category, type Project } from "@/lib/content/projects";

export type Filter = Category | "all";

export default function FilterBar({ value, onChange, pool, id }: { value: Filter; onChange: (f: Filter) => void; pool: Project[]; id: string }) {
  return (
    <div role="radiogroup" aria-label="Filter projects by discipline" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {categories.map((c) => {
        const count = c.id === "all" ? pool.length : pool.filter((p) => p.categories.includes(c.id as Category)).length;
        const selected = value === c.id;
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(c.id)}
            className={clsx(
              "relative shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
              selected ? "border-ink text-paper" : "border-ink/15 text-ink hover:border-ink/40",
            )}
          >
            {selected && <motion.span layoutId={`filter-pill-${id}`} className="absolute inset-0 -z-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative z-10">
              {c.label} <span className={clsx("ml-1 font-mono text-[11px]", selected ? "text-bubblegum" : "text-ink-soft")}>{count}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
