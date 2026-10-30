"use client";
import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { findings } from "@/lib/consistency/audit";
import { Segmented, Toggle } from "@/components/ds-showcase/controls";
import { BeforeDashboard, BeforeForm, BeforeList } from "./Before";
import { AfterDashboard, AfterForm, AfterList } from "./After";
import { AnnotationContext } from "./Marker";
import { notes, scenarios, type ScenarioId } from "./annotations";

type View = "before" | "after" | "split";

const screens = {
  dashboard: { before: BeforeDashboard, after: AfterDashboard },
  form: { before: BeforeForm, after: AfterForm },
  list: { before: BeforeList, after: AfterList },
};

function Frame({ tone, children }: { tone: "before" | "after"; children: React.ReactNode }) {
  return (
    <section aria-label={tone === "before" ? "Before – fragmented interface (illustrative baseline)" : "After – unified design system"} className="min-w-0 overflow-hidden rounded-[20px] bg-paper ring-1 ring-ink/10">
      <div className="flex items-center justify-between gap-2 border-b border-ink/10 px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em]">
          <span className={clsx("h-2 w-2 rounded-full", tone === "before" ? "bg-pink-deep" : "bg-lav-deep")} aria-hidden />
          {tone === "before" ? "Before · fragmented UI" : "After · Kursion UI"}
        </span>
        <span className="flex gap-1" aria-hidden><i className="h-2 w-2 rounded-full bg-ink/15" /><i className="h-2 w-2 rounded-full bg-ink/15" /><i className="h-2 w-2 rounded-full bg-ink/15" /></span>
      </div>
      <div className="max-h-[720px] min-h-[520px] overflow-auto [&>*]:min-h-[520px]">{children}</div>
    </section>
  );
}

function Notes({ scenario, tone }: { scenario: ScenarioId; tone: "before" | "after" }) {
  const list = tone === "before" ? notes[scenario].before : notes[scenario].after;
  return (
    <ol className="grid gap-2.5" aria-label={tone === "before" ? "Issues in the Before version" : "Why the After version works better"}>
      {list.map((n, i) => {
        const f = "finding" in n ? findings.find((x) => x.id === n.finding) : undefined;
        return (
          <li key={i} className="flex gap-3 rounded-2xl bg-paper p-3.5 ring-1 ring-ink/10">
            <span className={clsx("grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold text-white", tone === "before" ? "bg-pink-deep" : "bg-lav-deep")} aria-hidden>{i + 1}</span>
            <div className="min-w-0 text-sm">
              <p className="font-semibold leading-snug">{n.title}</p>
              {"why" in n ? <p className="mt-1 leading-relaxed text-ink-soft">{n.why}</p> : f && <p className="mt-1 text-ink-soft"><span className="font-mono text-[11px] text-pink-deep">{f.id}</span> · {f.severity === "high" ? "High" : "Medium"} severity{f.wcag ? ` · WCAG ${f.wcag}` : ""}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function BeforeAfter() {
  const [scenario, setScenario] = useState<ScenarioId>("dashboard");
  const [view, setView] = useState<View>("after");
  const [annotate, setAnnotate] = useState(true);
  const S = screens[scenario];
  const sc = scenarios.find((s) => s.id === scenario)!;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid gap-4 rounded-[24px] bg-ivory p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <Segmented legend="Scenario" value={scenario} onChange={setScenario} options={scenarios.map((s) => ({ value: s.id, label: s.label }))} />
        <div className="flex flex-wrap items-end gap-4">
          <Segmented
            legend="Version"
            value={view}
            onChange={setView}
            options={[
              { value: "before", label: "Before" },
              { value: "after", label: "After" },
              { value: "split", label: "Side by side" },
            ]}
          />
          <div className="pb-1.5"><Toggle label="Annotations" checked={annotate} onChange={setAnnotate} /></div>
        </div>
      </div>

      <p className="text-sm text-ink-soft" aria-live="polite">
        <span className="font-semibold text-ink">{sc.title}</span> · {view === "split" ? "both versions, same data" : view === "before" ? "illustrative baseline with typical inconsistencies" : "rebuilt with shared components and semantic tokens"}. Both versions are interactive.
      </p>

      {view === "split" ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AnnotationContext.Provider value={{ show: annotate, tone: "before" }}><Frame tone="before"><S.before /></Frame></AnnotationContext.Provider>
          <AnnotationContext.Provider value={{ show: annotate, tone: "after" }}><Frame tone="after"><S.after /></Frame></AnnotationContext.Provider>
        </div>
      ) : (
        <div className={clsx("grid grid-cols-1 gap-4", annotate && "xl:grid-cols-[minmax(0,1fr)_320px]")}>
          {/* Swap immediately and fade in: content never waits for an exit animation. */}
          <motion.div key={`${scenario}-${view}`} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="min-w-0">
              <AnnotationContext.Provider value={{ show: annotate, tone: view === "before" ? "before" : "after" }}>
                <Frame tone={view === "before" ? "before" : "after"}>{view === "before" ? <S.before /> : <S.after />}</Frame>
              </AnnotationContext.Provider>
          </motion.div>
          {annotate && <Notes scenario={scenario} tone={view === "before" ? "before" : "after"} />}
        </div>
      )}

      {view === "split" && annotate && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Notes scenario={scenario} tone="before" />
          <Notes scenario={scenario} tone="after" />
        </div>
      )}
      <p className="font-mono text-[11px] text-ink-soft">The Before screens are an illustrative baseline created for this case study. They intentionally contain the accessibility issues listed in the audit.</p>
    </div>
  );
}
