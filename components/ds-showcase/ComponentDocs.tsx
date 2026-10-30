"use client";
import { useState } from "react";
import clsx from "clsx";
import { useBrand } from "@/lib/design-system/brand-store";
import { contracts } from "@/lib/design-system/contracts";
import { getBrand, resolve, runContrast } from "@/lib/design-system/tokens";
import { BrandSwitcher, Segmented, Swatch, stackedTable } from "./controls";

function List({ items, mark, tone }: { items: string[]; mark: string; tone?: "do" | "dont" }) {
  return (
    <ul className="grid grid-cols-1 gap-1.5">
      {items.map((t) => (
        <li key={t} className="flex gap-2 text-[15px] leading-relaxed">
          <span aria-hidden className={clsx("font-mono", tone === "dont" ? "text-pink-deep" : "text-lav-deep")}>{mark}</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/10 pt-4">
      <h4 className="eyebrow mb-3 text-ink-soft">{title}</h4>
      {children}
    </div>
  );
}

/** Documentation rendered from the component contracts – the same data an AI tool receives. */
export default function ComponentDocs() {
  const [brand] = useBrand();
  const [name, setName] = useState("Button");
  const c = contracts[name];
  const report = runContrast(brand);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 rounded-[24px] bg-ivory p-4 sm:p-5 lg:grid-cols-[1fr_auto]">
        <Segmented legend="Component" size="sm" value={name} onChange={setName} options={Object.keys(contracts).map((k) => ({ value: k, label: k }))} />
        <BrandSwitcher size="sm" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <article className="grid grid-cols-1 min-w-0 gap-5 rounded-[24px] bg-paper p-5 ring-1 ring-ink/10 sm:p-7" aria-labelledby="doc-title">
          <header>
            <p className="eyebrow text-pink-deep">{c.category}</p>
            <h3 id="doc-title" className="mt-1 font-display text-3xl font-bold tracking-tight">{c.name}</h3>
            <p className="mt-2 max-w-[60ch] text-lg text-ink-soft">{c.purpose}</p>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Block title="When to use"><List items={c.whenToUse} mark="+" /></Block>
            <Block title="When not to use"><List items={c.whenNotToUse} mark="–" tone="dont" /></Block>
          </div>

          <Block title="Properties">
            <div className="overflow-x-auto">
              <table className={clsx("w-full min-w-[520px] text-left text-sm", stackedTable)}>
                <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                  <tr className="border-b border-ink/15"><th scope="col" className="py-2 font-normal">Prop</th><th scope="col" className="font-normal">Values</th><th scope="col" className="font-normal">Default</th><th scope="col" className="font-normal">Notes</th></tr>
                </thead>
                <tbody>
                  {Object.entries(c.props).map(([k, p]) => (
                    <tr key={k} className="border-b border-ink/10 align-top">
                      <th scope="row" className="py-2 pr-3 font-mono text-[12px] font-semibold">{k}{"required" in p && p.required && <span className="text-pink-deep" title="required"> *</span>}</th>
                      <td data-label="Values" className="py-2 pr-3 font-mono text-[12px]">{"values" in p ? p.values.join(" | ") : p.type}</td>
                      <td data-label="Default" className="py-2 pr-3 font-mono text-[12px]">{"default" in p && p.default !== undefined ? String(p.default) : "–"}</td>
                      <td data-label="Notes" className="py-2 text-[13px] text-ink-soft">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Block title="Interaction states">
              <ul className="flex flex-wrap gap-1.5">{c.states.map((s) => <li key={s} className="rounded-full bg-peri/60 px-2.5 py-1 font-mono text-[11px]">{s}</li>)}</ul>
            </Block>
            <Block title="Keyboard">
              {c.accessibility.keyboard.length ? (
                <dl className="grid grid-cols-1 gap-1.5 text-sm">
                  {c.accessibility.keyboard.map((k) => (
                    <div key={k.keys} className="flex gap-3"><dt><kbd className="rounded-md bg-ivory px-1.5 py-0.5 font-mono text-[11px] ring-1 ring-ink/15">{k.keys}</kbd></dt><dd className="text-ink-soft">{k.action}</dd></div>
                  ))}
                </dl>
              ) : <p className="text-sm text-ink-soft">Not interactive – no keyboard behaviour.</p>}
            </Block>
          </div>

          <Block title={`Accessibility · ${c.accessibility.element}`}><List items={c.accessibility.requirements} mark="◆" /></Block>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Block title="Recommended"><List items={c.usage.do} mark="✓" /></Block>
            <Block title="Discouraged"><List items={c.usage.dont} mark="✗" tone="dont" /></Block>
          </div>

          <Block title="Composition rules">
            <p className="mb-2 text-sm text-ink-soft">
              {c.composition.children === "none" ? "No children." : <>Children: <span className="font-mono text-[12px]">{c.composition.children.join(", ")}</span></>}
              {c.composition.parents && <> · Parents: <span className="font-mono text-[12px]">{c.composition.parents.join(", ")}</span></>}
            </p>
            {c.composition.rules.length > 0 && <List items={c.composition.rules} mark="→" />}
          </Block>

          {c.tokens.length > 0 && (
            <Block title={`Component tokens · ${getBrand(brand).name}`}>
              <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {c.tokens.map((t) => {
                  const v = resolve(t, brand);
                  return <li key={t} className="flex items-center gap-2 font-mono text-[12px]"><Swatch value={v} /><span className="truncate">{t}</span><span className="ml-auto text-ink-soft">{v.length > 12 ? "" : v}</span></li>;
                })}
              </ul>
            </Block>
          )}
        </article>

        <aside className="grid grid-cols-1 content-start gap-4" aria-labelledby="contrast-title">
          <div className="rounded-[24px] bg-ink p-5 text-paper">
            <h3 id="contrast-title" className="font-display text-lg font-bold tracking-tight">Contrast report</h3>
            <p className="mt-1 text-sm text-paper/75">{getBrand(brand).name}. Calculated from the tokens with the WCAG 2.x formula – text 4.5:1, UI boundaries 3:1.</p>
            <ul className="mt-4 grid grid-cols-1 gap-2">
              {report.map((r) => (
                <li key={r.id} className="flex items-center gap-2 text-[12.5px]">
                  <span className="flex -space-x-1" aria-hidden>
                    <span className="h-4 w-4 rounded-full ring-1 ring-white/30" style={{ background: r.bgValue }} />
                    <span className="h-4 w-4 rounded-full ring-1 ring-white/30" style={{ background: r.fgValue }} />
                  </span>
                  <span className="flex-1">{r.label}</span>
                  <span className={clsx("font-mono", r.pass ? "text-bubblegum" : "font-bold text-[#ffb4b4]")}>{r.ratio?.toFixed(1)}:1 {r.pass ? "AA" : "fail"}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-paper/60">{report.filter((r) => r.pass).length}/{report.length} checks pass</p>
          </div>
          <div className="rounded-[24px] bg-paper p-5 text-sm ring-1 ring-ink/10">
            <p className="font-display text-lg font-bold tracking-tight">Focus indicators</p>
            <p className="mt-2 text-ink-soft">Every interactive component uses <code className="font-mono text-[12px]">focus.ring.color</code> (2px, 2px offset) via <code className="font-mono text-[12px]">:focus-visible</code>, so the ring follows the brand and always meets 3:1.</p>
            <p className="mt-2 flex items-center gap-2 font-mono text-[12px]"><Swatch value={resolve("focus.ring.color", brand)} /> {resolve("focus.ring.color", brand)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
