"use client";
// Stage 07 – the interactive HTML prototype (built with Claude, not Figma Make).
import { useId, useState } from "react";
import clsx from "clsx";
import { Check, ChevronDown, MousePointerClick } from "lucide-react";
import { breakpoints, figmaVsPrototype, prototypeFacts, prototypeHero, prototypeShots, prototypeTokens, thingsToTry } from "@/lib/content/drafts/prompt-to-product";
import { EvidenceImage, ExploreLinks, More } from "./Evidence";

export default function Prototype() {
  const moreId = useId();
  const [allShots, setAllShots] = useState(false);
  const FIRST = 4;
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="flex flex-col gap-4 rounded-[24px] bg-ink p-5 text-paper sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[62ch]">
          <div className="flex flex-wrap gap-1.5">
            {["HTML · CSS · JavaScript", "Built with Claude", "Not Figma Make", "Fictional data"].map((t) => <span key={t} className="rounded-full border border-paper/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]">{t}</span>)}
          </div>
          <ul className="mt-3 grid gap-1 text-sm text-paper/80">{prototypeFacts.map((f) => <li key={f}>– {f}</li>)}</ul>
        </div>
        <ExploreLinks dark className="lg:shrink-0" />
      </div>

      <EvidenceImage shot={prototypeHero} tall />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] bg-ivory p-5 sm:p-6">
          <h3 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight"><MousePointerClick className="h-5 w-5 text-pink-deep" aria-hidden />Things to try</h3>
          <ol className="mt-3 grid gap-2 text-[15px]">{thingsToTry.map((t, i) => <li key={t} className="flex gap-2"><span className="w-5 shrink-0 font-mono text-xs leading-6 text-pink-deep">{i + 1}</span>{t}</li>)}</ol>
        </div>
        <div className="rounded-[24px] bg-paper p-5 ring-1 ring-ink/10 sm:p-6">
          <h3 className="font-display text-xl font-bold tracking-tight">Responsive layouts</h3>
          <dl className="mt-3 grid gap-2 text-sm">
            {breakpoints.map((b) => <div key={b.range} className="grid grid-cols-[7.5rem_1fr] gap-2 border-b border-ink/10 pb-2 last:border-0"><dt className="font-mono font-semibold">{b.range}</dt><dd className="text-ink-soft">{b.layout}</dd></div>)}
          </dl>
        </div>
      </div>

      {/* Phones: one screenshot per row, the first four shown; the rest behind a button. From 768px: all, in a grid. */}
      <div className="grid gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {prototypeShots.slice(0, FIRST).map((s) => <EvidenceImage key={s.src} shot={s} thumb />)}
        </div>
        <div id={moreId} className={clsx("grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", !allShots && "max-md:hidden")}>
          {prototypeShots.slice(FIRST).map((s) => <EvidenceImage key={s.src} shot={s} thumb />)}
        </div>
        <button
          type="button"
          aria-expanded={allShots}
          aria-controls={moreId}
          onClick={() => setAllShots(!allShots)}
          className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-ink/15 px-4 text-sm font-semibold hover:border-ink/40 md:hidden"
        >
          <ChevronDown className={clsx("h-4 w-4 transition-transform", allShots && "rotate-180")} aria-hidden />
          {allShots ? "Show fewer screenshots" : `Show all ${prototypeShots.length} screenshots`}
        </button>
      </div>

      <More title="How the prototype uses the design system">
        <ul className="grid gap-2 text-[15px]">{prototypeTokens.map((t) => <li key={t} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-lav-deep" aria-hidden /><span className="break-words">{t}</span></li>)}</ul>
        <p className="mt-3 text-sm text-ink-soft">The CSS mirrors the names and values of the Figma variables, but nothing is synced: a change in Figma does not reach the prototype automatically.</p>
      </More>
      <More title={`Documented differences between Figma and the prototype (${figmaVsPrototype.length})`}>
        <ol className="grid gap-2 text-[15px]">{figmaVsPrototype.map((t, i) => <li key={t} className="flex gap-2"><span className="w-5 shrink-0 font-mono text-xs leading-6 text-pink-deep">{i + 1}</span>{t}</li>)}</ol>
      </More>
    </div>
  );
}
