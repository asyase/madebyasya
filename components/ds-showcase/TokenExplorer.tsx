"use client";
import { useState } from "react";
import clsx from "clsx";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useBrand } from "@/lib/design-system/brand-store";
import { brands, chain, componentTokens, flatPrimitives, semanticKeys, type ComponentKey } from "@/lib/design-system/tokens";
import { BrandSwitcher, Segmented, Swatch, stackedTable } from "./controls";

const FEATURED: ComponentKey[] = ["button.primary.background", "button.primary.text", "input.border.focus", "card.background", "card.radius", "card.border", "button.height.md", "badge.success.background"];

const levelStyle = {
  primitive: { bg: "bg-peri/70", tag: "Primitive", note: "Raw value. Brand-agnostic." },
  semantic: { bg: "bg-blush", tag: "Semantic", note: "Meaning. Defined per brand." },
  component: { bg: "bg-ink text-paper", tag: "Component", note: "Where it is used. Shared." },
};

export default function TokenExplorer() {
  const [brand] = useBrand();
  const [token, setToken] = useState<ComponentKey>("button.primary.background");
  const steps = chain(token, brand);
  const counts = { primitive: flatPrimitives().length, semantic: semanticKeys.length, component: Object.keys(componentTokens).length };

  return (
    <div className="grid grid-cols-1 gap-4">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Token levels">
        {(["primitive", "semantic", "component"] as const).map((l) => (
          <li key={l} className={clsx("rounded-[20px] p-5", levelStyle[l].bg)}>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] opacity-75">{levelStyle[l].tag} tokens</p>
            <p className="mt-1 font-display text-4xl font-extrabold tracking-tight">{counts[l]}</p>
            <p className="mt-1 text-sm opacity-80">{levelStyle[l].note}</p>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-4 rounded-[24px] bg-ivory p-4 sm:p-5 lg:grid-cols-[1fr_auto]">
        <Segmented legend="Follow a component token" size="sm" value={token} onChange={setToken} options={FEATURED.map((t) => ({ value: t, label: t }))} />
        <BrandSwitcher size="sm" />
      </div>

      <div className="rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
        <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center" aria-label={`Alias chain for ${token}`} aria-live="polite">
          {steps.map((s, i) => (
            <li key={s.path} className="flex flex-col items-center gap-2 lg:flex-1 lg:flex-row">
              <div className={clsx("w-full rounded-2xl p-4", levelStyle[s.level].bg)}>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-70">{levelStyle[s.level].tag}</p>
                <p className="mt-1 break-all font-mono text-[13px] font-semibold">{s.path}</p>
                <p className="mt-1 flex items-center gap-2 break-all font-mono text-[12px] opacity-80">
                  {i === steps.length - 1 && <Swatch value={s.value} />}
                  {s.value}
                </p>
              </div>
              {i < steps.length - 1 && (
                <>
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink-soft lg:block" aria-hidden />
                  <ArrowDown className="h-4 w-4 shrink-0 text-ink-soft lg:hidden" aria-hidden />
                </>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 font-display text-lg font-bold tracking-tight">Same component token, three brands</h3>
          <table className={clsx("w-full min-w-[520px] text-left text-sm", stackedTable)}>
            <caption className="sr-only">Same component token, three brands</caption>
            <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              <tr className="border-b border-ink/15">
                <th scope="col" className="py-2 font-normal">Brand</th>
                <th scope="col" className="font-normal">Semantic chain</th>
                <th scope="col" className="font-normal">Primitive</th>
                <th scope="col" className="font-normal">Value</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => {
                const c = chain(token, b.id);
                const raw = c[c.length - 1];
                return (
                  <tr key={b.id} className={clsx("border-b border-ink/10", b.id === brand && "bg-ivory")}>
                    <th scope="row" className="py-2.5 pr-3 font-semibold">{b.label} · {b.name}</th>
                    <td data-label="Semantic chain" className="pr-3 font-mono text-[12px]">{c.filter((s) => s.level === "semantic").map((s) => s.path).join(" → ") || "–"}</td>
                    <td data-label="Primitive" className="pr-3 font-mono text-[12px]">{raw?.path}</td>
                    <td data-label="Value" className="font-mono text-[12px]"><span className="inline-flex items-center gap-2"><Swatch value={raw?.value ?? ""} />{raw?.value}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-3 text-sm text-ink-soft">The component only ever asks for <code className="font-mono text-[12px]">{token}</code>. Which colour or size it gets is decided by the brand&apos;s semantic layer.</p>
        </div>
      </div>
    </div>
  );
}
