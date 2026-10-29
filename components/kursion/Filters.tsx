"use client";
import { useId } from "react";
import { Search } from "lucide-react";
import { Input } from "./Fields";

/** Search that filters as you type – no separate "Go" button. */
export function SearchField({ value, onChange, label = "Search", placeholder }: { value: string; onChange: (v: string) => void; label?: string; placeholder?: string }) {
  return <Input name="search" type="search" label={label} placeholder={placeholder} value={value} onChange={onChange} icon={Search} />;
}

/** Single-choice filter chips. Native radios, so arrow keys move between options. */
export function FilterChips<T extends string>({ legend, options, value, onChange }: { legend: string; options: { value: T; label: string; count?: number }[]; value: T; onChange: (v: T) => void }) {
  const name = useId();
  return (
    <fieldset className="k-chips">
      <legend className="k-label" style={{ width: "100%", marginBottom: 4 }}>{legend}</legend>
      {options.map((o) => (
        <label key={o.value} className="k-chip">
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          <span>{o.label}{o.count !== undefined && <b>{o.count}</b>}</span>
        </label>
      ))}
    </fieldset>
  );
}
