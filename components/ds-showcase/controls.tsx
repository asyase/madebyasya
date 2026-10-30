"use client";
// Portfolio-styled controls for the design system showcase. Option groups are
// native radio inputs, so arrow keys, Tab and screen readers work out of the box.
import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { brands, resolve, type BrandId } from "@/lib/design-system/tokens";
import { useBrand } from "@/lib/design-system/brand-store";

export type Option<T extends string> = { value: T; label: string; swatch?: string[] };

export function Segmented<T extends string>({ legend, options, value, onChange, hideLegend, className, size = "md" }: { legend: string; options: Option<T>[]; value: T; onChange: (v: T) => void; hideLegend?: boolean; className?: string; size?: "sm" | "md" }) {
  const name = useId(); // unique per group, so several switchers can share a page
  return (
    <fieldset className={clsx("min-w-0", className)}>
      <legend className={clsx(hideLegend ? "sr-only" : "eyebrow mb-2 text-ink-soft")}>{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span
              className={clsx(
                "inline-flex items-center gap-2 rounded-full border font-semibold transition-colors",
                size === "sm" ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
                "border-ink/15 text-ink hover:border-ink/40",
                "peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper",
                "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pink-deep",
              )}
            >
              {o.swatch && (
                <span className="flex -space-x-1" aria-hidden>
                  {o.swatch.map((c, i) => <span key={i} className="h-3.5 w-3.5 rounded-full ring-1 ring-ink/20" style={{ background: c }} />)}
                </span>
              )}
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="relative h-5 w-9 shrink-0 rounded-full bg-ink/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-paper after:transition-transform peer-checked:bg-pink-deep peer-checked:after:translate-x-4 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pink-deep" aria-hidden />
      {label}
    </label>
  );
}

export function TextInput({ label, value, onChange, maxLength = 32 }: { label: string; value: string; onChange: (v: string) => void; maxLength?: number }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block text-ink-soft">{label}</span>
      <input value={value} maxLength={maxLength} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-ink/20 bg-paper px-3 py-2 text-sm focus-visible:border-ink" />
    </label>
  );
}

export const brandSwatch = (id: BrandId) => [resolve("color.action.primary", id), resolve("color.background.surface", id), resolve("color.background.primary", id)];

/** Switches the brand for every design-system widget on the page. */
export function BrandSwitcher({ className, size, hideLegend, compact }: { className?: string; size?: "sm" | "md"; hideLegend?: boolean; compact?: boolean }) {
  const [brand, setBrand] = useBrand();
  return (
    <Segmented
      legend="Brand"
      hideLegend={hideLegend}
      size={size}
      className={className}
      value={brand}
      onChange={setBrand}
      options={brands.map((b) => ({ value: b.id, label: compact ? b.name : `${b.label} · ${b.name}`, swatch: brandSwatch(b.id) }))}
    />
  );
}

/**
 * Code example. `secondary` examples are collapsed behind a button on small screens (always shown from 768px up),
 * so code-heavy sections stay short on mobile. Long lines wrap instead of being cut off.
 */
export function CodeBlock({ file, lang, children, note, secondary }: { file: string; lang: string; children: string; note?: string; secondary?: boolean }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <figure className="min-w-0 overflow-hidden rounded-[20px] bg-[#1d1926] text-[#ece9f5]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 font-mono text-xs">
        <span className="truncate text-white">{file}</span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="text-[#a9a3bd]">{lang}</span>
          {secondary && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen(!open)}
              className="inline-flex min-h-[32px] items-center gap-1 rounded-full bg-white/10 px-3 font-sans text-xs font-semibold text-white hover:bg-white/20 md:hidden"
            >
              <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden /> {open ? "Hide code" : "Show code"}
            </button>
          )}
        </span>
      </div>
      <div id={id} className={clsx(secondary && !open && "max-md:hidden")}>
        <pre tabIndex={0} className="max-h-[320px] overflow-auto p-5 font-mono text-[12.5px] leading-[1.7] whitespace-pre-wrap break-words md:max-h-[440px]"><code>{children}</code></pre>
        {note && <figcaption className="border-t border-white/10 px-5 py-3 font-mono text-xs text-[#a9a3bd]">{note}</figcaption>}
      </div>
    </figure>
  );
}

/**
 * Secondary documentation that is collapsed on small screens and always open from 768px up.
 * The heading stays visible, so readers know what is inside.
 */
export function MobileCollapse({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-[20px] bg-ivory px-5 py-3 text-left font-display text-lg font-bold tracking-tight md:hidden"
      >
        {title}
        <ChevronDown className={clsx("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <div id={id} className={clsx(!open && "max-md:hidden", "max-md:mt-3")}>{children}</div>
    </div>
  );
}

/**
 * Turns a data table into stacked rows below 1280px: each row becomes a block, each cell shows its column
 * name from `data-label`. From 1280px up it is a normal table.
 */
export const stackedTable =
  "max-xl:block max-xl:min-w-0 max-xl:[&_tbody]:block max-xl:[&_thead]:sr-only max-xl:[&_tr]:block max-xl:[&_tr]:py-3 max-xl:[&_th]:block max-xl:[&_th]:py-0 max-xl:[&_td]:block max-xl:[&_td]:py-1 max-xl:[&_td]:pr-0 max-xl:[&_td]:before:block max-xl:[&_td]:before:font-mono max-xl:[&_td]:before:text-[10px] max-xl:[&_td]:before:uppercase max-xl:[&_td]:before:tracking-[0.12em] max-xl:[&_td]:before:text-ink-soft max-xl:[&_td]:before:content-[attr(data-label)]";

export function Swatch({ value, className }: { value: string; className?: string }) {
  const isColor = /^(#|rgb)/.test(value);
  if (!isColor) return null;
  return <span className={clsx("inline-block h-4 w-4 shrink-0 rounded-full ring-1 ring-ink/20", className)} style={{ background: value }} aria-hidden />;
}

/** A labelled panel in the portfolio's card style. */
export function Panel({ title, eyebrow, children, className }: { title?: string; eyebrow?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("min-w-0 rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6", className)}>
      {eyebrow && <p className="eyebrow text-pink-deep">{eyebrow}</p>}
      {title && <h3 className="mt-1 font-display text-xl font-bold tracking-tight">{title}</h3>}
      <div className={clsx((title || eyebrow) && "mt-4")}>{children}</div>
    </div>
  );
}
