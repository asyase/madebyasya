// UI audit of the illustrative "Before" interface.
// Findings come from inspecting that baseline against heuristics and WCAG 2.2 –
// not from user research. Each finding links to the screen where it is visible.

import type { StatusId } from "./tokens";

/** Status names used by the legacy screens – two screens, two vocabularies. */
export const legacyStatusNames: Record<"dashboard" | "list", Record<StatusId, string>> = {
  dashboard: { draft: "Not published", published: "Live", open: "Open", completed: "Done", cancelled: "Cancelled" },
  list: { draft: "Draft", published: "Published", open: "Registration active", completed: "Finished", cancelled: "Canceled" },
};

export type Severity = "high" | "medium" | "low";
export type Finding = {
  id: string;
  issue: string;
  pattern: string;
  where: string[]; // scenario ids: dashboard | form | list
  ux: string;
  a11y: string;
  wcag?: string;
  severity: Severity;
  solution: string;
  component: string; // the shared component or token set that resolves it
};

export const findings: Finding[] = [
  {
    id: "A-01",
    issue: "Four different styles for the same primary action",
    pattern: "Buttons",
    where: ["dashboard", "list", "form"],
    ux: "“Add training” is a green button, a blue button, an outlined button or a text link depending on the screen. People cannot rely on appearance to find the main action.",
    a11y: "White text on the green button is 2.5:1.",
    wcag: "1.4.3 Contrast (Minimum)",
    severity: "high",
    solution: "One Button component with primary, secondary and destructive variants, and one primary action per view.",
    component: "Button",
  },
  {
    id: "A-02",
    issue: "Three different form field patterns",
    pattern: "Inputs",
    where: ["form"],
    ux: "Boxed fields, underlined fields and placeholder-only fields appear in one form. Labels disappear while typing, so people lose context.",
    a11y: "Placeholder-only fields have no persistent label; placeholder text is 2.6:1; the underline border is 1.3:1.",
    wcag: "1.3.1, 3.3.2 Labels or Instructions, 1.4.11",
    severity: "high",
    solution: "A single Input component with a persistent label, optional hint, required marker and error state.",
    component: "Input",
  },
  {
    id: "A-03",
    issue: "Conflicting status colours and names",
    pattern: "Status indicators",
    where: ["dashboard", "list"],
    ux: "The same state is called “Open” (orange text) on the dashboard and “Registration active” (green pill) in the list; “Done” and “Finished” mean the same thing, and both “Cancelled” and “Canceled” appear.",
    a11y: "Status relies on colour alone in places; orange text on white is 2.2:1.",
    wcag: "1.4.1 Use of Color, 1.4.3",
    severity: "high",
    solution: "A fixed status vocabulary, semantic status tokens and a StatusBadge that pairs colour with an icon and text.",
    component: "StatusBadge",
  },
  {
    id: "A-04",
    issue: "Inconsistent and missing validation feedback",
    pattern: "Forms",
    where: ["form"],
    ux: "A generic “Error!” banner appears at the top without saying what is wrong; some fields only turn red; the email field validates while typing.",
    a11y: "Errors are not linked to their fields or announced to screen readers.",
    wcag: "3.3.1 Error Identification, 3.3.3, 4.1.3 Status Messages",
    severity: "high",
    solution: "Field-level error messages, an error summary that receives focus, and a confirmation message after success.",
    component: "Input · Alert",
  },
  {
    id: "A-05",
    issue: "Search, filters and sorting work differently",
    pattern: "Table filters",
    where: ["list"],
    ux: "Search needs a separate “Go” button, the status filter uses other names than the badges, and sorting is hidden in a dropdown.",
    a11y: "The current sort order is not exposed; the result count is not announced.",
    wcag: "1.3.1, 4.1.3",
    severity: "medium",
    solution: "A reusable SearchField + FilterBar pattern and a DataTable with sortable headers (aria-sort) and a live result count.",
    component: "DataTable · FilterBar",
  },
  {
    id: "A-06",
    issue: "Unclear action hierarchy",
    pattern: "Row and page actions",
    where: ["list", "dashboard"],
    ux: "“Delete” has the same weight as “Edit” and runs without confirmation; some actions are unlabelled icons.",
    a11y: "Icon-only buttons have no accessible name.",
    wcag: "4.1.2 Name, Role, Value",
    severity: "high",
    solution: "Primary / secondary / destructive hierarchy, labelled actions and a confirmation Modal for destructive actions.",
    component: "Button · Modal",
  },
  {
    id: "A-07",
    issue: "Missing focus indicators",
    pattern: "Interactive elements",
    where: ["dashboard", "list", "form"],
    ux: "Keyboard users cannot see where they are on the page.",
    a11y: "Several buttons set outline: none.",
    wcag: "2.4.7 Focus Visible",
    severity: "high",
    solution: "One focus ring token (focus.ring, 2px) applied by every interactive component.",
    component: "Tokens",
  },
  {
    id: "A-08",
    issue: "Inconsistent spacing and visual hierarchy",
    pattern: "Cards and layout",
    where: ["dashboard"],
    ux: "Six different paddings and three heading sizes for cards of equal importance make it hard to scan the dashboard.",
    a11y: "Headings are styled divs, so screen-reader users cannot navigate by heading.",
    wcag: "1.3.1 Info and Relationships",
    severity: "medium",
    solution: "A spacing scale, a Card component and real heading elements.",
    component: "Card · Tokens",
  },
  {
    id: "A-09",
    issue: "Mixed terminology",
    pattern: "Navigation and labels",
    where: ["dashboard", "list"],
    ux: "Navigation says “Courses”, the page title says “Trainings” and the button says “New event”.",
    a11y: "Components with the same function are identified differently.",
    wcag: "3.2.4 Consistent Identification",
    severity: "medium",
    solution: "A short content glossary: training, participant, registration, certificate.",
    component: "Content guidelines",
  },
];

export const severityLabel: Record<Severity, string> = { high: "High", medium: "Medium", low: "Low" };

/** Inventory of duplicated patterns in the baseline, used by the consolidation section. */
export const inventory = {
  buttons: { before: 4, after: 1, variants: ["primary", "secondary", "destructive"], states: ["hover", "focus", "disabled", "loading"] },
  inputs: { before: 3, after: 1, variants: [], states: ["focus", "error", "disabled"] },
  badges: { before: 4, after: 1, variants: ["draft", "published", "open", "completed", "cancelled"], states: [] },
  statusNames: { before: new Set([...Object.values(legacyStatusNames.dashboard), ...Object.values(legacyStatusNames.list)]).size, after: 5 },
};
