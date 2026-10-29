"use client";
import { ArrowRight } from "lucide-react";
import { chain, tokenCounts } from "@/lib/consistency/tokens";
import { CodeBlock, Swatch } from "@/components/ds-showcase/controls";

const CHAINS = ["button.primary.bg", "input.borderError", "focus.ring", "card.padding", "color.status.open.text"];
const level = { component: "bg-ink text-paper", semantic: "bg-blush", primitive: "bg-peri/70" };

export default function Implementation() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <ul className="grid grid-cols-3 gap-3" aria-label="Token counts">
        <li className="rounded-[20px] bg-peri/70 p-4 sm:p-5"><p className="font-display text-3xl font-extrabold sm:text-4xl">{tokenCounts.primitive}</p><p className="text-sm text-ink-soft">primitive tokens</p></li>
        <li className="rounded-[20px] bg-blush p-4 sm:p-5"><p className="font-display text-3xl font-extrabold sm:text-4xl">{tokenCounts.semantic}</p><p className="text-sm text-ink-soft">semantic tokens</p></li>
        <li className="rounded-[20px] bg-ink p-4 text-paper sm:p-5"><p className="font-display text-3xl font-extrabold sm:text-4xl">{tokenCounts.component}</p><p className="text-sm text-paper/75">component tokens</p></li>
      </ul>
      <div className="rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
        <p className="font-display text-xl font-bold tracking-tight">From component to raw value</p>
        <ul className="mt-4 grid gap-2.5">
          {CHAINS.map((c) => {
            const steps = chain(c);
            return (
              <li key={c} className="flex flex-wrap items-center gap-1.5">
                {steps.map((s, i) => (
                  <span key={s.path} className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[11.5px] ${level[s.level]}`}>
                      {i === steps.length - 1 && <Swatch value={s.value} />}
                      {s.path}{i === steps.length - 1 && ` = ${s.value}`}
                    </span>
                    {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-ink-soft" aria-hidden />}
                  </span>
                ))}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CodeBlock file="components/kursion/Feedback.tsx" lang="tsx" note="The label comes from the shared vocabulary; colour comes from tokens.">
{`const statusIcons = { draft: CircleDashed, published: Megaphone,
  open: CircleDot, completed: CheckCheck, cancelled: Ban };

export function StatusBadge({ status }: { status: StatusId }) {
  const Icon = statusIcons[status];
  return (
    <span className="k-badge" data-status={status}>
      <Icon className="k-icon" aria-hidden />
      {statuses[status].label}
    </span>
  );
}`}
        </CodeBlock>
        <CodeBlock secondary file="components/kursion/kursion.css" lang="css" note="Generated token sheet + component styles. No raw colours in components.">
{`.k-badge[data-status="open"] {
  --_bg: var(--k-color-status-open-bg);
  --_fg: var(--k-color-status-open-text);
}
.k-btn[data-variant="destructive"] {
  --_bg: var(--k-button-destructive-bg);
}
.k-root :focus-visible {
  outline: var(--k-focus-width) solid var(--k-focus-ring);
}`}
        </CodeBlock>
      </div>
      <CodeBlock secondary file="structure" lang="text">
{`lib/consistency/
  tokens.ts        primitive → semantic → component, status vocabulary
  data.ts          fictional trainings shared by Before and After
  audit.ts         findings, severity, WCAG references
components/kursion/   Kursion UI – the consolidated library
  Button · Input · Select · Checkbox · StatusBadge · Alert
  Card · Modal · DataTable · SearchField · FilterChips
components/consistency-showcase/
  Before.tsx       illustrative baseline (legacy.css)
  After.tsx        the same screens built with Kursion UI`}
      </CodeBlock>
    </div>
  );
}
