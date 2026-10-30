"use client";
import { useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { Alert, Button, Input, KursionRoot, StatusBadge } from "@/components/kursion";
import { CodeBlock, MobileCollapse, Segmented, stackedTable } from "@/components/ds-showcase/controls";

/* ------------------------------------------------------------------ component documentation */

type DocId = "button" | "input" | "badge";

const DOCS: Record<DocId, {
  name: string;
  purpose: string;
  when: string[];
  notWhen: string[];
  variants: { name: string; use: string; demo: React.ReactNode }[];
  a11y: string[];
  doEx: { text: string; demo: React.ReactNode };
  dontEx: { text: string; demo: React.ReactNode };
  code: string;
}> = {
  button: {
    name: "Button",
    purpose: "Starts an action: saving, creating, confirming or cancelling.",
    when: ["Submitting a form", "Starting a task such as “New training”", "Confirming a decision in a modal"],
    notWhen: ["Navigating to another page – use a link", "Filtering a list – use FilterChips"],
    variants: [
      { name: "primary", use: "The main action of a view. Use once per view.", demo: <Button icon={Plus}>New training</Button> },
      { name: "secondary", use: "Supporting actions next to a primary one.", demo: <Button variant="secondary">Export</Button> },
      { name: "destructive", use: "Irreversible actions. Always confirm in a Modal.", demo: <Button variant="destructive">Cancel training</Button> },
      { name: "loading", use: "While a request runs; repeated clicks are ignored.", demo: <Button loading>Registering…</Button> },
    ],
    a11y: ["Native <button>; Enter and Space activate it.", "Visible label, or aria-label when the label is ambiguous in a table row (“Edit Time Management”).", "Focus ring uses focus.ring (2px, ≥ 3:1).", "Loading sets aria-busy; disabled buttons are skipped by Tab, so explain why an action is unavailable."],
    doEx: { text: "One primary action, labelled with a verb and the object.", demo: <div className="flex gap-2"><Button variant="secondary">Export</Button><Button>New training</Button></div> },
    dontEx: { text: "Two primary actions competing for attention.", demo: <div className="flex gap-2"><Button>Export</Button><Button>New</Button></div> },
    code: `import { Button } from "@/components/kursion";

<Button icon={Plus} onClick={create}>New training</Button>
<Button variant="destructive" onClick={() => setConfirm(true)}>
  Cancel training
</Button>`,
  },
  input: {
    name: "Input",
    purpose: "Collects a single piece of information with a persistent label.",
    when: ["Names, email addresses, phone numbers, dates", "Longer text with multiline"],
    notWhen: ["Choosing from a known list – use Select", "Yes/no – use Checkbox"],
    variants: [
      { name: "default", use: "Label, optional hint.", demo: <Input name="d1" label="First name" /> },
      { name: "optional", use: "Mark the exception, not the rule.", demo: <Input name="d2" label="Company" optional /> },
      { name: "error", use: "After submit; says how to fix it.", demo: <Input name="d3" label="Email" defaultValue="maria@example" error="Use the format name@company.com." /> },
    ],
    a11y: ["<label for> is always present – placeholders never replace it.", "Hint and error are linked with aria-describedby; errors set aria-invalid.", "autocomplete is set for personal data (WCAG 1.3.5).", "Validation waits for the first submit, then re-checks while typing."],
    doEx: { text: "Persistent label and a hint that prevents the error.", demo: <Input name="d4" label="Email" hint="The certificate is sent here." /> },
    dontEx: { text: "Placeholder as label – it disappears while typing.", demo: <input className="k-input" placeholder="Email *" aria-label="Email (bad example)" /> },
    code: `<Input
  name="email" type="email" label="Email" required
  autoComplete="email"
  hint="The certificate is sent here."
  error={errors.email}
/>`,
  },
  badge: {
    name: "StatusBadge",
    purpose: "Shows the state of a training with one shared vocabulary.",
    when: ["Status in tables, cards and detail pages"],
    notWhen: ["Actions – badges are not clickable", "Free-form tags – use plain text"],
    variants: [
      { name: "draft", use: "Being prepared.", demo: <StatusBadge status="draft" /> },
      { name: "published", use: "Visible, registration not open.", demo: <StatusBadge status="published" /> },
      { name: "open", use: "Accepting registrations.", demo: <StatusBadge status="open" /> },
      { name: "completed", use: "Took place.", demo: <StatusBadge status="completed" /> },
      { name: "cancelled", use: "Will not take place.", demo: <StatusBadge status="cancelled" /> },
    ],
    a11y: ["Text + icon + colour: meaning survives greyscale and colour blindness (1.4.1).", "Every text/background pair ≥ 5.9:1.", "Rendered as text, so it is read in context by screen readers."],
    doEx: { text: "Use the status prop; the label comes from the vocabulary.", demo: <StatusBadge status="open" /> },
    dontEx: { text: "Custom wording or colours for an existing state.", demo: <span className="k-badge" style={{ background: "#fff3cd", color: "#b8860b" }}>Active!</span> },
    code: `<StatusBadge status={training.status} />

// Adding a state = one entry in statuses
// + two tokens: color.status.<id>.bg / .text`,
  },
};

function Docs() {
  const [id, setId] = useState<DocId>("button");
  const d = DOCS[id];
  return (
    <div className="grid grid-cols-1 gap-4">
      <Segmented legend="Component" size="sm" value={id} onChange={setId} options={[{ value: "button", label: "Button" }, { value: "input", label: "Input" }, { value: "badge", label: "StatusBadge" }]} />
      <article className="grid grid-cols-1 gap-5 rounded-[24px] bg-paper p-5 ring-1 ring-ink/10 sm:p-7" aria-labelledby="cc-doc-title">
        <header>
          <p className="eyebrow text-pink-deep">Kursion UI · v2.1</p>
          <h3 id="cc-doc-title" className="mt-1 font-display text-3xl font-bold tracking-tight">{d.name}</h3>
          <p className="mt-2 max-w-[60ch] text-lg text-ink-soft">{d.purpose}</p>
        </header>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div><p className="eyebrow mb-2 text-ink-soft">When to use</p><ul className="grid gap-1 text-[15px]">{d.when.map((w) => <li key={w}>+ {w}</li>)}</ul></div>
          <div><p className="eyebrow mb-2 text-ink-soft">When not to use</p><ul className="grid gap-1 text-[15px]">{d.notWhen.map((w) => <li key={w}>– {w}</li>)}</ul></div>
        </div>
        <div>
          <p className="eyebrow mb-3 text-ink-soft">Variants</p>
          <KursionRoot className="grid gap-px overflow-hidden rounded-2xl bg-[var(--k-color-border-default)] ring-1 ring-ink/10">
            {d.variants.map((v) => (
              <div key={v.name} className="grid items-center gap-3 bg-[var(--k-color-bg-surface)] p-4 sm:grid-cols-[8rem_1fr_minmax(0,16rem)]">
                <code className="font-mono text-[12px] font-semibold">{v.name}</code>
                <span className="text-sm text-[var(--k-color-text-secondary)]">{v.use}</span>
                <div className="min-w-0">{v.demo}</div>
              </div>
            ))}
          </KursionRoot>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl ring-2 ring-[#1d6b3f]/50">
            <p className="bg-[#ecf7f0] px-4 py-2 text-sm font-semibold text-[#1d6b3f]">✓ Do</p>
            <KursionRoot className="grid min-h-[96px] place-items-center p-4">{d.doEx.demo}</KursionRoot>
            <p className="border-t border-ink/10 px-4 py-2 text-sm">{d.doEx.text}</p>
          </div>
          <div className="overflow-hidden rounded-2xl ring-2 ring-pink-deep/50">
            <p className="bg-blush px-4 py-2 text-sm font-semibold text-pink-deep">✗ Don’t</p>
            <KursionRoot className="grid min-h-[96px] place-items-center p-4">{d.dontEx.demo}</KursionRoot>
            <p className="border-t border-ink/10 px-4 py-2 text-sm">{d.dontEx.text}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div><p className="eyebrow mb-2 text-ink-soft">Accessibility</p><ul className="grid gap-1.5 text-[15px] leading-relaxed">{d.a11y.map((a) => <li key={a}>◆ {a}</li>)}</ul></div>
          <CodeBlock secondary file="Implementation" lang="tsx">{d.code}</CodeBlock>
        </div>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------ governance */

const STAGES = [
  { id: "proposed", label: "Proposed", who: "Any product team", gate: "A request explains the user need and shows why existing components don’t cover it.", example: "DateRangePicker – requested for the schedule view" },
  { id: "reviewed", label: "Reviewed", who: "Design system designer + frontend lead", gate: "Checked against existing patterns: can a variant of an existing component solve it?", example: "FilterBar – merged with the list filters instead of a new component" },
  { id: "approved", label: "Approved", who: "Design system group", gate: "Design, API, tokens and accessibility criteria agreed; documentation drafted.", example: "DataTable bulk actions – approved for 2.2" },
  { id: "published", label: "Published", who: "Design system team", gate: "Released in code and in the design library with docs, changelog entry and a version number.", example: "StatusBadge – published in 2.0" },
  { id: "deprecated", label: "Deprecated", who: "Design system team", gate: "Marked with a replacement and a removal version; usage is tracked until it reaches zero.", example: "LegacyStatusLabel → StatusBadge, removal in 3.0" },
];

const CHANGELOG = [
  { v: "2.1.0", type: "minor", text: "Button: loading state with aria-busy. Input: optional marker." },
  { v: "2.0.0", type: "major", text: "StatusBadge replaces four legacy status styles. Status names fixed to five values." },
  { v: "1.4.0", type: "minor", text: "DataTable: sortable headers with aria-sort." },
  { v: "1.3.1", type: "patch", text: "Focus ring contrast raised to 6.2:1 on surfaces." },
];

const NAMING = [
  { what: "Components", rule: "PascalCase nouns", ex: "Button, StatusBadge, DataTable" },
  { what: "Variants", rule: "lowercase, by intent – not by look", ex: "primary, destructive (not “red”)" },
  { what: "Tokens", rule: "category.role.state", ex: "color.status.open.bg, button.primary.bgHover" },
  { what: "Design library", rule: "Component / variant / state", ex: "Button / secondary / disabled" },
];

const OWNERS = [
  { role: "Design system designer", owns: "Component design, tokens, documentation, review of proposals" },
  { role: "Frontend lead", owns: "Component API, code quality, releases and versioning" },
  { role: "Accessibility champion", owns: "Acceptance criteria and checks before publishing" },
  { role: "Product teams", owns: "Proposals, feedback and adopting new versions" },
];

function Governance() {
  const [stage, setStage] = useState(3);
  const s = STAGES[stage];
  return (
    <div className="grid grid-cols-1 gap-4">
      <p className="w-fit rounded-full border-2 border-dashed border-lav-deep/50 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-lav-deep">Illustrative governance model – not a real company workflow</p>
      <div className="rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
        <p className="font-display text-xl font-bold tracking-tight">Component lifecycle</p>
        <ol className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-5" aria-label="Lifecycle stages">
          {STAGES.map((x, i) => (
            <li key={x.id}>
              <button
                type="button"
                aria-pressed={i === stage}
                onClick={() => setStage(i)}
                className={clsx("flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition-colors", i === stage ? "bg-ink text-paper" : i < stage ? "bg-peri/60" : "bg-ivory hover:bg-blush", x.id === "deprecated" && i !== stage && "text-ink-soft")}
              >
                <span className="font-mono text-[11px] opacity-70">{String(i + 1).padStart(2, "0")}</span>
                {x.label}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-4 grid gap-4 rounded-2xl bg-ivory p-5 md:grid-cols-3" aria-live="polite">
          <div><p className="eyebrow text-ink-soft">Owner</p><p className="mt-1 font-semibold">{s.who}</p></div>
          <div><p className="eyebrow text-ink-soft">Exit criteria</p><p className="mt-1">{s.gate}</p></div>
          <div><p className="eyebrow text-ink-soft">Example</p><p className="mt-1 font-mono text-[13px]">{s.example}</p></div>
        </div>
        {s.id === "deprecated" && (
          <KursionRoot className="mt-3 rounded-2xl p-4">
            <Alert tone="warning" title="LegacyStatusLabel is deprecated">
              <p>Use <code>&lt;StatusBadge status=…/&gt;</code> instead. It will be removed in 3.0.0. See the migration note in the 2.0.0 changelog.</p>
            </Alert>
          </KursionRoot>
        )}
      </div>

      <MobileCollapse title="Naming, ownership and versioning" className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
          <h3 className="mb-3 font-display text-xl font-bold tracking-tight">Naming conventions</h3>
          <div className="overflow-x-auto">
          <table className={clsx("w-full min-w-[420px] text-left text-sm", stackedTable)}>
            <caption className="sr-only">Naming conventions</caption>
            <thead className="sr-only"><tr><th scope="col">Applies to</th><th scope="col">Rule</th><th scope="col">Example</th></tr></thead>
            <tbody>
              {NAMING.map((n) => (
                <tr key={n.what} className="border-b border-ink/10 align-top last:border-0">
                  <th scope="row" className="py-2.5 pr-3 font-semibold">{n.what}</th>
                  <td data-label="Rule" className="py-2.5 pr-3 text-ink-soft">{n.rule}</td>
                  <td data-label="Example" className="py-2.5 font-mono text-[12px]">{n.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <div className="rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
          <p className="font-display text-xl font-bold tracking-tight">Ownership</p>
          <dl className="mt-3 grid gap-2.5 text-sm">
            {OWNERS.map((o) => <div key={o.role} className="grid gap-1 sm:grid-cols-[11rem_1fr]"><dt className="font-semibold">{o.role}</dt><dd className="text-ink-soft">{o.owns}</dd></div>)}
          </dl>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-6">
          <p className="font-display text-xl font-bold tracking-tight">Changelog</p>
          <ul className="mt-3 grid gap-2">
            {CHANGELOG.map((c) => (
              <li key={c.v} className="grid grid-cols-[4.5rem_4.5rem_1fr] items-baseline gap-2 border-b border-ink/10 pb-2 text-sm last:border-0">
                <span className="font-mono font-semibold">{c.v}</span>
                <span className={clsx("w-fit rounded-full px-2 py-0.5 font-mono text-[10px] uppercase", c.type === "major" ? "bg-pink-deep text-paper" : c.type === "minor" ? "bg-peri" : "bg-ivory ring-1 ring-ink/10")}>{c.type}</span>
                <span className="text-ink-soft">{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[24px] bg-ink p-5 text-paper sm:p-6">
          <p className="font-display text-xl font-bold tracking-tight">Versioning rules</p>
          <ul className="mt-3 grid gap-2 text-sm text-paper/85">
            <li><b className="text-bubblegum">major</b> – removes or renames a component, prop or token</li>
            <li><b className="text-bubblegum">minor</b> – adds a variant, state or component</li>
            <li><b className="text-bubblegum">patch</b> – fixes behaviour or values without API changes</li>
            <li className="mt-1 text-paper/70">Every release lists migration steps; deprecated items live for one major version.</li>
          </ul>
        </div>
      </div>
      </MobileCollapse>
    </div>
  );
}

export default function DocsGovernance() {
  return (
    <div className="grid grid-cols-1 gap-10">
      <Docs />
      <Governance />
    </div>
  );
}
