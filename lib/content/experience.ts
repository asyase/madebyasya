export type TimelineEntry = {
  id: string;
  kind: "work" | "education";
  period: string;
  title: string;
  org: string;
  summary: string;
  points: string[];
  tech?: string[];
};

export const experience: TimelineEntry[] = [
  {
    id: "erply",
    kind: "work",
    period: "2024 – 2026",
    title: "Developer · GoERP Platform",
    org: "Erply Development OÜ",
    summary: "Commercial development on the GoERP business platform and e-commerce projects – frontend functionality, API integrations, business logic and an AI-powered website builder feature using the Claude API.",
    points: [
      "Introduced AI into the company's website builder: integrated the Anthropic Claude API and built the prompt input and result preview UI.",
      "Built applications with JavaScript, Go Templates and SQL queries via QueryService.",
      "Integrated REST endpoints with back-end services and business logic.",
      "Developed e-invoicing flows via EstFeed, Docura and UnifiedPost, including XML parsing.",
      "Contributed to modernizing a legacy accounting system (VERP → GoERP): chart of accounts, journal entries, opening balances and account-balance views.",
      "Built electricity billing and e-invoice integration flows for an energy-sector client (EstFeed/Enefit), including XML generation and automated invoice processing.",
      "Built websites and web apps end to end with HTML, CSS, JavaScript and APIs, following UX/UI standards with attention to accessibility.",
      "Built reusable front-end components and responsive interfaces; debugged and tested integrations.",
      "Worked closely with web designers to discuss design solutions and their technical feasibility.",
      "Ran usability and performance tests and ensured cross-platform compatibility.",
    ],
    tech: ["JavaScript", "Go Templates", "SQL", "QueryService", "KVS", "Claude API", "REST", "XML", "S3"],
  },
  {
    id: "roller",
    kind: "work",
    period: "2024",
    title: "Front-End Developer · E-commerce",
    org: "Roller Äritarkvara OÜ",
    summary: "E-commerce websites built to design specifications and brand guidelines.",
    points: [
      "Translated wireframes and UI designs into responsive, accessible interfaces.",
      "Integrated APIs for product listings, cart functionality and order flows.",
      "Ensured mobile and cross-browser support, and improved code quality with UX designers and back-end developers.",
      "Analysed and fixed bugs in the development environment.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "APIs"],
  },
  {
    id: "telia-intern",
    kind: "work",
    period: "Oct – Dec 2022",
    title: "Web Master · Internship",
    org: "Telia Eesti AS",
    summary: "Service pages from design prototypes, inside a Scrum team (SAFe).",
    points: [
      "Built pages with Telia's React component library, JSX, HTML, CSS and vanilla JavaScript.",
      "Managed public website content through a headless WordPress CMS.",
      "Solved smaller JavaScript tasks, including regular expressions.",
      "Worked as a developer in a Scrum team and learned the SAFe framework in practice.",
    ],
    tech: ["React", "JSX", "WordPress", "Scrum"],
  },
  {
    id: "telia-cs",
    kind: "work",
    period: "2021 – 2024",
    title: "Customer Service & Mentor",
    org: "Telia Eesti AS",
    summary: "First point of contact for technical and sales questions – and for new colleagues.",
    points: [
      "Advised customers, handled incoming calls and call-backs, and resolved complaints, billing and service questions.",
      "Concluded and managed contracts for new services and ordered products.",
      "Mentored new employees and helped them settle into the team.",
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    id: "bcs",
    kind: "education",
    period: "2026",
    title: "Full-Stack AI Developer Programme",
    org: "BCS Koolitus · 280 academic hours",
    summary: "Full-stack development with LLM integration and LLMOps.",
    points: ["The final project, the AI Meal Planner, received an award from the RingIT company."],
    tech: ["Java", "Spring AI", "Vue", "LLMOps"],
  },
  {
    id: "vibe",
    kind: "education",
    period: "2026",
    title: "AI-Assisted Web Development – Vibe Coding",
    org: "Course",
    summary: "Training in AI-assisted web development.",
    points: [],
  },
  {
    id: "taltech",
    kind: "education",
    period: "2026",
    title: "Noorem-tarkvaraarendajast vanemarendajaks",
    org: "TalTech",
    summary: "Professional development course for software developers.",
    points: [],
  },
  {
    id: "ttk",
    kind: "education",
    period: "2024",
    title: "Figma course",
    org: "Tallinna Tehnikakõrgkool (TTK)",
    summary: "",
    points: [],
  },
  {
    id: "itschool",
    kind: "education",
    period: "2023 – 2024",
    title: "Front-End Developer / UI/UX Designer",
    org: "IT School · online programme",
    summary: "Front-end and UX/UI training with projects for real clients.",
    points: ["Abacus Kids, the transfer company website and others came from this programme."],
  },
  {
    id: "tlu",
    kind: "education",
    period: "2020 – 2023",
    title: "BSc, Computer Science",
    org: "Tallinn University · Institute of Digital Technologies",
    summary: "Bachelor's thesis: UX audit and redesign of Telia's internal service platform, defended with the highest grade (5) and praised.",
    points: [],
  },
  {
    id: "school",
    kind: "education",
    period: "2008 – 2020",
    title: "Secondary education · Gold medal",
    org: "Tallinn Õismäe Russian Lyceum",
    summary: "Graduated with a gold medal.",
    points: [],
  },
];
