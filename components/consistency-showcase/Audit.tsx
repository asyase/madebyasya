"use client";
import { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { findings, severityLabel, type Severity } from "@/lib/consistency/audit";
import { Segmented } from "@/components/ds-showcase/controls";

const sevStyle: Record<Severity, string> = {
  high: "bg-pink-deep text-paper",
  medium: "bg-blush text-ink",
  low: "bg-peri text-ink",
};
const whereLabel: Record<string, string> = { dashboard: "Dashboard", form: "Form", list: "List" };

export default function Audit() {
  const [sev, setSev] = useState<Severity | "all">("all");
  const [open, setOpen] = useState<string | null>("A-01");
  const list = findings.filter((f) => sev === "all" || f.severity === sev);
  const count = (s: Severity) => findings.filter((f) => f.severity === s).length;

  return (
    <div className="grid grid-cols-1 gap-4">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Audit summary">
        <li className="rounded-[20px] bg-ink p-5 text-paper"><p className="font-display text-4xl font-extrabold">{findings.length}</p><p className="mt-1 text-sm text-paper/75">findings</p></li>
        <li className="rounded-[20px] bg-pink-deep p-5 text-paper"><p className="font-display text-4xl font-extrabold">{count("high")}</p><p className="mt-1 text-sm text-paper/85">high severity</p></li>
        <li className="rounded-[20px] bg-blush p-5"><p className="font-display text-4xl font-extrabold">{count("medium")}</p><p className="mt-1 text-sm text-ink-soft">medium severity</p></li>
        <li className="rounded-[20px] bg-peri/70 p-5"><p className="font-display text-4xl font-extrabold">{findings.filter((f) => f.wcag).length}</p><p className="mt-1 text-sm text-ink-soft">linked to a WCAG criterion</p></li>
      </ul>

      <div className="flex flex-col gap-3 rounded-[24px] bg-ivory p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
        <Segmented legend="Severity" size="sm" value={sev} onChange={setSev} options={[{ value: "all", label: `All (${findings.length})` }, { value: "high", label: `High (${count("high")})` }, { value: "medium", label: `Medium (${count("medium")})` }]} />
        <p className="max-w-[44ch] text-xs text-ink-soft">Severity weighs how often a pattern appears, whether it blocks a task, and whether it fails a WCAG criterion.</p>
      </div>

      <ul className="grid gap-2">
        {list.map((f) => {
          const isOpen = open === f.id;
          return (
            <li key={f.id} className="overflow-hidden rounded-[20px] bg-paper ring-1 ring-ink/10">
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={`${f.id}-panel`} onClick={() => setOpen(isOpen ? null : f.id)} className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 p-4 text-left hover:bg-ivory/60 sm:grid-cols-[4rem_1fr_9rem_6rem_auto] sm:p-5">
                  <span className="font-mono text-xs text-pink-deep">{f.id}</span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold leading-snug tracking-tight">{f.issue}</span>
                    <span className="mt-0.5 block text-xs text-ink-soft sm:hidden">{f.pattern} · {severityLabel[f.severity]}</span>
                  </span>
                  <span className="hidden text-sm text-ink-soft sm:block">{f.pattern}</span>
                  <span className="hidden sm:block"><span className={clsx("rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]", sevStyle[f.severity])}>{severityLabel[f.severity]}</span></span>
                  <ChevronDown className={clsx("h-4 w-4 transition-transform", isOpen && "rotate-180")} aria-hidden />
                </button>
              </h3>
              {isOpen && (
                <div id={`${f.id}-panel`} className="grid gap-4 border-t border-ink/10 p-4 sm:grid-cols-3 sm:p-5">
                  <div>
                    <p className="eyebrow text-ink-soft">UX impact</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed">{f.ux}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-ink-soft">Accessibility impact</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed">{f.a11y}</p>
                    {f.wcag && <p className="mt-2 font-mono text-[11px] text-pink-deep">WCAG {f.wcag}</p>}
                  </div>
                  <div className="rounded-2xl bg-ivory p-4">
                    <p className="eyebrow text-lav-deep">Proposed solution</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed">{f.solution}</p>
                    <p className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[11px] text-paper">{f.component}</span>
                      {f.where.map((w) => <span key={w} className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[11px] ring-1 ring-ink/15">{whereLabel[w]}</span>)}
                    </p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="font-mono text-[11px] text-ink-soft">Findings come from reviewing the illustrative baseline against usability heuristics and WCAG 2.2 – not from user research.</p>
    </div>
  );
}
