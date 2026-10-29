// Publication gate for unpublished case studies (see scripts/publication.config.mjs).
//
//  - `next dev`               → everything visible (local development).
//  - `npm run build:preview`  → production build WITH unpublished case studies, for local review only.
//  - `npm run build`          → production build; unpublished case studies are left out of the
//                               project lists, then removed from `out/` and verified absent.
//
// A production build that does not go through `npm run build` / `npm run build:preview`
// (for example a plain `next build`) is refused, so the prune + verify steps can't be skipped.
const isProductionBuild = process.env.NODE_ENV === "production";

if (isProductionBuild && process.env.BUILD_PIPELINE !== "1") {
  throw new Error(
    "Refusing to build: run `npm run build` (production) or `npm run build:preview` (local review). " +
      "A plain `next build` would skip removing unpublished case studies.",
  );
}

const showUnpublished = !isProductionBuild || process.env.SHOW_UNPUBLISHED === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: deploys to Vercel as-is, or to any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  // Inlined into server and browser code at build time (lib/content/publication.ts).
  env: { SHOW_UNPUBLISHED: showUnpublished ? "1" : "0" },
  // Draft pages (page.draft.tsx) only exist in development and preview builds.
  pageExtensions: showUnpublished ? ["tsx", "ts", "jsx", "js", "draft.tsx"] : ["tsx", "ts", "jsx", "js"],
};
export default nextConfig;
