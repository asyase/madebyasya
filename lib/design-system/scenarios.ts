// Predefined composer scenarios. Each one pairs a natural-language request with
// the structured UI definition a model is expected to return for it.
// The tree is identical for every brand – only the "brand" field changes.

import type { BrandId } from "./tokens";
import { getBrand } from "./tokens";
import { contracts, iconNames, spacingTokens } from "./contracts";
import type { UIDefinition, UINode } from "./validate";

export type ScenarioId = "registration" | "login" | "product" | "contact";

export type Scenario = { id: ScenarioId; label: string; request: (brand: string) => string; root: UINode };

const COURSES = [
  { value: "ux-foundations", label: "UX Foundations" },
  { value: "design-systems", label: "Design Systems in Practice" },
  { value: "frontend-react", label: "Frontend with React" },
  { value: "ai-product", label: "AI for Product Teams" },
];

export const scenarios: Scenario[] = [
  {
    id: "registration",
    label: "Registration form",
    request: (b) => `Create a responsive course registration form using ${b}.`,
    root: {
      component: "Card",
      props: { variant: "elevated", padding: "spacing.component.lg", maxWidth: "md" },
      children: [
        {
          component: "Stack",
          props: { gap: "spacing.component.xs" },
          children: [
            { component: "Badge", props: { label: "Spring intake", tone: "info", size: "sm", icon: "calendar" } },
            { component: "Heading", props: { text: "Register for a course", level: 2 } },
            { component: "Text", props: { text: "Choose a course and tell us how to reach you. Places are confirmed by email.", tone: "secondary" } },
          ],
        },
        {
          component: "Form",
          props: { successMessage: "Registration received. This is a demo – nothing was sent." },
          children: [
            {
              component: "Stack",
              props: { direction: "responsive", gap: "spacing.component.md" },
              children: [
                { component: "TextField", props: { name: "fullName", label: "Full name", autoComplete: "name", iconStart: "user", required: true } },
                { component: "TextField", props: { name: "email", label: "Email", type: "email", autoComplete: "email", iconStart: "mail", hint: "We send the confirmation here.", required: true } },
              ],
            },
            { component: "SelectField", props: { name: "course", label: "Course", placeholder: "Choose a course", options: COURSES, required: true } },
            {
              component: "SelectField",
              props: { name: "format", label: "Format", options: [{ value: "online", label: "Online, live sessions" }, { value: "campus", label: "On campus, Tallinn" }] },
            },
            { component: "Checkbox", props: { name: "terms", label: "I agree to the course terms and privacy notice.", required: true } },
            { component: "Button", props: { label: "Complete registration", variant: "primary", type: "submit", iconEnd: "arrow-right", fullWidth: true, size: "lg" } },
          ],
        },
      ],
    },
  },
  {
    id: "login",
    label: "Login form",
    request: (b) => `Design a simple, accessible sign-in form for ${b}.`,
    root: {
      component: "Card",
      props: { variant: "elevated", padding: "spacing.component.lg", maxWidth: "sm" },
      children: [
        { component: "Heading", props: { text: "Sign in", level: 2 } },
        { component: "Text", props: { text: "Welcome back. Use the email you registered with.", tone: "secondary" } },
        {
          component: "Form",
          props: { successMessage: "Signed in. This is a demo – no account was checked." },
          children: [
            { component: "TextField", props: { name: "email", label: "Email", type: "email", autoComplete: "email", iconStart: "mail", required: true } },
            { component: "TextField", props: { name: "password", label: "Password", type: "password", autoComplete: "current-password", iconStart: "lock", required: true, minLength: 8, hint: "At least 8 characters." } },
            { component: "Checkbox", props: { name: "remember", label: "Keep me signed in on this device" } },
            { component: "Button", props: { label: "Sign in", variant: "primary", type: "submit", fullWidth: true } },
            { component: "Button", props: { label: "Create an account", variant: "outline", fullWidth: true } },
          ],
        },
      ],
    },
  },
  {
    id: "product",
    label: "Product card",
    request: (b) => `Show a product card with stock status, price and actions for ${b}.`,
    root: {
      component: "Card",
      props: { variant: "outlined", padding: "spacing.component.lg", media: "pattern", maxWidth: "sm" },
      children: [
        {
          component: "Stack",
          props: { direction: "horizontal", gap: "spacing.component.sm", wrap: true },
          children: [
            { component: "Badge", props: { label: "In stock", tone: "success", icon: "check" } },
            { component: "Badge", props: { label: "New", tone: "neutral" } },
          ],
        },
        {
          component: "Stack",
          props: { gap: "spacing.component.xs" },
          children: [
            { component: "Heading", props: { text: "Everyday canvas backpack", level: 3 } },
            { component: "Text", props: { text: "Water-resistant canvas, padded laptop sleeve and a quick-access front pocket.", tone: "secondary" } },
            { component: "Text", props: { text: "€89.00", size: "title", weight: "strong" } },
          ],
        },
        {
          component: "Stack",
          props: { direction: "horizontal", gap: "spacing.component.sm", wrap: true },
          children: [
            { component: "Button", props: { label: "Add to cart", variant: "primary", iconStart: "shopping-bag" } },
            { component: "Button", props: { label: "Save", variant: "outline", iconStart: "heart" } },
          ],
        },
      ],
    },
  },
  {
    id: "contact",
    label: "Contact form",
    request: (b) => `Build a contact form with a topic selector and message field for ${b}.`,
    root: {
      component: "Card",
      props: { variant: "elevated", padding: "spacing.component.lg", maxWidth: "md" },
      children: [
        { component: "Heading", props: { text: "Get in touch", level: 2 } },
        { component: "Alert", props: { tone: "info", text: "We reply within two working days." } },
        {
          component: "Form",
          props: { successMessage: "Message ready. This is a demo – nothing was sent." },
          children: [
            {
              component: "Stack",
              props: { direction: "responsive", gap: "spacing.component.md" },
              children: [
                { component: "TextField", props: { name: "name", label: "Name", autoComplete: "name", required: true } },
                { component: "TextField", props: { name: "email", label: "Email", type: "email", autoComplete: "email", required: true } },
              ],
            },
            {
              component: "SelectField",
              props: { name: "topic", label: "Topic", placeholder: "Choose a topic", required: true, options: [{ value: "billing", label: "Billing" }, { value: "account", label: "My account" }, { value: "feedback", label: "Feedback" }, { value: "other", label: "Something else" }] },
            },
            { component: "TextField", props: { name: "message", label: "Message", multiline: true, required: true, minLength: 20, hint: "At least 20 characters." } },
            { component: "Button", props: { label: "Send message", variant: "primary", type: "submit", iconEnd: "arrow-right" } },
          ],
        },
      ],
    },
  },
];

export function compose(scenarioId: ScenarioId, brand: BrandId): UIDefinition {
  const s = scenarios.find((x) => x.id === scenarioId)!;
  return { brand, intent: s.request(getBrand(brand).label), root: structuredClone(s.root) };
}

/** A deliberately broken output, to show what the validator catches. */
export function brokenExample(brand: BrandId): UIDefinition {
  return {
    brand,
    intent: "Example of an unconstrained model output",
    root: {
      component: "Card",
      props: { padding: "24px", style: { background: "#ff3366" } },
      children: [
        { component: "Heading", props: { text: "Register now", level: 1 } },
        {
          component: "Form",
          children: [
            { component: "TextField", props: { name: "email", placeholder: "Email" } },
            { component: "Carousel", props: { items: 3 } },
            { component: "Button", props: { label: "Register", variant: "danger", type: "submit" } },
            { component: "Button", props: { label: "Register later", variant: "primary" } },
          ],
        },
      ],
    },
  };
}

/**
 * The context a language model would receive: a compact summary of the contracts,
 * the allowed tokens and the output format. Generated from the same source as the docs.
 */
export function promptPackage(request: string) {
  const lines = Object.values(contracts).map((c) => {
    const props = Object.entries(c.props)
      .map(([k, p]) => {
        const req = "required" in p && p.required ? "*" : "";
        if (p.type === "enum" || p.type === "token") return `${k}${req}: ${p.values.join("|")}`;
        return `${k}${req}: ${p.type}`;
      })
      .join("; ");
    const kids = c.composition.children === "none" ? "no children" : `children: ${c.composition.children.join(", ")}`;
    const rules = c.composition.rules.length ? ` Rules: ${c.composition.rules.join(" ")}` : "";
    return `- ${c.name} (${c.purpose}) props { ${props} }; ${kids}.${rules}`;
  });
  const system = [
    "You compose interfaces from an existing design system.",
    "Return ONLY JSON: { brand, intent, root } where each node is { component, props, children }.",
    "Use only these components and props (* = required):",
    ...lines,
    `Spacing tokens: ${spacingTokens.join(", ")}. Icons: ${iconNames.join(", ")}.`,
    "Never output style, className, colours or pixel values – appearance comes from the brand's tokens.",
    "Every field needs a visible label. Forms have exactly one submit Button and at most one primary Button.",
  ].join("\n");
  return { system, user: request };
}
