"use client";
import { useState } from "react";
import clsx from "clsx";
import { Alert, Badge, BrandRoot, Button, Card, Checkbox, Dialog, Form, Heading, SelectField, Stack, Text, TextField } from "@/components/ds";
import { useBrand } from "@/lib/design-system/brand-store";
import { chain, type ComponentKey } from "@/lib/design-system/tokens";
import { BrandSwitcher, CodeBlock, Segmented, Swatch, TextInput, Toggle } from "./controls";

/* ------------------------------------------------------------------ helpers */

type V = Record<string, string | boolean>;

/** JSX source for the current configuration, omitting defaults. */
function jsx(name: string, props: Record<string, unknown>, children?: string) {
  const attrs = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== false && v !== "")
    .map(([k, v]) => (v === true ? k : typeof v === "string" ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`));
  const open = attrs.length > 2 ? `<${name}\n  ${attrs.join("\n  ")}\n` : `<${name}${attrs.length ? " " + attrs.join(" ") : ""}`;
  return children ? `${open}>\n${children}\n</${name}>` : `${open}${attrs.length > 2 ? "" : " "}/>`;
}
const force = (s: string | boolean) => (s === "hover" || s === "focus" ? s : undefined);
const opt = <T extends string>(...values: T[]) => values.map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) }));

const COURSES = [
  { value: "ux", label: "UX Foundations" },
  { value: "ds", label: "Design Systems in Practice" },
  { value: "fe", label: "Frontend with React" },
];

type Control = { id: string; label: string; kind: "radio"; options: { value: string; label: string }[] } | { id: string; label: string; kind: "text" } | { id: string; label: string; kind: "toggle" };

type Demo = {
  id: string;
  label: string;
  controls: Control[];
  initial: V;
  render: (v: V, ctx: { open: boolean; setOpen: (o: boolean) => void; done: boolean; setDone: (d: boolean) => void }) => React.ReactNode;
  code: (v: V) => string;
  tokens: (v: V) => ComponentKey[];
  note?: string;
};

/* ------------------------------------------------------------------ demos */

const DEMOS: Demo[] = [
  {
    id: "button",
    label: "Button",
    controls: [
      { id: "variant", label: "Variant", kind: "radio", options: opt("primary", "secondary", "outline") },
      { id: "size", label: "Size", kind: "radio", options: opt("sm", "md", "lg") },
      { id: "state", label: "State", kind: "radio", options: opt("default", "hover", "focus", "disabled") },
      { id: "icon", label: "Icon", kind: "radio", options: opt("none", "start", "end") },
      { id: "label", label: "Label", kind: "text" },
      { id: "fullWidth", label: "Full width", kind: "toggle" },
    ],
    initial: { variant: "primary", size: "md", state: "default", icon: "end", label: "Continue", fullWidth: false },
    render: (v) => (
      <Stack gap="spacing.component.lg">
        <Button
          label={String(v.label) || "Continue"}
          variant={v.variant as "primary"}
          size={v.size as "md"}
          disabled={v.state === "disabled"}
          forceState={force(v.state)}
          iconStart={v.icon === "start" ? "plus" : undefined}
          iconEnd={v.icon === "end" ? "arrow-right" : undefined}
          fullWidth={!!v.fullWidth}
        />
        <div className="ds-matrix" aria-label="All variants and sizes" role="group">
          <Text text="Variant × size" size="caption" tone="secondary" />
          <Stack gap="spacing.component.sm">
            {(["primary", "secondary", "outline"] as const).map((variant) => (
              <Stack key={variant} direction="horizontal" gap="spacing.component.sm" wrap>
                {(["sm", "md", "lg"] as const).map((size) => <Button key={size} label={size.toUpperCase()} variant={variant} size={size} />)}
              </Stack>
            ))}
          </Stack>
        </div>
      </Stack>
    ),
    code: (v) =>
      jsx("Button", {
        label: v.label || "Continue",
        variant: v.variant === "primary" ? undefined : v.variant,
        size: v.size === "md" ? undefined : v.size,
        iconStart: v.icon === "start" ? "plus" : undefined,
        iconEnd: v.icon === "end" ? "arrow-right" : undefined,
        fullWidth: v.fullWidth,
        disabled: v.state === "disabled",
      }),
    tokens: (v) => {
      if (v.state === "disabled") return ["button.disabled.background", "button.disabled.text", "button.radius", `button.height.${v.size}` as ComponentKey];
      const byVariant: Record<string, ComponentKey[]> = {
        primary: ["button.primary.background", "button.primary.backgroundHover", "button.primary.text"],
        secondary: ["button.secondary.background", "button.secondary.backgroundHover", "button.secondary.text"],
        outline: ["button.outline.border", "button.outline.text", "button.outline.backgroundHover"],
      };
      return [...byVariant[String(v.variant)], "button.radius", `button.height.${v.size}` as ComponentKey, `button.paddingX.${v.size}` as ComponentKey, ...(v.state === "focus" ? (["focus.ring.color", "focus.ring.width"] as ComponentKey[]) : [])];
    },
  },
  {
    id: "input",
    label: "Text input",
    controls: [
      { id: "size", label: "Size", kind: "radio", options: opt("sm", "md", "lg") },
      { id: "state", label: "State", kind: "radio", options: opt("default", "hover", "focus", "disabled", "error") },
      { id: "icon", label: "Icon", kind: "radio", options: opt("none", "start") },
      { id: "label", label: "Label", kind: "text" },
      { id: "hint", label: "Hint text", kind: "toggle" },
      { id: "required", label: "Required", kind: "toggle" },
    ],
    initial: { size: "md", state: "default", icon: "start", label: "Email", hint: true, required: true },
    render: (v) => (
      <TextField
        key={String(v.state)}
        name="email"
        type="email"
        label={String(v.label) || "Email"}
        placeholder="name@example.com"
        size={v.size as "md"}
        iconStart={v.icon === "start" ? "mail" : undefined}
        hint={v.hint ? "We only use this to send your receipt." : undefined}
        required={!!v.required}
        disabled={v.state === "disabled"}
        error={v.state === "error" ? "Enter an email address in the format name@example.com." : undefined}
        defaultValue={v.state === "error" ? "anna@example" : undefined}
        forceState={force(v.state)}
      />
    ),
    code: (v) =>
      jsx("TextField", {
        name: "email",
        type: "email",
        label: v.label || "Email",
        size: v.size === "md" ? undefined : v.size,
        iconStart: v.icon === "start" ? "mail" : undefined,
        hint: v.hint ? "We only use this to send your receipt." : undefined,
        required: v.required,
        disabled: v.state === "disabled",
        error: v.state === "error" ? "Enter an email address…" : undefined,
      }),
    tokens: (v) => {
      const border: Record<string, ComponentKey> = { default: "input.border.default", hover: "input.border.hover", focus: "input.border.focus", error: "input.border.error", disabled: "input.border.default" };
      return [border[String(v.state)], "input.background", "input.label", "input.radius", `input.height.${v.size}` as ComponentKey, ...(v.state === "error" ? (["input.error.text"] as ComponentKey[]) : []), ...(v.state === "focus" ? (["focus.ring.color"] as ComponentKey[]) : [])];
    },
  },
  {
    id: "select",
    label: "Select",
    controls: [
      { id: "size", label: "Size", kind: "radio", options: opt("sm", "md", "lg") },
      { id: "state", label: "State", kind: "radio", options: opt("default", "hover", "focus", "disabled", "error") },
      { id: "label", label: "Label", kind: "text" },
      { id: "required", label: "Required", kind: "toggle" },
    ],
    initial: { size: "md", state: "default", label: "Course", required: true },
    render: (v) => (
      <SelectField
        key={String(v.state)}
        name="course"
        label={String(v.label) || "Course"}
        placeholder="Choose a course"
        options={COURSES}
        size={v.size as "md"}
        required={!!v.required}
        disabled={v.state === "disabled"}
        error={v.state === "error" ? "Choose a course." : undefined}
        forceState={force(v.state)}
      />
    ),
    code: (v) =>
      jsx("SelectField", {
        name: "course",
        label: v.label || "Course",
        placeholder: "Choose a course",
        options: "{courses}",
        size: v.size === "md" ? undefined : v.size,
        required: v.required,
        disabled: v.state === "disabled",
      }).replace('options="{courses}"', "options={courses}"),
    tokens: (v) => [v.state === "error" ? "input.border.error" : v.state === "focus" ? "input.border.focus" : v.state === "hover" ? "input.border.hover" : "input.border.default", "input.background", "input.radius", `input.height.${v.size}` as ComponentKey],
    note: "A styled native <select>: the option list, keyboard support and mobile picker come from the browser.",
  },
  {
    id: "card",
    label: "Card",
    controls: [
      { id: "variant", label: "Variant", kind: "radio", options: opt("elevated", "outlined") },
      { id: "padding", label: "Padding token", kind: "radio", options: [{ value: "spacing.component.md", label: "md" }, { value: "spacing.component.lg", label: "lg" }, { value: "spacing.component.xl", label: "xl" }] },
      { id: "media", label: "Media", kind: "radio", options: opt("none", "pattern") },
      { id: "actions", label: "Actions", kind: "toggle" },
    ],
    initial: { variant: "elevated", padding: "spacing.component.lg", media: "pattern", actions: true },
    render: (v) => (
      <Card variant={v.variant as "elevated"} padding={v.padding as "spacing.component.lg"} media={v.media as "none"} maxWidth="sm">
        <Stack gap="spacing.component.xs">
          <Badge label="4 weeks" tone="info" size="sm" icon="calendar" />
          <Heading text="Design Systems in Practice" level={3} />
          <Text text="Tokens, components and documentation – built with a real component library." tone="secondary" />
        </Stack>
        {v.actions && (
          <Stack direction="horizontal" gap="spacing.component.sm" wrap>
            <Button label="Enrol" />
            <Button label="Details" variant="outline" />
          </Stack>
        )}
      </Card>
    ),
    code: (v) =>
      jsx(
        "Card",
        { variant: v.variant === "elevated" ? undefined : v.variant, padding: v.padding === "spacing.component.lg" ? undefined : v.padding, media: v.media === "none" ? undefined : v.media },
        `  <Heading text="Design Systems in Practice" level={3} />\n  <Text text="Tokens, components and…" tone="secondary" />${v.actions ? '\n  <Button label="Enrol" />' : ""}`,
      ),
    tokens: (v) => ["card.background", "card.border", "card.radius", ...(v.variant === "elevated" ? (["card.shadow"] as ComponentKey[]) : []), ...(v.media === "pattern" ? (["card.media"] as ComponentKey[]) : [])],
  },
  {
    id: "badge",
    label: "Badge",
    controls: [
      { id: "tone", label: "Tone", kind: "radio", options: opt("neutral", "info", "success", "warning", "danger") },
      { id: "size", label: "Size", kind: "radio", options: opt("sm", "md") },
      { id: "icon", label: "Icon", kind: "toggle" },
      { id: "label", label: "Label", kind: "text" },
    ],
    initial: { tone: "success", size: "md", icon: true, label: "In stock" },
    render: (v) => (
      <Stack gap="spacing.component.lg">
        <Badge label={String(v.label) || "Badge"} tone={v.tone as "info"} size={v.size as "md"} icon={v.icon ? "check" : undefined} />
        <Stack direction="horizontal" gap="spacing.component.sm" wrap>
          {(["neutral", "info", "success", "warning", "danger"] as const).map((t) => <Badge key={t} label={t[0].toUpperCase() + t.slice(1)} tone={t} size="sm" />)}
        </Stack>
      </Stack>
    ),
    code: (v) => jsx("Badge", { label: v.label || "Badge", tone: v.tone === "neutral" ? undefined : v.tone, size: v.size === "md" ? undefined : v.size, icon: v.icon ? "check" : undefined }),
    tokens: (v) => [`badge.${v.tone}.background` as ComponentKey, `badge.${v.tone}.text` as ComponentKey, "badge.radius"],
    note: "Badges are not interactive. Meaning is always in the text, so colour is never the only signal.",
  },
  {
    id: "alert",
    label: "Alert",
    controls: [
      { id: "tone", label: "Tone", kind: "radio", options: opt("info", "success", "warning", "danger") },
      { id: "title", label: "Title", kind: "toggle" },
      { id: "dismiss", label: "Dismissible", kind: "toggle" },
    ],
    initial: { tone: "warning", title: true, dismiss: true },
    render: (v, ctx) =>
      ctx.done ? (
        <Button label="Show the alert again" variant="outline" size="sm" onClick={() => ctx.setDone(false)} />
      ) : (
        <Alert
          tone={v.tone as "info"}
          title={v.title ? { info: "Registration opens on 3 March", success: "Payment received", warning: "Only 3 places left", danger: "Payment failed" }[String(v.tone)] : undefined}
          text={{ info: "We'll email you when places become available.", success: "Your place on the course is confirmed.", warning: "Complete your registration soon to keep your place.", danger: "Your card was declined. Try another card or contact your bank." }[String(v.tone)]}
          onDismiss={v.dismiss ? () => ctx.setDone(true) : undefined}
        />
      ),
    code: (v) => jsx("Alert", { tone: v.tone === "info" ? undefined : v.tone, title: v.title ? "…" : undefined, text: "…", onDismiss: v.dismiss ? "{close}" : undefined }).replace('onDismiss="{close}"', "onDismiss={close}"),
    tokens: (v) => [`alert.${v.tone}.background` as ComponentKey, `alert.${v.tone}.border` as ComponentKey, `alert.${v.tone}.text` as ComponentKey, "alert.radius"],
    note: "Warning and danger use role=\"alert\" and are announced immediately; info and success use role=\"status\".",
  },
  {
    id: "dialog",
    label: "Dialog",
    controls: [
      { id: "title", label: "Title", kind: "text" },
      { id: "confirm", label: "Confirm label", kind: "text" },
    ],
    initial: { title: "Delete this draft?", confirm: "Delete draft" },
    render: (v, ctx) => (
      <Stack gap="spacing.component.md" align="start">
        <Button label="Delete draft" variant="outline" onClick={() => ctx.setOpen(true)} />
        {ctx.done && <Alert tone="success" text="Draft deleted. (Demo – nothing was removed.)" onDismiss={() => ctx.setDone(false)} />}
        <Dialog
          open={ctx.open}
          onClose={() => ctx.setOpen(false)}
          onConfirm={() => ctx.setDone(true)}
          title={String(v.title) || "Delete this draft?"}
          text="The draft and its notes will be removed. You can't undo this."
          confirmLabel={String(v.confirm) || "Delete draft"}
        />
      </Stack>
    ),
    code: (v) => `const [open, setOpen] = useState(false);\n\n<Button label="Delete draft" variant="outline" onClick={() => setOpen(true)} />\n${jsx("Dialog", { open: "{open}", onClose: "{() => setOpen(false)}", title: v.title, text: "The draft and its notes…", confirmLabel: v.confirm })
      .replace('open="{open}"', "open={open}")
      .replace('onClose="{() => setOpen(false)}"', "onClose={() => setOpen(false)}")}`,
    tokens: () => ["dialog.background", "dialog.radius", "dialog.shadow", "dialog.scrim"],
    note: "Open it with the keyboard: Tab to the button, press Enter. Esc closes it and focus returns to the button.",
  },
  {
    id: "validation",
    label: "Form validation",
    controls: [],
    initial: {},
    render: () => (
      <Card maxWidth="md" padding="spacing.component.lg">
        <Heading text="Join the waiting list" level={3} />
        <Form successMessage="You're on the list. (Demo – nothing was sent.)">
          <Stack direction="responsive" gap="spacing.component.md">
            <TextField name="name" label="Full name" autoComplete="name" required />
            <TextField name="email" label="Email" type="email" autoComplete="email" required hint="Format: name@example.com" />
          </Stack>
          <SelectField name="course" label="Course" placeholder="Choose a course" options={COURSES} required />
          <TextField name="goal" label="What do you want to learn?" multiline minLength={20} hint="Optional. If you write something, use at least 20 characters." />
          <Checkbox name="terms" label="I agree to the privacy notice." required />
          <Button label="Join the list" type="submit" iconEnd="arrow-right" />
        </Form>
      </Card>
    ),
    code: () =>
      `<Form successMessage="You're on the list.">\n  <TextField name="name" label="Full name" required />\n  <TextField name="email" label="Email" type="email" required />\n  <SelectField name="course" label="Course" options={courses} required />\n  <TextField name="goal" label="What do you want to learn?" multiline minLength={20} />\n  <Checkbox name="terms" label="I agree to the privacy notice." required />\n  <Button label="Join the list" type="submit" />\n</Form>`,
    tokens: () => ["input.border.error", "input.error.text", "alert.danger.background", "alert.danger.text", "alert.success.background"],
    note: "Submit it empty: an error summary takes focus and links to each field. Fields re-check as you fix them – never while you type your first attempt.",
  },
];

const VIEWPORTS = [
  { value: "mobile", label: "Mobile", width: 360 },
  { value: "tablet", label: "Tablet", width: 600 },
  { value: "full", label: "Fill", width: 0 },
] as const;
type Viewport = (typeof VIEWPORTS)[number]["value"];

/* ------------------------------------------------------------------ component */

export default function Playground() {
  const [brand] = useBrand();
  const [demoId, setDemoId] = useState(DEMOS[0].id);
  const [values, setValues] = useState<Record<string, V>>(() => Object.fromEntries(DEMOS.map((d) => [d.id, d.initial])));
  const [viewport, setViewport] = useState<Viewport>("full");
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const demo = DEMOS.find((d) => d.id === demoId)!;
  const v = values[demo.id];
  const set = (k: string, val: string | boolean) => setValues((all) => ({ ...all, [demo.id]: { ...all[demo.id], [k]: val } }));
  const width = VIEWPORTS.find((x) => x.value === viewport)!.width;

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col gap-4 rounded-[24px] bg-ivory p-4 sm:p-5 lg:flex-row lg:items-end lg:justify-between">
        <Segmented
          legend="Component"
          value={demoId}
          onChange={(id) => {
            setDemoId(id);
            setOpen(false);
            setDone(false);
          }}
          options={DEMOS.map((d) => ({ value: d.id, label: d.label }))}
        />
        <BrandSwitcher size="sm" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col overflow-hidden rounded-[24px] ring-1 ring-ink/10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-paper px-4 py-2.5">
            <p className="font-mono text-xs text-ink-soft" aria-live="polite">
              {demo.label}
              {Object.entries(v)
                .filter(([k]) => ["variant", "size", "state", "tone"].includes(k))
                .map(([, val]) => ` · ${val}`)
                .join("")}
            </p>
            <Segmented legend="Preview width" hideLegend size="sm" value={viewport} onChange={setViewport} options={VIEWPORTS.map((x) => ({ value: x.value, label: x.label }))} />
          </div>
          <div className="tech-grid flex-1 overflow-x-auto bg-[#f4f2f7] p-3 sm:p-6">
            <div className="mx-auto transition-[max-width] duration-500" style={{ maxWidth: width ? width : "100%" }}>
              <BrandRoot brand={brand} className="min-h-[260px] rounded-2xl p-5 sm:p-8">
                {demo.render(v, { open, setOpen, done, setDone })}
              </BrandRoot>
            </div>
          </div>
          {demo.note && <p className="border-t border-ink/10 bg-paper px-4 py-3 text-sm text-ink-soft">{demo.note}</p>}
        </div>

        <div className="grid grid-cols-1 content-start gap-4">
          {demo.controls.length > 0 && (
            <div className="grid grid-cols-1 gap-5 rounded-[24px] bg-paper p-5 ring-1 ring-ink/10">
              <p className="font-display text-lg font-bold tracking-tight">Properties</p>
              {demo.controls.map((c) =>
                c.kind === "radio" ? (
                  <Segmented key={c.id} legend={c.label} size="sm" value={String(v[c.id])} onChange={(val) => set(c.id, val)} options={c.options} />
                ) : c.kind === "text" ? (
                  <TextInput key={c.id} label={c.label} value={String(v[c.id])} onChange={(val) => set(c.id, val)} />
                ) : (
                  <Toggle key={c.id} label={c.label} checked={!!v[c.id]} onChange={(val) => set(c.id, val)} />
                ),
              )}
            </div>
          )}
          <div className="rounded-[24px] bg-paper p-5 ring-1 ring-ink/10">
            <p className="font-display text-lg font-bold tracking-tight">Tokens in use</p>
            <ul className="mt-3 grid grid-cols-1 gap-2">
              {demo.tokens(v).map((t) => {
                const steps = chain(t, brand);
                const raw = steps[steps.length - 1]?.value ?? "";
                return (
                  <li key={t} className="flex items-start gap-2 text-[12px]">
                    <Swatch value={raw} className="mt-0.5" />
                    <span className="min-w-0">
                      <span className="block font-mono font-semibold">{t}</span>
                      <span className="block truncate font-mono text-ink-soft">→ {steps.slice(1).map((s) => s.path).join(" → ")} = {raw}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <CodeBlock file={`${demo.label.replace(" ", "")}.tsx`} lang="tsx" note="Generated from the current properties. Props match the component contract one-to-one.">
        {demo.code(v)}
      </CodeBlock>
    </div>
  );
}
