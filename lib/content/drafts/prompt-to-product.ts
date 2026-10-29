// "From Prompt to Product — AI-Assisted UX/UI Design". NOT PUBLISHED.
//
// Listed (via lib/content/unpublished-projects.ts) and rendered at /work/from-prompt-to-product/ only in
// local development and `npm run build:preview`. Production builds remove the page, its images and the
// prototype and verify that they are absent (scripts/publication.config.mjs).
//
// Source of every fact below: the Stage 01–07 handover package (28 Oct 2026), copied unchanged to
// docs/from-prompt-to-product/, plus the exact prompts and texts Asya supplied on 28 Oct 2026.
// Use only the figures in docs/from-prompt-to-product/plan/verified-numbers.md.
//
// Authorship rules for this page:
//   Asya      – defined the experiment, ran the prompts, evaluated, identified problems, made every decision.
//   Figma AI  – generated the Stage 01–03 screens (unedited screenshots, kept byte-identical).
//   Claude    – proposed Stage 04 solutions and implemented approved changes in Figma via the Plugin API,
//               built the Stage 05 components and Stage 06 variables, the HTML prototype and the automated checks.

const DIR = "/work/from-prompt-to-product/kursion";
export const PROTOTYPE_HREF = "/prototypes/kursion/";
/** View-only Figma file with the refined frames, components and variables (Stages 04–06). */
export const FIGMA_HREF = "https://www.figma.com/design/vUOUWuiMG2d0E0Coo2U1er/ai-case?node-id=0-1";

/** One piece of visual evidence. `src` is a byte-identical copy of the handover file. */
/** `scale` = pixel density of the export (2 for @2x); detected from the file name when omitted. */
export type Shot = { src: string; alt: string; caption: string; source: Source; scale?: 1 | 2 };
export type Source = "figma-ai" | "figma-claude" | "prototype" | "code";

export const sourceLabel: Record<Source, string> = {
  "figma-ai": "Figma AI · original, unedited",
  "figma-claude": "Figma · built by Claude, decided by Asya",
  prototype: "HTML prototype · built with Claude",
  code: "Code demo · not Figma",
};

/* ------------------------------------------------------------------ overview */

export const experiment = {
  screen: "Trainings – course list",
  user: "Training manager",
  platform: "Desktop 1440px, then 768 and 390",
  product: "Kursion – fictional training management platform",
};

export const journey = [
  { n: "01", title: "Basic AI generation", who: "Figma AI", anchor: "stages-01-03" },
  { n: "02", title: "Structured AI generation", who: "Figma AI", anchor: "stages-01-03" },
  { n: "03", title: "Design-system-guided generation", who: "Figma AI", anchor: "stages-01-03" },
  { n: "04", title: "Human Refinement", who: "Asya decides · Claude implements", anchor: "human-refinement" },
  { n: "05", title: "Component library", who: "Claude in Figma · Asya reviews", anchor: "components" },
  { n: "06", title: "Design variables", who: "Claude in Figma · Asya reviews", anchor: "variables" },
  { n: "07", title: "Interactive prototype", who: "Claude · HTML/CSS/JS", anchor: "prototype" },
] as const;

/* ------------------------------------------------------------------ roles */

export const roles: { stage: string; asya: string; figmaAi: string; claude: string }[] = [
  { stage: "01–03 · AI generations", asya: "Defined the experiment, ran the three prompts, captured the unedited results, compared them and selected Stage 03.", figmaAi: "Generated the three Trainings screens and, separately, the Stage 03 cancellation dialog.", claude: "–" },
  { stage: "04 · Human Refinement", asya: "Identified seven UX problems, set the constraints, evaluated every proposal, made eight decisions (4 Accept, 4 Modify), reviewed the results and approved the direction.", figmaAi: "–", claude: "Proposed solutions (plus one extra: Delete draft), built proposal frames and annotations via the Figma Plugin API, calculated contrast ratios and implemented the approved changes." },
  { stage: "05 · Components", asya: "Reviewed the components and approved the TrainingCard trade-off.", figmaAi: "–", claude: "Built 11 UI components (52 variants) and 21 icon components in Figma via the Plugin API." },
  { stage: "06 · Variables", asya: "Required alignment with semantic tokens and documented exceptions (decision 4), and reviewed the final result.", figmaAi: "–", claude: "Built 149 variables in three collections and a separate code demo of a second theme." },
  { stage: "07 · Prototype", asya: "Set the product rules (status-based actions, no email claims, the 14-day rule as a fictional assumption) and reviewed the refined result.", figmaAi: "–", claude: "Built the HTML/CSS/JavaScript prototype and ran the automated checks." },
];

/* ------------------------------------------------------------------ Stages 01–03 */

export type GenStage = {
  n: "01" | "02" | "03";
  label: string;
  /** Exact prompt, as supplied by Asya on 28 Oct 2026. */
  prompt: string;
  purpose?: string;
  /** Asya's comparison text (short). */
  result: string;
  /** Asya's longer assessment (asya-provided-content.md §2). */
  detail: string;
  shot: Shot;
  extra?: Shot;
};

const STAGE_02_PROMPT = `Design in a new frame a desktop "Trainings" list screen (1440px) for a training management platform.

The main user is a training manager who plans courses, monitors registrations, and manages participants.

Primary tasks:
- Find a specific training quickly
- See upcoming trainings
- Identify trainings with too few registrations
- Create a new training
- View and edit existing trainings

Information hierarchy:
1. Page title "Trainings" and one primary button "New training"
2. Search field and status filters
3. A warning about trainings below minimum group size
4. Training table with columns:
   Training, Starts, Lecturer, Seats, Status, Actions

Row actions:
- View
- Edit

Navigation:
Dashboard, Trainings, Registrations, Participants, Certificates.

Statuses:
Draft, Published, Registration open, Completed, Cancelled.

Show statuses using text labels, not colour alone.

Usability requirements:
- One clear primary action
- Visible labels
- Consistent spacing
- Readable table
- Clear hierarchy
- Professional business-oriented visual style

Use realistic fictional training data.

Label:
02 — Structured AI Generation

Purpose:
Demonstrate how user context, tasks, hierarchy,
and functional requirements improve AI-generated UI.

Evidence placeholders:
- Exact prompt
- Original AI-generated screenshot
- Improvements compared with stage 1
- Remaining UX problems`;

const STAGE_03_PROMPT = `Design a 1440px desktop "Trainings" list screen for a training management platform.

User: Training Manager managing courses and registrations.

Layout:
- Left sidebar: Dashboard, Trainings, Registrations, Participants, Certificates
- Header: "Trainings" and one primary "New training" button
- Search field and status filter chips with counts
- Warning for trainings with too few registrations
- Result count and training table

Table columns:
Training (name + ID), Starts, Lecturer, Seats (registered/total), Status, Actions.

Row actions: View, Edit, Cancel.

Use these components:
SideNav, Button, SearchField, FilterChips, DataTable, StatusBadge, Card, Alert, Input, Select.

Design tokens:
Background #F6F5F2
Surface #FFFFFF
Border #DEDBD5
Primary text #1F1D1A
Secondary text #5C5852
Primary action #2245B8
Destructive #A3271F

Typography: Plus Jakarta Sans.
Sizes: 13px small, 14px body, 20px headings, 24px page title.

Spacing: 4, 8, 12, 16, 24, 32px.
Radius: 8px controls, 12px cards.

Status badges:
Draft (grey), Published (blue), Registration open (green), Completed (violet), Cancelled (red).

Rules:
- Only one primary button
- Consistent components and spacing
- Statuses must include text labels
- Cancel uses destructive styling
- Confirmation modal for destructive actions
- Visible labels and keyboard focus
- WCAG AA text contrast (4.5:1)
- No arbitrary colours or styles

Use realistic fictional training data.`;

export const genStages: GenStage[] = [
  {
    n: "01",
    label: "Generic AI output",
    prompt: 'Design a desktop "Trainings" list screen for a training management platform.',
    purpose: "Demonstrate what Figma AI generates from a minimal prompt without detailed user context, UX requirements or design-system constraints.",
    result: "A visually polished interpretation of a broad request, without sufficient understanding of the training manager’s actual tasks.",
    detail: "The result was visually polished and included dashboard-like metrics, but it reflected AI’s interpretation of a generic training platform rather than the specific needs of a training manager.",
    shot: { src: `${DIR}/01/stage01-basic-original-asya.webp`, alt: "Stage 01 Figma AI result: a Trainings page for a product named Kursion with four metric cards, tabs, filters and a table of eight trainings", caption: "Stage 01 – original Figma AI output (unedited)", source: "figma-ai" },
  },
  {
    n: "02",
    label: "Task-oriented UI",
    prompt: STAGE_02_PROMPT,
    purpose: "Demonstrate how user context, tasks, hierarchy, and functional requirements improve AI-generated UI.",
    result: "The additional user context, tasks, information hierarchy and requirements helped produce a more functional and relevant interface.",
    detail: "By introducing the user role, training statuses, enrolment information and business rules, the interface became more task-oriented. The warning about trainings with insufficient registrations was especially important, because it helped surface items requiring attention. However, the design still needed greater consistency and clearer interaction rules.",
    shot: { src: `${DIR}/02/stage02-structured-original-asya.webp`, alt: "Stage 02 Figma AI result: a Trainings page for a product named Forma with search, status filters, a minimum-group-size warning and a table with View and Edit actions", caption: "Stage 02 – original Figma AI output (unedited)", source: "figma-ai" },
  },
  {
    n: "03",
    label: "Design-system-guided UI",
    prompt: STAGE_03_PROMPT,
    result: "Explicit components, design tokens, typography, spacing and interaction requirements created a more consistent foundation for refinement and reuse.",
    detail: "This generation introduced explicit design constraints: colours, typography, spacing, status styles and interaction patterns. It provided a stronger foundation for a reusable component library and design variables.",
    shot: { src: `${DIR}/03/stage03-design-system-guided-original-asya.webp`, alt: "Stage 03 Figma AI result: the Forma Trainings page following the specified tokens, with filter chips, a warning, and View, Edit and Cancel actions", caption: "Stage 03 – original Figma AI output (unedited)", source: "figma-ai" },
    extra: { src: `${DIR}/03/stage03-cancellation-dialog-original-asya.webp`, alt: "Stage 03 cancellation confirmation dialog generated by Figma AI", caption: "Stage 03 – cancellation dialog, generated separately (unedited)", source: "figma-ai" },
  },
];

export const whyStage03 =
  "Stage 03 offered the strongest combination of task-oriented UX, visual consistency and potential for reuse. However, it was selected as the starting point for Human Refinement, not as a finished or fully validated design.";

export const brandNote =
  "The original screenshots are unchanged, including the product names Figma AI generated: “Kursion” in Stage 01 and “Forma” in Stages 02–03. Kursion is the final, fictional brand for the refined work.";

/* ------------------------------------------------------------------ Stage 04 */

export const whyRefinement = [
  "The warning was not actionable enough.",
  "Actions were not clearly differentiated by status.",
  "Delete draft and cancellation needed separate patterns.",
  "Empty, error and confirmation states were needed.",
  "Destructive actions needed clearer consequences.",
  "Responsive layout and keyboard interaction needed more work.",
  "Unvalidated AI product assumptions.",
];

export const mainLesson =
  "a design-system-guided prompt improves consistency, but it does not replace UX judgement, interaction design or product decision-making";

/** Asya's contribution to Stage 04 (her own list). */
export const asyaContribution = [
  "Evaluating the three generations",
  "Selecting Stage 03",
  "Identifying seven UX problems",
  "Defining refinement goals and constraints",
  "Evaluating Claude’s proposed solutions",
  "Making eight documented decisions: four Accept, four Modify",
  "Reviewing the refined designs and requesting more improvements",
  "Approving the direction after iterative review",
];

export const claudeContribution = [
  "Proposed solutions to the problems Asya defined, plus one extra proposal (Delete draft)",
  "Built the proposal frames, change log and annotations in Figma via the Plugin API",
  "Calculated contrast ratios with the WCAG formula",
  "Implemented the approved changes and the five requested refinements",
];

export const constraints = [
  "Keep the original AI output unchanged",
  "Preserve the visual identity",
  "Document every change as problem / solution / reason",
];

/** The seven UX problems Asya identified. */
export const uxProblems = [
  "The warning wasn’t actionable",
  "Read-only states were unclear",
  "Consistency of spacing, type, colour and sizes",
  "Keyboard focus",
  "The cancellation dialog",
  "Empty states and search feedback",
  "Accessibility and responsive behaviour",
];

export type Decision = { n: number; topic: string; problem: string; proposal: string; decision: "Accept" | "Modify"; reasoning: string; implementation: string };

/**
 * Problem: Asya's problem list. Proposal: Claude's original proposal (stages-04-06-documentation.md).
 * Reasoning: Asya's words, verbatim (stage-04-design-review-record.md). Implementation: the record's implementation table.
 */
export const decisions: Decision[] = [
  {
    n: 1, topic: "Actionable warning", decision: "Modify",
    problem: "The low-registration warning wasn’t actionable: users had to scan every row to find the trainings concerned.",
    proposal: "Name both trainings in the warning and add “Show 2 trainings”, which turns on a “Needs attention” filter and highlights the rows.",
    reasoning: "I agree that warnings should be actionable and help training managers identify sessions requiring attention. Keep the Needs attention filter, but treat the 14-day window and minimum enrollment thresholds as configurable fictional product assumptions. The warning must accurately reflect the trainings it filters.",
    implementation: "One configurable rule (14 days, default minimum 8) labelled as fictional. Warning and filter use the same function; “How is this calculated?” disclosure; the warning names no individual trainings.",
  },
  {
    n: 2, topic: "Read-only rows", decision: "Accept",
    problem: "Read-only states were unclear: completed and cancelled rows still showed Edit and Cancel.",
    proposal: "Remove Edit and Cancel on completed and cancelled rows; keep View and add a “Read-only” label with a short explanation.",
    reasoning: "Completed and cancelled trainings should have clearly communicated read-only states. This prevents unintended modifications and makes available actions more predictable.",
    implementation: "View plus a lock “Read-only” label; footer note “Completed and cancelled trainings are read-only.”",
  },
  {
    n: 3, topic: "Delete draft vs Cancel training", decision: "Modify",
    problem: "Extra proposal by Claude, not one of Asya’s seven problems: draft rows offered “Cancel”, although a draft has no registrations.",
    proposal: "Rename the draft action to “Delete draft” (flagged as needing product confirmation).",
    reasoning: "I agree that deleting a draft and cancelling an existing training are different actions. Drafts should use Delete draft with a separate confirmation dialog. Published and registration-open trainings should use Cancel training when cancellation is permitted.",
    implementation: "Drafts: View · Edit · Delete draft with its own dialog (“Keep draft” focused first). Cancel training only for Published and Registration open. New frame Refined 6.",
  },
  {
    n: 4, topic: "Consistency and tokens", decision: "Accept",
    problem: "Spacing, type, colour and sizes were consistent but hard-coded; input borders were only 1.38:1 on white.",
    proposal: "Bind everything to semantic variables; darker input border (3.66:1); larger text-button hit areas.",
    reasoning: "I approve the improvements to spacing, typography, component consistency and input-border contrast. Keep the design aligned with semantic tokens and document justified exceptions.",
    implementation: "All refined frames bound to variables; status, inverse, scrim and shadow tokens added; no fixed colours outside the primitive layer in the prototype.",
  },
  {
    n: 5, topic: "Keyboard focus", decision: "Accept",
    problem: "No focus states existed, and the selected chip’s outline looked like a focus ring.",
    proposal: "One focus style on all interactive components; selected chips get a tint, a check icon and a bold label.",
    reasoning: "Visible keyboard focus is essential. Apply consistent focus styling to all interactive components and preserve logical keyboard navigation.",
    implementation: "Consistent focus ring in Figma and the prototype, including the new Delete draft dialog.",
  },
  {
    n: 6, topic: "Cancellation dialog", decision: "Modify",
    problem: "The dialog didn’t name the training, its consequences were one paragraph and there was no close control.",
    proposal: "Name the training, list consequences, add an optional “Message to participants” field and suggest duplicating the training; “Keep training” as the default.",
    reasoning: "Keep the confirmation structure, but remove unsupported claims about automatically sending emails or other backend actions. Clearly describe the action and its consequences within the fictional prototype. Do not suggest features that have not been implemented.",
    implementation: "Message field, email and “duplicate” claims removed. Consequences: status becomes Cancelled and read-only, registration closes, registrations stay on record, can’t be undone.",
  },
  {
    n: 7, topic: "Empty states and search feedback", decision: "Accept",
    problem: "There was no empty state and no search feedback.",
    proposal: "Empty state that repeats the query and offers “Clear search” / “Clear all filters”; live result count.",
    reasoning: "I approve the empty state and search feedback improvements. Only show filter-reset actions when relevant, and ensure the empty-state text reflects the user’s current search or filters.",
    implementation: "“Clear all filters” only when a filter is active; helper text explains what search looks at.",
  },
  {
    n: 8, topic: "Responsive layout", decision: "Modify",
    problem: "Accessibility and responsive behaviour: the six-column desktop table could not reflow.",
    proposal: "390px layout with training cards, scrolling chips and 44px targets; four cards plus “scroll to load more”.",
    reasoning: "I support the card-based mobile layout, but sorting and filtering must remain accessible. Please add a visible Sort control, ensure filter chips remain usable, document the tablet layout and remove the unsupported infinite-scroll assumption.",
    implementation: "Visible Sort on mobile, wrapping chips, all trainings shown, no infinite scroll; new Refined 7 – Tablet 768 frame.",
  },
];

export const conditionalApproval =
  "Asya conditionally approved the refined screens and asked for five refinements. After they were implemented, she approved the overall design direction.";

export const refinements = [
  { title: "Realistic TrainingCard masters", detail: "Each variant master shows content that fits its state, e.g. Draft “0 / 16 · Not yet published”." },
  { title: "Simpler warning", detail: "“N trainings need more registrations” with one action and a disclosure – no training names or numbers." },
  { title: "Compact mobile warning", detail: "Icon inline with the title and tighter padding: 202 → 162px in Figma, 182px in the prototype." },
  { title: "Target areas", detail: "Card actions at least 48 × 44px in the prototype; desktop table actions at least 44 × 32px with 4px gaps (WCAG 2.5.8)." },
  { title: "Aligned copy", detail: "Default and filter-on warning text identical in Figma and the prototype." },
];

const R = `${DIR}/04/figma-2x`;
export const beforeAfter: { title: string; note: string; before: Shot; after: Shot }[] = [
  {
    title: "Trainings list",
    note: "Actionable warning, status-specific actions, read-only rows, Sort control, tokens and focus.",
    before: genStages[2].shot,
    after: { src: `${R}/stage04-refined-1-default@2x.webp`, alt: "Refined 1: Kursion Trainings list with an actionable warning, Needs attention chip, Delete draft on the draft row and Read-only labels on completed and cancelled rows", caption: "Refined 1 – Default (1440)", source: "figma-claude" },
  },
  {
    title: "Cancellation dialog",
    note: "Names the training, lists real consequences and makes no email or backend claims.",
    before: genStages[2].extra!,
    after: { src: `${R}/stage04-refined-4-cancel-training-dialog@2x.webp`, alt: "Refined 4: Cancel training confirmation dialog naming the training and listing its consequences", caption: "Refined 4 – Cancel training dialog (1440)", source: "figma-claude" },
  },
];

export const refinedFrames: Shot[] = [
  { src: `${R}/stage04-refined-2-needs-attention-filter@2x.webp`, alt: "Refined 2: the Needs attention filter applied, with the rule disclosure open", caption: "Refined 2 – Needs attention filter", source: "figma-claude" },
  { src: `${R}/stage04-refined-3-search-empty-state@2x.webp`, alt: "Refined 3: search with no results, showing the query and a Clear search action", caption: "Refined 3 – Search empty state", source: "figma-claude" },
  { src: `${R}/stage04-refined-6-delete-draft-dialog@2x.webp`, alt: "Refined 6: Delete draft confirmation dialog with Keep draft focused", caption: "Refined 6 – Delete draft dialog", source: "figma-claude" },
  { src: `${R}/stage04-refined-7-tablet-768@2x.webp`, alt: "Refined 7: tablet layout at 768px with a two-column card grid", caption: "Refined 7 – Tablet 768", source: "figma-claude" },
  { src: `${R}/stage04-refined-5-mobile-390@2x.webp`, alt: "Refined 5: mobile layout at 390px with Sort control, wrapping chips and training cards", caption: "Refined 5 – Mobile 390", source: "figma-claude" },
];

/* ------------------------------------------------------------------ Stage 05 */

export const components: { name: string; variants: string; note: string }[] = [
  { name: "Button", variants: "20", note: "Primary · Secondary · Destructive · Ghost · Ghost destructive × Default · Hover · Focus · Disabled" },
  { name: "StatusBadge", variants: "5", note: "Draft · Published · Registration open · Completed · Cancelled" },
  { name: "FilterChip", variants: "4", note: "Default · Hover · Selected · Focus; label and count" },
  { name: "Input", variants: "4", note: "Default · Focus · Error · Disabled; label and helper text" },
  { name: "Card", variants: "4", note: "Default · Warning × Inline · Stacked; optional disclosure" },
  { name: "DataTable/HeaderCell", variants: "3", note: "Sort: None · Ascending · Descending" },
  { name: "DataTable/Header", variants: "–", note: "Assembled header row (standalone component)" },
  { name: "DataTable/Row", variants: "4", note: "Default · Hover · Needs attention · Read-only" },
  { name: "DataTable/EmptyState", variants: "2", note: "No search results · No trainings yet" },
  { name: "TrainingCard", variants: "4", note: "Default · Needs attention · Draft · Read-only" },
  { name: "Select", variants: "2", note: "Default · Focus" },
];

export const componentShots: Shot[] = [
  { src: `${DIR}/05/stage05-TrainingCard-component@2x.webp`, alt: "TrainingCard component set in Figma with Default, Needs attention, Draft and Read-only variants", caption: "TrainingCard – 4 variants", source: "figma-claude" },
  { src: `${DIR}/05/stage05-Select-component@2x.webp`, alt: "Select component in Figma, default and focus variants", caption: "Select – 2 variants", source: "figma-claude" },
];

export const trainingCardTradeOff = {
  why: "Figma gives each text property one default for every variant, so the Draft and Read-only masters showed registration data from another state.",
  decision: "The text properties were removed, so every variant master is a truthful example of the product rules.",
  cost: "Designers edit text directly on each instance instead of through the properties panel. Select, Card, Input and the other components keep their text properties.",
};

/* ------------------------------------------------------------------ Stage 06 */

export const variableLayers = [
  { name: "Primitives", count: 38, example: "color/blue/600", value: "#2245B8", note: "Raw values; hidden from pickers" },
  { name: "Semantic", count: 51, example: "color/action/primary", value: "→ color/blue/600", note: "Meaning; every value aliases a primitive" },
  { name: "Component", count: 60, example: "button/primary/background", value: "→ color/action/primary", note: "Per-component decisions" },
  { name: "Applied", count: null, example: "Button / Primary", value: "fill bound to the component token", note: "Components and refined frames never reference a primitive directly" },
];

export const briefTokens: { brief: string; hex: string; primitive: string }[] = [
  { brief: "Background", hex: "#F6F5F2", primitive: "neutral/50" },
  { brief: "Surface", hex: "#FFFFFF", primitive: "neutral/0" },
  { brief: "Border", hex: "#DEDBD5", primitive: "neutral/200" },
  { brief: "Primary text", hex: "#1F1D1A", primitive: "neutral/900" },
  { brief: "Secondary text", hex: "#5C5852", primitive: "neutral/600" },
  { brief: "Primary action", hex: "#2245B8", primitive: "blue/600" },
  { brief: "Destructive", hex: "#A3271F", primitive: "red/600" },
];

export const contrast: { pair: string; ratio: string; note?: string }[] = [
  { pair: "Primary text on white", ratio: "16.81 : 1" },
  { pair: "Secondary text on white", ratio: "7.06 : 1" },
  { pair: "Secondary text on canvas", ratio: "6.48 : 1" },
  { pair: "White on primary action", ratio: "8.04 : 1" },
  { pair: "White on destructive action", ratio: "7.32 : 1" },
  { pair: "Lowest status badge (Cancelled)", ratio: "6.51 : 1" },
  { pair: "Warning text on warning background", ratio: "6.64 : 1" },
  { pair: "Input border on white", ratio: "3.66 : 1", note: "Non-text contrast, WCAG 1.4.11 (3 : 1)" },
  { pair: "Decorative border on white", ratio: "1.38 : 1", note: "Cards and dividers only – never the only boundary of a control" },
];

export const variableShots = {
  overview: { src: `${DIR}/06/stage06-design-variables-overview@1x.webp`, alt: "Figma documentation page for the Kursion variables: architecture, colour swatches, spacing, radius and type scales", caption: "Stage 06 – Figma variables documentation page", source: "figma-claude" } as Shot,
  code: { src: `${DIR}/06/code-two-themes-demo.webp`, alt: "The same markup rendered in two themes from a CSS token file", caption: "Code demo, not Figma: tokens.css with a second theme overriding 7 semantic aliases (screenshot uses a fallback font)", source: "code" } as Shot,
};

export const modeNote =
  "The Figma Free plan allows one mode per collection, so a second brand mode does not exist in Figma. It is documented as a mapping there and demonstrated only in code.";

/* ------------------------------------------------------------------ Stage 07 */

export const prototypeFacts = [
  "One self-contained HTML file: CSS custom properties and vanilla JavaScript",
  "14 fictional trainings stored in the page – no backend, storage, network calls or emails",
  "Layouts at 1440, 768 and 390px (CSS changes at 1024, 900 and 600px)",
  "Built with Claude – not with Figma Make; Asya did not hand-code it",
];

export const thingsToTry = [
  "Click “Show 3 trainings” in the warning, then open “How is this calculated?”",
  "Search for “maya” or a training ID such as TRN-1042, then press Escape",
  "Sort by a column header, or use the Sort select",
  "Open “Delete draft” on a draft and “Cancel training” on an open training – compare the two dialogs",
  "Submit “New training” empty to see the error summary and inline errors",
  "Resize the window to 768 or 390px – the table becomes cards",
];

export const breakpoints = [
  { range: "≥ 1024px", layout: "Sidebar navigation and the data table" },
  { range: "900–1023px", layout: "Top bar with a menu, data table" },
  { range: "600–899px", layout: "Two-column training cards" },
  { range: "< 600px", layout: "Single-column cards, visible Sort, wrapping chips, compact warning" },
];

const P = `${DIR}/07`;
export const prototypeHero: Shot = { src: `${P}/1440-default.webp`, alt: "Kursion prototype at 1440px: sidebar, search, filter chips, needs-attention warning and the trainings table", caption: "Prototype – default view, 1440px", source: "prototype" };
export const prototypeShots: Shot[] = [
  { src: `${P}/1440-needs-attention.webp`, alt: "Prototype filtered to the three trainings that need attention", caption: "1440 – Needs attention filter", source: "prototype" },
  { src: `${P}/1440-rule-disclosure.webp`, alt: "Prototype with the How is this calculated disclosure open", caption: "1440 – Rule disclosure", source: "prototype" },
  { src: `${P}/1440-details.webp`, alt: "Prototype details panel for a training", caption: "1440 – Training details", source: "prototype" },
  { src: `${P}/1440-new-training-errors.webp`, alt: "New training form with an error summary and inline errors", caption: "1440 – Form validation", source: "prototype" },
  { src: `${P}/1440-cancel-dialog.webp`, alt: "Cancel training confirmation dialog", caption: "1440 – Cancel training", source: "prototype" },
  { src: `${P}/1440-delete-draft-dialog.webp`, alt: "Delete draft confirmation dialog", caption: "1440 – Delete draft", source: "prototype" },
  { src: `${P}/768-default.webp`, alt: "Prototype at 768px with a two-column card grid", caption: "768 – Default", source: "prototype" },
  { src: `${P}/768-details.webp`, alt: "Prototype details panel at 768px", caption: "768 – Details", source: "prototype" },
  { src: `${P}/768-form-errors.webp`, alt: "New training form with errors at 768px", caption: "768 – Form errors", source: "prototype" },
  { src: `${P}/390-default.webp`, alt: "Prototype at 390px with single-column training cards", caption: "390 – Default", source: "prototype" },
  { src: `${P}/390-details.webp`, alt: "Prototype details panel at 390px", caption: "390 – Details", source: "prototype" },
  { src: `${P}/390-form-errors.webp`, alt: "New training form with errors at 390px", caption: "390 – Form errors", source: "prototype" },
  { src: `${P}/390-compact-warning-crop@2x.webp`, alt: "Close-up of the compact needs-attention warning at 390px", caption: "390 – Compact warning", source: "prototype" },
];

export const prototypeTokens = [
  "Primitives as CSS custom properties, e.g. --color-blue-600: #2245B8",
  "Semantic aliases used by components, e.g. --action-primary: var(--color-blue-600), --border-input, --status-*-bg / -fg, --warning-*, --inverse-*",
  "Spacing --space-xs … --space-2xl = 4 / 8 / 12 / 16 / 24 / 32px; radius --radius-control 8px, --radius-card 12px",
  "Scrim and shadow tokens derived from the neutral palette; no fixed colours outside the primitive layer",
];

/** Documented, intentional differences between the Figma frames and the prototype (review record). */
export const figmaVsPrototype = [
  "Data set: Figma uses the 8 trainings from the Stage 03 output; the prototype uses 14 (3 need attention).",
  "Status badges: the prototype adds a small icon; Figma badges are text only. Both are text-labelled.",
  "Seats column: the prototype shows “N available” under the seat count; Figma rows don’t.",
  "Filter-on warning: wording and an extra “Filter on” line differ slightly.",
  "Details panel, new/edit form, mobile navigation drawer and toasts exist only in the prototype.",
  "Focus ring: Figma uses a 2px gap plus 2px ring; the prototype a 2px outline with 2px offset.",
  "900–1023px: the prototype shows the table with a top bar; there is no Figma frame for this range.",
  "Touch targets: mobile chips are 44px in Figma and 40px in the prototype (both above the 24px minimum).",
  "Focus after deleting a draft moves to the next row’s View button; Figma doesn’t annotate this.",
];

/* ------------------------------------------------------------------ automated checks */

export const checks = {
  total: 107,
  passed: 107,
  axe: 7,
  runner: "Playwright 1.63.0 (headless Chromium) + axe-core 4.10.2 (WCAG 2.0–2.2 A/AA and best-practice rules)",
  date: "27 Oct 2026",
  fileHash: "2f34257db263d185",
  groups: [
    { label: "Search, filters and empty states", n: 11 },
    { label: "Sorting", n: 5 },
    { label: "Needs-attention rule and warning", n: 14 },
    { label: "Status-based row actions", n: 4 },
    { label: "Details panel and forms", n: 19 },
    { label: "Cancel training and Delete draft", n: 23 },
    { label: "Responsive layouts and page health", n: 24 },
    { label: "axe-core scans: 1440, 768 and 390px, details panel, form errors, cancel and delete dialogs", n: 7 },
  ],
};

export const designedIn = [
  "Statuses always combine text with colour",
  "One visible focus style; logical tab order; skip link",
  "Dialogs use role=alertdialog, start on the safe action and return focus",
  "Error summary that receives focus, inline errors with aria-invalid",
  "Live result count; aria-pressed chips; aria-sort headers",
  "Contrast calculated with the WCAG formula (see Stage 06)",
];

export const notDone = [
  "No testing with real users",
  "No manual screen-reader testing",
  "No testing on real devices",
  "Not a full accessibility audit – automated tools find only part of WCAG issues",
];

/* ------------------------------------------------------------------ What AI couldn't decide */

export const aiCouldntDecide: { title: string; ai: string; asya: string }[] = [
  { title: "Which generation to build on", ai: "Figma AI produced three plausible screens; Stage 01 was the most visually polished.", asya: "Selected Stage 03 for task-oriented UX, consistency and reuse – as a starting point, not a finished design." },
  { title: "Delete draft vs Cancel training", ai: "Claude proposed renaming the draft action, flagged as needing product confirmation.", asya: "Defined two separate actions with separate dialogs, and limited cancellation to Published and Registration open." },
  { title: "Claims the product can’t back up", ai: "The proposed dialog promised emails, a message to participants and a duplicate option.", asya: "Removed every unsupported email, notification and backend claim." },
  { title: "The 14-day rule", ai: "The warning needs a concrete rule to filter by, but no real product data defined one.", asya: "Kept the 14-day window and default minimum of 8 only as configurable, clearly labelled fictional assumptions – and required the warning to match the list it filters." },
  { title: "The brand", ai: "Figma AI named the product “Kursion” in Stage 01 and “Forma” in Stages 02–03.", asya: "Chose Kursion as the final brand and kept the original screenshots unchanged." },
  { title: "Mobile sorting and filtering", ai: "The proposed mobile layout had no Sort control and assumed infinite scroll.", asya: "Required a visible Sort control, usable chips, a documented tablet layout and no infinite scroll." },
  { title: "TrainingCard trade-off", ai: "Figma’s shared text properties made variant masters show data from other states.", asya: "Accepted less convenient editing so that every master shows truthful content." },
];

/* ------------------------------------------------------------------ limitations and lessons */

export const limitations = [
  "The needs-attention rule (14 days, minimum 8) is a fictional, configurable assumption – not a researched business rule.",
  "Figma and the prototype differ in documented ways (see Stage 07).",
  "One variable mode per collection on the Figma Free plan; the second brand exists only in code.",
  "The Figma components are local to the file and are not React components.",
  "No user research or usability testing; automated checks only.",
];

/** Asya's lessons learned (Part B), verbatim. */
export const lessons = [
  "The biggest lesson was that AI can generate a visually polished interface very quickly, but visual quality does not automatically mean good usability.",
  "The first generation demonstrated how AI interprets a broad request. The second showed the importance of explaining users, tasks, information hierarchy and business requirements. The third demonstrated how design-system constraints can improve consistency and make the output more predictable.",
  "I also learned that even detailed prompts cannot replace design review. AI can introduce unverified product assumptions, inconsistent behaviour and accessibility issues that need to be checked.",
  "Using Claude for refinement, components, variables and prototyping helped me explore a more complete workflow. However, I need to critically evaluate its suggestions rather than treat generated output as automatically correct.",
  "My main takeaway is that AI is most valuable as a design collaborator when the designer provides direction, evaluates the results and makes the final decisions.",
];

/* ------------------------------------------------------------------ outcome */

export const outcome: { value: string; label: string }[] = [
  { value: "3", label: "AI generations (+1 dialog)" },
  { value: "7", label: "refined frames" },
  { value: "8", label: "decisions · 4 Accept, 4 Modify" },
  { value: "11", label: "UI components · 52 variants" },
  { value: "21", label: "icon components" },
  { value: "149", label: "design variables" },
  { value: "3", label: "responsive layouts" },
  { value: "107", label: "automated checks passed" },
];
