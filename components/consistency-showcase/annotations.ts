// Annotations for the Before / After comparison. Numbers match the markers in the screens.
export type ScenarioId = "dashboard" | "form" | "list";

export const scenarios: { id: ScenarioId; label: string; title: string }[] = [
  { id: "dashboard", label: "A · Dashboard", title: "Training management dashboard" },
  { id: "form", label: "B · Registration form", title: "Participant registration" },
  { id: "list", label: "C · Training list", title: "Training list" },
];

export const notes: Record<ScenarioId, { before: { title: string; finding: string }[]; after: { title: string; why: string }[] }> = {
  dashboard: {
    before: [
      { title: "Three names for one object", finding: "A-09" },
      { title: "“+ New event” is an outlined pill; “View all” is a solid blue button", finding: "A-01" },
      { title: "Four stat boxes, four paddings and type styles", finding: "A-08" },
      { title: "Status shown as orange text, a blue pill or strikethrough", finding: "A-03" },
      { title: "Low-registration warning names no trainings", finding: "A-08" },
    ],
    after: [
      { title: "One vocabulary", why: "“Trainings” in navigation, titles and buttons. People recognise the same thing in every place (WCAG 3.2.4)." },
      { title: "One primary action per view", why: "“New training” is the only filled button; Export is secondary. The visual hierarchy now matches the task hierarchy." },
      { title: "Equal cards for equal information", why: "KPI cards share one Card component and spacing token, so the eye compares numbers instead of decoding layouts." },
      { title: "StatusBadge with a fixed vocabulary", why: "Each status has one name, one colour token and an icon, so it never depends on colour alone." },
      { title: "Numbers turned into tasks", why: "The warning lists the trainings below the minimum group size and links to them – the dashboard tells a manager what to do next." },
    ],
  },
  form: {
    before: [
      { title: "Placeholder-only name fields", finding: "A-02" },
      { title: "Underlined field that validates while typing", finding: "A-04" },
      { title: "Required checkbox is grey and unmarked", finding: "A-02" },
      { title: "Generic “Error!” banner", finding: "A-04" },
      { title: "Green “Save” at 2.5:1 contrast", finding: "A-01" },
    ],
    after: [
      { title: "Persistent labels and hints", why: "Labels stay visible while typing; hints explain why data is needed before a mistake happens." },
      { title: "Required by default, optional marked", why: "Most fields are required, so only the exceptions are marked – less visual noise, and the rule is stated once at the top." },
      { title: "Errors after submit, next to the field", why: "Validation waits for the first submit, then re-checks as fields are corrected. Each message says how to fix the problem and is linked to its field." },
      { title: "Loading state", why: "The button shows progress and ignores repeat clicks, preventing duplicate registrations." },
      { title: "Confirmation with a summary", why: "Success repeats who was registered, where and when, and offers the next action instead of a fleeting “Data saved”." },
    ],
  },
  list: {
    before: [
      { title: "Search waits for “Go”", finding: "A-05" },
      { title: "Filter names differ from the status labels", finding: "A-03" },
      { title: "Sorting hidden in a dropdown", finding: "A-05" },
      { title: "Delete runs at once; the eye icon has no name", finding: "A-06" },
      { title: "“+ Add training” is a text link at the bottom", finding: "A-01" },
    ],
    after: [
      { title: "Search as you type", why: "Results update immediately, and the result count is announced to screen readers (WCAG 4.1.3)." },
      { title: "Filters speak the badge language", why: "Chips use the same five status names as the badges, with counts, so people can predict the result before filtering." },
      { title: "Sortable column headers", why: "Sorting happens where the data is. The state is shown with an icon, in text and with aria-sort." },
      { title: "Labelled actions with a clear hierarchy", why: "Edit is secondary; Cancel is destructive, asks for confirmation and keeps the training’s history instead of deleting it." },
      { title: "Primary action in the same place", why: "“New training” sits top right on every screen, matching the dashboard." },
    ],
  },
};
