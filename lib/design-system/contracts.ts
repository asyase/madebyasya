// Component contracts: one machine-readable definition per component.
// The same objects drive the documentation, the validator and the composer,
// and are published as /design-system/contracts.json for tools (including LLMs).

import type { ComponentKey } from "./tokens";

export const iconNames = ["arrow-right", "check", "mail", "lock", "user", "search", "calendar", "shopping-bag", "heart", "download", "plus", "info"] as const;
export type IconName = (typeof iconNames)[number];

export const spacingTokens = ["spacing.component.xs", "spacing.component.sm", "spacing.component.md", "spacing.component.lg", "spacing.component.xl"] as const;

export type PropSpec =
  | { type: "enum"; values: readonly (string | number)[]; default?: string | number; required?: boolean; description: string }
  | { type: "string"; required?: boolean; maxLength?: number; description: string }
  | { type: "boolean"; default?: boolean; description: string }
  | { type: "number"; min?: number; max?: number; description: string }
  | { type: "options"; required?: boolean; description: string } // [{ value, label }]
  | { type: "token"; values: readonly string[]; default?: string; description: string };

export type InteractionState = "default" | "hover" | "focus" | "active" | "disabled" | "error" | "checked";

export type ComponentContract = {
  name: string;
  category: "action" | "form" | "layout" | "content" | "feedback" | "overlay";
  purpose: string;
  whenToUse: string[];
  whenNotToUse: string[];
  props: Record<string, PropSpec>;
  /** Text content is passed as a prop, so a definition is plain JSON. */
  states: InteractionState[];
  tokens: ComponentKey[];
  accessibility: {
    element: string;
    keyboard: { keys: string; action: string }[];
    requirements: string[];
  };
  composition: {
    children: "none" | string[]; // allowed child components
    parents?: string[]; // allowed parents ("root" = top of a definition)
    rules: string[];
  };
  usage: { do: string[]; dont: string[] };
};

const SIZE = { type: "enum", values: ["sm", "md", "lg"], default: "md", description: "Control height and padding. Mapped to size.control.* tokens." } as const;
const FIELD_PARENTS = ["Form", "Stack", "Card"];

export const contracts: Record<string, ComponentContract> = {
  Button: {
    name: "Button",
    category: "action",
    purpose: "Triggers an action or submits a form.",
    whenToUse: ["Submitting a form", "Starting a task or confirming a decision", "Opening a dialog"],
    whenNotToUse: ["Navigating to another page – use a link", "Toggling a setting on or off – use a checkbox"],
    props: {
      label: { type: "string", required: true, maxLength: 32, description: "Visible text. Start with a verb: 'Save changes', not 'OK'." },
      variant: { type: "enum", values: ["primary", "secondary", "outline"], default: "primary", description: "Visual emphasis. primary = main action, secondary = supporting action, outline = low emphasis." },
      size: SIZE,
      type: { type: "enum", values: ["button", "submit"], default: "button", description: "Use submit only inside a Form." },
      iconStart: { type: "enum", values: iconNames, description: "Optional icon before the label." },
      iconEnd: { type: "enum", values: iconNames, description: "Optional icon after the label." },
      fullWidth: { type: "boolean", default: false, description: "Stretch to the container width. Recommended for the submit button on mobile forms." },
      disabled: { type: "boolean", default: false, description: "Prefer explaining why an action is unavailable over disabling it." },
    },
    states: ["default", "hover", "focus", "active", "disabled"],
    tokens: ["button.primary.background", "button.primary.backgroundHover", "button.primary.text", "button.secondary.background", "button.secondary.text", "button.outline.border", "button.outline.text", "button.radius", "button.height.md", "button.paddingX.md", "focus.ring.color"],
    accessibility: {
      element: "<button>",
      keyboard: [
        { keys: "Tab", action: "Moves focus to the button" },
        { keys: "Enter / Space", action: "Activates the button" },
      ],
      requirements: [
        "Label text contrast ≥ 4.5:1 against the button background.",
        "Visible focus ring (focus.ring.color, 2px) with ≥ 3:1 contrast.",
        "Icon-only buttons are not allowed: every button has a visible label.",
        "Minimum target height 32px (size sm); 40px or more for primary actions.",
      ],
    },
    composition: {
      children: "none",
      parents: ["Form", "Stack", "Card", "root"],
      rules: ["At most one primary Button per Card or Form.", "A Form has exactly one Button with type 'submit'.", "Place the primary action last in a horizontal group."],
    },
    usage: {
      do: ["Use one primary button for the most important action in a view.", "Write short labels that describe the result."],
      dont: ["Don't place two primary buttons side by side.", "Don't override colours – choose a variant instead."],
    },
  },
  TextField: {
    name: "TextField",
    category: "form",
    purpose: "Lets people enter and edit a single value, or longer text when multiline.",
    whenToUse: ["Free-form input such as names, email addresses or messages"],
    whenNotToUse: ["Choosing from a known list – use SelectField", "Yes/no answers – use Checkbox"],
    props: {
      name: { type: "string", required: true, description: "Field name used in the submitted data." },
      label: { type: "string", required: true, maxLength: 40, description: "Visible label. Placeholders never replace labels." },
      type: { type: "enum", values: ["text", "email", "password", "tel"], default: "text", description: "Input type; sets the mobile keyboard and built-in validation." },
      hint: { type: "string", maxLength: 80, description: "Help text shown below the field and announced with it." },
      placeholder: { type: "string", maxLength: 40, description: "Example value only." },
      required: { type: "boolean", default: false, description: "Required fields are validated on submit." },
      minLength: { type: "number", min: 1, max: 500, description: "Minimum characters, validated on submit." },
      multiline: { type: "boolean", default: false, description: "Renders a textarea for longer text." },
      autoComplete: { type: "enum", values: ["name", "email", "current-password", "new-password", "tel", "off"], description: "Autofill hint (WCAG 1.3.5)." },
      iconStart: { type: "enum", values: iconNames, description: "Optional decorative icon inside the field." },
      size: SIZE,
      disabled: { type: "boolean", default: false, description: "Disabled fields are skipped by validation." },
    },
    states: ["default", "hover", "focus", "disabled", "error"],
    tokens: ["input.background", "input.text", "input.label", "input.border.default", "input.border.hover", "input.border.focus", "input.border.error", "input.error.text", "input.radius", "input.height.md"],
    accessibility: {
      element: "<label> + <input> or <textarea>",
      keyboard: [
        { keys: "Tab", action: "Moves focus into the field" },
        { keys: "Type", action: "Enters text" },
      ],
      requirements: [
        "Every field has a programmatically associated <label>.",
        "Hint and error text are linked with aria-describedby.",
        "Invalid fields set aria-invalid and show an error message in text, not colour alone.",
        "Field border contrast ≥ 3:1 against the surface (WCAG 1.4.11).",
      ],
    },
    composition: { children: "none", parents: FIELD_PARENTS, rules: ["Must be inside a Form when required or minLength is set."] },
    usage: {
      do: ["Keep labels short and specific.", "Explain the format in the hint before people make a mistake."],
      dont: ["Don't use placeholder text as a label.", "Don't validate while the person is still typing their first attempt."],
    },
  },
  SelectField: {
    name: "SelectField",
    category: "form",
    purpose: "Lets people choose one option from a short, known list.",
    whenToUse: ["4–15 mutually exclusive options"],
    whenNotToUse: ["2–3 options that should all be visible – use radio buttons (not in this library yet)", "Very long lists – use a searchable combobox"],
    props: {
      name: { type: "string", required: true, description: "Field name used in the submitted data." },
      label: { type: "string", required: true, maxLength: 40, description: "Visible label." },
      options: { type: "options", required: true, description: "Array of { value, label }." },
      placeholder: { type: "string", maxLength: 40, description: "First, empty option such as 'Choose a course'." },
      hint: { type: "string", maxLength: 80, description: "Help text below the field." },
      required: { type: "boolean", default: false, description: "Validated on submit." },
      size: SIZE,
      disabled: { type: "boolean", default: false, description: "Disabled fields are skipped by validation." },
    },
    states: ["default", "hover", "focus", "disabled", "error"],
    tokens: ["input.background", "input.border.default", "input.border.focus", "input.border.error", "input.radius", "input.height.md"],
    accessibility: {
      element: "<label> + native <select>",
      keyboard: [
        { keys: "Tab", action: "Moves focus to the select" },
        { keys: "↑ / ↓", action: "Changes the selected option" },
        { keys: "Enter / Space / Alt+↓", action: "Opens the option list" },
      ],
      requirements: ["Uses the native select, so screen readers and mobile pickers work without extra ARIA.", "Same label, hint and error rules as TextField."],
    },
    composition: { children: "none", parents: FIELD_PARENTS, rules: ["Options need unique values.", "Must be inside a Form when required is set."] },
    usage: { do: ["Order options logically (alphabetically or by frequency)."], dont: ["Don't hide a critical choice in a select with a pre-selected default."] },
  },
  Checkbox: {
    name: "Checkbox",
    category: "form",
    purpose: "A single yes/no choice, such as accepting terms.",
    whenToUse: ["Consent, opt-ins and independent on/off choices inside a form"],
    whenNotToUse: ["Settings that apply immediately – use a switch (not in this library yet)"],
    props: {
      name: { type: "string", required: true, description: "Field name." },
      label: { type: "string", required: true, maxLength: 90, description: "Clickable label text." },
      required: { type: "boolean", default: false, description: "Must be checked to submit." },
      disabled: { type: "boolean", default: false, description: "Disabled state." },
    },
    states: ["default", "hover", "focus", "checked", "disabled", "error"],
    tokens: ["checkbox.checked.background", "checkbox.checked.mark", "input.border.default", "focus.ring.color"],
    accessibility: {
      element: "native <input type=checkbox> inside <label>",
      keyboard: [{ keys: "Space", action: "Toggles the checkbox" }],
      requirements: ["The whole label is clickable.", "Errors are announced through aria-describedby."],
    },
    composition: { children: "none", parents: FIELD_PARENTS, rules: [] },
    usage: { do: ["Write the label as a statement the person agrees to."], dont: ["Don't pre-check consent boxes."] },
  },
  Card: {
    name: "Card",
    category: "layout",
    purpose: "Groups related content and actions on a surface.",
    whenToUse: ["Wrapping a form, a product or a summary"],
    whenNotToUse: ["Purely decorative boxes", "Nesting a card inside another card"],
    props: {
      variant: { type: "enum", values: ["elevated", "outlined"], default: "elevated", description: "elevated uses shadow.surface; outlined uses a border only." },
      padding: { type: "token", values: ["spacing.component.md", "spacing.component.lg", "spacing.component.xl"], default: "spacing.component.lg", description: "Inner padding, as a semantic spacing token." },
      media: { type: "enum", values: ["none", "pattern"], default: "none", description: "Optional decorative media area at the top." },
      maxWidth: { type: "enum", values: ["sm", "md", "full"], default: "full", description: "sm ≈ 400px (login), md ≈ 560px (forms), full = container." },
    },
    states: ["default"],
    tokens: ["card.background", "card.border", "card.radius", "card.shadow", "card.media"],
    accessibility: {
      element: "<section> (or <article> for products)",
      keyboard: [],
      requirements: ["A Card that contains a Heading is labelled by it (aria-labelledby).", "Text inside meets the surface contrast checks."],
    },
    composition: { children: ["Heading", "Text", "Badge", "Alert", "Form", "Stack", "Button"], parents: ["root", "Stack"], rules: ["Cards cannot be nested.", "At most one primary Button per Card."] },
    usage: { do: ["Start with a Heading so the card has an accessible name."], dont: ["Don't nest cards.", "Don't add custom backgrounds – the surface comes from card.background."] },
  },
  Stack: {
    name: "Stack",
    category: "layout",
    purpose: "Lays out children vertically or horizontally with a token-based gap.",
    whenToUse: ["Spacing between any group of components"],
    whenNotToUse: ["Adding margins to individual components"],
    props: {
      direction: { type: "enum", values: ["vertical", "horizontal", "responsive"], default: "vertical", description: "responsive = vertical in narrow containers, horizontal from 480px (container query)." },
      gap: { type: "token", values: spacingTokens, default: "spacing.component.md", description: "Gap between children, as a semantic spacing token." },
      align: { type: "enum", values: ["start", "center", "end", "stretch"], default: "stretch", description: "Cross-axis alignment." },
      wrap: { type: "boolean", default: false, description: "Allow horizontal stacks to wrap." },
    },
    states: ["default"],
    tokens: [],
    accessibility: { element: "<div>", keyboard: [], requirements: ["Visual order must match DOM order, so keyboard order stays logical."] },
    composition: { children: ["Heading", "Text", "Badge", "Alert", "Button", "TextField", "SelectField", "Checkbox", "Stack", "Card"], parents: ["Card", "Form", "Stack", "root"], rules: ["Gap must be a spacing token – raw pixel values are rejected."] },
    usage: { do: ["Use Stack for all spacing between components."], dont: ["Don't use empty Text elements as spacers."] },
  },
  Form: {
    name: "Form",
    category: "form",
    purpose: "Collects fields, validates them on submit and reports errors accessibly.",
    whenToUse: ["Any group of fields that is submitted together"],
    whenNotToUse: ["A single action with no input – use a Button"],
    props: {
      title: { type: "string", maxLength: 60, description: "Accessible name if the Form is not inside a titled Card." },
      successMessage: { type: "string", maxLength: 120, description: "Shown in a success Alert after valid submission." },
    },
    states: ["default", "error"],
    tokens: [],
    accessibility: {
      element: "<form noValidate>",
      keyboard: [
        { keys: "Enter", action: "Submits from a single-line field" },
        { keys: "Tab", action: "Moves through fields in DOM order" },
      ],
      requirements: [
        "Validation runs on submit; fields re-check as they are corrected.",
        "On error, an error summary receives focus and links to each invalid field (WCAG 3.3.1).",
        "Errors are described in text and tied to fields with aria-describedby.",
      ],
    },
    composition: { children: ["TextField", "SelectField", "Checkbox", "Stack", "Button", "Text", "Alert"], parents: ["Card", "root"], rules: ["Exactly one Button with type 'submit'.", "Forms cannot be nested."] },
    usage: { do: ["Ask only for what is needed.", "Put the submit button last."], dont: ["Don't clear the form when validation fails."] },
  },
  Heading: {
    name: "Heading",
    category: "content",
    purpose: "Titles a page section or a card.",
    whenToUse: ["The first element of a Card or section"],
    whenNotToUse: ["Making text look bigger – use Text size lead"],
    props: {
      text: { type: "string", required: true, maxLength: 80, description: "Heading text." },
      level: { type: "enum", values: [2, 3, 4], default: 2, description: "Semantic level. Never skip levels." },
    },
    states: ["default"],
    tokens: [],
    accessibility: { element: "<h2>–<h4>", keyboard: [], requirements: ["Levels follow the document outline – no skipped levels."] },
    composition: { children: "none", parents: ["Card", "Stack", "root"], rules: [] },
    usage: { do: ["Keep headings short and descriptive."], dont: ["Don't choose a level for its size."] },
  },
  Text: {
    name: "Text",
    category: "content",
    purpose: "Body copy, supporting text and prices.",
    whenToUse: ["Any paragraph or short line of text"],
    whenNotToUse: ["Section titles – use Heading"],
    props: {
      text: { type: "string", required: true, maxLength: 280, description: "Text content." },
      tone: { type: "enum", values: ["primary", "secondary"], default: "primary", description: "Maps to color.text.primary / color.text.secondary." },
      size: { type: "enum", values: ["caption", "body", "lead", "title"], default: "body", description: "Maps to font.size.* semantic tokens." },
      weight: { type: "enum", values: ["regular", "strong"], default: "regular", description: "strong maps to font.weight.strong." },
    },
    states: ["default"],
    tokens: [],
    accessibility: { element: "<p>", keyboard: [], requirements: ["secondary tone still passes 4.5:1 on every surface."] },
    composition: { children: "none", parents: ["Card", "Stack", "Form", "root"], rules: [] },
    usage: { do: ["Use secondary tone for supporting text."], dont: ["Don't set custom colours."] },
  },
  Badge: {
    name: "Badge",
    category: "feedback",
    purpose: "A short, non-interactive status label.",
    whenToUse: ["Status such as 'In stock' or 'New'"],
    whenNotToUse: ["Anything clickable – use a Button", "Long messages – use an Alert"],
    props: {
      label: { type: "string", required: true, maxLength: 20, description: "One or two words." },
      tone: { type: "enum", values: ["neutral", "info", "success", "warning", "danger"], default: "neutral", description: "Meaning, mapped to feedback tokens." },
      size: { type: "enum", values: ["sm", "md"], default: "md", description: "Text size." },
      icon: { type: "enum", values: iconNames, description: "Optional decorative icon." },
    },
    states: ["default"],
    tokens: ["badge.radius", "badge.success.background", "badge.success.text", "badge.neutral.background"],
    accessibility: { element: "<span>", keyboard: [], requirements: ["Meaning is in the text, never in colour alone."] },
    composition: { children: "none", parents: ["Card", "Stack", "root"], rules: [] },
    usage: { do: ["Use the tone that matches the meaning."], dont: ["Don't use more than two badges on one item."] },
  },
  Alert: {
    name: "Alert",
    category: "feedback",
    purpose: "A message about the state of the system or the person's input.",
    whenToUse: ["Confirming success", "Explaining errors that block progress", "Important context before a task"],
    whenNotToUse: ["Errors for a single field – use the field's error message"],
    props: {
      tone: { type: "enum", values: ["info", "success", "warning", "danger"], default: "info", description: "Meaning; sets icon and colours." },
      title: { type: "string", maxLength: 60, description: "Optional bold first line." },
      text: { type: "string", required: true, maxLength: 200, description: "Message body." },
    },
    states: ["default"],
    tokens: ["alert.radius", "alert.info.background", "alert.info.border", "alert.info.text", "alert.danger.text"],
    accessibility: {
      element: "<div role=status> (info, success) or role=alert (warning, danger)",
      keyboard: [],
      requirements: ["Tone is conveyed by icon and text, not colour alone.", "Only danger and warning interrupt screen readers (role=alert)."],
    },
    composition: { children: "none", parents: ["Card", "Stack", "Form", "root"], rules: [] },
    usage: { do: ["Say what happened and what to do next."], dont: ["Don't stack several alerts – combine them."] },
  },
  Dialog: {
    name: "Dialog",
    category: "overlay",
    purpose: "Asks for a decision or shows focused content on top of the page.",
    whenToUse: ["Confirming a destructive or irreversible action"],
    whenNotToUse: ["Information that could sit inline", "Long forms"],
    props: {
      title: { type: "string", required: true, maxLength: 60, description: "Dialog title; labels the dialog." },
      text: { type: "string", required: true, maxLength: 240, description: "Description; describes the dialog." },
      confirmLabel: { type: "string", required: true, maxLength: 24, description: "Primary action." },
      cancelLabel: { type: "string", maxLength: 24, description: "Secondary action, default 'Cancel'." },
    },
    states: ["default"],
    tokens: ["dialog.background", "dialog.radius", "dialog.shadow", "dialog.scrim"],
    accessibility: {
      element: "native <dialog> opened with showModal()",
      keyboard: [
        { keys: "Tab / Shift+Tab", action: "Cycles focus inside the dialog; the page behind is inert" },
        { keys: "Esc", action: "Closes the dialog" },
      ],
      requirements: ["Focus moves into the dialog on open and returns to the trigger on close.", "Labelled by its title, described by its text."],
    },
    composition: { children: "none", parents: ["root"], rules: ["Opened by a Button; never opens on page load."] },
    usage: { do: ["Name the confirm button after the action: 'Delete course'."], dont: ["Don't open a dialog from another dialog."] },
  },
};

export const componentNames = Object.keys(contracts);

/** The full machine-readable document published for tools. */
export function contractsDocument() {
  return {
    $description:
      "Component contracts for the AI-Ready Multibrand Design System – an independent prototype by Anastasija Selevjorstova. A UI definition is a tree of { component, props, children } nodes that must satisfy these contracts.",
    version: "0.1.0",
    definitionFormat: {
      root: "{ brand: 'aster' | 'kord' | 'mira', intent: string, root: Node }",
      node: "{ component: <name>, props?: object, children?: Node[] }",
      notes: [
        "Only components listed here may be used.",
        "Only listed props are accepted; styling props (style, className, color) are rejected – visual appearance comes from tokens.",
        "Spacing is expressed with semantic spacing tokens, never pixel values.",
      ],
    },
    icons: iconNames,
    spacingTokens,
    components: contracts,
  };
}
