"use client";
import { useState } from "react";
import clsx from "clsx";
import { CheckCircle2, CircleAlert, RotateCcw } from "lucide-react";
import { BrandRoot, Badge, Button, Card, Checkbox, Stack, TextField } from "@/components/ds";
import { useBrand } from "@/lib/design-system/brand-store";
import { chain, componentTokens, getBrand, resolve, runContrast, type ComponentKey, type SemanticOverrides } from "@/lib/design-system/tokens";
import { BrandSwitcher, CodeBlock, Segmented, Swatch } from "./controls";

const COLOR_CHOICES = ["violet.500", "violet.700", "violet.900", "teal.600", "teal.800", "coral.400", "coral.700", "neutral.900"];
const RADIUS_CHOICES = ["none", "xs", "md", "xl", "pill"];

/** Component tokens whose chain passes through a semantic token, for one brand. */
function dependents(semantic: string, brand: Parameters<typeof chain>[1]) {
  return (Object.keys(componentTokens) as ComponentKey[]).filter((t) => chain(t, brand).some((s) => s.path === semantic));
}

export default function DesignToCode() {
  const [brand] = useBrand();
  const [color, setColor] = useState<string | null>(null);
  const [radius, setRadius] = useState<string | null>(null);

  const overrides: SemanticOverrides = {};
  if (color) overrides["color.action.primary"] = `{color.${color}}`;
  if (radius) overrides["radius.control"] = `{radius.${radius}}`;

  const base = chain("button.primary.background", brand);
  const primitive = color ? `color.${color}` : base[base.length - 1].path;
  const primitiveValue = resolve("color.action.primary", brand, overrides);
  const affected = dependents("color.action.primary", brand);
  const radiusAffected = dependents("radius.control", brand);
  const checks = runContrast(brand, overrides).filter((c) => c.fg === "color.action.primary" || c.bg === "color.action.primary" || c.fg === "color.border.focus");
  const failing = checks.filter((c) => !c.pass);
  const currentColor = base[base.length - 1].path.replace("color.", "");
  const currentRadius = chain("radius.control", brand)[1]?.path.replace("radius.", "");

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* The five-step chain */}
      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5" aria-label="From design token to rendered UI">
        {[
          { n: "1", t: "Primitive token", body: <><code className="font-mono text-[12px] font-semibold">{primitive}</code><span className="mt-1 flex items-center gap-2 font-mono text-[12px]"><Swatch value={primitiveValue} />{primitiveValue}</span></> },
          { n: "2", t: "Semantic token", body: <code className="block font-mono text-[12px]"><b>color.action.primary</b><br />→ {`{${primitive}}`}</code> },
          { n: "3", t: "Component token", body: <code className="block font-mono text-[12px]"><b>button.primary.background</b><br />→ {"{color.action.primary}"}</code> },
          { n: "4", t: "React + CSS", body: <code className="block font-mono text-[12px]">{'<Button variant="primary" />'}<br /><span className="text-ink-soft">background: var(--ds-button-primary-background)</span></code> },
          { n: "5", t: "Rendered UI", body: <BrandRoot brand={brand} overrides={overrides} className="mt-1 rounded-xl bg-transparent p-2"><Button label="Enrol now" size="sm" /></BrandRoot> },
        ].map((s) => (
          <li key={s.n} className="flex flex-col rounded-[20px] bg-paper p-4 ring-1 ring-ink/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pink-deep">{s.n} · {s.t}</span>
            <div className="mt-2 min-w-0 break-words">{s.body}</div>
          </li>
        ))}
      </ol>

      {/* Change one token */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-1 content-start gap-5 rounded-[24px] bg-ivory p-5">
          <div>
            <p className="font-display text-xl font-bold tracking-tight">Change one semantic token</p>
            <p className="mt-1 text-sm text-ink-soft">Edits apply to {getBrand(brand).name} only. No component file changes.</p>
          </div>
          <BrandSwitcher size="sm" />
          <Segmented
            legend={`color.action.primary → ${affected.length} component tokens`}
            size="sm"
            value={color ?? currentColor}
            onChange={(v) => setColor(v === currentColor ? null : v)}
            options={COLOR_CHOICES.map((c) => ({ value: c, label: c, swatch: [resolve(`color.${c}`, brand)] }))}
          />
          <Segmented
            legend={`radius.control → ${radiusAffected.length} component token${radiusAffected.length === 1 ? "" : "s"}`}
            size="sm"
            value={radius ?? currentRadius ?? "md"}
            onChange={(v) => setRadius(v === currentRadius ? null : v)}
            options={RADIUS_CHOICES.map((r) => ({ value: r, label: r }))}
          />
          <div aria-live="polite" className={clsx("rounded-2xl p-4 text-sm ring-1", failing.length ? "bg-blush ring-pink-deep/40" : "bg-paper ring-ink/10")}>
            <p className="flex items-center gap-2 font-semibold">
              {failing.length ? <CircleAlert className="h-4 w-4 text-pink-deep" aria-hidden /> : <CheckCircle2 className="h-4 w-4 text-pink-deep" aria-hidden />}
              {failing.length ? `This change fails ${failing.length} WCAG check${failing.length > 1 ? "s" : ""}` : "All related WCAG contrast checks pass"}
            </p>
            <ul className="mt-2 grid grid-cols-1 gap-1 font-mono text-[11.5px]">
              {checks.map((c) => (
                <li key={c.id} className="flex justify-between gap-3">
                  <span>{c.label}</span>
                  <span className={c.pass ? "" : "font-bold text-pink-deep"}>{c.ratio?.toFixed(2)}:1 {c.pass ? "✓" : `✗ needs ${c.min}:1`}</span>
                </li>
              ))}
            </ul>
          </div>
          {(color || radius) && (
            <button type="button" onClick={() => { setColor(null); setRadius(null); }} className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-semibold hover:border-ink">
              <RotateCcw className="h-4 w-4" aria-hidden /> Reset to {getBrand(brand).name}
            </button>
          )}
        </div>

        <div className="min-w-0 overflow-hidden rounded-[24px] ring-1 ring-ink/10">
          <p className="border-b border-ink/10 bg-paper px-4 py-2.5 font-mono text-xs text-ink-soft">Every component below reads the edited token</p>
          <div className="tech-grid bg-[#f4f2f7] p-3 sm:p-6">
            <BrandRoot brand={brand} overrides={overrides} className="rounded-2xl p-5 sm:p-6">
              <Card padding="spacing.component.lg">
                <Stack direction="horizontal" gap="spacing.component.sm" wrap>
                  <Button label="Primary" />
                  <Button label="Outline" variant="outline" />
                  <Button label="Focused" variant="secondary" forceState="focus" />
                </Stack>
                <TextField name="dtc-email" label="Focused field" defaultValue="anna@example.com" forceState="focus" />
                <Stack direction="horizontal" gap="spacing.component.md" align="center" wrap>
                  <Checkbox name="dtc-check" label="Checked checkbox" defaultChecked />
                  <Badge label="Unchanged badge" tone="success" size="sm" />
                </Stack>
              </Card>
            </BrandRoot>
          </div>
          <p className="border-t border-ink/10 bg-paper px-4 py-3 text-sm text-ink-soft">
            Affected: {affected.join(", ")}. The badge uses feedback tokens, so it stays the same – that boundary is the point of semantic naming.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CodeBlock file="components/ds/ds.css" lang="css" note="Components read component tokens only – never raw values.">
{`.ds-button {
  --_bg: var(--ds-button-primary-background);
  --_fg: var(--ds-button-primary-text);
  background: var(--_bg);
  color: var(--_fg);
  border-radius: var(--ds-button-radius);
  min-height: var(--_h);
}
.ds-button[data-variant="outline"] {
  --_bg: transparent;
  --_fg: var(--ds-button-outline-text);
  --_border: var(--ds-button-outline-border);
}`}
        </CodeBlock>
        <CodeBlock secondary file="generated token stylesheet" lang="css" note="Generated from lib/design-system/tokens.ts. Each level points at the one below.">
{`.ds-root {
  --ds-p-color-violet-700: #6d28d9;          /* primitive */
  --ds-button-primary-background:
    var(--ds-color-action-primary);         /* component */
}
.ds-root[data-brand="aster"] {
  --ds-color-action-primary:
    var(--ds-p-color-violet-700);           /* semantic */
}
.ds-root[data-brand="kord"] {
  --ds-color-action-primary:
    var(--ds-p-color-teal-800);
}`}
        </CodeBlock>
      </div>
    </div>
  );
}
