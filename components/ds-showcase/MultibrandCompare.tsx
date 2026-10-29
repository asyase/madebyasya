"use client";
import clsx from "clsx";
import { Badge, BrandRoot, Button, Card, Heading, SelectField, Stack, Text, TextField } from "@/components/ds";
import { useBrand } from "@/lib/design-system/brand-store";
import { brands, chain, type SemanticKey } from "@/lib/design-system/tokens";
import { BrandSwitcher, CodeBlock, Swatch, stackedTable } from "./controls";

/** One component tree. It is rendered three times, inside three brand roots. */
function SampleUI({ id }: { id: string }) {
  return (
    <Card padding="spacing.component.lg">
      <Stack gap="spacing.component.xs">
        <Badge label="Saved draft" tone="info" size="sm" icon="check" />
        <Heading text="Update your plan" level={3} />
        <Text text="Changes apply from your next billing period." tone="secondary" />
      </Stack>
      <TextField name={`${id}-email`} label="Billing email" type="email" defaultValue="anna@example.com" iconStart="mail" />
      <SelectField name={`${id}-plan`} label="Plan" options={[{ value: "plus", label: "Plus – monthly" }, { value: "pro", label: "Pro – yearly" }]} />
      <Stack direction="horizontal" gap="spacing.component.sm" wrap>
        <Button label="Save changes" />
        <Button label="Cancel" variant="outline" />
      </Stack>
    </Card>
  );
}

const DIFF: { token: SemanticKey; label: string }[] = [
  { token: "color.action.primary", label: "Action colour" },
  { token: "color.background.surface", label: "Surface" },
  { token: "radius.control", label: "Control radius" },
  { token: "radius.surface", label: "Card radius" },
  { token: "size.control.md", label: "Control height" },
  { token: "font.family.heading", label: "Heading face" },
  { token: "shadow.surface", label: "Card elevation" },
];

const shortValue = (v: string) => (v.includes("--font-display") ? "Bricolage Grotesque" : v.includes("--font-serif") ? "Instrument Serif" : v.startsWith("0 ") ? "soft shadow" : v);

export default function MultibrandCompare() {
  const [active] = useBrand();
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col gap-3 rounded-[24px] bg-ivory p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[52ch] text-sm text-ink-soft">One component tree, rendered three times. Each copy sits inside a different brand root – nothing else differs.</p>
        <BrandSwitcher size="sm" hideLegend />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {brands.map((b) => (
          <section key={b.id} aria-label={`${b.label}: ${b.name}`} className={clsx("min-w-0 overflow-hidden rounded-[24px] ring-1 transition-shadow", b.id === active ? "ring-2 ring-ink" : "ring-ink/10")}>
            <header className="border-b border-ink/10 bg-paper px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-pink-deep">{b.label} · fictional</p>
              <p className="font-display text-lg font-bold tracking-tight">{b.name}</p>
              <p className="text-xs text-ink-soft">{b.sector}</p>
            </header>
            <BrandRoot brand={b.id} className="h-full p-4 sm:p-5">
              <SampleUI id={b.id} />
            </BrandRoot>
          </section>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="min-w-0 overflow-x-auto rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
          <h3 className="mb-3 font-display text-lg font-bold tracking-tight">What changes: the semantic layer</h3>
          <table className={clsx("w-full text-left text-sm", stackedTable)}>
            <caption className="sr-only">What changes: the semantic layer</caption>
            <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
              <tr className="border-b border-ink/15">
                <th scope="col" className="py-2 font-normal">Token</th>
                {brands.map((b) => <th key={b.id} scope="col" className="font-normal">{b.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {DIFF.map((d) => (
                <tr key={d.token} className="border-b border-ink/10">
                  <th scope="row" className="py-2.5 pr-3 font-normal">
                    <span className="block font-semibold">{d.label}</span>
                    <code className="font-mono text-[11px] text-ink-soft">{d.token}</code>
                  </th>
                  {brands.map((b) => {
                    const c = chain(d.token, b.id);
                    const raw = c[c.length - 1]?.value ?? "";
                    return (
                      <td key={b.id} data-label={b.label} className="pr-3 font-mono text-[12px]">
                        <span className="inline-flex items-center gap-1.5"><Swatch value={raw} />{shortValue(raw)}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 content-start gap-4">
          <div className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
            <p className="font-display text-lg font-bold tracking-tight">What stays the same</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-paper/85">
              {["Component API and props", "HTML structure and semantics", "Keyboard behaviour and focus order", "Validation logic and error messages", "Component tokens and their names", "The contracts an AI tool reads"].map((t) => (
                <li key={t} className="flex gap-2"><span className="text-bubblegum" aria-hidden>✓</span>{t}</li>
              ))}
            </ul>
          </div>
          <CodeBlock file="Multibrand.tsx" lang="tsx">
{`{brands.map((b) => (
  <BrandRoot brand={b.id}>
    <SampleUI />   {/* identical tree */}
  </BrandRoot>
))}`}
          </CodeBlock>
        </div>
      </div>
    </div>
  );
}
