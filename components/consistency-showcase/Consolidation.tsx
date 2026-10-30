"use client";
import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { Button, Input, KursionRoot, StatusBadge } from "@/components/kursion";
import { inventory, legacyStatusNames } from "@/lib/consistency/audit";
import { statuses, type StatusId } from "@/lib/consistency/tokens";
import { CodeBlock, Segmented, Toggle } from "@/components/ds-showcase/controls";
import { LegacyScope } from "./Before";

type Group = "buttons" | "inputs" | "badges";

function Source({ children }: { children: string }) {
  return <span className="mt-1.5 block font-mono text-[10.5px] text-ink-soft">{children}</span>;
}

function BeforeItems({ group }: { group: Group }) {
  if (group === "buttons")
    return (
      <LegacyScope className="grid gap-4 rounded-2xl bg-white p-5">
        <div><button className="lg-btn-save">Save</button><Source>.btn-save · registration form</Source></div>
        <div><button className="lg-btn-blue">View all</button><Source>.btn-blue · dashboard</Source></div>
        <div><button className="lg-btn-outline">+ New event</button><Source>.btn-outline · dashboard header</Source></div>
        <div><button className="lg-link-add">+ Add training</button><Source>a.add-link · training list</Source></div>
      </LegacyScope>
    );
  if (group === "inputs")
    return (
      <LegacyScope className="grid gap-5 rounded-2xl bg-white p-5">
        <div><label style={{ fontSize: 12, fontWeight: "bold", display: "block", marginBottom: 4 }}>Course *</label><input className="lg-input-box" aria-label="Course" /><Source>.input-box · label above</Source></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 13 }}>E-mail:</span><input className="lg-input-line" aria-label="E-mail" /></div>
        <Source>.input-line · inline label, underline</Source>
        <div><input className="lg-input-ph" placeholder="First name *" aria-label="First name" /><Source>.input-ph · placeholder as label</Source></div>
      </LegacyScope>
    );
  const names = [...new Set([...Object.values(legacyStatusNames.dashboard), ...Object.values(legacyStatusNames.list)])];
  return (
    <LegacyScope className="grid gap-3 rounded-2xl bg-white p-5">
      <div className="flex flex-wrap gap-2">
        <span className="lg-st-orange">Open</span>
        <span className="lg-pill" style={{ background: "#5cb85c" }}>Registration active</span>
        <span className="lg-st-pill-blue">Live</span>
        <span className="lg-st-grey">Not published</span>
        <span className="lg-st-red">Cancelled</span>
        <span className="lg-pill" style={{ background: "#e74c3c" }}>Canceled</span>
        <span className="lg-st-green">Done</span>
        <span style={{ fontSize: 12 }}>Finished</span>
      </div>
      <Source>{`${names.length} labels for 5 states, in 4 visual styles`}</Source>
    </LegacyScope>
  );
}

function AfterComponent({ group }: { group: Group }) {
  const [variant, setVariant] = useState<"primary" | "secondary" | "destructive">("primary");
  const [state, setState] = useState<"default" | "disabled" | "loading">("default");
  const [field, setField] = useState<"default" | "focus" | "error" | "disabled">("default");
  const [icon, setIcon] = useState(true);
  if (group === "buttons")
    return (
      <div className="grid gap-4">
        <KursionRoot className="grid min-h-[132px] place-items-center rounded-2xl p-6">
          <Button variant={variant} disabled={state === "disabled"} loading={state === "loading"} icon={icon ? Plus : undefined}>{variant === "destructive" ? "Cancel training" : "New training"}</Button>
        </KursionRoot>
        <Segmented legend="Variant" size="sm" value={variant} onChange={setVariant} options={[{ value: "primary", label: "Primary" }, { value: "secondary", label: "Secondary" }, { value: "destructive", label: "Destructive" }]} />
        <Segmented legend="State" size="sm" value={state} onChange={setState} options={[{ value: "default", label: "Default" }, { value: "disabled", label: "Disabled" }, { value: "loading", label: "Loading" }]} />
        <Toggle label="Icon" checked={icon} onChange={setIcon} />
      </div>
    );
  if (group === "inputs")
    return (
      <div className="grid gap-4">
        <KursionRoot className="rounded-2xl p-6">
          <Input
            key={field}
            name="cons-email"
            label="Email"
            type="email"
            required
            hint="The confirmation is sent here."
            defaultValue={field === "error" ? "maria@example" : undefined}
            error={field === "error" ? "Enter an email address in the format name@company.com." : undefined}
            disabled={field === "disabled"}
            forceState={field === "focus" ? "focus" : undefined}
          />
        </KursionRoot>
        <Segmented legend="State" size="sm" value={field} onChange={setField} options={[{ value: "default", label: "Default" }, { value: "focus", label: "Focus" }, { value: "error", label: "Error" }, { value: "disabled", label: "Disabled" }]} />
      </div>
    );
  return (
    <KursionRoot className="grid gap-3 rounded-2xl p-6">
      {(Object.keys(statuses) as StatusId[]).map((s) => (
        <div key={s} className="flex flex-wrap items-center gap-3">
          <StatusBadge status={s} />
          <span className="text-xs text-ink-soft">{statuses[s].meaning}</span>
        </div>
      ))}
    </KursionRoot>
  );
}

const CODE: Record<Group, { before: string; after: string }> = {
  buttons: {
    before: `.btn-save    { background: #5cb85c; padding: 8px 18px; border-radius: 3px; outline: none; }
.btn-blue    { background: #1a73e8; padding: 6px 12px; border-radius: 6px; outline: none; }
.btn-outline { color: #3b82f6; border: 1px solid; border-radius: 20px; }
a.add-link   { color: #1a73e8; text-decoration: underline; }`,
    after: `<Button variant="primary" icon={Plus}>New training</Button>
<Button variant="secondary">Export</Button>
<Button variant="destructive">Cancel training</Button>
<Button loading>Registering…</Button>`,
  },
  inputs: {
    before: `<label>Course *</label><input class="input-box">
<span>E-mail:</span><input class="input-line">
<input class="input-ph" placeholder="First name *">`,
    after: `<Input
  label="Email" type="email" required
  hint="The confirmation is sent here."
  error={errors.email}
/>`,
  },
  badges: {
    before: `<span class="st-orange">Open</span>
<span class="pill green">Registration active</span>
<span class="st-green">Done</span>   <!-- dashboard -->
<span>Finished</span>                  <!-- list -->`,
    after: `<StatusBadge status="open" />
// label, icon and colour come from
// statuses.open + color.status.open.*`,
  },
};

const BENEFITS = [
  { t: "Design consistency", d: "Identical actions look and behave identically, because there is only one way to build them." },
  { t: "Development efficiency", d: "A new screen is assembled from existing parts; nobody writes button CSS again." },
  { t: "Maintenance", d: "A fix to Button reaches every screen at once instead of being repeated in four stylesheets." },
  { t: "Accessibility", d: "Labels, focus rings, contrast and ARIA are solved once, inside the component, and inherited everywhere." },
  { t: "Scalability", d: "New statuses or variants are added to the token set and the component – not invented per screen." },
  { t: "Collaboration", d: "Designers and developers share names: “Button / secondary / sm” means the same in a file, in code and in a review." },
];

export default function Consolidation() {
  const [group, setGroup] = useState<Group>("buttons");
  const inv = group === "buttons" ? inventory.buttons : group === "inputs" ? inventory.inputs : inventory.badges;
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-[24px] bg-ivory p-4 sm:p-5">
        <Segmented legend="Pattern" value={group} onChange={setGroup} options={[{ value: "buttons", label: "Buttons" }, { value: "inputs", label: "Inputs" }, { value: "badges", label: "Status badges" }]} />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="grid min-w-0 content-start gap-3 rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-5">
          <p className="eyebrow text-pink-deep">Before · {inv.before} separate patterns</p>
          <BeforeItems group={group} />
        </div>
        <div className="grid place-items-center" aria-hidden>
          <span className="grid h-12 w-12 rotate-90 place-items-center rounded-full bg-ink text-paper lg:rotate-0"><ArrowRight className="h-5 w-5" /></span>
        </div>
        <div className="grid min-w-0 content-start gap-3 rounded-[24px] bg-paper p-4 ring-1 ring-ink/10 sm:p-5">
          <p className="eyebrow text-lav-deep">After · 1 component{inv.variants.length ? ` · ${inv.variants.length} variants` : ""}{inv.states.length ? ` · ${inv.states.length} states` : ""}</p>
          <AfterComponent key={group} group={group} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CodeBlock secondary file="legacy styles" lang="css / html">{CODE[group].before}</CodeBlock>
        <CodeBlock secondary file="Kursion UI" lang="tsx">{CODE[group].after}</CodeBlock>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => (
          <li key={b.t} className="rounded-[20px] bg-paper p-5 ring-1 ring-ink/10">
            <p className="font-display text-lg font-bold tracking-tight">{b.t}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{b.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
