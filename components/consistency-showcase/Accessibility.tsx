"use client";
import { useState } from "react";
import clsx from "clsx";
import { Button, KursionRoot, StatusBadge } from "@/components/kursion";
import { contrastReport, statusContrast, statuses, type StatusId } from "@/lib/consistency/tokens";
import { legacyStatusNames } from "@/lib/consistency/audit";
import { Toggle, stackedTable } from "@/components/ds-showcase/controls";
import { LegacyScope } from "./Before";

const legacyStatusStyle: Record<StatusId, string> = { draft: "lg-st-grey", published: "lg-st-pill-blue", open: "lg-st-orange", completed: "lg-st-green", cancelled: "lg-st-red" };

const POUR = [
  { p: "Perceivable", items: ["Text contrast ≥ 4.5:1, field borders and focus ≥ 3:1 (1.4.3, 1.4.11)", "Status uses text and icon, not colour alone (1.4.1)"] },
  { p: "Operable", items: ["Everything works with the keyboard (2.1.1)", "A visible 2px focus ring on every control (2.4.7)", "Modal traps focus and closes with Esc"] },
  { p: "Understandable", items: ["Persistent labels and instructions (3.3.2)", "Errors say what is wrong and how to fix it (3.3.1, 3.3.3)", "One name per concept across screens (3.2.4)"] },
  { p: "Robust", items: ["Native elements: button, input, select, dialog, table", "aria-sort, aria-invalid, aria-describedby where they add meaning (4.1.2)", "Result counts and confirmations in live regions (4.1.3)"] },
];

const VERIFIED = [
  { t: "Contrast ratios", how: "Calculated from the token values with the WCAG 2.x formula – shown in the table above." , ok: true },
  { t: "Keyboard operation", how: "Checked by hand in Chrome: tab order, filter chips with arrow keys, sortable headers, form errors, modal Esc and focus return.", ok: true },
  { t: "Responsive layout", how: "Checked at 375px and desktop widths; the embedded app adapts with container queries.", ok: true },
  { t: "Screen readers", how: "Not tested with VoiceOver or NVDA yet.", ok: false },
  { t: "Automated audit", how: "No axe or Lighthouse run is part of this prototype yet.", ok: false },
];

export default function Accessibility() {
  const report = contrastReport();
  const badges = statusContrast();
  const [grey, setGrey] = useState(false);
  const fixed = report.filter((r) => !r.beforePass && r.afterPass).length;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
        <h3 className="font-display text-xl font-bold tracking-tight">Contrast: before and after</h3>
        <p className="mt-1 text-sm text-ink-soft">{fixed} of {report.length} pairs moved from failing to passing WCAG AA. Ratios are calculated from the colours that render the two versions.</p>
        <div className="mt-3 overflow-x-auto">
        <table className={clsx("w-full min-w-[620px] text-left text-sm", stackedTable)}>
          <caption className="sr-only">Contrast ratios before and after</caption>
          <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
            <tr className="border-b border-ink/15">
              <th scope="col" className="py-2 font-normal">Element</th>
              <th scope="col" className="font-normal">Before</th>
              <th scope="col" className="font-normal">After</th>
              <th scope="col" className="font-normal">Required</th>
            </tr>
          </thead>
          <tbody>
            {report.map((r) => (
              <tr key={r.id} className="border-b border-ink/10 align-top">
                <th scope="row" className="py-3 pr-3 font-semibold">{r.label}</th>
                <td data-label="Before" className="py-3 pr-3">
                  <span className="flex items-center gap-2">
                    <span className="grid h-7 min-w-[2.75rem] place-items-center rounded-md px-1.5 text-xs font-bold ring-1 ring-ink/10" style={{ background: r.before.bg, color: r.before.fg }} aria-hidden>Aa</span>
                    <span><span className={clsx("font-mono text-[12px]", !r.beforePass && "font-bold text-pink-deep")}>{r.id === "focus" ? "none" : `${r.beforeRatio.toFixed(1)}:1`} {r.beforePass ? "✓" : "✗"}</span><span className="block text-xs text-ink-soft">{r.before.note}</span></span>
                  </span>
                </td>
                <td data-label="After" className="py-3 pr-3">
                  <span className="flex items-center gap-2">
                    <span className="grid h-7 min-w-[2.75rem] place-items-center rounded-md px-1.5 text-xs font-bold ring-1 ring-ink/10" style={{ background: r.after.bg, color: r.after.fg }} aria-hidden>Aa</span>
                    <span><span className="font-mono text-[12px]">{r.afterRatio.toFixed(1)}:1 {r.afterPass ? "✓" : "✗"}</span><span className="block text-xs text-ink-soft">{r.after.note}</span></span>
                  </span>
                </td>
                <td data-label="Required" className="py-3 font-mono text-[12px]">{r.min}:1</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] bg-paper p-5 ring-1 ring-ink/10">
          <p className="font-display text-xl font-bold tracking-tight">Focus indicators</p>
          <p className="mt-1 text-sm text-ink-soft">Click into this panel and press <kbd className="rounded bg-ivory px-1.5 font-mono text-[11px] ring-1 ring-ink/15">Tab</kbd>. The legacy buttons set <code className="font-mono text-[12px]">outline: none</code>.</p>
          <div className="mt-4 grid gap-3">
            <LegacyScope className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-4">
              <span className="w-14 font-mono text-[10px] uppercase text-[#666]">Before</span>
              <button className="lg-btn-save">Save</button>
              <button className="lg-btn-blue">View all</button>
              <button className="lg-btn-go">Go</button>
            </LegacyScope>
            <KursionRoot className="flex flex-wrap items-center gap-2 rounded-2xl p-4">
              <span className="w-14 font-mono text-[10px] uppercase text-ink-soft">After</span>
              <Button>Save</Button>
              <Button variant="secondary">View all</Button>
              <Button variant="secondary" size="sm">Search</Button>
            </KursionRoot>
          </div>
        </div>

        <div className="rounded-[24px] bg-paper p-5 ring-1 ring-ink/10">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-xl font-bold tracking-tight">Status without colour</p>
              <p className="mt-1 text-sm text-ink-soft">About 1 in 12 men has a colour vision deficiency. Turn on greyscale and compare.</p>
            </div>
            <Toggle label="Greyscale" checked={grey} onChange={setGrey} />
          </div>
          <div className={clsx("mt-4 grid gap-3 transition-[filter]", grey && "grayscale")}>
            <LegacyScope className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4">
              <span className="w-14 font-mono text-[10px] uppercase text-[#666]">Before</span>
              {(["open", "published", "completed", "cancelled"] as StatusId[]).map((s) => <span key={s} className={legacyStatusStyle[s]}>{legacyStatusNames.dashboard[s]}</span>)}
            </LegacyScope>
            <KursionRoot className="flex flex-wrap items-center gap-2 rounded-2xl p-4">
              <span className="w-14 font-mono text-[10px] uppercase text-ink-soft">After</span>
              {(["open", "published", "completed", "cancelled"] as StatusId[]).map((s) => <StatusBadge key={s} status={s} />)}
            </KursionRoot>
          </div>
          <p className="mt-3 font-mono text-[11px] text-ink-soft">Badge contrast: {badges.map((b) => `${statuses[b.status].label} ${b.ratio.toFixed(1)}:1`).join(" · ")}</p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="WCAG principles applied">
        {POUR.map((x) => (
          <li key={x.p} className="rounded-[20px] bg-ivory p-5">
            <p className="font-display text-lg font-bold tracking-tight">{x.p}</p>
            <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed">{x.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </li>
        ))}
      </ul>

      <div className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
        <p className="font-display text-xl font-bold tracking-tight">What has been verified – and what hasn’t</p>
        <ul className="mt-3 grid gap-2.5">
          {VERIFIED.map((v) => (
            <li key={v.t} className="grid gap-1 text-sm sm:grid-cols-[12rem_1fr]">
              <span className="font-semibold"><span className={v.ok ? "text-bubblegum" : "text-paper/60"} aria-hidden>{v.ok ? "✓ " : "○ "}</span>{v.t}<span className="sr-only">{v.ok ? " (verified)" : " (not yet verified)"}</span></span>
              <span className="text-paper/75">{v.how}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-paper/60">This prototype follows WCAG 2.2 AA principles; it is not certified as conformant.</p>
      </div>
    </div>
  );
}
