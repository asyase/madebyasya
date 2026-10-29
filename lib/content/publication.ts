// Publication switch for case studies that are not published yet.
// SHOW_UNPUBLISHED is set in next.config.mjs and inlined at build time:
//   - "1" in `next dev` and in `npm run build:preview` (local review)
//   - "0" in `npm run build` (production)
// Keep this file free of slugs or titles: it is bundled into published pages.
export const SHOW_UNPUBLISHED = process.env.SHOW_UNPUBLISHED === "1";
