// Capability map. `pro` = used in commercial work; `project` = used in
// course, team or personal projects. `evidence` shows on hover/focus.

export type Skill = {
  name: string;
  level: "pro" | "project";
  evidence: string;
  slug?: string; // linked case study
};

export type SkillGroup = {
  id: string;
  title: string;
  tagline: string;
  tone: "pink" | "lavender" | "rose" | "peri" | "ink";
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    tagline: "Interfaces that hold up on every screen",
    tone: "pink",
    skills: [
      { name: "React", level: "pro", evidence: "Telia service pages built on Telia's React component library; a React 19 tablet POS.", slug: "home-cafe-pos" },
      { name: "Next.js", level: "project", evidence: "StiiliHub frontend: product, brand and category pages with dynamic filters. Also this site.", slug: "stiilihub" },
      { name: "TypeScript", level: "project", evidence: "Ferry booking components, the Home Café POS, and the Telegram assistant.", slug: "ferry-booking" },
      { name: "JavaScript", level: "pro", evidence: "Parsing and validating Claude output before it reaches GoERP templates.", slug: "ai-website-builder" },
      { name: "HTML5 · CSS/SCSS", level: "pro", evidence: "Full e-commerce storefronts at Roller and Erply, from wireframe to responsive UI.", slug: "modular-furniture-store" },
      { name: "Tailwind CSS", level: "project", evidence: "StiiliHub and the POS app.", slug: "stiilihub" },
      { name: "Vue.js", level: "project", evidence: "Vue 3 frontends for the meal planner and LifterTrans.", slug: "ai-meal-planner" },
      { name: "Go Templates", level: "pro", evidence: "Reusable templates that render AI-generated content on the GoERP platform.", slug: "ai-website-builder" },
      { name: "Component architecture", level: "pro", evidence: "Modular, reusable UI components for design consistency across GoERP sites." },
      { name: "Responsive & accessible UI", level: "pro", evidence: "WCAG-minded checkout and category pages for the furniture store.", slug: "modular-furniture-store" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    tagline: "The logic underneath",
    tone: "lavender",
    skills: [
      { name: "Java 21 · Spring Boot", level: "project", evidence: "Meal planner backend; LifterTrans REST APIs with ADMIN/DRIVER roles.", slug: "liftertrans" },
      { name: "REST APIs", level: "pro", evidence: "Integrated REST endpoints with business logic on GoERP; designed APIs in Spring Boot.", slug: "ecommerce-backend" },
      { name: "PostgreSQL · SQL", level: "pro", evidence: "SQL via QueryService at Erply; row-level security in Content Factory.", slug: "content-factory" },
      { name: "JPA / Hibernate", level: "project", evidence: "Layered Controller → Service → Repository e-commerce backend.", slug: "ecommerce-backend" },
      { name: "Go", level: "project", evidence: "Content Factory: API, workers, migrations and CLI as four binaries.", slug: "content-factory" },
      { name: "Authentication & roles", level: "project", evidence: "Role-based access for ADMIN and DRIVER users in LifterTrans.", slug: "liftertrans" },
      { name: "XML / JSON · e-invoicing", level: "pro", evidence: "Invoice flows via EstFeed, Docura and UnifiedPost, incl. XML parsing, at Erply." },
      { name: "Payments", level: "pro", evidence: "Adyen and Montonio integrations in client stores.", slug: "laboulangerie" },
    ],
  },
  {
    id: "design",
    title: "UX/UI Design",
    tagline: "Research before pixels",
    tone: "rose",
    skills: [
      { name: "Figma", level: "pro", evidence: "Every design project here, from thesis prototypes to e-commerce layouts.", slug: "telia-ux-audit" },
      { name: "User research", level: "project", evidence: "Employee surveys and feedback analysis for the Telia thesis.", slug: "telia-ux-audit" },
      { name: "UX audits · heuristics", level: "project", evidence: "Evaluated redesigns against Nielsen's 10 heuristics.", slug: "telia-ux-audit" },
      { name: "User flows", level: "project", evidence: "Mapped customer search and call registration flows.", slug: "telia-ux-audit" },
      { name: "Wireframing · prototyping", level: "project", evidence: "DailyTrack, Pomodoro and fitness platform concepts.", slug: "dailytrack" },
      { name: "Information architecture", level: "project", evidence: "Navigation and filter hierarchy for a large TV catalogue.", slug: "telia-tv-discovery" },
      { name: "Accessibility (WCAG)", level: "pro", evidence: "Accessible storefronts; validation and error prevention in forms.", slug: "modular-furniture-store" },
      { name: "Generative visuals", level: "project", evidence: "Banners, interiors and brand concepts with Midjourney and Nano Banana Pro.", slug: "ai-creative-design" },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    tagline: "Useful, tested, and safe",
    tone: "peri",
    skills: [
      { name: "Anthropic Claude API", level: "pro", evidence: "Shipped in the commercial GoERP website builder; tool use and prompt caching in Content Factory.", slug: "ai-website-builder" },
      { name: "Gemini · Spring AI", level: "project", evidence: "Meal planner and the NL-to-SQL data assistant.", slug: "liftertrans" },
      { name: "Structured outputs", level: "pro", evidence: "Typed Java records and schema checks; parsed JSON for templates.", slug: "ai-meal-planner" },
      { name: "Grounding", level: "project", evidence: "Prompts built only from the user's pantry and saved recipes.", slug: "ai-meal-planner" },
      { name: "LLM evaluation", level: "project", evidence: "Prompt A/B tests with an LLM judge that is itself tested.", slug: "ai-meal-planner" },
      { name: "Input safety", level: "project", evidence: "Length cap → regex → LLM judge; read-only SQL execution.", slug: "liftertrans" },
      { name: "n8n · webhooks", level: "project", evidence: "Price alerts, rain reminders and Telegram order notifications.", slug: "n8n-automations" },
      { name: "AI-assisted development", level: "pro", evidence: "Claude Code, Codex and Cursor; spec-driven milestones with review.", slug: "content-factory" },
    ],
  },
  {
    id: "tools",
    title: "Engineering Tools",
    tagline: "How the work ships",
    tone: "ink",
    skills: [
      { name: "Git · GitHub · Bitbucket", level: "pro", evidence: "Branching, pull requests and code reviews in team projects." },
      { name: "Docker", level: "project", evidence: "LifterTrans development setup.", slug: "liftertrans" },
      { name: "Swagger / OpenAPI · Postman", level: "project", evidence: "Documented and tested REST endpoints.", slug: "ecommerce-backend" },
      { name: "Testing", level: "project", evidence: "JUnit, Vitest, node:test; 322 tests on the Telegram assistant.", slug: "telegram-life-assistant" },
      { name: "CI/CD", level: "project", evidence: "GitLab CI builds and tests for Content Factory and the POS.", slug: "content-factory" },
      { name: "JIRA · Agile/Scrum", level: "pro", evidence: "Scrum (SAFe) at Telia; estimation and reviews in team projects." },
    ],
  },
];
