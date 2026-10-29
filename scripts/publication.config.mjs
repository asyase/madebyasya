// Which pages are NOT published, and how a production build proves they are absent.
// Used only by the build scripts in this folder – never bundled into the site.
//
// Published on Asya's approval (28 Oct 2026): AI-Ready Multibrand Design System, From Chaos to
// Consistency and From Prompt to Product (projects 30–32). Still unpublished: the old draft address
// /drafts/from-prompt-to-product/ and the superseded first-round files.
//
// To keep a future case study unpublished: add its routes / assets / markers below and put its entry
// in lib/content/unpublished-projects.ts. To publish it: remove them again and raise
// `expectedPublishedProjects`.

export const publication = {
  /** Output folders (relative to out/) of unpublished pages, demos and JSON endpoints. */
  unpublishedRoutes: [
    "drafts", // old From Prompt to Product draft address (forwards to /work/from-prompt-to-product/)
  ],

  /** Draft-only asset folders copied from public/ (relative to out/). */
  unpublishedAssets: [],

  /**
   * Superseded first-round From Prompt to Product files. NEVER published: production builds always
   * remove them and fail if they are present. Kept on disk only as history.
   */
  supersededAssets: [
    "work/from-prompt-to-product/figma",
    "work/from-prompt-to-product/code",
    "work/from-prompt-to-product/prototype",
  ],

  /** Next.js chunk folders (relative to out/_next/static/chunks/) that belong only to unpublished routes. */
  unpublishedChunkRoutes: ["app/drafts"],

  /** Text that must not appear anywhere in a production build. */
  markers: [
    "drafts/from-prompt-to-product", // no published page may link to the draft address
  ],

  /**
   * Published files must be the optimised copies: no PNG under these output folders
   * (the original PNG exports live in design-source/, outside public/).
   */
  webpOnly: ["work/from-prompt-to-product"],

  /** Number of published project pages under /work/<slug>/ (29 existing + 3 case studies). */
  expectedPublishedProjects: 32,

  /** Written into out/ by preview builds; a production deploy must never contain it. */
  previewFlagFile: "PREVIEW-BUILD-NOT-FOR-DEPLOYMENT.txt",
};
