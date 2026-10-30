// Design tokens for "Kursion UI" – the unified design system of the fictional
// training management platform in the "From Chaos to Consistency" case study.
//
// primitive → semantic → component, the same layering as the multibrand project.
// Status colours are semantic tokens with a fixed vocabulary, so a status can
// never be shown in two different colours again.

import { contrast } from "@/lib/design-system/tokens";

type Tree = { [k: string]: string | Tree };

export const primitives = {
  color: {
    white: "#ffffff",
    cobalt: { 50: "#eef3ff", 100: "#dde7ff", 600: "#2d55d6", 700: "#2245b8", 800: "#1c3794" },
    neutral: { 0: "#ffffff", 25: "#fbfaf8", 50: "#f6f5f2", 100: "#eeece8", 200: "#dedbd5", 400: "#a19d95", 500: "#79756d", 600: "#5c5852", 700: "#45423d", 900: "#1f1d1a" },
    green: { 50: "#ecf7f0", 300: "#9bd3b0", 800: "#1d6b3f" },
    amber: { 50: "#fdf5e6", 300: "#efc777", 800: "#7a4b06" },
    red: { 50: "#fdf0ef", 300: "#f0a9a3", 600: "#c4342a", 700: "#a3271f", 800: "#86211a" },
    violet: { 50: "#f3effc", 300: "#c4b2ec", 800: "#5130a0" },
    blue: { 50: "#ebf4fc", 300: "#9cc6ec", 800: "#18548a" },
  },
  space: { 0: "0px", 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px", 6: "24px", 8: "32px", 10: "40px" },
  radius: { sm: "6px", md: "8px", lg: "12px", pill: "999px" },
  font: {
    family: { sans: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif', mono: '"Geist Mono Variable", ui-monospace, monospace' },
    size: { 12: "0.75rem", 13: "0.8125rem", 14: "0.875rem", 16: "1rem", 20: "1.25rem", 24: "1.5rem" },
    weight: { regular: "400", medium: "500", semibold: "600", bold: "700" },
  },
  shadow: { none: "none", sm: "0 1px 2px rgba(31,29,26,.06), 0 1px 3px rgba(31,29,26,.06)", lg: "0 24px 60px -18px rgba(31,29,26,.35)" },
  border: { 1: "1px", 2: "2px" },
  duration: { fast: "120ms", base: "180ms" },
} satisfies Tree;

export type StatusId = "draft" | "published" | "open" | "completed" | "cancelled";

/** The one vocabulary for training status. Every screen uses these labels. */
export const statuses: Record<StatusId, { label: string; meaning: string }> = {
  draft: { label: "Draft", meaning: "Being prepared. Not visible to participants." },
  published: { label: "Published", meaning: "Visible in the catalogue. Registration not open yet." },
  open: { label: "Registration open", meaning: "Visible and accepting registrations." },
  completed: { label: "Completed", meaning: "Training has taken place. Certificates can be issued." },
  cancelled: { label: "Cancelled", meaning: "Will not take place. Participants have been notified." },
};

export const semantic: Record<string, string> = {
  "color.bg.canvas": "{color.neutral.50}",
  "color.bg.surface": "{color.neutral.0}",
  "color.bg.subtle": "{color.neutral.25}",
  "color.bg.selected": "{color.cobalt.50}",
  "color.text.primary": "{color.neutral.900}",
  "color.text.secondary": "{color.neutral.600}",
  "color.text.inverse": "{color.white}",
  "color.action.primary": "{color.cobalt.700}",
  "color.action.primaryHover": "{color.cobalt.800}",
  "color.action.secondaryBorder": "{color.neutral.400}",
  "color.action.secondaryHover": "{color.neutral.50}",
  "color.action.destructive": "{color.red.700}",
  "color.action.destructiveHover": "{color.red.800}",
  "color.border.default": "{color.neutral.200}",
  "color.border.strong": "{color.neutral.500}",
  "color.border.focus": "{color.cobalt.600}",
  "color.disabled.bg": "{color.neutral.100}",
  "color.disabled.text": "{color.neutral.500}",
  "color.feedback.info.bg": "{color.blue.50}",
  "color.feedback.info.border": "{color.blue.300}",
  "color.feedback.info.text": "{color.blue.800}",
  "color.feedback.success.bg": "{color.green.50}",
  "color.feedback.success.border": "{color.green.300}",
  "color.feedback.success.text": "{color.green.800}",
  "color.feedback.warning.bg": "{color.amber.50}",
  "color.feedback.warning.border": "{color.amber.300}",
  "color.feedback.warning.text": "{color.amber.800}",
  "color.feedback.danger.bg": "{color.red.50}",
  "color.feedback.danger.border": "{color.red.300}",
  "color.feedback.danger.text": "{color.red.700}",
  "color.status.draft.bg": "{color.neutral.100}",
  "color.status.draft.text": "{color.neutral.700}",
  "color.status.published.bg": "{color.blue.50}",
  "color.status.published.text": "{color.blue.800}",
  "color.status.open.bg": "{color.green.50}",
  "color.status.open.text": "{color.green.800}",
  "color.status.completed.bg": "{color.violet.50}",
  "color.status.completed.text": "{color.violet.800}",
  "color.status.cancelled.bg": "{color.red.50}",
  "color.status.cancelled.text": "{color.red.800}",
  "space.inline.xs": "{space.1}",
  "space.inline.sm": "{space.2}",
  "space.inset.sm": "{space.3}",
  "space.inset.md": "{space.4}",
  "space.inset.lg": "{space.6}",
  "space.stack.md": "{space.4}",
  "space.stack.lg": "{space.6}",
  "size.control": "{space.10}",
  "radius.control": "{radius.md}",
  "radius.surface": "{radius.lg}",
  "radius.badge": "{radius.pill}",
  "font.family.base": "{font.family.sans}",
  "font.size.caption": "{font.size.12}",
  "font.size.small": "{font.size.13}",
  "font.size.body": "{font.size.14}",
  "font.size.title": "{font.size.20}",
  "font.size.display": "{font.size.24}",
  "font.weight.regular": "{font.weight.regular}",
  "font.weight.strong": "{font.weight.semibold}",
  "font.weight.heading": "{font.weight.bold}",
  "border.width.default": "{border.1}",
  "border.width.focus": "{border.2}",
  "shadow.surface": "{shadow.sm}",
  "shadow.overlay": "{shadow.lg}",
  "motion.base": "{duration.base}",
};

export const component: Record<string, string> = {
  "button.primary.bg": "{color.action.primary}",
  "button.primary.bgHover": "{color.action.primaryHover}",
  "button.primary.text": "{color.text.inverse}",
  "button.secondary.border": "{color.action.secondaryBorder}",
  "button.secondary.bgHover": "{color.action.secondaryHover}",
  "button.secondary.text": "{color.text.primary}",
  "button.destructive.bg": "{color.action.destructive}",
  "button.destructive.bgHover": "{color.action.destructiveHover}",
  "button.destructive.text": "{color.text.inverse}",
  "button.radius": "{radius.control}",
  "button.height": "{size.control}",
  "input.height": "{size.control}",
  "input.bg": "{color.bg.surface}",
  "input.border": "{color.border.strong}",
  "input.borderFocus": "{color.border.focus}",
  "input.borderError": "{color.feedback.danger.text}",
  "input.radius": "{radius.control}",
  "card.bg": "{color.bg.surface}",
  "card.border": "{color.border.default}",
  "card.radius": "{radius.surface}",
  "card.shadow": "{shadow.surface}",
  "card.padding": "{space.inset.lg}",
  "badge.radius": "{radius.badge}",
  "table.headerBg": "{color.bg.subtle}",
  "table.rowHover": "{color.bg.subtle}",
  "table.border": "{color.border.default}",
  "focus.ring": "{color.border.focus}",
  "focus.width": "{border.width.focus}",
};

/* ---------------------------------------------------------------- resolving */

function lookup(path: string): string | undefined {
  let node: string | Tree | undefined = primitives;
  for (const part of path.split(".")) {
    if (typeof node !== "object") return undefined;
    node = node[part];
  }
  return typeof node === "string" ? node : undefined;
}
const alias = (v: string) => /^\{(.+)\}$/.exec(v)?.[1];

export function chain(path: string): { path: string; level: "component" | "semantic" | "primitive"; value: string }[] {
  const out: { path: string; level: "component" | "semantic" | "primitive"; value: string }[] = [];
  let cur: string | undefined = path;
  for (let i = 0; cur && i < 6; i++) {
    const level = cur in component ? "component" : cur in semantic ? "semantic" : "primitive";
    const value = level === "component" ? component[cur] : level === "semantic" ? semantic[cur] : lookup(cur);
    if (value === undefined) break;
    out.push({ path: cur, level, value });
    cur = alias(value);
  }
  return out;
}
export const resolve = (path: string) => chain(path).at(-1)?.value ?? "";

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
export const cssVar = (path: string) => `--k-${path in component || path in semantic ? "" : "p-"}${kebab(path.replace(/\./g, "-"))}`;
const toCss = (v: string) => (alias(v) ? `var(${cssVar(alias(v)!)})` : v);

function flatPrimitives(node: Tree = primitives, prefix = ""): [string, string][] {
  return Object.entries(node).flatMap(([k, v]) => (typeof v === "string" ? [[prefix + k, v] as [string, string]] : flatPrimitives(v, `${prefix}${k}.`)));
}

/** One stylesheet with every level chained through var(). */
export function kursionStylesheet() {
  const decl = (e: [string, string][]) => e.map(([p, v]) => `${cssVar(p)}:${toCss(v)};`).join("");
  return `.k-root{${decl(flatPrimitives())}${decl(Object.entries(semantic))}${decl(Object.entries(component))}}`;
}

export const tokenCounts = { primitive: flatPrimitives().length, semantic: Object.keys(semantic).length, component: Object.keys(component).length };

/* ---------------------------------------------------------------- the "before" palette */

/**
 * Colours used by the illustrative legacy interface. Kept here so the
 * accessibility comparison is calculated from the same values that render it.
 */
export const legacy = {
  blue: "#1a73e8",
  blueAlt: "#3b82f6",
  green: "#5cb85c",
  orange: "#f0a020",
  red: "#e74c3c",
  grey: "#9aa0a6",
  text: "#333333",
  muted: "#999999",
  border: "#cccccc",
  borderLight: "#e3e3e3",
  bg: "#f4f6f8",
  white: "#ffffff",
};

export type ContrastPair = { id: string; label: string; before: { fg: string; bg: string; note: string }; after: { fg: string; bg: string; note: string }; min: 4.5 | 3 };

export const contrastPairs: ContrastPair[] = [
  { id: "save", label: "Primary button label", min: 4.5, before: { fg: legacy.white, bg: legacy.green, note: "White on green “Save”" }, after: { fg: resolve("button.primary.text"), bg: resolve("button.primary.bg"), note: "button.primary" } },
  { id: "placeholder", label: "Field label / placeholder", min: 4.5, before: { fg: legacy.grey, bg: legacy.white, note: "Placeholder used as label" }, after: { fg: resolve("color.text.primary"), bg: resolve("color.bg.surface"), note: "Persistent label" } },
  { id: "muted", label: "Secondary text", min: 4.5, before: { fg: legacy.muted, bg: legacy.white, note: "#999 helper text" }, after: { fg: resolve("color.text.secondary"), bg: resolve("color.bg.surface"), note: "color.text.secondary" } },
  { id: "open", label: "“Open” status", min: 4.5, before: { fg: legacy.orange, bg: legacy.white, note: "Orange text only" }, after: { fg: resolve("color.status.open.text"), bg: resolve("color.status.open.bg"), note: "status.open badge" } },
  { id: "error", label: "Error message", min: 4.5, before: { fg: legacy.red, bg: legacy.white, note: "#e74c3c on white" }, after: { fg: resolve("color.feedback.danger.text"), bg: resolve("color.bg.surface"), note: "feedback.danger.text" } },
  { id: "field", label: "Input border", min: 3, before: { fg: legacy.borderLight, bg: legacy.white, note: "#e3e3e3 underline field" }, after: { fg: resolve("input.border"), bg: resolve("color.bg.surface"), note: "input.border" } },
  { id: "focus", label: "Focus indicator", min: 3, before: { fg: legacy.white, bg: legacy.white, note: "outline: none – no indicator" }, after: { fg: resolve("focus.ring"), bg: resolve("color.bg.surface"), note: "focus.ring, 2px" } },
];

export function contrastReport() {
  return contrastPairs.map((p) => {
    const b = p.id === "focus" ? 1 : contrast(p.before.fg, p.before.bg) ?? 0;
    const a = contrast(p.after.fg, p.after.bg) ?? 0;
    return { ...p, beforeRatio: b, afterRatio: a, beforePass: b >= p.min, afterPass: a >= p.min };
  });
}

/** Text/background pairs every status badge must pass. */
export const statusContrast = () =>
  (Object.keys(statuses) as StatusId[]).map((s) => ({ status: s, ratio: contrast(resolve(`color.status.${s}.text`), resolve(`color.status.${s}.bg`)) ?? 0 }));
