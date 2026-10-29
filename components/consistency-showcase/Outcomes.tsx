"use client";
import { inventory } from "@/lib/consistency/audit";
import { contrastReport } from "@/lib/consistency/tokens";

/** Measured on this prototype's own code and colours – not on a production product. */
export default function Outcomes() {
  const report = contrastReport();
  const metrics = [
    { from: inventory.buttons.before, to: inventory.buttons.after, label: "button styles → one Button with 3 variants and a loading state" },
    { from: inventory.inputs.before, to: inventory.inputs.after, label: "field patterns → one Input with label, hint and error" },
    { from: inventory.statusNames.before, to: inventory.statusNames.after, label: "status names → one fixed vocabulary" },
    { from: report.filter((r) => !r.beforePass).length, to: report.filter((r) => !r.afterPass).length, label: `failing contrast pairs (of ${report.length} checked)` },
  ];
  return (
    <div className="grid grid-cols-1 gap-3">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <li key={m.label} className="rounded-[20px] bg-ink p-5 text-paper">
            <p className="font-display text-3xl font-extrabold tracking-tight text-bubblegum md:text-4xl">{m.from} → {m.to}</p>
            <p className="mt-2 text-sm text-paper/75">{m.label}</p>
          </li>
        ))}
      </ul>
      <p className="font-mono text-[11px] text-ink-soft">Counted in this prototype&apos;s Before and After implementations. These are not usage or business metrics.</p>
    </div>
  );
}
