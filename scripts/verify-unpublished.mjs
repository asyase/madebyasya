// Production step 3 of 3: proves out/ is safe to deploy. Any failure deletes out/ and fails the build.
//
// Checks:
//   - no preview flag file;
//   - unpublished routes, demo, JSON endpoints and draft assets are absent;
//   - no file in out/ contains unpublished text (slugs, titles, "Kursion", demo paths…);
//   - every internal link, image, script and stylesheet referenced by a published page exists,
//     and none points to an unpublished route;
//   - every Next.js chunk referenced by a published page's data exists (no shared chunk was removed);
//   - the number of published project pages equals publication.expectedPublishedProjects;
//   - no original PNG exports (design-source/) and only WebP images in the `webpOnly` folders.
//
// `--preview` (npm run build:preview): local review build. Refuses to run on Vercel and marks out/
// with a flag file so it can't be mistaken for a production build.
import fs from "node:fs";
import path from "node:path";
import { publication } from "./publication.config.mjs";
import { discardOutput, listFiles, outDir, TEXT_EXT } from "./out-safety.mjs";

const preview = process.argv.includes("--preview");

try {
  const out = outDir();
  const exists = (rel) => fs.existsSync(path.join(out, rel));

  if (preview) {
    if (process.env.VERCEL || process.env.CI) throw new Error("Preview builds include unpublished case studies and must never run on Vercel/CI.");
    const missing = publication.unpublishedRoutes.filter((r) => r !== "drafts" && !exists(r));
    fs.writeFileSync(path.join(out, publication.previewFlagFile), "LOCAL PREVIEW – contains unpublished case studies. Do not deploy.\n");
    console.log(`verify-unpublished (preview): unpublished case studies included for local review.${missing.length ? ` Missing: ${missing.join(", ")}` : ""}`);
    console.log("  This out/ folder is NOT deployable. Run `npm run build` for production.");
    process.exit(0);
  }

  const problems = [];
  if (exists(publication.previewFlagFile)) problems.push("out/ is a preview build");

  for (const d of [...publication.unpublishedRoutes, ...publication.unpublishedAssets, ...publication.supersededAssets]) if (exists(d)) problems.push(`still present: /${d}/`);

  const files = listFiles(out);
  for (const f of files) {
    if (f.startsWith("design-source/")) problems.push(`source folder published: ${f}`);
    if ((publication.webpOnly ?? []).some((d) => f.startsWith(d + "/")) && /\.png$/i.test(f)) problems.push(`PNG published instead of WebP: ${f}`);
  }
  const textFiles = files.filter((f) => TEXT_EXT.test(f));
  const read = (rel) => fs.readFileSync(path.join(out, rel), "utf8");
  for (const f of textFiles) {
    const t = read(f);
    for (const m of publication.markers) if (t.includes(m)) problems.push(`"${m}" found in ${f}`);
  }

  // Internal references from published pages.
  const unpublishedPrefixes = [...publication.unpublishedRoutes, ...publication.unpublishedAssets, ...publication.supersededAssets].map((d) => `/${d}`);
  const resolveRef = (fromFile, ref) => {
    let p = ref.split("#")[0].split("?")[0];
    if (!p || /^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(p)) return null;
    p = decodeURI(p);
    const abs = p.startsWith("/") ? p : "/" + path.posix.join(path.posix.dirname(fromFile), p);
    return path.posix.normalize(abs);
  };
  const existsUrl = (u) => {
    const rel = u.replace(/^\//, "");
    if (u.endsWith("/")) return exists(rel + "index.html");
    return exists(rel) || exists(rel + "/index.html") || exists(rel + ".html");
  };
  const htmlFiles = files.filter((f) => f.endsWith(".html"));
  let refCount = 0;
  for (const f of htmlFiles) {
    const html = read(f);
    const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
    for (const m of html.matchAll(/\ssrcSet="([^"]+)"|\ssrcset="([^"]+)"/g)) for (const part of (m[1] || m[2]).split(",")) refs.push(part.trim().split(/\s+/)[0]);
    for (const r of refs) {
      const u = resolveRef(f, r);
      if (!u) continue;
      refCount++;
      if (unpublishedPrefixes.some((p) => u === p || u.startsWith(p + "/"))) problems.push(`${f} links to unpublished ${u}`);
      else if (!existsUrl(u)) problems.push(`${f} references missing ${u}`);
    }
  }

  // Chunks named in published RSC data / HTML must exist.
  let chunkRefs = 0;
  for (const f of files.filter((x) => x.endsWith(".txt") || x.endsWith(".html"))) {
    for (const m of read(f).matchAll(/static\/(?:chunks|css|media)\/[A-Za-z0-9_\-./[\]%]+?\.(?:js|css|woff2?)/g)) {
      chunkRefs++;
      if (!exists("_next/" + decodeURIComponent(m[0]))) problems.push(`${f} needs missing _next/${m[0]}`);
    }
  }

  // Published project pages.
  const projectPages = fs.existsSync(path.join(out, "work"))
    ? fs.readdirSync(path.join(out, "work"), { withFileTypes: true }).filter((e) => e.isDirectory() && exists(`work/${e.name}/index.html`)).map((e) => e.name)
    : [];
  if (projectPages.length !== publication.expectedPublishedProjects)
    problems.push(`expected ${publication.expectedPublishedProjects} published project pages, found ${projectPages.length}`);
  const workIndex = exists("work/index.html") ? read("work/index.html") : "";
  const linked = new Set([...workIndex.matchAll(/href="\/work\/([a-z0-9-]+)\/"/g)].map((m) => m[1]));
  for (const slug of linked) if (!projectPages.includes(slug)) problems.push(`work index links to missing /work/${slug}/`);
  for (const slug of projectPages) if (!linked.has(slug)) problems.push(`/work/${slug}/ is not linked from the work index`);

  if (problems.length) {
    for (const p of [...new Set(problems)].slice(0, 50)) console.error(`  ✖ ${p}`);
    throw new Error(`${problems.length} problem(s) found`);
  }
  console.log(`verify-unpublished: OK – ${projectPages.length} published projects, ${htmlFiles.length} HTML pages, ${refCount} internal references and ${chunkRefs} chunk references checked; no unpublished routes, assets or text in out/.`);
} catch (err) {
  discardOutput(`verify-unpublished failed: ${err.message}`);
}
