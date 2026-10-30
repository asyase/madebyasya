"use client";
// Sections of the "From Prompt to Product" draft (approved 11-section plan). Content: lib/content/drafts/prompt-to-product.ts
import clsx from "clsx";
import { ArrowRight, Bot, Check, CircleAlert, CircleDashed, PenTool, Sparkles } from "lucide-react";
import { Swatch, stackedTable } from "@/components/ds-showcase/controls";
import {
  aiCouldntDecide, asyaContribution, beforeAfter, brandNote, briefTokens, checks, claudeContribution, componentShots, components, conditionalApproval,
  constraints, contrast, decisions, designedIn, keyDecisionNumbers, experiment, genStages, journey, lessons, limitations, mainLesson, modeNote, notDone, outcome,
  refinedFrames, refinements, roles, trainingCardTradeOff, uxProblems, variableLayers, variableShots, whyRefinement, whyStage03,
} from "@/lib/content/drafts/prompt-to-product";
import { EvidenceImage, ExploreLinks, More, PromptBlock, SourceTag } from "./Evidence";

const card = "rounded-[24px] bg-paper p-5 ring-1 ring-ink/10 sm:p-6";
const h3 = "font-display text-xl font-bold tracking-tight";

/* ------------------------------------------------------------------ 1 · overview */

export function Overview() {
  const [stage01] = genStages;
  const refined = beforeAfter[0].after;
  return (
    <div className="grid grid-cols-1 gap-4">
      <p className="max-w-[68ch] text-lg leading-relaxed">How far does AI-generated UI get, and where is design judgement still needed? I gave Figma AI the same screen three times with increasing guidance, then evaluated the results and led the refinement into a component library, design variables and an interactive prototype.</p>
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="The experiment">
        {[["Screen", experiment.screen], ["User", experiment.user], ["Layouts", experiment.platform], ["Product", experiment.product]].map(([k, v]) => (
          <div key={k} className="rounded-[20px] bg-ivory p-4"><dt className="eyebrow text-ink-soft">{k}</dt><dd className="mt-1 font-display text-lg font-bold leading-tight tracking-tight">{v}</dd></div>
        ))}
      </dl>
      <nav aria-label="Seven stages" className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
        <p className="font-display text-xl font-bold tracking-tight">Seven stages</p>
        <ol className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-7">
          {journey.map((j) => (
            <li key={j.n} className="min-w-0">
              <a href={`#${j.anchor}`} className="flex h-full flex-col rounded-2xl bg-paper/10 p-3.5 transition-colors hover:bg-paper/20">
                <span className="font-mono text-[11px] text-bubblegum">{j.n}</span>
                <span className="mt-0.5 font-display text-[16px] font-bold leading-tight">{j.title}</span>
                <span className="mt-1.5 text-xs text-paper/70">{j.who}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {([["Start · Stage 01", stage01.shot], ["Result · Stage 04, Refined 1", refined]] as const).map(([k, s]) => (
          <div key={k} className="grid min-w-0 content-start gap-2">
            <p className="font-mono text-xs text-pink-deep">{k}</p>
            <EvidenceImage shot={s} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 2 · roles */

export function Roles() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-[20px] bg-ink p-5 text-paper sm:p-6">
        <p className="font-display text-xl font-bold leading-snug tracking-tight">I led the design process; AI supported the execution.</p>
        <p className="mt-2 max-w-[75ch] leading-relaxed text-paper/80">I defined the experiment, wrote the three prompts, evaluated the outputs, selected Stage 03, identified seven UX problems, made eight documented design decisions and directed the refinement. Figma AI generated the first three screens. Claude proposed solutions and implemented the approved changes, the component library, the variables and the prototype; I reviewed the results at each step.</p>
      </div>
      <div className={clsx(card, "min-w-0")}>
        <div className="overflow-x-auto">
          <table className={clsx("w-full min-w-[760px] text-left text-sm", stackedTable)}>
            <caption className="sr-only">My work, Figma AI and Claude at each stage</caption>
            <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              <tr className="border-b border-ink/15">
                <th scope="col" className="w-[16%] py-2 pr-3 font-normal">Stage</th>
                <th scope="col" className="py-2 pr-3 font-normal"><span className="inline-flex items-center gap-1.5"><PenTool className="h-3.5 w-3.5 text-pink-deep" aria-hidden />My work</span></th>
                <th scope="col" className="py-2 pr-3 font-normal"><span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-lav-deep" aria-hidden />Figma AI</span></th>
                <th scope="col" className="py-2 font-normal"><span className="inline-flex items-center gap-1.5"><Bot className="h-3.5 w-3.5 text-lav-deep" aria-hidden />Claude</span></th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.stage} className="border-b border-ink/10 align-top last:border-0">
                  <th scope="row" className="py-3 pr-3 font-semibold">{r.stage}</th>
                  <td data-label="My work" className="py-3 pr-3">{r.asya}</td>
                  <td data-label="Figma AI" className="py-3 pr-3 text-ink-soft">{r.figmaAi}</td>
                  <td data-label="Claude" className="py-3 text-ink-soft">{r.claude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 3 · Stages 01–03 */

export function Generations() {
  return (
    <div className="grid grid-cols-1 gap-8">
      {genStages.map((st) => (
        <article key={st.n} className="grid grid-cols-1 gap-4" aria-labelledby={`gen-${st.n}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 id={`gen-${st.n}`} className={h3}><span className="font-mono text-base text-pink-deep">Stage {st.n} — </span>{st.label}</h3>
            <SourceTag source="figma-ai" />
          </div>
          {st.purpose && <p className="max-w-[70ch] text-ink-soft"><span className="eyebrow mr-2">Purpose</span>{st.purpose}</p>}
          <PromptBlock id={`prompt-${st.n}`} text={st.prompt} />
          <EvidenceImage shot={st.shot} />
          {st.extra && <EvidenceImage shot={st.extra} className="lg:w-2/3" />}
          <div className="rounded-[20px] bg-ivory p-4 sm:p-5">
            <p className="eyebrow text-ink-soft">My assessment</p>
            <p className="mt-1 text-[17px] leading-relaxed">{st.result}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{st.detail}</p>
          </div>
        </article>
      ))}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {genStages.map((st) => (
          <div key={st.n} className="grid min-w-0 content-start gap-2">
            <p className="font-mono text-xs text-pink-deep">{st.n} · {st.label}</p>
            <EvidenceImage shot={st.shot} thumb hideCaption />
            <p className="text-sm text-ink-soft">{st.result}</p>
          </div>
        ))}
      </div>
      <div className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
        <p className="font-display text-xl font-bold tracking-tight">Why I selected Stage 03</p>
        <p className="mt-2 max-w-[70ch] leading-relaxed text-paper/85">{whyStage03}</p>
      </div>
      <p className="text-xs text-ink-soft">{brandNote}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ 4 · Stage 04 */

export function Refinement() {
  const keyDecisions = decisions.filter((d) => keyDecisionNumbers.includes(d.n));
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">My UX decisions</h3>
          <p className="font-mono text-xs text-ink-soft">8 documented decisions · 4 Accept · 4 Modify · 0 Reject</p>
        </div>
        <p className="max-w-[70ch] text-sm text-ink-soft">Three key decisions whose effect is visible in the before/after screens below. My reasoning is quoted from my design review record.</p>
        <ol className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {keyDecisions.map((d) => (
            <li key={d.n} className="grid content-start gap-3 rounded-[24px] bg-paper p-5 ring-2 ring-ink/80">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display text-xl font-bold leading-tight tracking-tight"><span className="font-mono text-sm text-pink-deep">{String(d.n).padStart(2, "0")} </span>{d.topic}</p>
                <DecisionChip d={d.decision} />
              </div>
              <p className="border-l-2 border-pink-deep pl-3 text-[15px] italic leading-relaxed">“{d.reasoning}”</p>
              <div className="rounded-2xl bg-ivory p-3">
                <p className="eyebrow text-ink-soft">Effect on the final interface</p>
                <p className="mt-1 text-sm font-semibold">{d.implementation}</p>
              </div>
              <p className="text-xs text-ink-soft"><span className="font-semibold">AI proposal (Claude): </span>{d.proposal}</p>
            </li>
          ))}
        </ol>
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="All eight decisions">
          {decisions.map((d) => (
            <li key={d.n} className="flex items-start justify-between gap-2 rounded-2xl bg-paper p-3.5 ring-1 ring-ink/10">
              <span><span className="font-mono text-xs text-pink-deep">{String(d.n).padStart(2, "0")}</span> <span className="font-semibold">{d.topic}</span></span>
              <DecisionChip d={d.decision} />
            </li>
          ))}
        </ol>
        <More title="Full decision table: problem, AI proposal, my decision and reasoning, final implementation">
          <p className="mb-3 text-sm text-ink-soft">The reasoning is quoted from my design review record. The AI proposal is Claude’s original suggestion, kept for transparency.</p>
          <ol className="grid gap-3">
            {decisions.map((d) => (
              <li key={d.n} className="rounded-2xl bg-paper p-4 ring-1 ring-ink/10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-lg font-bold tracking-tight"><span className="font-mono text-sm text-pink-deep">{String(d.n).padStart(2, "0")} </span>{d.topic}</p>
                  <DecisionChip d={d.decision} />
                </div>
                <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                  <div><dt className="eyebrow text-ink-soft">Original UX problem</dt><dd className="mt-0.5">{d.problem}</dd></div>
                  <div><dt className="eyebrow text-ink-soft">AI-proposed solution (Claude)</dt><dd className="mt-0.5 text-ink-soft">{d.proposal}</dd></div>
                  <div className="md:col-span-2"><dt className="eyebrow text-ink-soft">My decision and reasoning</dt><dd className="mt-0.5 border-l-2 border-pink-deep pl-3 italic">“{d.reasoning}”</dd></div>
                  <div className="md:col-span-2"><dt className="eyebrow text-ink-soft">Final implementation</dt><dd className="mt-0.5 font-semibold">{d.implementation}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
        </More>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={card}>
          <h3 className={h3}>Why Human Refinement was necessary</h3>
          <ul className="mt-3 grid gap-1.5 text-[15px]">
            {whyRefinement.map((t) => <li key={t} className="flex gap-2"><CircleAlert className="mt-1 h-4 w-4 shrink-0 text-pink-deep" aria-hidden />{t}</li>)}
          </ul>
          <p className="mt-4 rounded-2xl bg-blush/60 p-4 text-[15px] leading-relaxed">Main lesson: <b>{mainLesson}</b>.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
            <p className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"><PenTool className="h-5 w-5 text-bubblegum" aria-hidden />My role – evaluation and decisions</p>
            <ol className="mt-3 grid gap-1.5 text-[15px]">
              {asyaContribution.map((t, i) => <li key={t} className="flex gap-2"><span className="w-5 shrink-0 font-mono text-xs leading-6 text-bubblegum">{i + 1}</span>{t}</li>)}
            </ol>
          </div>
          <div className="rounded-[24px] bg-ivory p-5 sm:p-6">
            <p className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"><Bot className="h-5 w-5 text-lav-deep" aria-hidden />AI-assisted implementation</p>
            <ul className="mt-3 grid gap-1.5 text-[15px]">
              {claudeContribution.map((t) => <li key={t} className="flex gap-2"><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-lav-deep" aria-hidden />{t}</li>)}
            </ul>
            <p className="mt-3 text-xs text-ink-soft">Claude implemented the approved changes in Figma through the Plugin API; I reviewed each result and requested five further refinements.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
        <div className={card}>
          <h3 className={h3}>Seven UX problems I identified in Stage 03</h3>
          <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {uxProblems.map((p, i) => <li key={p} className="flex gap-2 rounded-xl bg-ivory p-3 text-[15px]"><span className="font-mono text-xs leading-6 text-pink-deep">{String(i + 1).padStart(2, "0")}</span>{p}</li>)}
          </ol>
        </div>
        <div className={card}>
          <h3 className={h3}>My constraints</h3>
          <ul className="mt-3 grid gap-2 text-[15px]">{constraints.map((c) => <li key={c} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-lav-deep" aria-hidden />{c}</li>)}</ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <h3 className={h3}>Before and after</h3>
        {beforeAfter.map((p) => (
          <div key={p.title} className="grid grid-cols-1 gap-3">
            <p className="text-[15px]"><b>{p.title}.</b> <span className="text-ink-soft">{p.note}</span></p>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {([["Before", p.before], ["After", p.after]] as const).map(([k, s]) => (
                <div key={k} className="grid min-w-0 content-start gap-2">
                  <p className="font-mono text-xs text-pink-deep">{k}</p>
                  <EvidenceImage shot={s} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="eyebrow mb-2 text-ink-soft">More refined frames</p>
          {/* One frame per row on phones, two from 768px: detailed Figma frames are never shown as a row of tiny thumbnails. */}
          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {refinedFrames.map((s) => <EvidenceImage key={s.src} shot={s} tall={/mobile-390|tablet-768/.test(s.src)} />)}
          </div>
        </div>
      </div>

      <div className={card}>
        <h3 className={h3}>Conditional approval → five refinements</h3>
        <p className="mt-1 text-sm text-ink-soft">{conditionalApproval}</p>
        <ol className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-5">
          {refinements.map((r, i) => (
            <li key={r.title} className="rounded-2xl bg-ivory p-3.5">
              <p className="font-mono text-xs text-pink-deep">{i + 1}</p>
              <p className="font-semibold leading-tight">{r.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{r.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function DecisionChip({ d }: { d: "Accept" | "Modify" }) {
  return (
    <span className={clsx("inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]", d === "Accept" ? "bg-ink text-paper" : "bg-bubblegum text-ink")}>
      {d === "Accept" ? <Check className="h-3 w-3" aria-hidden /> : <PenTool className="h-3 w-3" aria-hidden />}{d}
    </span>
  );
}

/* ------------------------------------------------------------------ 5 · components */

export function Components() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <dl className="grid grid-cols-3 gap-3">
        {[["11", "UI components"], ["52", "variants"], ["21", "icon components"]].map(([v, l]) => (
          <div key={l} className="rounded-[20px] bg-ivory p-4"><dt className="sr-only">{l}</dt><dd><span className="block font-display text-3xl font-bold tracking-tight">{v}</span><span className="text-sm text-ink-soft">{l}</span></dd></div>
        ))}
      </dl>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <EvidenceImage shot={componentShots[0]} />
        <div className="grid content-start gap-4">
          <EvidenceImage shot={componentShots[1]} />
          <div className="rounded-[24px] bg-blush/60 p-5">
            <p className="font-display text-lg font-bold tracking-tight">Trade-off: TrainingCard without text properties</p>
            <p className="mt-2 text-sm leading-relaxed">{trainingCardTradeOff.why} {trainingCardTradeOff.decision}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft"><b className="text-ink">Cost:</b> {trainingCardTradeOff.cost}</p>
          </div>
        </div>
      </div>
      <More title="Component inventory">
        <div className="overflow-x-auto">
          <table className={clsx("w-full min-w-[560px] text-left text-sm", stackedTable)}>
            <caption className="sr-only">Figma components and their variants</caption>
            <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              <tr className="border-b border-ink/15"><th scope="col" className="py-2 pr-3 font-normal">Component</th><th scope="col" className="py-2 pr-3 font-normal">Variants</th><th scope="col" className="py-2 font-normal">States and properties</th></tr>
            </thead>
            <tbody>
              {components.map((c) => (
                <tr key={c.name} className="border-b border-ink/10 align-top last:border-0">
                  <th scope="row" className="py-2 pr-3 font-mono text-[12.5px] font-semibold">{c.name}</th>
                  <td data-label="Variants" className="py-2 pr-3">{c.variants}</td>
                  <td data-label="States and properties" className="py-2 text-ink-soft">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">All components use Auto Layout and are bound to the Stage 06 variables. They live only in the Figma file (Free plan: local, not a published team library) and are not React components.</p>
      </More>
    </div>
  );
}

/* ------------------------------------------------------------------ 6 · variables */

export function Variables() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Variable layers">
        {variableLayers.map((l, i) => (
          <li key={l.name} className="relative rounded-[20px] bg-paper p-4 ring-1 ring-ink/10">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-pink-deep">{i + 1} · {l.name}{l.count !== null && ` · ${l.count}`}</p>
            <p className="mt-1.5 flex items-center gap-2 break-words font-mono text-[12.5px] font-semibold">{i === 0 && <Swatch value="#2245B8" />}{l.example}</p>
            <p className="font-mono text-[11.5px] text-ink-soft">{l.value}</p>
            <p className="mt-1 text-xs text-ink-soft">{l.note}</p>
          </li>
        ))}
      </ol>
      <p className="font-mono text-xs text-ink-soft">38 + 51 + 60 = 149 variables · 1 mode per collection</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <EvidenceImage shot={variableShots.overview} tall />
        <div className="grid content-start gap-4">
          <div className={card}>
            <h3 className="font-display text-lg font-bold tracking-tight">Brief values → primitives</h3>
            <ul className="mt-2 grid gap-1.5 text-sm">
              {briefTokens.map((t) => (
                <li key={t.hex} className="flex items-center justify-between gap-2 border-b border-ink/10 pb-1.5 last:border-0">
                  <span className="flex items-center gap-2"><Swatch value={t.hex} />{t.brief}</span>
                  <span className="font-mono text-[11.5px] text-ink-soft">{t.hex} → {t.primitive}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <h3 className="font-display text-lg font-bold tracking-tight">Contrast (WCAG formula)</h3>
            <ul className="mt-2 grid gap-1.5 text-sm">
              {contrast.map((c) => (
                <li key={c.pair} className="grid grid-cols-[1fr_auto] gap-x-2 border-b border-ink/10 pb-1.5 last:border-0">
                  <span>{c.pair}</span><b className="font-mono text-[12px]">{c.ratio}</b>
                  {c.note && <span className="col-span-2 text-xs text-ink-soft">{c.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
        <p className="font-display text-lg font-bold tracking-tight">A second brand: code, not Figma</p>
        <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-paper/80">{modeNote} Components reference only semantic tokens, so a second brand changes 7 semantic aliases while components and screens stay the same.</p>
        <EvidenceImage shot={variableShots.code} className="mt-4 text-ink lg:w-2/3" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 8 · testing */

export function Testing() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
          <p className="font-display text-5xl font-bold tracking-tight">{checks.passed}<span className="text-paper/50">/{checks.total}</span></p>
          <p className="mt-1 font-semibold">automated checks passed</p>
          <p className="mt-2 text-sm text-paper/75">Including {checks.axe} axe-core scans. Run by Claude on {checks.date} against the prototype file tested (SHA-256 {checks.fileHash}…).</p>
          <p className="mt-3 font-mono text-[11px] text-paper/60">{checks.runner}</p>
        </div>
        <div className={card}>
          <h3 className={h3}>What the checks cover</h3>
          <ul className="mt-3 grid gap-1.5 text-sm">
            {checks.groups.map((g) => (
              <li key={g.label} className="grid grid-cols-[1fr_auto] gap-3 border-b border-ink/10 pb-1.5 last:border-0"><span>{g.label}</span><b className="font-mono">{g.n}</b></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-[24px] bg-ivory p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold tracking-tight">Designed in</h3>
          <ul className="mt-2 grid gap-1.5 text-[15px]">{designedIn.map((t) => <li key={t} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-lav-deep" aria-hidden />{t}</li>)}</ul>
        </div>
        <div className="rounded-[24px] border-2 border-dashed border-pink-deep/40 p-5 sm:p-6">
          <h3 className="font-display text-lg font-bold tracking-tight">Not done</h3>
          <ul className="mt-2 grid gap-1.5 text-[15px]">{notDone.map((t) => <li key={t} className="flex gap-2"><CircleDashed className="mt-1 h-4 w-4 shrink-0 text-pink-deep" aria-hidden />{t}</li>)}</ul>
          <p className="mt-3 text-sm text-ink-soft">These results are automated checks only. They are not user testing and not a full accessibility audit.</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 9 · What AI couldn't decide */

export function AiCouldntDecide() {
  return (
    <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {aiCouldntDecide.map((d, i) => (
        <li key={d.title} className={clsx(card, "grid content-start gap-3")}>
          <p className="font-display text-lg font-bold tracking-tight"><span className="font-mono text-sm text-pink-deep">{String(i + 1).padStart(2, "0")} </span>{d.title}</p>
          <p className="flex gap-2 text-sm text-ink-soft"><Bot className="mt-0.5 h-4 w-4 shrink-0 text-lav-deep" aria-hidden /><span><span className="sr-only">AI: </span>{d.ai}</span></p>
          <p className="flex gap-2 text-[15px]"><PenTool className="mt-0.5 h-4 w-4 shrink-0 text-pink-deep" aria-hidden /><span><span className="sr-only">My decision: </span>{d.asya}</span></p>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ 10 · limitations and lessons */

export function Lessons() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
      <div className="grid gap-4">
        {lessons.map((l, i) => <p key={i} className={clsx("leading-relaxed", i === 0 || i === lessons.length - 1 ? "font-display text-xl font-semibold tracking-tight" : "text-[17px]")}>{l}</p>)}
      </div>
      <div className="rounded-[24px] bg-ivory p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold tracking-tight">Limitations</h3>
        <ul className="mt-2 grid gap-2 text-[15px]">{limitations.map((t) => <li key={t} className="flex gap-2"><CircleAlert className="mt-1 h-4 w-4 shrink-0 text-pink-deep" aria-hidden />{t}</li>)}</ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ 11 · outcome */

export function Outcome() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {outcome.map((o) => (
          <div key={o.label} className="rounded-[20px] bg-ink p-4 text-paper"><dt className="sr-only">{o.label}</dt><dd><span className="block font-display text-4xl font-bold tracking-tight text-bubblegum">{o.value}</span><span className="text-sm text-paper/80">{o.label}</span></dd></div>
        ))}
      </dl>
      <p className="max-w-[70ch] text-ink-soft">A generic AI screen became a refined, tokenised and interactive design through my evaluation and decisions, implemented with AI assistance. All data and product rules are fictional; no user testing has been done.</p>
      <div className="flex flex-col gap-4 rounded-[24px] bg-ivory p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">Next steps</p>
          <ul className="mt-1 grid gap-1 text-sm text-ink-soft">
            <li>– Test the flows with training managers</li>
            <li>– Manual screen-reader and real-device testing</li>
            <li>– Validate the product rules, such as the needs-attention threshold</li>
          </ul>
        </div>
        <ExploreLinks className="xl:shrink-0" />
      </div>
    </div>
  );
}
