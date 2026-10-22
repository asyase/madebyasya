# Anastasija Selevjorstova – Portfolio

Personal portfolio: **Creative mind. Developer logic.**
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into /out
```

## Deploy to Vercel

Import the repository in Vercel. No settings are needed: the project is a fully static
export (`output: "export"` in `next.config.mjs`), so it also works on GitHub Pages, Netlify
or any static host.

Before going live, set the production domain in `lib/content/site.ts` (`url`). It is used
for social preview links.

## Where things live

```
app/
  page.tsx               Homepage (section order)
  work/page.tsx          All projects as cards, with filters
  work/[slug]/page.tsx   Case study pages (one per project, statically generated)
  layout.tsx             SEO metadata, Open Graph image
components/              Presentation only – no content hard-coded
lib/content/
  site.ts                Name, links, email, languages
  projects.ts            Every project and its case-study sections
  skills.ts              Capability map (commercial vs project use + evidence)
  experience.ts          Work and education timeline
public/
  images/                Portrait crops (head-and-shoulders, from the supplied photo)
  cv/                    Downloadable CV (phone number removed)
  og.png                 Social sharing image
```

### Adding or editing a project

Add an object to `projects` in `lib/content/projects.ts`. Only `slug`, `title`, `kicker`,
`status`, `categories`, `role`, `summary`, `stack`, `accent`, `shots` and `links` are required.
Every case-study section (`problem`, `approach`, `design`, `architecture`, `features`,
`implementation`, `challenges`, `result`, `lessons`, `numbers`, `code`) is optional and is
hidden when empty, so the numbering on each page stays correct.

Set `featured: true` to put a project in the homepage selection (featured projects come first).

### Images

Screenshots are loaded from the existing portfolios (`ai-portfolio-asya.vercel.app` and
`asyase.github.io/about_me`). If an image can't load, a designed poster is shown instead.
To self-host them, save each file into `public/work/<slug>/` and change the `src` values.

## Interaction notes

- **Process section** – Design / Develop / Connect tabs (arrow keys supported).
- **Capability map** – hover, focus or tap a skill to see where it was used.
- **Component lab** – theme, radius, density, state and label update the preview and the code.
- **Architecture explorer** – on case-study pages; click a layer or use Next step.
- **Terminal** – press <kbd>`</kbd> anywhere, or use "Open terminal" in the footer.
  Commands: `help`, `about`, `skills`, `projects`, `contact`, `cv`, `ai`, `clear`, `exit`.
- **Custom cursor** – desktop only; disabled with `prefers-reduced-motion`.
- All motion respects `prefers-reduced-motion`. Page-to-page transitions use the
  View Transitions API where the browser supports it.

## Preview builds under a sub-path

`NEXT_PUBLIC_RELATIVE=1 npm run build` rewrites internal links relative to each page,
for hosting the export under an unknown sub-path. Normal deployments don't need it.
