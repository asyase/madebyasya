"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { CheckCircle2, CircleAlert, RotateCcw, TriangleAlert, Wand2 } from "lucide-react";
import { BrandRoot } from "@/components/ds";
import Renderer from "@/components/ds/Renderer";
import { useBrand } from "@/lib/design-system/brand-store";
import { useHref } from "@/lib/paths";
import { brands, getBrand, type BrandId } from "@/lib/design-system/tokens";
import { brokenExample, compose, promptPackage, scenarios, type ScenarioId } from "@/lib/design-system/scenarios";
import { summarize, validate, type UIDefinition } from "@/lib/design-system/validate";
import { BrandSwitcher, Segmented } from "./controls";

const pretty = (d: unknown) => JSON.stringify(d, null, 2);

function parse(text: string): { def?: UIDefinition; error?: string } {
  try {
    return { def: JSON.parse(text) as UIDefinition };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

export default function Composer() {
  const [brand] = useBrand();
  const href = useHref();
  const [scenario, setScenario] = useState<ScenarioId>("registration");
  const [text, setText] = useState(() => pretty(compose("registration", "aster")));
  const [lastValid, setLastValid] = useState<UIDefinition>(() => compose("registration", "aster"));
  const [syncedBrand, setSyncedBrand] = useState<BrandId>("aster");

  // Keep the definition's "brand" field in step with the page-wide brand switcher.
  if (brand !== syncedBrand) {
    setSyncedBrand(brand);
    const { def } = parse(text);
    setText(pretty(def && typeof def === "object" ? { ...def, brand } : compose(scenario, brand)));
  }

  const { def, error: jsonError } = useMemo(() => parse(text), [text]);
  const issues = useMemo(() => (def ? validate(def) : []), [def]);
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  const valid = !!def && !jsonError && errors.length === 0;

  if (valid && def && pretty(def) !== pretty(lastValid)) setLastValid(def);
  const shown = valid && def ? def : lastValid;
  const usage = [...summarize(shown.root).entries()];

  function load(id: ScenarioId) {
    setScenario(id);
    setText(pretty(compose(id, brand)));
  }

  const request = scenarios.find((s) => s.id === scenario)!.request(getBrand(brand).label);
  const pkg = promptPackage(request);

  const steps = [
    { n: "01", label: "Request", state: "done" },
    { n: "02", label: "Context: contracts + tokens", state: "done" },
    { n: "03", label: "Structured output", state: jsonError ? "fail" : "done" },
    { n: "04", label: "Validation", state: jsonError ? "idle" : valid ? "done" : "fail" },
    { n: "05", label: "Render", state: valid ? "done" : "idle" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col gap-3 rounded-[24px] bg-plum p-4 text-paper sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <span className="inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-bubblegum px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink">
          <Wand2 className="h-3.5 w-3.5" aria-hidden /> Deterministic demo
        </span>
        <p className="text-sm text-paper/85">
          No AI model is called. Each scenario loads the structured output a model would be asked to return, and the same validator and renderer an AI integration would use check and display it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 rounded-[24px] bg-ivory p-4 sm:p-5 lg:grid-cols-2">
        <Segmented legend="Scenario" value={scenario} onChange={load} options={scenarios.map((s) => ({ value: s.id, label: s.label }))} />
        <BrandSwitcher size="sm" />
      </div>

      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="Pipeline">
        {steps.map((s) => (
          <li key={s.n} className={clsx("rounded-2xl px-3 py-2.5 ring-1", s.state === "done" ? "bg-paper ring-ink/10" : s.state === "fail" ? "bg-blush ring-pink-deep/40" : "bg-paper/50 ring-ink/5 text-ink-soft")}>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]">
              {s.n}
              {s.state === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-pink-deep" aria-label="passed" />}
              {s.state === "fail" && <CircleAlert className="h-3.5 w-3.5 text-pink-deep" aria-label="failed" />}
            </span>
            <span className="mt-0.5 block text-sm font-semibold leading-tight">{s.label}</span>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {/* Left: request, context and output */}
        <div className="grid grid-cols-1 min-w-0 content-start gap-4">
          <div className="rounded-[24px] bg-paper p-5 ring-1 ring-ink/10">
            <p className="eyebrow text-pink-deep">01 · Request</p>
            <p className="mt-2 font-display text-xl font-bold tracking-tight">“{request}”</p>
            <details className="group mt-4 rounded-2xl bg-ivory p-4">
              <summary className="cursor-pointer text-sm font-semibold marker:text-pink-deep">02 · Context a model would receive ({pkg.system.length.toLocaleString("en")} characters)</summary>
              <pre tabIndex={0} className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap [overflow-wrap:anywhere] font-mono text-[11.5px] leading-relaxed text-ink-soft">{pkg.system}</pre>
              <p className="mt-3 text-xs text-ink-soft">Generated from the same contracts that render the documentation. Full file: <a className="font-semibold text-ink underline underline-offset-2" href={href("/design-system/contracts.json")}>contracts.json</a> · <a className="font-semibold text-ink underline underline-offset-2" href={href("/design-system/tokens.json")}>tokens.json</a></p>
            </details>
          </div>

          <div className="overflow-hidden rounded-[24px] bg-[#1d1926] text-[#ece9f5]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3">
              <label htmlFor="composer-json" className="font-mono text-xs text-white">03 · Structured output (editable JSON)</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setText(pretty(brokenExample(brand)))} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20">
                  <TriangleAlert className="h-3.5 w-3.5" aria-hidden /> Load an invalid output
                </button>
                <button type="button" onClick={() => load(scenario)} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20">
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset
                </button>
              </div>
            </div>
            <textarea
              id="composer-json"
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              aria-describedby="composer-validation"
              className="block h-[320px] w-full resize-y sm:h-[420px] bg-transparent p-5 font-mono text-[12px] leading-[1.65] text-[#ece9f5] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-bubblegum"
            />
          </div>

          <div id="composer-validation" className={clsx("rounded-[24px] p-5 ring-1", valid ? "bg-paper ring-ink/10" : "bg-blush ring-pink-deep/30")} aria-live="polite">
            <p className="eyebrow text-pink-deep">04 · Validation against the contracts</p>
            {jsonError ? (
              <p className="mt-2 font-semibold">The output is not valid JSON: {jsonError}</p>
            ) : valid ? (
              <p className="mt-2 flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5 text-pink-deep" aria-hidden /> Valid – {usage.reduce((a, [, n]) => a + n, 0)} components, all approved, no raw styling.
                {warnings.length > 0 && ` ${warnings.length} warning${warnings.length > 1 ? "s" : ""}.`}
              </p>
            ) : (
              <>
                <p className="mt-2 font-semibold">{errors.length} {errors.length === 1 ? "problem" : "problems"} found – rendering paused, showing the last valid version.</p>
                <ul className="mt-3 grid grid-cols-1 max-h-64 gap-2 overflow-auto">
                  {errors.map((i, k) => (
                    <li key={k} className="rounded-xl bg-paper/80 px-3 py-2 text-sm">
                      <span className="block font-mono text-[11px] text-pink-deep">{i.path}</span>
                      {i.message}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {valid && warnings.length > 0 && (
              <ul className="mt-2 grid grid-cols-1 gap-1 text-sm text-ink-soft">
                {warnings.map((w, k) => <li key={k}>⚠ {w.path}: {w.message}</li>)}
              </ul>
            )}
          </div>
        </div>

        {/* Right: rendered result */}
        <div className="min-w-0">
          <div className="sticky top-40 overflow-hidden rounded-[24px] ring-1 ring-ink/10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 bg-paper px-4 py-2.5">
              <p className="font-mono text-xs text-ink-soft">05 · Rendered with {getBrand(shown.brand)?.label ?? "Brand A"} tokens</p>
              <p className="font-mono text-[11px] text-ink-soft">{usage.map(([c, n]) => `${c}×${n}`).join(" ")}</p>
            </div>
            <div className={clsx("tech-grid bg-[#f4f2f7] p-3 transition-opacity sm:p-6", !valid && "opacity-60")}>
              <BrandRoot brand={brands.some((b) => b.id === shown.brand) ? shown.brand : "aster"} className="grid grid-cols-1 place-items-center rounded-2xl p-4 sm:p-8">
                <Renderer key={`${scenario}-${pretty(shown.root).length}`} root={shown.root} />
              </BrandRoot>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-ink-soft">
        Try editing the JSON: change <code className="rounded bg-ivory px-1 font-mono text-[12px]">&quot;variant&quot;: &quot;primary&quot;</code> to <code className="rounded bg-ivory px-1 font-mono text-[12px]">&quot;danger&quot;</code>, or switch <code className="rounded bg-ivory px-1 font-mono text-[12px]">&quot;brand&quot;</code> to <code className="rounded bg-ivory px-1 font-mono text-[12px]">&quot;mira&quot;</code>.
      </p>
    </div>
  );
}
