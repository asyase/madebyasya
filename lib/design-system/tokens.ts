// Design tokens for the AI-Ready Multibrand Design System prototype.
//
// Three levels, each one only allowed to reference the level below it:
//   primitive  – raw values (hex, px, font stacks). Brand-agnostic.
//   semantic   – meaning ("color.action.primary"). One set per brand, aliasing primitives.
//   component  – where a value is used ("button.primary.background"). Shared by all
//                brands, aliasing semantic tokens. A brand may override a component
//                token, but only with another semantic alias.
//
// Aliases use the Design Tokens Community Group syntax: "{color.violet.700}".
// In CSS every level becomes a custom property that points at the level below,
// so changing one semantic token updates every component that depends on it.

export type BrandId = "aster" | "kord" | "mira";

type Tree = { [key: string]: string | Tree };

export const primitives = {
  color: {
    white: "#ffffff",
    violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95" },
    teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a" },
    coral: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12" },
    neutral: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917", 950: "#0c0a09" },
    red: { 50: "#fef2f2", 300: "#fca5a5", 700: "#b91c1c", 800: "#991b1b", 950: "#450a0a" },
    green: { 50: "#f0fdf4", 300: "#86efac", 700: "#15803d", 800: "#166534", 950: "#052e16" },
    amber: { 50: "#fffbeb", 300: "#fcd34d", 800: "#92400e", 900: "#78350f", 950: "#451a03" },
    blue: { 50: "#eff6ff", 300: "#93c5fd", 800: "#1e40af", 950: "#172554" },
    alpha: { scrimLight: "rgba(28, 25, 23, 0.55)", scrimDark: "rgba(0, 0, 0, 0.72)" },
  },
  space: { 0: "0px", 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px", 6: "24px", 8: "32px", 10: "40px", 11: "44px", 12: "48px", 13: "52px" },
  radius: { none: "0px", xs: "2px", sm: "4px", md: "8px", lg: "12px", xl: "20px", pill: "999px" },
  font: {
    family: {
      grotesk: "var(--font-display), system-ui, sans-serif",
      serif: "var(--font-serif), Georgia, serif",
      sans: '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif',
      mono: '"Geist Mono Variable", "Geist Mono", ui-monospace, monospace',
    },
    size: { 12: "0.75rem", 14: "0.875rem", 16: "1rem", 18: "1.125rem", 20: "1.25rem", 24: "1.5rem", 30: "1.875rem", 36: "2.25rem" },
    weight: { regular: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800" },
    tracking: { tight: "-0.03em", snug: "-0.015em", normal: "0em" },
  },
  shadow: {
    none: "none",
    sm: "0 1px 2px rgba(28, 25, 23, 0.06), 0 1px 3px rgba(28, 25, 23, 0.08)",
    md: "0 10px 30px -12px rgba(28, 25, 23, 0.18), 0 2px 6px rgba(28, 25, 23, 0.06)",
    xl: "0 30px 70px -20px rgba(0, 0, 0, 0.45)",
  },
  border: { width: { 1: "1px", 2: "2px" } },
  duration: { fast: "120ms", base: "200ms" },
} satisfies Tree;

/** Semantic tokens every brand must define. The list is the contract between brands. */
export const semanticKeys = [
  "color.background.primary", "color.background.surface", "color.background.subtle",
  "color.text.primary", "color.text.secondary", "color.text.onAction",
  "color.action.primary", "color.action.primaryHover", "color.action.secondary", "color.action.secondaryHover", "color.action.onSecondary",
  "color.border.default", "color.border.strong", "color.border.hover", "color.border.focus",
  "color.feedback.info.background", "color.feedback.info.border", "color.feedback.info.text",
  "color.feedback.success.background", "color.feedback.success.border", "color.feedback.success.text",
  "color.feedback.warning.background", "color.feedback.warning.border", "color.feedback.warning.text",
  "color.feedback.danger.background", "color.feedback.danger.border", "color.feedback.danger.text",
  "color.disabled.background", "color.disabled.text", "color.overlay.scrim",
  "spacing.component.xs", "spacing.component.sm", "spacing.component.md", "spacing.component.lg", "spacing.component.xl",
  "size.control.sm", "size.control.md", "size.control.lg",
  "radius.control", "radius.field", "radius.surface", "radius.badge",
  "font.family.heading", "font.family.body", "font.weight.heading", "font.weight.strong", "font.tracking.heading",
  "font.size.caption", "font.size.small", "font.size.body", "font.size.lead", "font.size.title", "font.size.display",
  "shadow.surface", "shadow.overlay",
  "border.width.default", "border.width.focus",
  "motion.duration.base",
] as const;
export type SemanticKey = (typeof semanticKeys)[number];
type SemanticSet = Record<SemanticKey, string>;

// Values shared by every brand unless the brand overrides them.
const sharedSemantic: Partial<SemanticSet> = {
  "color.border.focus": "{color.action.primary}",
  "spacing.component.xs": "{space.1}",
  "spacing.component.sm": "{space.2}",
  "spacing.component.md": "{space.4}",
  "spacing.component.lg": "{space.6}",
  "spacing.component.xl": "{space.8}",
  "font.family.body": "{font.family.sans}",
  "font.weight.strong": "{font.weight.semibold}",
  "font.size.caption": "{font.size.12}",
  "font.size.small": "{font.size.14}",
  "font.size.body": "{font.size.16}",
  "font.size.lead": "{font.size.18}",
  "font.size.title": "{font.size.24}",
  "font.size.display": "{font.size.30}",
  "border.width.default": "{border.width.1}",
  "border.width.focus": "{border.width.2}",
  "motion.duration.base": "{duration.base}",
};

export type Brand = {
  id: BrandId;
  label: string; // "Brand A"
  name: string; // fictional brand name
  sector: string;
  personality: string;
  semantic: SemanticSet;
  /** Brand-level component overrides. Values must alias semantic tokens. */
  componentOverrides?: Partial<Record<ComponentKey, string>>;
};

export const brands: Brand[] = [
  {
    id: "aster",
    label: "Brand A",
    name: "Aster Academy",
    sector: "Online learning",
    personality: "Friendly and encouraging – soft violet, rounded controls, a grotesk display face.",
    semantic: {
      ...(sharedSemantic as SemanticSet),
      "color.background.primary": "{color.neutral.50}",
      "color.background.surface": "{color.white}",
      "color.background.subtle": "{color.violet.50}",
      "color.text.primary": "{color.neutral.900}",
      "color.text.secondary": "{color.neutral.600}",
      "color.text.onAction": "{color.white}",
      "color.action.primary": "{color.violet.700}",
      "color.action.primaryHover": "{color.violet.800}",
      "color.action.secondary": "{color.violet.100}",
      "color.action.secondaryHover": "{color.violet.200}",
      "color.action.onSecondary": "{color.violet.800}",
      "color.border.default": "{color.neutral.200}",
      "color.border.strong": "{color.neutral.500}",
      "color.border.hover": "{color.neutral.700}",
      "color.feedback.info.background": "{color.blue.50}",
      "color.feedback.info.border": "{color.blue.300}",
      "color.feedback.info.text": "{color.blue.800}",
      "color.feedback.success.background": "{color.green.50}",
      "color.feedback.success.border": "{color.green.300}",
      "color.feedback.success.text": "{color.green.800}",
      "color.feedback.warning.background": "{color.amber.50}",
      "color.feedback.warning.border": "{color.amber.300}",
      "color.feedback.warning.text": "{color.amber.900}",
      "color.feedback.danger.background": "{color.red.50}",
      "color.feedback.danger.border": "{color.red.300}",
      "color.feedback.danger.text": "{color.red.700}",
      "color.disabled.background": "{color.neutral.100}",
      "color.disabled.text": "{color.neutral.400}",
      "color.overlay.scrim": "{color.alpha.scrimLight}",
      "size.control.sm": "{space.8}",
      "size.control.md": "{space.10}",
      "size.control.lg": "{space.12}",
      "radius.control": "{radius.pill}",
      "radius.field": "{radius.lg}",
      "radius.surface": "{radius.xl}",
      "radius.badge": "{radius.pill}",
      "font.family.heading": "{font.family.grotesk}",
      "font.weight.heading": "{font.weight.bold}",
      "font.tracking.heading": "{font.tracking.snug}",
      "shadow.surface": "{shadow.md}",
      "shadow.overlay": "{shadow.xl}",
    },
  },
  {
    id: "kord",
    label: "Brand B",
    name: "Kord Energy",
    sector: "Utility self-service",
    personality: "Calm and trustworthy – deep teal, sharp corners, an editorial serif, generous control height.",
    semantic: {
      ...(sharedSemantic as SemanticSet),
      "color.background.primary": "{color.neutral.100}",
      "color.background.surface": "{color.white}",
      "color.background.subtle": "{color.teal.50}",
      "color.text.primary": "{color.neutral.950}",
      "color.text.secondary": "{color.neutral.600}",
      "color.text.onAction": "{color.white}",
      "color.action.primary": "{color.teal.800}",
      "color.action.primaryHover": "{color.teal.900}",
      "color.action.secondary": "{color.neutral.200}",
      "color.action.secondaryHover": "{color.neutral.300}",
      "color.action.onSecondary": "{color.neutral.900}",
      "color.border.default": "{color.neutral.300}",
      "color.border.strong": "{color.neutral.600}",
      "color.border.hover": "{color.neutral.900}",
      "color.feedback.info.background": "{color.blue.50}",
      "color.feedback.info.border": "{color.blue.800}",
      "color.feedback.info.text": "{color.blue.800}",
      "color.feedback.success.background": "{color.green.50}",
      "color.feedback.success.border": "{color.green.800}",
      "color.feedback.success.text": "{color.green.800}",
      "color.feedback.warning.background": "{color.amber.50}",
      "color.feedback.warning.border": "{color.amber.800}",
      "color.feedback.warning.text": "{color.amber.900}",
      "color.feedback.danger.background": "{color.red.50}",
      "color.feedback.danger.border": "{color.red.800}",
      "color.feedback.danger.text": "{color.red.800}",
      "color.disabled.background": "{color.neutral.200}",
      "color.disabled.text": "{color.neutral.500}",
      "color.overlay.scrim": "{color.alpha.scrimLight}",
      "size.control.sm": "{space.8}",
      "size.control.md": "{space.11}",
      "size.control.lg": "{space.13}",
      "radius.control": "{radius.xs}",
      "radius.field": "{radius.xs}",
      "radius.surface": "{radius.sm}",
      "radius.badge": "{radius.xs}",
      "font.family.heading": "{font.family.serif}",
      "font.weight.heading": "{font.weight.regular}",
      "font.tracking.heading": "{font.tracking.normal}",
      "font.size.title": "{font.size.30}",
      "font.size.display": "{font.size.36}",
      "shadow.surface": "{shadow.none}",
      "shadow.overlay": "{shadow.xl}",
    },
    componentOverrides: {
      // Kord marks cards with a stronger outline instead of a shadow.
      "card.border": "{color.border.strong}",
    },
  },
  {
    id: "mira",
    label: "Brand C",
    name: "Mira Market",
    sector: "Retail, dark interface",
    personality: "Bold and energetic – coral actions on a near-black surface, heavy display type.",
    semantic: {
      ...(sharedSemantic as SemanticSet),
      "color.background.primary": "{color.neutral.950}",
      "color.background.surface": "{color.neutral.900}",
      "color.background.subtle": "{color.neutral.800}",
      "color.text.primary": "{color.neutral.50}",
      "color.text.secondary": "{color.neutral.400}",
      "color.text.onAction": "{color.neutral.950}",
      "color.action.primary": "{color.coral.400}",
      "color.action.primaryHover": "{color.coral.300}",
      "color.action.secondary": "{color.neutral.800}",
      "color.action.secondaryHover": "{color.neutral.700}",
      "color.action.onSecondary": "{color.neutral.50}",
      "color.border.default": "{color.neutral.800}",
      "color.border.strong": "{color.neutral.500}",
      "color.border.hover": "{color.neutral.300}",
      "color.feedback.info.background": "{color.blue.950}",
      "color.feedback.info.border": "{color.blue.800}",
      "color.feedback.info.text": "{color.blue.300}",
      "color.feedback.success.background": "{color.green.950}",
      "color.feedback.success.border": "{color.green.800}",
      "color.feedback.success.text": "{color.green.300}",
      "color.feedback.warning.background": "{color.amber.950}",
      "color.feedback.warning.border": "{color.amber.800}",
      "color.feedback.warning.text": "{color.amber.300}",
      "color.feedback.danger.background": "{color.red.950}",
      "color.feedback.danger.border": "{color.red.800}",
      "color.feedback.danger.text": "{color.red.300}",
      "color.disabled.background": "{color.neutral.800}",
      "color.disabled.text": "{color.neutral.500}",
      "color.overlay.scrim": "{color.alpha.scrimDark}",
      "size.control.sm": "{space.8}",
      "size.control.md": "{space.10}",
      "size.control.lg": "{space.12}",
      "radius.control": "{radius.md}",
      "radius.field": "{radius.md}",
      "radius.surface": "{radius.lg}",
      "radius.badge": "{radius.sm}",
      "font.family.heading": "{font.family.grotesk}",
      "font.weight.heading": "{font.weight.extrabold}",
      "font.tracking.heading": "{font.tracking.tight}",
      "shadow.surface": "{shadow.none}",
      "shadow.overlay": "{shadow.xl}",
    },
  },
];

/** Component tokens: shared by every brand, aliasing semantic tokens only. */
export const componentTokens = {
  "button.primary.background": "{color.action.primary}",
  "button.primary.backgroundHover": "{color.action.primaryHover}",
  "button.primary.text": "{color.text.onAction}",
  "button.secondary.background": "{color.action.secondary}",
  "button.secondary.backgroundHover": "{color.action.secondaryHover}",
  "button.secondary.text": "{color.action.onSecondary}",
  "button.outline.border": "{color.action.primary}",
  "button.outline.text": "{color.action.primary}",
  "button.outline.backgroundHover": "{color.background.subtle}",
  "button.disabled.background": "{color.disabled.background}",
  "button.disabled.text": "{color.disabled.text}",
  "button.radius": "{radius.control}",
  "button.fontWeight": "{font.weight.strong}",
  "button.height.sm": "{size.control.sm}",
  "button.height.md": "{size.control.md}",
  "button.height.lg": "{size.control.lg}",
  "button.paddingX.sm": "{spacing.component.sm}",
  "button.paddingX.md": "{spacing.component.md}",
  "button.paddingX.lg": "{spacing.component.lg}",
  "input.background": "{color.background.surface}",
  "input.text": "{color.text.primary}",
  "input.placeholder": "{color.text.secondary}",
  "input.label": "{color.text.primary}",
  "input.hint": "{color.text.secondary}",
  "input.border.default": "{color.border.strong}",
  "input.border.hover": "{color.border.hover}",
  "input.border.focus": "{color.border.focus}",
  "input.border.error": "{color.feedback.danger.text}",
  "input.error.text": "{color.feedback.danger.text}",
  "input.radius": "{radius.field}",
  "input.height.sm": "{size.control.sm}",
  "input.height.md": "{size.control.md}",
  "input.height.lg": "{size.control.lg}",
  "input.paddingX": "{spacing.component.sm}",
  "checkbox.checked.background": "{color.action.primary}",
  "checkbox.checked.mark": "{color.text.onAction}",
  "card.background": "{color.background.surface}",
  "card.border": "{color.border.default}",
  "card.radius": "{radius.surface}",
  "card.shadow": "{shadow.surface}",
  "card.media": "{color.background.subtle}",
  "badge.radius": "{radius.badge}",
  "badge.neutral.background": "{color.background.subtle}",
  "badge.neutral.text": "{color.text.primary}",
  "badge.info.background": "{color.feedback.info.background}",
  "badge.info.text": "{color.feedback.info.text}",
  "badge.success.background": "{color.feedback.success.background}",
  "badge.success.text": "{color.feedback.success.text}",
  "badge.warning.background": "{color.feedback.warning.background}",
  "badge.warning.text": "{color.feedback.warning.text}",
  "badge.danger.background": "{color.feedback.danger.background}",
  "badge.danger.text": "{color.feedback.danger.text}",
  "alert.radius": "{radius.field}",
  "alert.info.background": "{color.feedback.info.background}",
  "alert.info.border": "{color.feedback.info.border}",
  "alert.info.text": "{color.feedback.info.text}",
  "alert.success.background": "{color.feedback.success.background}",
  "alert.success.border": "{color.feedback.success.border}",
  "alert.success.text": "{color.feedback.success.text}",
  "alert.warning.background": "{color.feedback.warning.background}",
  "alert.warning.border": "{color.feedback.warning.border}",
  "alert.warning.text": "{color.feedback.warning.text}",
  "alert.danger.background": "{color.feedback.danger.background}",
  "alert.danger.border": "{color.feedback.danger.border}",
  "alert.danger.text": "{color.feedback.danger.text}",
  "dialog.background": "{color.background.surface}",
  "dialog.radius": "{radius.surface}",
  "dialog.shadow": "{shadow.overlay}",
  "dialog.scrim": "{color.overlay.scrim}",
  "focus.ring.color": "{color.border.focus}",
  "focus.ring.width": "{border.width.focus}",
} as const;
export type ComponentKey = keyof typeof componentTokens;

export const getBrand = (id: BrandId) => brands.find((b) => b.id === id)!;

/* ------------------------------------------------------------------ resolving */

export type Level = "primitive" | "semantic" | "component";

function lookup(tree: Tree, path: string): string | undefined {
  let node: string | Tree | undefined = tree;
  for (const part of path.split(".")) {
    if (typeof node !== "object" || node === null) return undefined;
    node = node[part];
  }
  return typeof node === "string" ? node : undefined;
}

const aliasOf = (value: string) => /^\{(.+)\}$/.exec(value)?.[1];

/** Every primitive as a flat list of [path, value]. */
export function flatPrimitives(): [string, string][] {
  const out: [string, string][] = [];
  const walk = (node: Tree, prefix: string) => {
    for (const [k, v] of Object.entries(node)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (typeof v === "string") out.push([path, v]);
      else walk(v, path);
    }
  };
  walk(primitives, "");
  return out;
}

export type SemanticOverrides = Partial<Record<SemanticKey, string>>;

function semanticFor(brand: Brand, overrides?: SemanticOverrides): SemanticSet {
  return { ...brand.semantic, ...overrides };
}

function componentFor(brand: Brand): Record<ComponentKey, string> {
  return { ...componentTokens, ...brand.componentOverrides };
}

export function levelOf(path: string): Level {
  if ((semanticKeys as readonly string[]).includes(path)) return "semantic";
  if (path in componentTokens) return "component";
  return "primitive";
}

/** The alias chain from any token down to its raw value, for one brand. */
export function chain(path: string, brandId: BrandId, overrides?: SemanticOverrides): { path: string; level: Level; value: string }[] {
  const brand = getBrand(brandId);
  const sem = semanticFor(brand, overrides);
  const comp = componentFor(brand);
  const steps: { path: string; level: Level; value: string }[] = [];
  let current: string | undefined = path;
  for (let guard = 0; current && guard < 8; guard++) {
    const level = levelOf(current);
    const value: string | undefined = level === "component" ? comp[current as ComponentKey] : level === "semantic" ? sem[current as SemanticKey] : lookup(primitives, current);
    if (value === undefined) break;
    steps.push({ path: current, level, value });
    current = aliasOf(value);
  }
  return steps;
}

/** Final raw value of a token for a brand. */
export function resolve(path: string, brandId: BrandId, overrides?: SemanticOverrides): string {
  const steps = chain(path, brandId, overrides);
  return steps[steps.length - 1]?.value ?? "";
}

/* ------------------------------------------------------------------ CSS output */

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/** "button.primary.backgroundHover" → "--ds-button-primary-background-hover" (primitives get a "p-" prefix). */
export function cssVar(path: string) {
  const name = kebab(path.replace(/\./g, "-"));
  return levelOf(path) === "primitive" ? `--ds-p-${name}` : `--ds-${name}`;
}
const toCss = (value: string) => {
  const alias = aliasOf(value);
  return alias ? `var(${cssVar(alias)})` : value;
};

/**
 * The whole token set as one stylesheet. Primitives and component tokens sit on
 * .ds-root; each brand adds its semantic layer. Every level points at the one
 * below with var(), the same chain a designer would see in a token tool.
 */
export function tokenStylesheet(): string {
  const decl = (entries: [string, string][]) => entries.map(([path, value]) => `${cssVar(path)}:${toCss(value)};`).join("");
  let css = `.ds-root{${decl(flatPrimitives())}${decl(Object.entries(componentTokens))}}`;
  for (const b of brands) {
    css += `.ds-root[data-brand="${b.id}"]{${decl(Object.entries(b.semantic))}${decl(Object.entries(b.componentOverrides ?? {}))}}`;
  }
  return css;
}

/** Inline custom properties for live semantic overrides (the token editor). */
export function overrideVariables(overrides?: SemanticOverrides): Record<string, string> {
  return Object.fromEntries(Object.entries(overrides ?? {}).map(([path, value]) => [cssVar(path), toCss(value as string)]));
}

/** DTCG-style JSON export of the whole token set (used for /design-system/tokens.json). */
export function tokensDocument() {
  const nest = (entries: [string, string][], type: (path: string) => string) => {
    const root: Record<string, unknown> = {};
    for (const [path, value] of entries) {
      const parts = path.split(".");
      let node = root;
      for (const p of parts.slice(0, -1)) node = (node[p] ??= {}) as Record<string, unknown>;
      node[parts[parts.length - 1]] = { $value: value, $type: type(path) };
    }
    return root;
  };
  const typeOf = (path: string) => {
    const resolved = path.startsWith("color") ? "color" : path.startsWith("shadow") ? "shadow" : path.startsWith("font.family") ? "fontFamily" : path.startsWith("font.weight") ? "fontWeight" : path.startsWith("duration") || path.startsWith("motion") ? "duration" : "dimension";
    return resolved;
  };
  return {
    $description: "AI-Ready Multibrand Design System – independent prototype by Anastasija Selevjorstova. Fictional brands. Aliases use DTCG syntax.",
    primitive: nest(flatPrimitives(), typeOf),
    semantic: Object.fromEntries(brands.map((b) => [b.id, { $description: `${b.label} – ${b.name} (fictional)`, ...nest(Object.entries(b.semantic), typeOf) }])),
    component: nest(Object.entries(componentTokens), (p) => {
      const target = aliasOf(componentTokens[p as ComponentKey]) ?? "";
      return typeOf(target);
    }),
    componentOverrides: Object.fromEntries(brands.filter((b) => b.componentOverrides).map((b) => [b.id, b.componentOverrides])),
  };
}

/* ------------------------------------------------------------------ contrast */

function luminance(hex: string) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

/** WCAG 2.x contrast ratio between two hex colours. */
export function contrast(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export type ContrastCheck = { id: string; label: string; fg: SemanticKey; bg: SemanticKey; min: 4.5 | 3; kind: "text" | "non-text" };

/** The pairs every brand must pass. Checked live in the docs and the token editor. */
export const contrastChecks: ContrastCheck[] = [
  { id: "body", label: "Body text on page", fg: "color.text.primary", bg: "color.background.primary", min: 4.5, kind: "text" },
  { id: "surface", label: "Body text on card", fg: "color.text.primary", bg: "color.background.surface", min: 4.5, kind: "text" },
  { id: "secondary", label: "Secondary text on card", fg: "color.text.secondary", bg: "color.background.surface", min: 4.5, kind: "text" },
  { id: "primary-btn", label: "Primary button label", fg: "color.text.onAction", bg: "color.action.primary", min: 4.5, kind: "text" },
  { id: "secondary-btn", label: "Secondary button label", fg: "color.action.onSecondary", bg: "color.action.secondary", min: 4.5, kind: "text" },
  { id: "outline-btn", label: "Outline button label", fg: "color.action.primary", bg: "color.background.surface", min: 4.5, kind: "text" },
  { id: "danger", label: "Error message on card", fg: "color.feedback.danger.text", bg: "color.background.surface", min: 4.5, kind: "text" },
  { id: "alert-danger", label: "Danger alert text", fg: "color.feedback.danger.text", bg: "color.feedback.danger.background", min: 4.5, kind: "text" },
  { id: "alert-warning", label: "Warning alert text", fg: "color.feedback.warning.text", bg: "color.feedback.warning.background", min: 4.5, kind: "text" },
  { id: "alert-success", label: "Success alert text", fg: "color.feedback.success.text", bg: "color.feedback.success.background", min: 4.5, kind: "text" },
  { id: "alert-info", label: "Info alert text", fg: "color.feedback.info.text", bg: "color.feedback.info.background", min: 4.5, kind: "text" },
  { id: "field", label: "Input border", fg: "color.border.strong", bg: "color.background.surface", min: 3, kind: "non-text" },
  { id: "focus", label: "Focus indicator", fg: "color.border.focus", bg: "color.background.surface", min: 3, kind: "non-text" },
];

export function runContrast(brandId: BrandId, overrides?: SemanticOverrides) {
  return contrastChecks.map((c) => {
    const fg = resolve(c.fg, brandId, overrides);
    const bg = resolve(c.bg, brandId, overrides);
    const ratio = contrast(fg, bg);
    return { ...c, fgValue: fg, bgValue: bg, ratio, pass: ratio !== null && ratio >= c.min };
  });
}
