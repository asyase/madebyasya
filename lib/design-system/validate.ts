// Validates a UI definition against the component contracts.
// This is the gate between "a model produced some JSON" and "we render it":
// unknown components, unknown props, raw styling and broken composition rules
// are all rejected before anything reaches the screen.

import { brands, type BrandId } from "./tokens";
import { contracts, type PropSpec } from "./contracts";

export type UINode = { component: string; props?: Record<string, unknown>; children?: UINode[] };
export type UIDefinition = { brand: BrandId; intent: string; root: UINode };
export type Issue = { path: string; message: string; severity: "error" | "warning" };

const STYLING_PROPS = ["style", "className", "class", "color", "background", "backgroundColor", "fontSize", "padding", "margin", "borderRadius"];

function checkProp(name: string, value: unknown, spec: PropSpec): string | null {
  switch (spec.type) {
    case "string":
      if (typeof value !== "string") return `"${name}" must be a string.`;
      if (spec.maxLength && value.length > spec.maxLength) return `"${name}" is ${value.length} characters; the limit is ${spec.maxLength}.`;
      return null;
    case "boolean":
      return typeof value === "boolean" ? null : `"${name}" must be true or false.`;
    case "number":
      if (typeof value !== "number") return `"${name}" must be a number.`;
      if ((spec.min !== undefined && value < spec.min) || (spec.max !== undefined && value > spec.max)) return `"${name}" must be between ${spec.min} and ${spec.max}.`;
      return null;
    case "enum":
    case "token":
      if (!(spec.values as readonly unknown[]).includes(value)) {
        const hint = spec.type === "token" ? " Use a semantic spacing token, not a raw value." : "";
        return `"${name}" is ${JSON.stringify(value)}; allowed: ${spec.values.join(", ")}.${hint}`;
      }
      return null;
    case "options": {
      if (!Array.isArray(value) || value.length === 0) return `"${name}" must be a non-empty array of { value, label }.`;
      const ok = value.every((o) => o && typeof o === "object" && typeof (o as { value?: unknown }).value === "string" && typeof (o as { label?: unknown }).label === "string");
      if (!ok) return `Every option needs a string "value" and "label".`;
      const values = value.map((o) => (o as { value: string }).value);
      if (new Set(values).size !== values.length) return `Option values must be unique.`;
      return null;
    }
  }
}

export function validate(def: unknown): Issue[] {
  const issues: Issue[] = [];
  const err = (path: string, message: string) => issues.push({ path, message, severity: "error" });
  const warn = (path: string, message: string) => issues.push({ path, message, severity: "warning" });

  if (!def || typeof def !== "object") return [{ path: "$", message: "The definition must be a JSON object.", severity: "error" }];
  const d = def as Partial<UIDefinition>;
  if (!brands.some((b) => b.id === d.brand)) err("brand", `Unknown brand ${JSON.stringify(d.brand)}; allowed: ${brands.map((b) => b.id).join(", ")}.`);
  if (typeof d.intent !== "string" || !d.intent) warn("intent", "Add an intent so the definition explains what it is for.");
  if (!d.root || typeof d.root !== "object") {
    err("root", "A definition needs a root node.");
    return issues;
  }

  const walk = (node: UINode, path: string, parent: string, ancestors: string[]) => {
    const label = `${path} (${node?.component ?? "?"})`;
    if (!node || typeof node !== "object" || typeof node.component !== "string") {
      err(path, "Each node needs a \"component\" name.");
      return;
    }
    const c = contracts[node.component];
    if (!c) {
      err(label, `"${node.component}" is not a component in this system. Available: ${Object.keys(contracts).join(", ")}.`);
      return;
    }

    // Placement
    if (c.composition.parents && !c.composition.parents.includes(parent)) {
      err(label, `${node.component} cannot be placed inside ${parent === "root" ? "the root" : parent}. Allowed parents: ${c.composition.parents.join(", ")}.`);
    }
    if (node.component === "Card" && ancestors.includes("Card")) err(label, "Cards cannot be nested.");
    if (node.component === "Form" && ancestors.includes("Form")) err(label, "Forms cannot be nested.");

    // Props
    const props = node.props ?? {};
    for (const [key, value] of Object.entries(props)) {
      const spec = c.props[key];
      if (!spec) {
        if (STYLING_PROPS.includes(key)) err(label, `"${key}" is not allowed. Appearance comes from design tokens – choose a variant, tone or size instead.`);
        else err(label, `Unknown prop "${key}". ${node.component} accepts: ${Object.keys(c.props).join(", ") || "no props"}.`);
        continue;
      }
      const problem = checkProp(key, value, spec);
      if (problem) err(label, problem);
    }
    for (const [key, spec] of Object.entries(c.props)) {
      if ("required" in spec && spec.required && props[key] === undefined) err(label, `Missing required prop "${key}".`);
    }
    if ((props.required || props.minLength) && ["TextField", "SelectField", "Checkbox"].includes(node.component) && !ancestors.includes("Form") && parent !== "Form") {
      warn(label, "Validated fields should be inside a Form, otherwise nothing runs the validation.");
    }
    if (node.component === "Button" && props.type === "submit" && !ancestors.includes("Form") && parent !== "Form") {
      err(label, "A submit Button must be inside a Form.");
    }

    // Children
    const kids = node.children ?? [];
    if (!Array.isArray(kids)) {
      err(label, "\"children\" must be an array.");
      return;
    }
    if (c.composition.children === "none" && kids.length) err(label, `${node.component} does not accept children.`);
    kids.forEach((k, i) => {
      if (Array.isArray(c.composition.children) && k && typeof k.component === "string" && contracts[k.component] && !c.composition.children.includes(k.component)) {
        err(`${path}.children[${i}] (${k.component})`, `${k.component} is not allowed inside ${node.component}.`);
      }
      walk(k, `${path}.children[${i}]`, node.component, [...ancestors, node.component]);
    });

    // Container rules
    if (node.component === "Card" || node.component === "Form") {
      const primaries = collect(node, (n) => n.component === "Button" && (n.props?.variant ?? "primary") === "primary");
      if (primaries.length > 1) err(label, `${primaries.length} primary Buttons found; a ${node.component} may have at most one.`);
    }
    if (node.component === "Form") {
      const submits = collect(node, (n) => n.component === "Button" && n.props?.type === "submit");
      if (submits.length !== 1) err(label, `A Form needs exactly one submit Button (found ${submits.length}).`);
    }
  };

  walk(d.root, "root", "root", []);
  return issues;
}

function collect(node: UINode, test: (n: UINode) => boolean, out: UINode[] = []): UINode[] {
  for (const k of node.children ?? []) {
    if (!k || typeof k !== "object") continue;
    if (test(k)) out.push(k);
    if (k.component !== "Card") collect(k, test, out);
  }
  return out;
}

/** Component and token usage summary for a definition. */
export function summarize(node: UINode, out = new Map<string, number>()) {
  if (!node || typeof node.component !== "string") return out;
  out.set(node.component, (out.get(node.component) ?? 0) + 1);
  for (const k of node.children ?? []) summarize(k, out);
  return out;
}
