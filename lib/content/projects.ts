// Portfolio content. Sources: Anastasija's two CVs (2026), ai-portfolio-asya.vercel.app
// and asyase.github.io/about_me. Nothing here should be added without a source.
//
// Images are served from Anastasija's existing portfolios. To self-host them,
// download each file into /public/work/<slug>/ and change the `src` values.

import { SHOW_UNPUBLISHED } from "./publication";
import { unpublishedProjects } from "./unpublished-projects";

export type Category = "fullstack" | "design" | "ai";

export const categories: { id: Category | "all"; label: string; hash: string }[] = [
  { id: "all", label: "All work", hash: "all" },
  { id: "fullstack", label: "Full-Stack & Frontend", hash: "fullstack" },
  { id: "design", label: "UX/UI Design", hash: "design" },
  { id: "ai", label: "AI & Automation", hash: "ai" },
];

export type StatusTone = "done" | "shipped" | "wip" | "proto" | "concept";
export type Status = { label: string; tone: StatusTone };

export type ArchNode = {
  id: string;
  label: string;
  kind: "input" | "ui" | "api" | "guard" | "ai" | "process" | "storage" | "output";
  tech: string;
  detail: string;
};

export type Shot = { src: string; alt: string; caption?: string };
export type Feature = { label: string; state: "done" | "proto" | "planned" };

/** Interactive widgets a case study can embed (see components/ds-showcase/widgets.tsx). */
export type WidgetId =
  | "ds-tokens" | "ds-multibrand" | "ds-composer" | "ds-playground" | "ds-implementation"
  | "cc-audit" | "cc-consolidation" | "cc-before-after" | "cc-a11y" | "cc-docs" | "cc-implementation" | "cc-outcomes"
  | "pp-overview" | "pp-roles" | "pp-generations" | "pp-refinement" | "pp-components" | "pp-variables" | "pp-prototype" | "pp-testing" | "pp-ai-decide" | "pp-lessons" | "pp-outcome";

/** A custom numbered chapter. When a project has chapters, they replace the default sections. */
export type Chapter = {
  key: string;
  title: string;
  lead?: string;
  body?: string[];
  bullets?: string[];
  widget?: WidgetId;
  /** Clearly labelled box, e.g. for conceptual or not-yet-built parts. */
  callout?: { label: string; title: string; items: string[]; placement?: "before" | "after" };
  columns?: { title: string; items: string[] }[];
  features?: Feature[];
  lessons?: string[];
};

export type Project = {
  slug: string;
  title: string;
  kicker: string; // one-line type of work
  year?: string;
  status: Status;
  categories: Category[];
  role: string;
  context?: string;
  summary: string;
  stack: string[];
  awards?: string[];
  honors?: string[]; // e.g. thesis grade; shown like awards
  featured?: boolean;
  accent: "pink" | "lavender" | "rose" | "peri";
  // Case study sections (all optional; the template hides what is missing)
  problem?: string;
  approach?: string[];
  insights?: string[]; // design insights from analysis (not user research)
  design?: string[];
  architecture?: { caption: string; nodes: ArchNode[] };
  features?: Feature[];
  implementation?: string[];
  challenges?: { challenge: string; solution: string }[];
  result?: string[];
  lessons?: string[];
  numbers?: { value: string; label: string }[];
  code?: { file: string; lang: string; body: string; note: string };
  chapters?: Chapter[];
  /** Internal interactive demo, linked from the case study header. */
  demo?: { label: string; href: string };
  shots: Shot[];
  cover?: string; // self-hosted card cover (top of the first screenshot)
  /** Label shown on gallery cards. Only meaningful distinctions; the full status stays on the case study. */
  cardBadge?: Status;
  links: { label: string; href: string }[];
};

const AI = "https://ai-portfolio-asya.vercel.app";
const OLD = "https://asyase.github.io/about_me/assets/images/portfolio";
const FIGMA = "https://www.figma.com/file/t38YDpRvHsOxxAQnTa3R1q/designs_anastasija";

export const projects: Project[] = [
  {
    slug: "ai-meal-planner",
    title: "AI Nutrition & Weekly Meal Planner",
    kicker: "AI application · Full-stack",
    status: { label: "Completed · Awarded by RingIT", tone: "done" },
    categories: ["ai", "fullstack"],
    role: "Solo – idea, Java backend, Vue frontend, prompts, evaluation and security",
    context: "Built during the Full-Stack AI Developer Programme at BCS Koolitus",
    summary:
      "A planner that knows what is in your kitchen. It suggests recipes from your pantry, plans a week of meals, tracks calories against a daily goal and lists only the groceries you are missing.",
    stack: ["Java 21", "Spring Boot", "Spring AI", "Gemini", "Claude (Anthropic Java SDK)", "PostgreSQL", "Vue 3", "Vite"],
    awards: ["Award · RingIT company"],
    featured: true,
    accent: "pink",
    problem:
      "Planning meals, checking the pantry, counting calories and writing a shopping list are each small jobs, but together they eat real time. Generic meal plans also ignore what is actually in the fridge.",
    approach: [
      "Ground every prompt in the user's own data: pantry, saved recipes and the current week's dishes.",
      "Keep maths out of the model. Quantities come from the AI; calories are calculated in Java from a nutrition table.",
      "Put the AI provider behind an interface, so the Gemini version and the Claude version share the same code and tests can swap in a fake.",
      "Treat prompts as code: version them in Markdown files and compare versions with A/B tests.",
    ],
    architecture: {
      caption: "Every AI call passes an input guard on the way in and schema validation on the way out.",
      nodes: [
        { id: "in", label: "Pantry & recipes", kind: "input", tech: "PostgreSQL", detail: "Products at home with kcal per 100 g, saved recipes, weekly menus and the calorie log." },
        { id: "guard", label: "Input guard", kind: "guard", tech: "Java · regex · LLM judge", detail: "Three layers: a length cap, regex patterns for known injection phrases, and an LLM safety judge for anything the first two miss." },
        { id: "ai", label: "Grounded prompt", kind: "ai", tech: "Gemini via Spring AI / Claude", detail: "Prompts are loaded from Markdown and built from the user's own data. Chain-of-thought is shown to the user for the weekly menu." },
        { id: "schema", label: "Schema validation", kind: "process", tech: "Typed Java records", detail: "Responses map to typed records and are checked against a schema before anything is used. A RecipeQuality check requires at least two real ingredients." },
        { id: "kcal", label: "Calorie maths", kind: "process", tech: "Java", detail: "Calories are computed from quantities in code. Only unknown products get an AI estimate, and those are labelled as estimates." },
        { id: "out", label: "Menu, recipes, list", kind: "ui", tech: "Vue 3", detail: "Weekly menu (7 days × 3 meals), recipes with step-by-step guidance, and a shopping list grouped by store section." },
      ],
    },
    features: [
      { label: "Pantry with calories per 100 g", state: "done" },
      { label: "Classic and creative recipe suggestions from pantry items", state: "done" },
      { label: "Ingredient substitution and portion-scaled cooking steps", state: "done" },
      { label: "Weekly menu by diet, style and number of people, with single-dish swap", state: "done" },
      { label: "Shopping list of missing items only, grouped by store section", state: "done" },
      { label: "Daily calorie goal and tracking", state: "done" },
      { label: "Restaurant menu advice that fits the remaining calories", state: "done" },
      { label: "Prompt A/B tests with an LLM-as-a-judge", state: "done" },
      { label: "Security test page showing which safety layer stops a text", state: "done" },
      { label: "Sign-in and user accounts", state: "planned" },
    ],
    implementation: [
      "Few-shot prompting sorts products into store sections; a one-shot example anchors recipe format.",
      "Evaluation combines code checks (format and grounding) with a second model acting as judge, and the judge itself is tested against answers with known scores.",
      "AI outputs are sanitised as well as inputs.",
      "22 test files; the AI provider is replaced with a fake in tests.",
    ],
    challenges: [
      {
        challenge: "Over-literal grounding. With only pantry items available, the model proposed an avocado and gummy-bear dessert, then a 'recipe' that said to open the bag of gummies.",
        solution: "A prompt quality rule, a Java RecipeQuality check requiring two real ingredients, and prompt tuning so the model did not become over-cautious.",
      },
      {
        challenge: "The judge can be fooled. It gave 93/100 to a recipe that poured Aperol over gummy bears.",
        solution: "Every AI answer is also checked in Java. The judge is a signal, not the gate.",
      },
    ],
    numbers: [
      { value: "3/4 → 0/4", label: "absurd recipes on a hard input, prompt v1 vs v2" },
      { value: "28.6 s → 2.0 s", label: "HIGH vs LOW thinking, same quality score" },
      { value: "22", label: "test files with a fake AI provider" },
    ],
    result: [
      "Completed and awarded by the RingIT company.",
      "The app runs on LOW thinking: 558 tokens instead of 2,105 for the same judged quality.",
    ],
    lessons: [
      "Grounding alone does not guarantee quality.",
      "A good prompt needs testing, not intuition.",
      "AI and Java complement each other: let the model write, let code check.",
    ],
    code: {
      file: "RecipeService.java",
      lang: "java",
      note: "Simplified to show the shape of the pipeline.",
      body: `public RecipeSuggestion suggest(Pantry pantry, String userNote) {
    inputGuard.check(userNote);              // length → regex → LLM judge

    var prompt = prompts.load("recipe-v2.md")
        .with("pantry", pantry.items())      // grounding
        .with("note", userNote);

    var recipe = ai.generate(prompt, RecipeSuggestion.class);
    schema.validate(recipe);                 // typed record, schema-checked
    quality.require(recipe);                 // ≥ 2 real ingredients

    return recipe.withCalories(
        nutrition.calculate(recipe.ingredients())   // maths in Java
    );
}`,
    },
    shots: [
      { src: `${AI}/projects/ai-nutrition-meal-planner/cover-pantry-and-daily-calories.png`, alt: "Pantry view with daily calorie progress", caption: "Pantry and daily calories (Estonian interface)" },
      { src: `${AI}/projects/ai-nutrition-meal-planner/01-weekly-menu.png`, alt: "Weekly menu, seven days by three meals", caption: "Weekly menu with visible reasoning" },
      { src: `${AI}/projects/ai-nutrition-meal-planner/02-recipes-from-what-is-at-home.png`, alt: "Recipe suggestions generated from pantry products", caption: "Recipes from what is at home" },
      { src: `${AI}/projects/ai-nutrition-meal-planner/03-shopping-list-by-store-section.png`, alt: "Shopping list grouped by store section", caption: "Shopping list by store section" },
      { src: `${AI}/projects/ai-nutrition-meal-planner/04-prompt-AB-tests-with-LLM-judge.png`, alt: "Prompt A/B test results scored by an LLM judge", caption: "Prompt A/B tests with an LLM judge" },
    ],
    links: [{ label: "Full technical case study", href: `${AI}/projects/ai-nutrition-meal-planner` }],
  },
  {
    slug: "ai-website-builder",
    title: "AI-Powered Website Builder",
    kicker: "Commercial AI integration · GoERP",
    status: { label: "Commercial · Shipped", tone: "shipped" },
    categories: ["ai", "fullstack"],
    role: "Developer on the product team – Claude API integration, prompt input and preview UI",
    context: "Erply Development OÜ, GoERP business platform",
    summary:
      "I introduced AI into the company's website builder. A short business description becomes structured content that fills predefined sections of reusable Go templates, with a preview step before anything goes live.",
    stack: ["Anthropic Claude API", "JavaScript", "Go Templates", "REST APIs", "SQL / QueryService"],
    featured: true,
    accent: "lavender",
    problem:
      "A first draft of a business website needs a lot of copy before the design can even be judged. Language models write that draft quickly, but raw model output is unstructured, while the template system needs predictable fields it can render safely.",
    approach: [
      "The model drafts; the application owns structure and rendering.",
      "Claude is asked for a defined structure instead of free text.",
      "Responses are parsed and checked in JavaScript before they reach a template.",
      "Content maps into predefined sections of existing Go templates, so layout stays under the template's control.",
    ],
    design: [
      "A prompt input that asks for what the business does and what the site should say.",
      "A preview of generated content, so people can review and correct it before it goes live. The preview is where trust is built.",
    ],
    architecture: {
      caption: "Simplified data flow from business brief to rendered pages.",
      nodes: [
        { id: "brief", label: "Business brief", kind: "input", tech: "Prompt input UI", detail: "The user describes the business and what the site should communicate." },
        { id: "claude", label: "Content generation", kind: "ai", tech: "Anthropic Claude API", detail: "The brief is sent with instructions for a defined output structure." },
        { id: "parse", label: "Parse & check", kind: "process", tech: "JavaScript", detail: "Output is parsed and validated so missing or malformed parts are caught before rendering." },
        { id: "preview", label: "Preview & edit", kind: "ui", tech: "Preview UI", detail: "Broken or incomplete parts are visible in the preview, where the user can write or fix content." },
        { id: "tpl", label: "Template mapping", kind: "process", tech: "Go Templates", detail: "Validated content maps to fields of reusable templates that control the layout." },
        { id: "site", label: "Rendered website", kind: "output", tech: "GoERP", detail: "Pages are produced from the templates and published." },
      ],
    },
    features: [
      { label: "Content generation from a business description", state: "done" },
      { label: "Structured response parsing and validation", state: "done" },
      { label: "Integration with reusable Go templates", state: "done" },
      { label: "Prompt input and result preview UI", state: "done" },
    ],
    result: ["The feature went live for the company's users."],
    lessons: [
      "Letting the model draft while the application owns structure is safer than trusting raw output.",
      "People are more comfortable with AI content they can see and fix before publishing.",
    ],
    code: {
      file: "generate-sections.js",
      lang: "js",
      note: "Illustrative sketch of the parse-and-check step, not production code.",
      body: `const SECTIONS = ["hero", "services", "about", "contact"];

export function toTemplateFields(raw) {
  const data = safeParse(raw);               // never trust free text
  const fields = {};
  for (const key of SECTIONS) {
    const section = data?.[key];
    fields[key] = isValid(section)
      ? section
      : { status: "needs-review" };          // surfaced in the preview
  }
  return fields;                             // Go template owns layout
}`,
    },
    shots: [
      { src: `${AI}/projects/ai-website-builder/cover-mockup-brief-to-website.png`, alt: "Mockup: business brief turned into a website", caption: "Brief to website (mockup)" },
      { src: `${AI}/projects/ai-website-builder/01-mockup-three-generated-layouts.png`, alt: "Mockup of three generated layouts", caption: "Three generated layouts (mockup)" },
      { src: `${AI}/projects/ai-website-builder/02-mockup-generated-homepage.png`, alt: "Mockup of a generated homepage", caption: "Generated homepage (mockup)" },
    ],
    links: [{ label: "Full technical case study", href: `${AI}/projects/ai-website-builder` }],
  },
  {
    slug: "liftertrans",
    title: "LifterTrans – Transport Management & AI Data Assistant",
    kicker: "Full-stack application · NL-to-SQL",
    status: { label: "Course project · AI chat prototype", tone: "proto" },
    categories: ["fullstack", "ai"],
    role: "Backend developer in a team of three – REST APIs, roles, and the AI chat backend",
    context: "Built for a crane and transport company",
    summary:
      "A transport management system for jobs, drivers and customers, with an AI assistant that answers questions about cargo, vehicles and jobs in plain language – safely, on a read-only connection.",
    stack: ["Java 21", "Spring Boot", "Spring Data JPA / Hibernate", "PostgreSQL", "REST API", "Swagger / OpenAPI", "Vue 3", "Vite", "Spring AI", "Gemini", "Docker", "Git"],
    featured: true,
    accent: "peri",
    problem:
      "Fleet and job data lives in a relational database, but the people asking questions do not write SQL. Letting a model generate queries is tempting, but generated SQL can be wrong or unsafe if it runs unchecked.",
    approach: [
      "Build the core system first: CRUD for jobs, drivers and customers with ADMIN and DRIVER roles.",
      "Treat model-written SQL as untrusted input and defend in three layers: prompt rules, Java checks and a read-only database connection.",
      "Let the model refuse. It returns FORBIDDEN or CANNOT_ANSWER instead of guessing.",
    ],
    architecture: {
      caption: "POST /api/ask returns { answer, sql }. A missed case still cannot write.",
      nodes: [
        { id: "q", label: "Admin question", kind: "input", tech: "Vue 3", detail: "An admin asks about cargo, vehicles or jobs in plain language." },
        { id: "api", label: "POST /api/ask", kind: "api", tech: "Spring Boot", detail: "REST endpoint; refusals return as a normal 400 message shown as the assistant's reply." },
        { id: "gem", label: "NL → SQL", kind: "ai", tech: "Gemini via Spring AI", detail: "The question and schema go to Gemini, which returns one SELECT as JSON, or FORBIDDEN / CANNOT_ANSWER." },
        { id: "val", label: "SQL validation", kind: "guard", tech: "Java", detail: "Must start with SELECT; DELETE, UPDATE, INSERT, DROP, CREATE and INTO are rejected; the users table is blocked." },
        { id: "db", label: "Read-only run", kind: "storage", tech: "PostgreSQL", detail: "Executed on a read-only connection that is rolled back, so PostgreSQL itself rejects any write." },
        { id: "sum", label: "Summary", kind: "output", tech: "Gemini", detail: "The rows are summarised in one to three sentences and returned together with the SQL." },
      ],
    },
    features: [
      { label: "Authentication with ADMIN and DRIVER roles", state: "done" },
      { label: "CRUD for jobs, drivers and customers", state: "done" },
      { label: "Natural-language question → SQL", state: "proto" },
      { label: "Structured JSON answers incl. FORBIDDEN / CANNOT_ANSWER", state: "proto" },
      { label: "SQL validation and read-only execution with rollback", state: "proto" },
      { label: "Chat screen in the web app", state: "planned" },
    ],
    implementation: [
      "Layered Spring Boot backend with Spring Data JPA / Hibernate on PostgreSQL.",
      "Vue frontend integrated with backend REST endpoints; Swagger/OpenAPI for documentation and testing.",
      "Git-based team workflow and Docker.",
    ],
    challenges: [
      { challenge: "A prompt could try to change or delete data.", solution: "Three independent layers. Even if the prompt and the Java checks miss something, the database user cannot write." },
      { challenge: "Some questions cannot be answered from the data.", solution: "The model returns CANNOT_ANSWER and the user sees a clear message instead of a guess." },
    ],
    result: ["Presented at the end of the course."],
    lessons: ["A strict prompt helps, but real safety comes from code-level checks and a read-only database user."],
    code: {
      file: "SqlGuard.java",
      lang: "java",
      note: "Simplified version of the validation rules.",
      body: `private static final Pattern FORBIDDEN = Pattern.compile(
    "\\\\b(DELETE|UPDATE|INSERT|DROP|CREATE|INTO)\\\\b", CASE_INSENSITIVE);

public String requireSafe(String sql) {
    var s = sql.strip();
    if (!s.regionMatches(true, 0, "SELECT", 0, 6))
        throw new ForbiddenSqlException();
    if (FORBIDDEN.matcher(s).find() || touchesUsers(s))
        throw new ForbiddenSqlException();
    return s;   // then runs on a read-only, rolled-back connection
}`,
    },
    shots: [
      { src: `${AI}/projects/ai-data-assistant/cover-mockup-AI-chat-about-cargo-and-vehicles.png`, alt: "Mockup of the planned AI chat about cargo and vehicles", caption: "Planned chat screen (illustrative mockup)" },
    ],
    links: [{ label: "AI Data Assistant case study", href: `${AI}/projects/ai-data-assistant` }],
  },
  {
    slug: "content-factory",
    title: "Content Factory",
    kicker: "Multi-tenant AI platform",
    status: { label: "In development", tone: "wip" },
    categories: ["ai", "fullstack"],
    role: "Developer",
    summary:
      "A platform that turns a brand's photos, clips, voice notes and text into social posts. Claude writes ideas, scripts and translations, ffmpeg renders video, and posts are scheduled through official platform APIs – with a human approving along the way.",
    stack: ["Go", "Anthropic Claude API", "PostgreSQL", "River job queue", "ffmpeg", "templ + HTMX", "S3 (RustFS)", "GitLab CI", "Claude Code"],
    featured: true,
    accent: "rose",
    problem:
      "Posting regularly across several platforms in Estonian, Russian and English means repetitive work: ideas, scripts, video edits, format and language variants, scheduling and replies. Small brands rarely have the people for it.",
    approach: [
      "Every workflow step is a durable, retryable job in PostgreSQL.",
      "Claude does the language work; ffmpeg renders from the brand's own footage; official APIs publish.",
      "Built with Claude Code from a written spec, milestone by milestone, with a review after each milestone and binding engineering rules.",
    ],
    architecture: {
      caption: "Four Go binaries from one codebase: API & admin UI, workers, migrations, and an operator CLI.",
      nodes: [
        { id: "assets", label: "Brand assets", kind: "input", tech: "Photos · clips · notes", detail: "The brand profile and uploads form the 'brand brain'. Media is described and tagged automatically." },
        { id: "claude", label: "Ideas & scripts", kind: "ai", tech: "Claude API · tool use · prompt caching", detail: "Ideas, beat-by-beat scripts, translations, asset descriptions and reply drafts." },
        { id: "review", label: "Human review", kind: "ui", tech: "templ + HTMX", detail: "People approve ideas and edit scripts before anything is rendered or posted." },
        { id: "render", label: "Render job", kind: "process", tech: "ffmpeg via River", detail: "Every side effect – model call, render, publish – is an idempotent job, so failures retry instead of double-posting." },
        { id: "db", label: "Tenant data", kind: "storage", tech: "PostgreSQL row-level security", detail: "Isolation is enforced in the database, so an application bug cannot leak data between workspaces." },
        { id: "pub", label: "Publish", kind: "output", tech: "Official platform APIs", detail: "Adapters for Telegram, YouTube, Instagram, Facebook, Threads, TikTok, Pinterest and X. Instagram is the one published to so far." },
      ],
    },
    features: [
      { label: "AI idea generation from brand profile and assets", state: "done" },
      { label: "AI video scripts with a manual editor", state: "done" },
      { label: "Post variants per platform and language (ET / RU / EN)", state: "done" },
      { label: "Video rendering with ffmpeg", state: "done" },
      { label: "Scheduling calendar and publishing jobs", state: "done" },
      { label: "Platform adapters (8 platforms; Instagram published so far)", state: "done" },
      { label: "Inbox with AI-drafted replies, analytics, competitor tracking", state: "done" },
      { label: "Multi-tenant workspaces with database-level isolation", state: "done" },
    ],
    challenges: [
      { challenge: "Many brands share one deployment.", solution: "PostgreSQL row-level security, not only application checks." },
      { challenge: "Model calls, renders and publishing can fail midway.", solution: "Idempotent, retryable jobs that can safely rerun." },
      { challenge: "Platforms require AI-generated media to be declared.", solution: "Each image's origin is recorded and disclosure flags are set per platform automatically." },
    ],
    numbers: [
      { value: "~590", label: "Go files" },
      { value: "213", label: "test files" },
      { value: "64", label: "database migrations" },
    ],
    result: ["Posts generated and published to Instagram through the platform. Screenshots show a demo workspace with sample data."],
    lessons: ["A clear spec and roadmap made building with Claude Code faster and more predictable."],
    shots: [
      { src: `${AI}/projects/content-factory/cover.webp`, alt: "Content Factory dashboard", caption: "Overview (demo workspace)" },
      { src: `${AI}/projects/content-factory/01-generated-ideas.webp`, alt: "List of AI-generated post ideas", caption: "Generated ideas" },
      { src: `${AI}/projects/content-factory/02-script-editor.webp`, alt: "Beat-by-beat script editor", caption: "Script editor" },
      { src: `${AI}/projects/content-factory/03-post-variants-per-platform-and-language.webp`, alt: "Post variants per platform and language", caption: "Variants per platform and language" },
      { src: `${AI}/projects/content-factory/04-publishing-calendar.webp`, alt: "Publishing calendar", caption: "Publishing calendar" },
    ],
    links: [{ label: "Full technical case study", href: `${AI}/projects/content-factory` }],
  },
  {
    slug: "telia-ux-audit",
    title: "Telia Internal Service Platform – UX Audit & Redesign",
    kicker: "UX research · Bachelor's thesis",
    status: { label: "Thesis · Top grade", tone: "done" },
    categories: ["design"],
    role: "UX researcher & UI/UX designer",
    context: "Bachelor's thesis, Tallinn University",
    summary:
      "Usability research and interface proposals for Telia Eesti's internal customer service platform, used by employees for customer service, technical support, billing and customer interaction.",
    stack: ["Figma", "Google Forms", "UX audit", "User flows", "Heuristic evaluation", "Prototype validation"],
    honors: ["Defended with the top grade (5)", "Praised for the work"],
    featured: true,
    accent: "peri",
    problem:
      "Employee feedback showed that several workflows were unclear, slow and hard to use efficiently. The goal was to find the critical usability issues and design improvements that help employees work faster, with fewer errors and more confidence.",
    approach: [
      "UX audit and employee feedback analysis",
      "User surveys and usability test results",
      "User-flow mapping",
      "Problem prioritisation",
      "Heuristic evaluation against Nielsen's 10 heuristics",
      "Prototype validation with user feedback",
    ],
    design: [
      "Clear system status and visible progress",
      "Understandable labels and form instructions",
      "Validation before important information is submitted",
      "Confirmation before irreversible actions",
      "Helpful error messages with next-step guidance",
      "Consistent UI patterns and a clearer information hierarchy",
    ],
    implementation: [
      "Key findings: customer search was not always clear or efficient; forms needed better structure and validation; system status and next steps were often invisible; important actions needed stronger confirmation; some screens were overly complex.",
      "Improved flows: customer search, customer interaction modal, automatic call registration, incoming contact reminder, employee dashboard, and TV, mobile, home internet and landline service pages.",
    ],
    result: [
      "Defended with the highest grade (5) and received praise for the work.",
      "Proposals were evaluated against Nielsen's heuristics and validated with user feedback.",
      "The project shows how structured research and prioritisation improve complex internal systems where people handle customer data under time pressure.",
    ],
    shots: [
      { src: `${OLD}/p9.jpg`, alt: "Redesigned filter interface", caption: "Filter improvements" },
      { src: `${OLD}/p10.jpg`, alt: "Redesigned customer search", caption: "Customer search" },
      { src: `${OLD}/p8.jpg`, alt: "Employee dashboard with feedback improvements", caption: "Dashboard feedback" },
      { src: `${OLD}/p11.png`, alt: "Incoming contact reminder", caption: "Contact reminder" },
    ],
    links: [
      { label: "Figma – filter improvements", href: `${FIGMA}?type=design&node-id=32%3A4628&mode=design` },
      { label: "Figma – customer search", href: `${FIGMA}?type=design&node-id=36%3A15461&mode=design` },
      { label: "Figma – dashboard feedback", href: `${FIGMA}?type=design&node-id=32%3A7414&mode=design` },
      { label: "Figma – contact reminder", href: `${FIGMA}?type=design&node-id=34%3A8992&mode=design` },
    ],
  },
  {
    slug: "modular-furniture-store",
    title: "Modular Furniture E-Commerce Platform",
    kicker: "E-commerce · Business logic",
    status: { label: "Client project", tone: "shipped" },
    categories: ["fullstack"],
    role: "Developer – storefront, product logic, checkout and confirmation flows; designed category pages and confirmations",
    summary:
      "A custom e-commerce platform for a modular furniture company, where every product is assembled from components – tabletops, legs, screws. Dynamic stock validation, matrix product variations, flexible pricing and checkout logic serve both customers and internal logistics.",
    stack: ["HTML", "CSS / SCSS", "JavaScript", "Go Templates", "REST APIs", "Adyen", "Montonio", "Google Analytics", "Figma"],
    featured: true,
    accent: "rose",
    problem:
      "A table is not one stock item. It exists only if every part is available. The store had to show honest availability and delivery estimates for configurable products, and still feel simple to buy from.",
    approach: [
      "Derive availability from the inventory of required parts: In stock, On order, or Pending.",
      "Model configurable variations (colour, material, size) as a matrix where each variant has its own price, stock and delivery data.",
      "Adjust delivery estimates as quantity changes, with a fallback message when stock is insufficient.",
    ],
    design: [
      "Category pages with filters for availability, brand and price, plus sorting.",
      "Breadcrumbs, VAT display logic and downloadable PDFs for finishes and technical specs.",
      "WCAG-minded, responsive interfaces with attention to page speed.",
    ],
    features: [
      { label: "Real-time availability from component stock (In stock / On order / Pending)", state: "done" },
      { label: "Matrix product system – colour, material, size, each with its own price, stock and delivery data", state: "done" },
      { label: "Delivery-time estimates that follow stock and cart quantity, with fallback messages", state: "done" },
      { label: "Multi-step checkout – courier or self-pickup, VAT toggle, Adyen payments", state: "done" },
      { label: "Category pages with filters (availability, brand, price) and sorting", state: "done" },
      { label: "PDF downloads for finishes and technical specs", state: "done" },
      { label: "Breadcrumb navigation and VAT display logic", state: "done" },
      { label: "Confirmation e-mails for clients and the internal team, incl. optional installation", state: "done" },
      { label: "Google Analytics tracking of user behaviour and conversion flow", state: "done" },
    ],
    architecture: {
      caption: "How one product's availability is worked out.",
      nodes: [
        { id: "cfg", label: "Configuration", kind: "ui", tech: "Matrix variants", detail: "Customer picks colour, material and size; each variant carries its own price, stock and delivery data." },
        { id: "bom", label: "Component check", kind: "process", tech: "Stock logic", detail: "Required parts (legs, plates, screws, fasteners) are checked against inventory." },
        { id: "state", label: "Availability", kind: "process", tech: "In stock / On order / Pending", detail: "Status and lead time update with the quantity in the cart." },
        { id: "checkout", label: "Multi-step checkout", kind: "ui", tech: "Courier / pickup · VAT toggle", detail: "Dynamic delivery options and VAT handling." },
        { id: "pay", label: "Payment", kind: "api", tech: "Adyen · Montonio", detail: "Payment integrations." },
        { id: "mail", label: "Confirmations", kind: "output", tech: "Email", detail: "Order summaries for the client and the internal team, incl. delivery data and optional installation." },
      ],
    },
    implementation: [
      "Developed a feature-rich, responsive e-commerce platform for customisable modular furniture, where each product (e.g. a table) is assembled from individual components.",
      "Implemented stock-logic validation for real-time availability (In stock / On order / Pending), based on the inventory of required parts – legs, plates, screws, fasteners.",
      "Built a matrix product system with configurable variations (colour, material, size), each with its own pricing, stock and delivery data.",
      "Created a multi-step checkout with dynamic delivery options (courier / self-pickup), a VAT toggle and Adyen payment integration.",
      "Created delivery-time logic that adjusts to stock levels and the quantity in the cart, showing an estimated lead time or a fallback message when stock is insufficient.",
      "Designed category pages with filters (availability, brand, price) and sorting.",
      "Implemented file downloads (PDFs for finishes and technical specs), breadcrumb navigation and VAT display logic.",
      "Developed and designed confirmation flows with dynamic e-mail notifications for clients and the internal team – full order summaries, delivery data and optional installation services.",
      "Followed WCAG accessibility standards, improved page speed and responsiveness across devices, and added Google Analytics tracking for user behaviour and the conversion flow.",
    ],
    result: ["Delivered as a client e-commerce site. No public link is available."],
    shots: [
      { src: "/work/modular-furniture-store/product.webp", alt: "Product page for a height-adjustable desk with tabletop colour, leg colour and size options, availability and VAT toggle", caption: "Product page – matrix variants, availability, VAT toggle" },
      { src: "/work/modular-furniture-store/catalogue.webp", alt: "Catalogue page with product carousels, breadcrumbs, prices and stock status", caption: "Catalogue – categories, prices and stock status" },
      { src: `${OLD}/furniture.jpg`, alt: "Modular furniture store product listing", caption: "Storefront" },
    ],
    links: [],
  },
  {
    slug: "accounting-modernization",
    title: "Accounting System Modernization – VERP to GoERP",
    kicker: "Commercial · Business platform",
    status: { label: "Commercial work", tone: "shipped" },
    categories: ["fullstack"],
    role: "Developer – contributed to the modernization within the GoERP/Erply environment",
    context: "Erply Development OÜ, GoERP business platform",
    summary:
      "Moving a legacy accounting system into GoERP: chart of accounts, journal entries, opening balances and account-balance views, with search, filtering, pagination and data entry for financial records.",
    stack: ["Go Templates", "JavaScript", "SQL", "QueryService", "KVS", "Erply APIs", "HTML/CSS"],
    accent: "peri",
    features: [
      { label: "Chart of accounts", state: "done" },
      { label: "Journal entries", state: "done" },
      { label: "Opening balances", state: "done" },
      { label: "Account-balance views", state: "done" },
      { label: "Search, filtering and pagination for financial records", state: "done" },
      { label: "Data-entry interfaces", state: "done" },
    ],
    implementation: [
      "Contributed to the modernization of a legacy accounting system (VERP) within the GoERP/Erply environment.",
      "Developed functionality for the chart of accounts, journal entries, opening balances and account-balance views.",
      "Implemented search, filtering, pagination and data-entry interfaces for financial records.",
      "Worked with SQL queries, QueryService, dynamic data storage (KVS) and Erply APIs to connect accounting interfaces with business data.",
    ],
    shots: [{ src: "/work/accounting-modernization/screen.webp", alt: "Illustrative mockup of a chart-of-accounts view with search, filters, pagination, account balances and recent journal entries", caption: "Chart of accounts and account balance (illustrative mockup, sample data)" }],
    links: [],
  },
  {
    slug: "home-cafe-pos",
    title: "Home Café POS System",
    kicker: "Freelance full-stack · Point of sale",
    status: { label: "In development · Used at a live event", tone: "wip" },
    categories: ["fullstack"],
    role: "Solo – design, frontend, backend, receipt printing and the n8n integration",
    context: "For a home café in Laagri",
    summary:
      "A tablet POS with catalogue, checkout with Estonian VAT, a kitchen display, inventory, refunds and printed receipts. Every order pings the owner on Telegram through n8n.",
    stack: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Fastify", "QuestDB", "n8n", "Telegram", "Epson ePOS-Print", "Vitest", "GitLab CI"],
    accent: "pink",
    problem: "A small café needs fast order-taking, kitchen tickets, stock tracking and correct receipts. Off-the-shelf POS systems are often expensive or do not fit how small cafés work.",
    architecture: {
      caption: "From the till to the kitchen, the receipt and the owner's phone.",
      nodes: [
        { id: "till", label: "Order at the till", kind: "ui", tech: "React tablet app", detail: "Catalogue, cart, promo codes and checkout." },
        { id: "api", label: "Pricing & VAT", kind: "api", tech: "Fastify", detail: "VAT calculated and rounded per line, then summed. The checkout preview uses the same logic." },
        { id: "db", label: "Orders & stock", kind: "storage", tech: "QuestDB", detail: "Orders, stock movements and an audit log, over the PostgreSQL wire protocol." },
        { id: "kds", label: "Kitchen & receipt", kind: "output", tech: "Kitchen display · Epson TM-m30", detail: "Receipts go through the printer's ePOS-Print HTTP service, including the logo as a 1-bit image." },
        { id: "n8n", label: "Notify owner", kind: "process", tech: "n8n → Telegram", detail: "Fire-and-forget webhook with a 3-second timeout, so a slow notification never blocks an order." },
      ],
    },
    features: [
      { label: "Catalogue with categories and image upload", state: "done" },
      { label: "Cart and checkout with per-line VAT; promo codes", state: "done" },
      { label: "Kitchen display with order statuses", state: "done" },
      { label: "Inventory, refunds, order history, audit log", state: "done" },
      { label: "Receipt printing on Epson TM-m30", state: "done" },
      { label: "Retry queue for failed notifications", state: "planned" },
    ],
    challenges: [
      { challenge: "The printer ignored raw ESC/POS on its network port.", solution: "Receipts are sent through its built-in ePOS-Print HTTP service." },
      { challenge: "Non-English staff names arrived garbled from the login gateway.", solution: "The app detects and repairs the broken encoding before display." },
    ],
    numbers: [{ value: "26", label: "Vitest files incl. database integration tests" }],
    result: ["Used all day at the café during Kodukohvikute päevad 2026 – orders, kitchen display, receipts and notifications."],
    lessons: ["At the till, speed and a kitchen screen readable at a glance matter most."],
    shots: [
      { src: `${AI}/projects/home-cafe-pos-system/cover-kitchen-display-english.png`, alt: "Kitchen display with order statuses", caption: "Kitchen display" },
      { src: `${AI}/projects/home-cafe-pos-system/01-product-menu.png`, alt: "Product menu on the tablet", caption: "Product menu" },
      { src: `${AI}/projects/home-cafe-pos-system/02-cart.png`, alt: "Cart with items", caption: "Cart" },
      { src: `${AI}/projects/home-cafe-pos-system/03-orders-with-vat.png`, alt: "Order history with VAT", caption: "Orders with VAT" },
      { src: `${AI}/projects/home-cafe-pos-system/04-admin.png`, alt: "Admin view", caption: "Admin" },
    ],
    links: [{ label: "Full technical case study", href: `${AI}/projects/home-cafe-pos-system` }],
  },
  {
    slug: "laboulangerie",
    title: "LaBoulangerie – Bakery E-Shop",
    kicker: "E-commerce website",
    status: { label: "Client project", tone: "shipped" },
    categories: ["fullstack"],
    role: "Front-end developer – e-commerce development, API integration, responsive UI",
    summary: "A responsive e-commerce website for a bakery: customers explore products, view details, manage a cart and pay online through an integrated payment provider.",
    stack: ["HTML", "CSS", "JavaScript", "Go Templates", "Montonio API", "Figma"],
    accent: "pink",
    implementation: ["Developed a multi-page e-commerce website with reusable product components and responsive layouts.", "Created dynamic product detail pages with image carousels, descriptions and Add to Cart functionality.", "Implemented cart operations – adding and removing products and updating quantities.", "Built the checkout with customer information forms and input validation.", "Integrated the Montonio payment API.", "Implemented confirmation emails with order details for customers and administrators.", "Kept the design and user experience consistent across the whole shopping journey."],
    problem: "The bakery needed a structured online shop where finding and ordering products is straightforward for customers, while the business receives accurate order information. The challenge was to connect every step – browsing, cart, checkout, payment and confirmation – into one consistent flow.",
    result: ["An integrated shopping flow covering product browsing, cart management, checkout, payment and order confirmation.", "Strengthened my experience connecting front-end functionality with business logic and external services in reusable, maintainable interfaces."],
    shots: [{ src: `${OLD}/boulangerie.png`, alt: "LaBoulangerie storefront", caption: "Storefront" }],
    links: [],
  },
  {
    slug: "stiilihub",
    title: "StiiliHub – Clothing Search & Product Aggregation",
    kicker: "Team platform · Scraping & search",
    status: { label: "In development", tone: "wip" },
    categories: ["fullstack"],
    role: "Frontend developer in a team of six; backend search fixes",
    summary:
      "Clothing from Estonian online stores, normalised into one catalogue that can be searched, filtered and compared in one place.",
    stack: ["Next.js", "React", "Tailwind CSS", "Java", "Spring Boot", "PostgreSQL", "Liquibase", "Jsoup", "Playwright", "Crawlee", "Swagger / OpenAPI"],
    accent: "lavender",
    problem: "Every store has its own categories, sizes and naming. Comparing items means visiting many sites, and the data does not line up.",
    architecture: {
      caption: "From store registry to searchable catalogue.",
      nodes: [
        { id: "reg", label: "Store registry", kind: "input", tech: "279 stores", detail: "Stores with eligibility rules." },
        { id: "scrape", label: "Scrape worker", kind: "process", tech: "Jsoup · Playwright · Crawlee", detail: "Queued scraping with a dedicated worker and a Node sidecar for JavaScript-heavy pages. Built by teammates." },
        { id: "norm", label: "Normalisation", kind: "process", tech: "Spring Boot", detail: "Products mapped into a shared taxonomy and attribute model; raw data is kept so mappings can be checked." },
        { id: "db", label: "Catalogue", kind: "storage", tech: "PostgreSQL · Liquibase", detail: "Products and an audit trail." },
        { id: "fe", label: "Search UI", kind: "ui", tech: "Next.js · Tailwind", detail: "Home, product, product detail, brand and category pages with dynamic categories, filters and a stores marquee." },
      ],
    },
    implementation: [
      "Designed the interface with Claude and built the Next.js frontend (about 70 frontend files).",
      "Fixed backend search: case-insensitive SQL, a lost search parameter, and availability filters.",
      "Documented the database schema; wrote an AGENTS.md / CLAUDE.md brief for AI coding agents.",
    ],
    result: ["200+ Estonian stores connected."],
    lessons: ["In a team of six, clear tickets, branch names and pull requests cut time lost to merge conflicts."],
    shots: [{ src: `${AI}/projects/product-aggregation-platform/cover-homepage-designed-with-Claude.webp`, alt: "StiiliHub homepage", caption: "Homepage" }],
    links: [
      { label: "stiilihub.ee", href: "https://stiilihub.ee" },
      { label: "Full technical case study", href: `${AI}/projects/product-aggregation-platform` },
    ],
  },
  {
    slug: "electricity-einvoicing",
    title: "Electricity Billing & E\u2011Invoice Integrations",
    kicker: "Commercial · Integrations",
    status: { label: "Commercial work", tone: "shipped" },
    categories: ["fullstack"],
    role: "Developer – invoice-processing and integration flows",
    context: "Erply Development OÜ, GoERP platform – energy-sector client",
    summary:
      "Invoice-processing and integration flows for an energy-sector client: invoice retrieval, business-rule validation, XML e-invoice generation for EstFeed/Enefit, and automated processing with seller identification and invoice grouping.",
    stack: ["Go Templates", "JavaScript", "SQL", "Query API", "Erply APIs", "REST APIs", "XML/JSON", "EstFeed", "Enefit", "S3"],
    accent: "lavender",
    architecture: {
      caption: "Simplified overview of the main steps.",
      nodes: [
        { id: "get", label: "Invoice retrieval", kind: "input", tech: "Erply APIs · Query API · SQL", detail: "Invoice data is retrieved from the platform for processing." },
        { id: "rules", label: "Business rules", kind: "guard", tech: "JavaScript · Go Templates", detail: "Invoices are validated against business rules before anything is generated." },
        { id: "auto", label: "Automated processing", kind: "process", tech: "Workflow logic", detail: "Electricity seller identification and invoice grouping." },
        { id: "xml", label: "XML e-invoice", kind: "process", tech: "XML · JSON · Base64", detail: "E-invoices are generated in XML for the EstFeed/Enefit integrations." },
        { id: "files", label: "Files & requests", kind: "storage", tech: "S3 · multipart requests", detail: "File handling through S3 and multipart requests to external APIs." },
        { id: "out", label: "EstFeed / Enefit", kind: "output", tech: "REST APIs", detail: "Invoices are exchanged with the external services." },
      ],
    },
    implementation: [
      "Developed invoice-processing and integration flows for an energy-sector client within the GoERP/Erply platform.",
      "Implemented invoice retrieval, business-rule validation and XML e-invoice generation for EstFeed/Enefit integrations.",
      "Worked on automated invoice-processing workflows, including electricity seller identification and invoice grouping.",
      "Integrated external APIs and file-handling operations using JSON/XML, Base64, S3 and multipart requests.",
      "Troubleshot API payloads and invoice data-exchange issues.",
    ],
    shots: [{ src: "/work/electricity-einvoicing/screen.webp", alt: "Illustrative mockup of an invoice-processing queue with validation statuses, seller grouping and an XML e-invoice preview", caption: "Invoice processing and XML e-invoice (illustrative mockup, sample data)" }],
    links: [],
  },
  {
    slug: "telia-tv-discovery",
    title: "Telia TV Content Discovery",
    kicker: "UX/UI redesign proposal",
    status: { label: "Concept", tone: "concept" },
    categories: ["design"],
    role: "UX/UI designer",
    summary: "A redesign proposal for Telia TV content discovery: clearer navigation, categories, filters and package information in a catalogue full of movies, programmes and providers.",
    stack: ["Figma", "UX/UI design", "Information architecture", "Interface analysis", "Navigation design", "Responsive design"],
    accent: "lavender",
    design: ["Simplified the main navigation and side menu.", "Reorganised categories and improved filtering and sorting.", "Created clearer content cards and more visible selection states.", "Improved package and provider information.", "Explored alternative content listing layouts.", "Created responsive interface concepts in Figma."],
    problem: "Telia TV's discovery interface holds a lot of information – movies, TV programmes, categories, filters, content providers and subscription details. The challenge was to help people navigate it without feeling overwhelmed, and to make it clear what is available, where to find it and what their subscription includes.",
    insights: ["A complex information hierarchy made available content harder to scan.", "Navigation and category structures needed clearer organisation.", "Filtering options and active states were not always visible enough.", "Package availability and provider information needed better separation.", "Dense layouts created unnecessary visual noise."],
    result: ["A UX/UI redesign proposal with better navigation patterns, content hierarchy and filtering interactions – turning interface analysis into practical design solutions."],
    shots: [{ src: `${OLD}/p4.jpg`, alt: "Telia TV content page redesign", caption: "Content page" }],
    links: [{ label: "Figma file", href: "https://www.figma.com/file/sksvYBdAbuDy80mnSwQohZ/telia-tv" }],
  },
  {
    slug: "telegram-life-assistant",
    title: "Telegram Life Assistant",
    kicker: "Full-stack / backend · Serverless automation",
    status: { label: "Completed", tone: "done" },
    categories: ["ai", "fullstack"],
    role: "Independent developer – architecture, backend, database design, API integrations, automation, testing and UX planning",
    summary: "A personal productivity and reminder system built around a Telegram bot – appointments, workouts, self-care, payments, birthdays and recurring tasks in one place, synced with Google Calendar.",
    stack: ["TypeScript", "Node.js", "grammY", "Telegram Bot API", "Cloudflare Workers", "Supabase PostgreSQL", "SQL", "Google Calendar API", "Webhooks", "pg_cron", "pg_net", "date-fns", "node:test", "ESLint"],
    accent: "peri",
    problem: "Everyday life is spread across calendars, notes, reminders, messaging apps and to-do lists. Some tasks happen once, others repeat; appointments must be booked ahead, payments have deadlines, important dates shouldn't be forgotten. The goal was one system that brings this together without complicated navigation or repetitive data entry – structured and persistent, not a set of temporary chat commands.",
    architecture: {
      caption: "pg_cron calls the Worker every 15 minutes to send due reminders.",
      nodes: [
        { id: "tg", label: "Telegram", kind: "input", tech: "Menu tap or quick note", detail: "My day, week, month, reminders and more." },
        { id: "cf", label: "Webhook", kind: "api", tech: "Cloudflare Worker · grammY", detail: "Each action stays under the free tier's 50 outgoing requests per invocation." },
        { id: "parse", label: "Quick-add parsing", kind: "process", tech: "Rule-based · Europe/Tallinn", detail: "Short notes become correct dates and times, covered by tests." },
        { id: "db", label: "Sessions & data", kind: "storage", tech: "Supabase Postgres", detail: "14 migrations; sessions persist so conversations survive restarts." },
        { id: "gcal", label: "Calendar & reminders", kind: "output", tech: "Google Calendar API · pg_cron", detail: "Custom REST calls with token handling." },
      ],
    },
    numbers: [{ value: "145", label: "unit tests" }, { value: "177", label: "integration tests on a real database" }, { value: "14", label: "SQL migrations" }],
    lessons: ["Tests on a real database catch problems mocks miss.", "Free-tier limits are a useful design constraint."],
    approach: ["Use Telegram as the interface – a familiar place, instead of yet another app.", "Organise activities into clear sections: My day / week / month, Need to book, Needs action, Free slots, Self-care, Doctors, Workouts, People, Birthdays, Payments, Reminders, Add and Quick add.", "Store data persistently and integrate events with Google Calendar.", "Support quick entry with reliable date interpretation.", "Process reminders with scheduled background jobs, and keep it all working in a serverless environment.", "Build a reliable, testable architecture."],
    implementation: ["Bot built with TypeScript and grammY; Telegram talks to the backend through webhooks instead of an always-running server.", "Cloudflare Workers handle webhook requests, route commands to application logic and call PostgreSQL and external APIs within the runtime's constraints.", "Supabase PostgreSQL stores application data and conversation sessions, designed through 14 SQL migrations – so nothing important lives only in memory.", "Google Calendar integration through custom REST requests from the Worker, including authentication-token management.", "Rule-based Quick add parsing turns short notes into structured entries, with explicit Europe/Tallinn date handling (date-fns) – no LLM call for every input.", "Scheduled processing with pg_cron and pg_net calling a dedicated Worker endpoint about every 15 minutes, so reminders go out even when nobody is chatting.", "Processing designed around Cloudflare's free-tier limit of 50 outgoing requests per invocation.", "Automated tests with Node.js tooling – unit tests and integration tests against a real database – plus ESLint for consistency."],
    challenges: [{"challenge": "Persistent state in a serverless app without a long-running process.", "solution": "Data and sessions live in Supabase PostgreSQL, independent of individual Worker executions."}, {"challenge": "Reminders need scheduled execution.", "solution": "pg_cron and pg_net call a dedicated Worker endpoint, separating time-based jobs from incoming Telegram messages."}, {"challenge": "Google Calendar inside the Workers environment.", "solution": "Custom API requests with token management that fit the serverless architecture."}, {"challenge": "Consistent local dates and times.", "solution": "Rule-based parsing with explicit Europe/Tallinn time-zone handling, covered by tests."}, {"challenge": "Keeping behaviour reliable as the project grew.", "solution": "Unit and integration tests on a real database, run while development continued."}],
    result: ["A serverless Telegram assistant combining conversational interaction, persistent PostgreSQL storage, Google Calendar integration, rule-based input processing and scheduled background jobs – designed and built independently."],
    shots: [{ src: `${AI}/projects/telegram-life-assistant/cover-mockup-start-menu-in-English.png`, alt: "Telegram bot start menu", caption: "Start menu (mockup)" }],
    links: [{ label: "Full technical case study", href: `${AI}/projects/telegram-life-assistant` }],
  },
  {
    slug: "pos-promo-site",
    title: "POS Solutions Promotional Website",
    kicker: "Multi-page website · Onboarding flow",
    status: { label: "Client project", tone: "shipped" },
    categories: ["fullstack"],
    role: "Front-end developer – website, API integration, onboarding flow, responsive UI",
    summary: "A multi-page promotional website for POS solutions that combines product presentation with demo-account access and a guided onboarding, so customers can explore and set up the system on their own devices.",
    stack: ["HTML", "CSS", "JavaScript", "Go Templates", "REST APIs", "Google Analytics", "Figma"],
    accent: "peri",
    implementation: ["Developed a responsive, multi-page website presenting different POS solutions and their functionality.", "Implemented a demo request flow that creates test accounts for exploring the POS system.", "Built a step-by-step onboarding guide for local installation and configuration.", "Worked with REST APIs to connect front-end interactions with system functionality.", "Implemented steps for checking system requirements and handling the necessary permissions.", "Structured instructions, progress steps and interface elements so the setup is easy to follow.", "Worked with existing legacy code and configuration.", "Focused on responsive design, accessibility and clear communication of technical information."],
    problem: "A POS system needs several technical steps before a new customer can use it: creating an account, installing or launching the app locally, checking device compatibility and granting permissions. The challenge was to turn that setup into a clear, approachable journey so customers could evaluate the product independently.",
    result: ["A guided customer journey connecting product discovery, demo access and POS setup, making technical onboarding easier to understand.", "Shows working with existing business software, connecting interfaces to APIs and turning complex technical processes into accessible experiences."],
    shots: [{ src: `${OLD}/pos.png`, alt: "POS solutions website", caption: "Website" }],
    links: [],
  },
  {
    slug: "n8n-automations",
    title: "n8n Workflow Automations",
    kicker: "Workflow automation · AI and system integration",
    status: { label: "Ongoing experiments", tone: "proto" },
    categories: ["ai"],
    role: "Automation developer – workflow architecture, API integration, data transformation, error handling and testing",
    summary: "Automation projects exploring how n8n connects applications, processes data, integrates AI services and removes repetitive manual work – from AI content production to reliable data sync between systems.",
    stack: ["n8n", "OpenAI API", "JavaScript", "HTML/CSS", "REST APIs", "Webhooks", "Telegram Bot API", "Supabase", "PostgreSQL", "SQL", "n8n Data Tables"],
    accent: "lavender",
    features: [{"label": "Umbrella reminder – emails at 7:00 only when rain chance ≥ 50% (tested)", "state": "done"}, {"label": "Electricity price alert – Nord Pool day-ahead prices, flags hours above 150 €/MWh", "state": "done"}, {"label": "Content Fabric – AI carousel script, slides rendered to PNG, approval in Telegram", "state": "proto"}, {"label": "CRM & contact-book sync – event-driven, idempotent, with review and dead-letter states (tested prototype)", "state": "proto"}, {"label": "Field-level conflict resolution, deletion handling, scheduled retries", "state": "planned"}, {"label": "AI invoice intake – PDF to structured data, validated, approved in Telegram", "state": "planned"}, {"label": "Website lead triage – classify, draft reply, route to CRM sheet", "state": "planned"}],
    result: ["A working, tested sync prototype showing event processing, conditional routing, identity mapping and recovery from selected failures. Conflict resolution, deletion handling and scheduled retries are documented as planned extensions, not finished features.", "An AI content workflow that connects generation, visual rendering, human approval and publishing – AI supports the repetitive work, people keep control of the result."],
    problem: "Many business processes need information to move between separate applications. Without automation that means repetitive manual work, duplicate entry, inconsistent data and time spent checking results. AI-generated content adds another step: even when generation is automated, it still needs review, formatting and approval before it is published.",
    implementation: ["AI content workflow: OpenAI API generates a structured carousel script; JavaScript and HTML/CSS templates turn it into slides rendered as PNG.", "The slides go to Telegram (Bot API) for review; an approval step and a webhook trigger publication, with status stored in n8n Data Tables.", "Flow: content request → OpenAI → structured script → HTML/CSS templates → PNG → Telegram review → approval → publishing.", "Sync prototype: contacts between a CRM and two contact books, using n8n and Supabase PostgreSQL – CRM → Contact Book A, and Contact Book B → CRM → Contact Book A.", "Event-driven workflows triggered by webhooks, with webhook authentication, payload validation and data normalisation.", "PostgreSQL tables for canonical contacts, external system mappings, sync events and operation statuses.", "Idempotency by source system and event ID, so duplicate events are never processed twice.", "Business rule: Contact Book B never receives automatically created contacts from other systems.", "Operation tracking, failure handling, retries on redelivery and dead-letter states; a needs_review state for possible identity matches that must not merge automatically.", "Synchronisation logs and test scenarios to verify workflow behaviour."],
    challenges: [{"challenge": "Systems hold overlapping contacts, and events can arrive twice.", "solution": "Idempotency keys from source system and event ID, plus external-ID mappings to one canonical contact."}, {"challenge": "Two records may look like the same person without being certain.", "solution": "A needs_review state instead of an automatic merge."}, {"challenge": "Partial failures between systems.", "solution": "Operation statuses, retries on event redelivery and dead-letter states."}],
    lessons: ["Automations should be maintainable, observable and safe – not just functional."],
    shots: [
      { src: `${AI}/projects/n8n-workflow-automations/cover-content-fabric-workflow.png`, alt: "Content Fabric workflow in n8n", caption: "Content Fabric workflow" },
      { src: `${AI}/projects/n8n-workflow-automations/01-mockup-electricity-price-alert-workflow.png`, alt: "Electricity price alert workflow", caption: "Price alert (mockup)" },
      { src: `${AI}/projects/n8n-workflow-automations/02-mockup-alert-email-with-real-prices.png`, alt: "Alert email with real prices", caption: "Alert email (mockup)" },
      { src: `${AI}/projects/n8n-workflow-automations/05-mockup-umbrella-reminder-flow.png`, alt: "Umbrella reminder workflow", caption: "Umbrella reminder (mockup)" },
    ],
    links: [{ label: "Workflows and JSON files", href: `${AI}/projects/n8n-workflow-automations` }],
  },
  {
    slug: "dailytrack",
    title: "DailyTrack",
    kicker: "Habit-tracking web app",
    status: { label: "Concept", tone: "concept" },
    categories: ["design"],
    role: "UX/UI designer",
    summary: "A habit tracker that stays simple: a clear daily dashboard, visible progress and reminders, without feeling repetitive.",
    stack: ["Figma", "User flows", "Wireframing", "UI design", "Responsive design"],
    accent: "pink",
    design: ["Designed user flows, wireframes, responsive layouts and the visual system in Figma.", "A clear daily dashboard with visual progress indicators.", "Straightforward habit management and a consistent information hierarchy."],
    problem: "Building habits takes consistency, but tracking them gets frustrating when an app adds too many steps, details or repetitive interactions. The challenge was to support daily routines without making habit tracking feel like another complicated task.",
    insights: ["Daily progress should be understandable at a glance.", "Progress indicators should make achievements visible and encourage consistency.", "Adding and reviewing habits should take minimal effort.", "Reminders should support routines without overwhelming the interface.", "The experience should stay clear on desktop and mobile.", "A good habit tracker balances structure, motivation and simplicity – not more features."],
    result: ["A responsive UX/UI concept that brings daily activities, progress and reminders into one easy-to-understand interface."],
    shots: [{ src: `${OLD}/p3.jpg`, alt: "DailyTrack habit tracker", caption: "Dashboard" }],
    links: [{ label: "Figma file", href: `${FIGMA}?type=design&node-id=0%3A1&mode=design` }],
  },
  {
    slug: "ecommerce-backend",
    title: "Full-Stack E-Commerce Application",
    kicker: "Backend architecture",
    status: { label: "Course project", tone: "done" },
    categories: ["fullstack"],
    role: "Backend developer",
    summary: "A backend-focused shop for products, customers, orders and delivery options, built on a layered Controller → Service → Repository architecture.",
    stack: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "PostgreSQL", "REST API", "Swagger / OpenAPI", "Postman"],
    accent: "lavender",
    architecture: {
      caption: "Layered backend.",
      nodes: [
        { id: "c", label: "Controller", kind: "api", tech: "REST · DTOs", detail: "Request and response DTOs between layers; protected endpoints." },
        { id: "s", label: "Service", kind: "process", tech: "Business logic", detail: "Orders with multiple products and quantities." },
        { id: "ext", label: "Delivery API", kind: "api", tech: "External service", detail: "Parcel terminal data from external delivery services." },
        { id: "r", label: "Repository", kind: "storage", tech: "JPA / Hibernate · PostgreSQL", detail: "Persistence for products, customers, orders." },
      ],
    },
    shots: [{ src: "/work/ecommerce-backend/screen.webp", alt: "Illustrative mockup of REST API documentation for products, customers, orders and delivery, next to the data model", caption: "REST API and data model (illustrative mockup)" }],
    links: [],
  },
  {
    slug: "abacus-kids",
    title: "Abacus Kids",
    kicker: "Web development · Real client project",
    status: { label: "Live demo", tone: "done" },
    categories: ["fullstack", "design"],
    role: "Team lead in an Agile team",
    summary:
      "A responsive one-page website for a real client, showcasing an educational invention and making it easier for potential customers to learn about the product.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "Figma"],
    accent: "rose",
    implementation: ["Led the development team.", "Implemented interactive elements: a 3D flip box, a testimonial carousel, contact forms and direct messenger links."],
    result: ["A functional, user-friendly website that presents the product clearly and gives customers a simple way to contact the seller."],
    shots: [{ src: `${OLD}/p1.png`, alt: "Abacus Kids website", caption: "Homepage" }],
    links: [{ label: "Live demo", href: "https://asyase.github.io/abacuskids/" }],
  },
  {
    slug: "ai-creative-design",
    title: "AI Creative Design & Visuals",
    kicker: "AI-assisted design · Creative exploration",
    status: { label: "Ongoing experiments", tone: "proto" },
    categories: ["design", "ai"],
    role: "Art direction and prompting",
    summary:
      "Exploring how AI can support creative workflows – from initial ideas to finished visual concepts.",
    stack: ["Midjourney", "Nano Banana Pro", "Leonardo AI", "Canva"],
    accent: "rose",
    design: ["Created advertising banners, social media graphics, branding concepts, interior visualisations and digital artwork.", "Combined AI-generated imagery with my own design decisions on typography and composition."],
    result: ["A diverse collection of visual experiments showing how AI can speed up creative production while keeping a consistent design direction."],
    shots: [
      { src: `${AI}/gallery/lumiere-rituals-banner.webp`, alt: "Lumière skincare banner", caption: "Lumière banner" },
      { src: `${AI}/gallery/good-matcha-mood.webp`, alt: "Good Matcha Mood drinks banner", caption: "Good Matcha Mood" },
      { src: `${AI}/gallery/warm-modern-living-room.webp`, alt: "Warm modern living room visualisation", caption: "Interior visualisation" },
      { src: `${AI}/gallery/asyera-brand-identity.webp`, alt: "Asyera Creative Studio brand identity concept", caption: "Brand identity concept" },
      { src: `${AI}/gallery/future-identity-poster.webp`, alt: "Future Identity editorial poster", caption: "Future Identity" },
      { src: `${AI}/gallery/dance-event-tallinn.webp`, alt: "Tallinn dance event poster", caption: "Dance event poster" },
    ],
    links: [{ label: "Full gallery", href: `${AI}/projects/ai-creative-design` }],
  },
  {
    slug: "flashcards",
    title: "Vocabulary Flashcards",
    kicker: "React application · Front-end development",
    status: { label: "Live demo", tone: "done" },
    categories: ["fullstack"],
    role: "Developer",
    summary:
      "An interactive web app that makes learning English vocabulary easier, with flashcards and Estonian translations.",
    stack: ["React", "JavaScript", "HTML", "CSS", "SCSS"],
    accent: "lavender",
    implementation: ["Implemented dictionary management, word editing, navigation between flashcards and a dedicated learning mode.", "Built the interface from reusable React components."],
    result: ["A working vocabulary app with a simple interface for managing and practising words."],
    shots: [{ src: `${OLD}/p21.png`, alt: "Flashcards app", caption: "Training mode" }],
    links: [{ label: "Live demo", href: "https://asyase.github.io/vocabulary_flashcards/" }],
  },
  {
    slug: "pomodoro",
    title: "Pomodoro Productivity App",
    kicker: "Mobile UX/UI concept",
    status: { label: "Concept", tone: "concept" },
    categories: ["design"],
    role: "UX/UI designer",
    summary: "A calm mobile timer for focused work: one main action, adjustable sessions and breaks, a small task list and reminders.",
    stack: ["Figma", "Mobile UI design", "Wireframing", "Interaction design", "User flows"],
    accent: "rose",
    design: ["Developed user flows, wireframes and the mobile UI concept in Figma.", "Designed the timer, to-do list, session settings, notifications and navigation.", "Used clear interaction states and a minimal visual hierarchy."],
    problem: "Productivity apps should help people focus, but complex navigation and extra interface elements can become distractions themselves. The challenge was a mobile app for focus sessions, tasks and breaks that stays simple and calm.",
    insights: ["Starting a focus session should be the most prominent action.", "Timer status and remaining time should always be easy to read.", "Work and break durations should be adjustable.", "Task management should support focus rather than interrupt it.", "Navigation between timer, tasks and settings should be predictable.", "Prioritise the current activity and avoid competing interface elements."],
    result: ["A cohesive mobile concept combining focus sessions, task management and customisable breaks, organised around one primary user goal."],
    shots: [{ src: `${OLD}/p2.jpg`, alt: "Pomodoro app screens", caption: "Timer, tasks, settings" }],
    links: [],
  },
  {
    slug: "transfer-company",
    title: "Passenger Transfer Company Website",
    kicker: "Web development · Responsive website",
    status: { label: "Live demo", tone: "done" },
    categories: ["fullstack"],
    role: "Developer in an Agile team",
    summary:
      "A responsive website for a passenger transportation company with routes between Germany and St. Petersburg, plus parcel and pet transportation services.",
    stack: ["HTML", "CSS", "SCSS", "JavaScript", "jQuery", "Bootstrap", "PHP"],
    accent: "peri",
    implementation: ["Presented routes and service information.", "Implemented a booking inquiry form, an interactive FAQ and customer testimonials."],
    result: ["An accessible, mobile-friendly website that helps visitors find travel information and submit service requests."],
    shots: [{ src: `${OLD}/p15.png`, alt: "Transfer company website", caption: "Homepage" }],
    links: [{ label: "Live demo", href: "https://asyase.github.io/transfer/" }],
  },
  {
    slug: "ferry-booking",
    title: "Ferry Booking System",
    kicker: "React · TypeScript",
    status: { label: "Team project", tone: "done" },
    categories: ["fullstack"],
    role: "Frontend developer in a Scrum team",
    summary: "Reusable React components for a ferry booking flow: date and departure-time selection, input handling and validation, connected to REST APIs.",
    stack: ["React", "TypeScript", "REST API", "Node.js", "PenPot", "Bitbucket"],
    accent: "peri",
    implementation: ["Task estimation, code reviews and Git workflow in Bitbucket."],
    shots: [{ src: "/work/ferry-booking/screen.webp", alt: "Ferry ticket booking page with destination, date and return-trip fields, route list and a route map", caption: "Booking page – route, date and return-trip selection" }],
    links: [],
  },
  {
    slug: "fitness-coaching",
    title: "Fitness & Lifestyle Coaching Platform",
    kicker: "Responsive website concept",
    status: { label: "Concept", tone: "concept" },
    categories: ["design"],
    role: "UX/UI designer",
    summary: "A website for a personal coach: services, plans and pricing, long-form content and clear calls to action for adults aged 18–59.",
    stack: ["Figma", "UX/UI design", "Wireframing", "Responsive design", "Information architecture"],
    accent: "peri",
    design: ["Designed the site structure, user flows, wireframes and responsive UI in Figma.", "A homepage introducing the coaching services.", "A blog overview with categorised content and individual article pages.", "A plans overview with clear pricing, and detailed plan pages.", "Consistent cards, buttons, typography and call-to-action patterns."],
    problem: "A coaching website has to do more than list services: visitors need to understand the programmes, compare options, find relevant information and feel confident about the next step. The challenge was to structure a content-rich site so services, pricing, articles and contact actions are easy to discover.",
    insights: ["Coaching services and their benefits need clear explanations.", "Plans and pricing should be easy to find and compare.", "Visitors should understand how to start working with the coach.", "Fitness, nutrition, mindset and lifestyle content needs logical organisation.", "Long-form articles should stay readable and easy to scan.", "Clear calls to action connect browsing with the next step – clarity builds trust."],
    result: ["A responsive website concept that organises coaching services and educational content into a clear customer journey."],
    shots: [{ src: `${OLD}/p5.jpg`, alt: "Fitness coaching website", caption: "Homepage" }],
    links: [{ label: "Figma file", href: `${FIGMA}?type=design&node-id=0%3A1&mode=design` }],
  },
  {
    slug: "vet-clinic",
    title: "Veterinary Clinic Website",
    kicker: "Front-end development · Responsive website",
    status: { label: "Live demo", tone: "done" },
    categories: ["fullstack"],
    role: "Developer",
    summary:
      "A responsive website concept for a veterinary clinic, focused on clear navigation and easy access to important information.",
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "jQuery", "Owl Carousel"],
    accent: "lavender",
    implementation: ["Implemented sections for services, specialists, clinic information and statistics.", "Added interactive sliders and a contact section with an integrated location map."],
    result: ["An informative, mobile-friendly interface that helps pet owners explore the clinic's services and find contact details."],
    shots: [{ src: `${OLD}/p16.png`, alt: "Vet clinic website", caption: "Homepage" }],
    links: [{ label: "Live demo", href: "https://asyase.github.io/vet_clinic/" }],
  },
  {
    slug: "birthday-reminder",
    title: "Birthday Reminder",
    kicker: "UX/UI design · Website concept",
    status: { label: "Concept", tone: "concept" },
    categories: ["design"],
    role: "UX/UI designer",
    summary:
      "A UX/UI concept for a birthday reminder service that helps people remember important dates through personalised email reminders.",
    stack: ["Figma", "Wireframing", "UI design", "User flows"],
    accent: "pink",
    design: ["Designed the landing page, registration flow, email template and confirmation screens.", "Focused on clarity, simplicity and intuitive interactions."],
    result: ["A cohesive design concept that presents the service clearly and guides users through the key steps."],
    shots: [{ src: `${OLD}/p6.jpg`, alt: "Birthday reminder service", caption: "Landing and flow" }],
    links: [{ label: "Figma file", href: `${FIGMA}?type=design&node-id=5%3A8863&mode=design` }],
  },
  {
    slug: "book-eshop",
    title: "Book E-Shop",
    kicker: "Front-end development · E-commerce",
    status: { label: "Live demo", tone: "done" },
    categories: ["fullstack"],
    role: "Developer",
    summary:
      "A mobile-first web application concept for an online bookstore, focused on responsive layouts and a straightforward shopping experience.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "pink",
    implementation: ["Created the main page and designed the user account interface.", "Implemented basic user registration in JavaScript."],
    result: ["A responsive e-commerce prototype demonstrating core front-end development and user interaction."],
    shots: [{ src: `${OLD}/p19.png`, alt: "Book e-shop", caption: "Mobile layout" }],
    links: [{ label: "Live demo", href: "https://asyase.github.io/electronic_bookstore/" }],
  },
  {
    slug: "jewellery-site",
    title: "Jewellery Website",
    kicker: "Website",
    status: { label: "Live demo", tone: "done" },
    categories: ["fullstack"],
    role: "Developer",
    summary: "A jewellery brand website from the front-end course.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "rose",
    shots: [{ src: `${OLD}/p7.png`, alt: "Jewellery website", caption: "Homepage" }],
    links: [{ label: "Live demo", href: "https://asyase.github.io/jewellers/" }],
  },
  {
    slug: "bicycle-store-design",
    title: "Bicycle E-Commerce Design",
    kicker: "UX/UI design · E-commerce concept",
    status: { label: "Concept", tone: "concept" },
    categories: ["design"],
    role: "UI designer",
    summary:
      "A UX/UI design concept for an online bicycle store, exploring how to make product browsing and shopping more intuitive.",
    stack: ["Figma", "UI design", "E-commerce UX", "Visual hierarchy"],
    accent: "peri",
    design: ["Focused on clear product presentation, visual hierarchy and navigation.", "Kept the interface consistent, balancing aesthetics with usability."],
    result: ["A concept that shows my approach to modern e-commerce: user needs first, and products that are easy to discover."],
    shots: [{ src: `${OLD}/p13.png`, alt: "Bicycle store design", caption: "Store design" }],
    links: [{ label: "Figma file", href: "https://www.figma.com/file/Atq6j1kUXVbvHmXK3AujME/bicycles-e-commerce" }],
  },
  // Published 2026: appended at the end (30–32) so the numbers of projects 01–29 stay the same.
  {
    slug: "ai-ready-design-system",
    title: "AI-Ready Multibrand Design System",
    kicker: "Design system · Interactive prototype",
    status: { label: "Independent concept · Interactive prototype", tone: "proto" },
    categories: ["design", "fullstack", "ai"],
    role: "Design System Designer · UX/UI · Frontend Developer",
    context: "Independent concept and interactive technical prototype",
    summary:
      "An exploratory design system demonstrating how reusable UI components, semantic design tokens, accessibility standards and structured documentation can support consistent multibrand experiences and AI-assisted interface development.",
    stack: ["React 19", "TypeScript", "Next.js", "CSS custom properties", "Design tokens (DTCG format)", "WCAG 2.2", "JSON component contracts"],
    accent: "lavender",
    demo: { label: "Open the interactive demo", href: "/design-system/" },
    chapters: [
      {
        key: "challenge",
        title: "Challenge",
        lead:
          "When several products and brands are built by different teams, the same button is rebuilt again and again – each time with slightly different colours, spacing, states and accessibility. AI coding tools make this faster, not better: without clear rules, a model invents its own components and hard-codes values.",
        bullets: [
          "How can one component library serve brands with very different visual identities?",
          "How can accessibility be built in once, instead of re-checked in every product?",
          "What does a design system need so that an AI tool can use it correctly and predictably?",
        ],
      },
      {
        key: "approach",
        title: "Approach",
        bullets: [
          "Semantic design tokens in three levels, so brands differ only in values – never in components.",
          "A small set of reusable React components whose props form a written contract.",
          "Accessibility inside the components: native elements, visible focus, labelled fields and accessible error handling.",
          "Machine-readable component contracts as the single source for documentation, validation and AI-assisted composition.",
          "A working prototype rather than mockups: every claim on this page can be tried in the browser.",
        ],
      },
      {
        key: "architecture",
        title: "Design system architecture",
        lead: "Tokens are organised in three levels. Each level may only reference the level below it, so every value has one clear owner.",
        body: [
          "Primitive tokens hold raw values – colour ramps, a spacing scale, type sizes, radii and shadows. Semantic tokens give those values a meaning, such as color.action.primary or spacing.component.md, and each brand defines its own set. Component tokens such as button.primary.background or input.border.focus say where a value is used; they are shared by every brand and only point at semantic tokens.",
          "Follow a component token below to see its full alias chain, and how the same token resolves differently for each brand.",
        ],
        widget: "ds-tokens",
      },
      {
        key: "multibrand",
        title: "Multibrand experience",
        lead: "Three fictional brands – an online academy, a utility company and a dark-themed retailer – share one component library. Only their semantic tokens differ.",
        body: [
          "Switching brands changes colours, heading typography, corner radius, control height and elevation. The component tree, HTML, keyboard behaviour, validation and contracts stay identical.",
          "This is how the architecture scales: adding a brand means writing one semantic token set of about 60 values. A new product adds no new components – it picks a brand and reuses the library, and every fix to a component reaches all brands at once.",
        ],
        widget: "ds-multibrand",
      },
      {
        key: "ai-ready",
        title: "AI-ready design",
        lead: "A design system becomes usable by AI when its rules are written down as data, not only as pictures and prose.",
        body: [
          "Each component has a contract: its purpose, allowed props and values, interaction states, accessibility requirements, usage guidance and composition rules. The contracts are published as JSON, and the same data renders the documentation, so docs and machine rules cannot drift apart.",
          "In an AI workflow, a model receives the contracts and a request, and is asked for a structured UI definition instead of free code. A validator checks the output before anything renders: unknown components, unsupported variants, raw colours or pixel values, missing labels and broken composition rules are rejected with a clear reason.",
        ],
        callout: {
          label: "Deterministic demo",
          title: "No AI model is called in this prototype",
          placement: "before",
          items: [
            "The composer loads the structured output a model would be asked to return for each scenario.",
            "Validation, brand theming and rendering are real and run in the browser – edit the JSON to see them react.",
            "The site is a static export with no server, so a live model call would need a separate, secured API. That is a deliberate next step, not part of this prototype.",
          ],
        },
        widget: "ds-composer",
      },
      {
        key: "playground",
        title: "Interactive playground",
        lead: "Explore every component with its variants, sizes and states, in all three brands and at different widths. The code updates with each change.",
        widget: "ds-playground",
      },
      {
        key: "implementation",
        title: "Implementation",
        bullets: [
          "Tokens are defined once in TypeScript and generated into a single stylesheet in which each level points at the one below with var(), plus a DTCG-style tokens.json.",
          "Components contain no raw colours, spacing or radii – only component tokens. Hover, focus, disabled and error states are styled the same way.",
          "Component props mirror the JSON contracts one-to-one, so a validated definition renders without a translation layer.",
          "Forms use native constraint validation with an accessible error summary, aria-describedby messages and re-checking as fields are corrected.",
          "The dialog is a native <dialog> with showModal(), so focus trapping, Esc and an inert background come from the browser.",
          "Contrast ratios are calculated from the tokens with the WCAG formula and checked live when a token is edited.",
        ],
        widget: "ds-implementation",
        callout: {
          label: "Not built yet",
          title: "How this would connect to Figma",
          items: [
            "Primitive tokens → a Figma Variables collection; semantic tokens → a second collection with one mode per brand.",
            "Component contracts → Figma components whose variant properties use the same names and values (variant, size, state).",
            "A published library per brand mode, with token changes synced from tokens.json in both directions.",
            "No Figma library exists for this project today – this is the planned next step.",
          ],
        },
      },
      {
        key: "outcome",
        title: "Outcome & learnings",
        lead: "A working prototype that shows the full path from a token to a rendered, accessible, brand-specific interface – and how the same structure lets an AI tool compose interfaces that stay inside the system.",
        features: [
          { label: "Three-level token system with three fictional brands", state: "done" },
          { label: "12 components with variants, sizes and states", state: "done" },
          { label: "Interactive playground with generated code", state: "done" },
          { label: "Machine-readable contracts and tokens as JSON", state: "done" },
          { label: "Validator for AI-style structured UI output", state: "done" },
          { label: "Schema-driven composer (deterministic, no model)", state: "proto" },
          { label: "Live contrast checks calculated from tokens", state: "done" },
          { label: "Live LLM composition through a secured API", state: "planned" },
          { label: "Figma Variables and component library", state: "planned" },
          { label: "Automated visual and accessibility tests", state: "planned" },
        ],
        columns: [
          {
            title: "Limitations",
            items: [
              "An independent concept – not used by a real organisation or tested with users.",
              "A small library: no tabs, radio groups, combobox, table or navigation yet.",
              "Contrast is calculated automatically and keyboard use was checked by hand; there is no automated accessibility suite or screen-reader testing yet.",
            ],
          },
          {
            title: "Next steps",
            items: [
              "Connect a model through a server-side API and measure how often its first output passes validation.",
              "Mirror tokens and components in Figma Variables and a published library.",
              "Add visual regression and automated accessibility tests per brand.",
            ],
          },
        ],
        lessons: [
          "Naming is the architecture: semantic tokens decide what a brand can change.",
          "A contract that renders the docs is a contract that stays true.",
          "AI works best when it chooses from a system instead of inventing one.",
        ],
      },
    ],
    shots: [
      { src: "/work/ai-ready-design-system/playground.webp", alt: "Component playground with a button, its properties and the tokens it uses", caption: "Component playground" },
      { src: "/work/ai-ready-design-system/composer.webp", alt: "AI-ready composer showing a request, a JSON UI definition and the rendered form", caption: "AI-ready composer" },
      { src: "/work/ai-ready-design-system/multibrand.webp", alt: "The same interface rendered in three fictional brands", caption: "One library, three brands" },
    ],
    links: [
      { label: "Open the interactive demo", href: "/design-system/" },
      { label: "Component contracts (JSON)", href: "/design-system/contracts.json" },
      { label: "Design tokens (JSON)", href: "/design-system/tokens.json" },
    ],
  },
  {
    slug: "from-chaos-to-consistency",
    title: "From Chaos to Consistency",
    kicker: "UX/UI audit · Design system · Interactive prototype",
    status: { label: "Independent concept · Functional prototype", tone: "proto" },
    categories: ["design", "fullstack"],
    role: "UX/UI Designer · Design System Designer · Frontend Developer",
    context: "Independent design exploration inspired by training management workflows. The platform, data and Before screens are fictional.",
    summary:
      "Transforming fragmented interfaces into a scalable, accessible design system – an audit, component consolidation and an interactive before/after comparison for a fictional training management platform.",
    stack: ["UI audit", "WCAG 2.2", "Design tokens", "React 19", "TypeScript", "CSS custom properties", "Component documentation"],
    accent: "peri",
    chapters: [
      {
        key: "context",
        title: "Context",
        lead: "Business applications grow screen by screen. Each new feature solves its own problem, and over time the same action, field or status ends up looking and behaving differently depending on where you meet it.",
        body: [
          "The fictional platform in this case study, Kursion, manages training courses, schedules, registrations, participants and certificates. Five roles use it every day – sales representatives, training managers, content creators, lecturers and administrators – often under time pressure and across many screens.",
          "In this kind of tool, consistency is not decoration. When the same thing always looks the same, people stop decoding the interface and focus on the task – and every inconsistency becomes a small, repeated cost.",
        ],
        callout: {
          label: "About this project",
          title: "An independent concept, not a client project",
          items: [
            "Inspired by my experience with complex business applications and training management workflows.",
            "Kursion, its screens and all data are fictional. No company screenshots, internal information or real people are used.",
            "The Before screens are an illustrative baseline I built for this case study; nothing here was commissioned or adopted by an organisation.",
          ],
        },
      },
      {
        key: "challenge",
        title: "The challenge",
        lead: "Different parts of the application used different components, interaction patterns, spacing, colours and form behaviour for the same jobs.",
        bullets: [
          "Four visual styles for the main action – a green button, a blue button, an outlined pill and a text link.",
          "Three form field patterns, including placeholder-only labels.",
          "Ten names in two vocabularies for five training statuses, with colours that contradict each other.",
          "Generic error banners instead of explaining what to fix.",
          "Missing focus indicators and contrast that fails WCAG.",
        ],
        body: ["The goal: analyse these inconsistencies, prioritise them, and show a more coherent, reusable and accessible interface system – on the same data and with the same functionality."],
      },
      {
        key: "audit",
        title: "UI audit",
        lead: "I reviewed the three core screens – dashboard, registration form and training list – against usability heuristics and WCAG 2.2, and grouped every issue by the pattern it belongs to.",
        body: ["Each finding records its UX impact, accessibility impact, severity and the shared component or token set that resolves it. Open a finding to see the details."],
        widget: "cc-audit",
      },
      {
        key: "principles",
        title: "Design principles",
        columns: [
          { title: "Consistency", items: ["One component per job, one name per concept.", "Identical actions look and behave identically on every screen."] },
          { title: "Clarity", items: ["One primary action per view.", "Hierarchy follows the task, not the order things were built in."] },
          { title: "Accessibility", items: ["Built into components, not added per screen.", "Meaning never depends on colour alone."] },
          { title: "Reusability & scalability", items: ["Variants instead of new components.", "Semantic tokens, so a change happens in one place."] },
        ],
      },
      {
        key: "consolidation",
        title: "Component consolidation",
        lead: "From duplication to reusability: separately styled elements become one component with clearly defined variants and states.",
        widget: "cc-consolidation",
      },
      {
        key: "before-after",
        title: "Before / After",
        lead: "The same three screens, the same fictional data and the same functionality – first as a fragmented interface, then rebuilt with the unified design system.",
        body: ["Switch between the versions or view them side by side. Both are interactive: filter and sort the list, submit the form empty, cancel a training. The numbered annotations explain why each change improves usability."],
        widget: "cc-before-after",
      },
      {
        key: "accessibility",
        title: "Accessibility",
        lead: "Accessibility moved from something each screen had to get right into something the components guarantee.",
        widget: "cc-a11y",
      },
      {
        key: "governance",
        title: "Documentation & governance",
        lead: "A design system is more than a set of components. It needs documentation people trust, and a process that decides how components are added, changed and retired.",
        body: ["The documentation example below covers purpose, usage, variants, accessibility, do / don’t and implementation. The governance part shows an illustrative model for ownership, naming, versioning and the component lifecycle."],
        widget: "cc-docs",
      },
      {
        key: "implementation",
        title: "Implementation",
        bullets: [
          "Kursion UI is built with React and TypeScript inside this portfolio – the same components render the After screens, the documentation and the consolidation demo.",
          "Tokens are defined once in TypeScript and generated into one stylesheet in which component tokens point at semantic tokens, and semantic tokens at primitives.",
          "Status is modelled as data: a fixed vocabulary plus semantic colour tokens. Adding a state is one entry and two tokens, not a new style.",
          "Native elements carry the behaviour: button, select, dialog, table. ARIA is added only where it adds meaning – aria-sort, aria-invalid, aria-describedby, live regions.",
          "The embedded app uses container queries, so it adapts to the space it is given – full width, side by side or on a phone.",
        ],
        widget: "cc-implementation",
      },
      {
        key: "outcomes",
        title: "Outcomes & learnings",
        lead: "The working prototype shows the whole path from an audit to a documented, accessible component system, and lets anyone compare the result on identical content.",
        widget: "cc-outcomes",
        features: [
          { label: "Illustrative Before screens: dashboard, form, list", state: "done" },
          { label: "UI audit with 9 findings, severity and WCAG references", state: "done" },
          { label: "Kursion UI: 11 components with variants and states", state: "done" },
          { label: "Interactive Before / After with annotations", state: "done" },
          { label: "Contrast comparison calculated from tokens", state: "done" },
          { label: "Documentation and illustrative governance model", state: "done" },
          { label: "Usability testing with real users", state: "planned" },
          { label: "Screen-reader and automated accessibility testing", state: "planned" },
          { label: "Figma library mirroring the components and tokens", state: "planned" },
        ],
        columns: [
          { title: "Limitations", items: ["The Before interface is illustrative, so the audit shows method rather than findings about a real product.", "No user research or usability testing has been done – the reasoning is based on heuristics and WCAG.", "Keyboard use was checked by hand; screen readers and automated audits are not yet covered."] },
          { title: "Next steps", items: ["Test the dashboard and form with training managers and measure task time and errors.", "Build the matching Figma library with Variables and Variants.", "Add axe checks and visual regression tests per component."] },
        ],
        lessons: [
          "Most inconsistency is duplication that nobody decided on.",
          "A fixed vocabulary does as much for consistency as a colour palette.",
          "When accessibility lives in the component, every screen inherits it.",
        ],
      },
    ],
    shots: [
      { src: "/work/from-chaos-to-consistency/before-after.webp", alt: "Training list shown side by side: the fragmented Before version and the unified After version", caption: "Before / After – training list" },
      { src: "/work/from-chaos-to-consistency/audit.webp", alt: "UI audit with severity summary and an expanded finding", caption: "UI audit" },
      { src: "/work/from-chaos-to-consistency/consolidation.webp", alt: "Four legacy button styles consolidated into one Button component", caption: "From duplication to reusability" },
    ],
    links: [],
  },
  {
    slug: "from-prompt-to-product",
    title: "From Prompt to Product",
    kicker: "AI-assisted UX/UI design · Interactive prototype",
    status: { label: "Independent exploration · Interactive prototype", tone: "proto" },
    categories: ["design", "ai"],
    role: "UX/UI Designer – led the experiment, evaluation and design decisions; directed the AI-assisted implementation",
    context: "Independent exploration with Figma AI and Claude for Kursion, a fictional training management platform. All data is fictional.",
    summary:
      "A designer-led experiment: I used three Figma AI generations of the same screen to test how far AI-generated UI gets – then directed the refinement, a component library, design variables and an interactive prototype.",
    stack: ["Figma AI", "Figma", "Figma Variables", "Claude", "HTML/CSS/JS prototype", "Playwright + axe-core"],
    accent: "rose",
    chapters: [
      { key: "overview", title: "Project overview", lead: "I led the design process. AI supported the execution.", widget: "pp-overview" },
      { key: "roles", title: "How I worked with AI", lead: "My responsibilities at each stage, and where AI assisted.", widget: "pp-roles" },
      { key: "stages-01-03", title: "Stages 01–03: prompt evolution", lead: "The same screen, three prompts with increasing guidance. Each prompt is shown exactly as used, above its unedited result.", widget: "pp-generations" },
      { key: "human-refinement", title: "Stage 04 – Human Refinement: My UX Decisions", lead: "I evaluated Stage 03, defined seven UX problems and made eight documented decisions. Each one shaped the final interface.", widget: "pp-refinement" },
      { key: "components", title: "Stage 05 – Component library", lead: "A Figma component library built with Claude from my design decisions: 11 components with 52 variants, Auto Layout and variable bindings – reviewed by me, including the TrainingCard trade-off I approved.", widget: "pp-components" },
      { key: "variables", title: "Stage 06 – Design variables", lead: "I required every value to follow the semantic token structure; Claude built the 149 variables in three layers: primitive → semantic → component.", widget: "pp-variables" },
      { key: "prototype", title: "Stage 07 – Interactive prototype", lead: "The refined design as a working HTML prototype. I defined the product rules and interaction requirements; Claude implemented them in HTML, CSS and JavaScript, and I reviewed the implementation.", widget: "pp-prototype" },
      { key: "testing", title: "Accessibility and automated testing", lead: "What was designed in, what was checked automatically – and what wasn’t done.", widget: "pp-testing" },
      { key: "ai-couldnt-decide", title: "Decisions AI Couldn’t Make for Me", lead: "Where the AI output left a gap, and the decision I made.", widget: "pp-ai-decide" },
      { key: "lessons", title: "Limitations and lessons learned", widget: "pp-lessons" },
      { key: "outcome", title: "Final outcome", widget: "pp-outcome" },
    ],
    shots: [{ src: "/work/from-prompt-to-product/kursion/04/figma-2x/stage04-refined-1-default@2x.webp", alt: "Refined Kursion Trainings screen: actionable warning, status filters and status-specific row actions", caption: "Stage 04 – Refined 1" }],
    links: [],
  },
  // Case studies that are not published yet: listed only in development / local preview (see lib/content/publication.ts).
  ...(SHOW_UNPUBLISHED ? unpublishedProjects : []),
];

// Card covers are self-hosted copies of the top of each project's first screenshot,
// so the gallery doesn't depend on other sites being reachable.
const LOCAL_COVERS = ["accounting-modernization", "electricity-einvoicing", "ecommerce-backend", "ferry-booking", "ai-meal-planner", "ai-website-builder", "liftertrans", "content-factory", "telia-ux-audit", "modular-furniture-store", "home-cafe-pos", "stiilihub", "telegram-life-assistant", "n8n-automations", "laboulangerie", "ai-creative-design", "pos-promo-site", "telia-tv-discovery", "dailytrack", "pomodoro", "fitness-coaching", "birthday-reminder", "flashcards", "abacus-kids", "transfer-company", "vet-clinic", "book-eshop", "jewellery-site", "bicycle-store-design", "ai-ready-design-system", "from-chaos-to-consistency", "from-prompt-to-product"];
for (const p of projects) if (LOCAL_COVERS.includes(p.slug)) p.cover = `/work/${p.slug}/cover.webp`;

// Gallery cards show a badge only where it changes how the work should be read:
// commercial experience, design-only concepts, and prototypes that could be mistaken
// for production systems. Routine states (completed, in development, live demo…) are
// left to the case study, where the real status is always shown.
const CARD_BADGES: Record<string, Status> = {
  "ai-website-builder": { label: "Commercial", tone: "shipped" },
  "modular-furniture-store": { label: "Commercial", tone: "shipped" },
  "accounting-modernization": { label: "Commercial", tone: "shipped" },
  "electricity-einvoicing": { label: "Commercial", tone: "shipped" },
  "laboulangerie": { label: "Commercial", tone: "shipped" },
  "pos-promo-site": { label: "Commercial", tone: "shipped" },
  "liftertrans": { label: "AI chat prototype", tone: "proto" },
  "ai-ready-design-system": { label: "Interactive prototype", tone: "proto" },
  "from-chaos-to-consistency": { label: "Interactive prototype", tone: "proto" },
  "from-prompt-to-product": { label: "Interactive prototype", tone: "proto" },
};
for (const p of projects) {
  if (CARD_BADGES[p.slug]) p.cardBadge = CARD_BADGES[p.slug];
  else if (p.status.tone === "concept") p.cardBadge = { label: "Concept", tone: "concept" };
}

// Server-side rendering can still resolve unpublished entries, so their own routes build
// (and are then removed from the output by scripts/prune-unpublished.mjs). In browser bundles
// `typeof window` is "object", so this list - and the unpublished text - is dropped.
const serverOnlyUnpublished: Project[] = typeof window === "undefined" && !SHOW_UNPUBLISHED ? unpublishedProjects : [];
export const getProject = (slug: string) => projects.find((p) => p.slug === slug) ?? serverOnlyUnpublished.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);

export const toneLabel: Record<StatusTone, string> = {
  done: "Completed",
  shipped: "Shipped",
  wip: "In development",
  proto: "Prototype",
  concept: "Concept",
};
