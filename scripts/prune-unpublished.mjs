// Production step 2 of 3 (after `next build`, before verify-unpublished.mjs).
//
// Removes unpublished case studies from the generated static export in out/:
//   1. their route folders (HTML, RSC data, JSON endpoints, images) and draft-only asset folders;
//   2. JavaScript/CSS files under out/_next that ONLY unpublished pages use.
//
// A file under out/_next is deleted only if (a) it belongs to an unpublished route, is
// referenced by an unpublished page, or contains unpublished text, AND (b) no published file
// refers to it – by path, file name or content hash. Anything a published page might load is
// kept. If a kept file still contains unpublished text, verify-unpublished.mjs fails the build.
//
// Only the generated out/ folder is touched (see out-safety.mjs). On any error, out/ is deleted
// and the build fails, so no partially pruned output can be deployed.
import fs from "node:fs";
import path from "node:path";
import { publication } from "./publication.config.mjs";
import { discardOutput, listFiles, outDir, removeInsideOut, TEXT_EXT } from "./out-safety.mjs";

try {
  const out = outDir();
  if (fs.existsSync(path.join(out, publication.previewFlagFile))) throw new Error("out/ is a preview build – refusing to prune it for production.");
  const read = (rel) => fs.readFileSync(path.join(out, rel), "utf8");

  // 1. Unpublished route and asset folders.
  const unpublishedDirs = [...publication.unpublishedRoutes, ...publication.unpublishedAssets, ...publication.supersededAssets];
  const unpublishedFiles = new Set(unpublishedDirs.flatMap((d) => listFiles(path.join(out, d))));
  const unpublishedText = [...unpublishedFiles].filter((f) => TEXT_EXT.test(f)).map(read).join("\n");

  // 2. Candidate files under out/_next.
  const staticFiles = listFiles(path.join(out, "_next"));
  const tokens = (f) => {
    const rel = f.replace(/^_next\//, ""); // e.g. static/chunks/932-81ba34c5933c644b.js
    const base = path.posix.basename(f);
    const hash = base.match(/[-.]([0-9a-f]{16,})\.(js|css)$/)?.[1];
    return [rel, base, hash].filter(Boolean);
  };
  const chunkRoutePrefixes = publication.unpublishedChunkRoutes.map((r) => `_next/static/chunks/${r}/`);
  const candidates = staticFiles.filter((f) => {
    if (chunkRoutePrefixes.some((p) => f.startsWith(p))) return true;
    if (tokens(f).some((t) => unpublishedText.includes(t))) return true;
    return TEXT_EXT.test(f) && publication.markers.some((m) => read(f).includes(m));
  });

  // 3. Everything that stays published, and the text it contains.
  const candidateSet = new Set(candidates);
  const publishedFiles = listFiles(out).filter((f) => !unpublishedFiles.has(f) && !candidateSet.has(f));
  const publishedText = publishedFiles.filter((f) => TEXT_EXT.test(f)).map(read).join("\n");

  // 4. Keep any candidate a published file refers to (shared); delete the rest.
  const shared = candidates.filter((f) => tokens(f).some((t) => publishedText.includes(t)));
  const sharedSet = new Set(shared);
  const removeStatic = candidates.filter((f) => !sharedSet.has(f));

  for (const d of unpublishedDirs) removeInsideOut(d);
  for (const f of removeStatic) removeInsideOut(f);

  const report = {
    removedFolders: unpublishedDirs,
    removedFolderFiles: unpublishedFiles.size,
    removedStaticFiles: removeStatic,
    keptSharedCandidates: shared,
  };
  fs.mkdirSync(".next", { recursive: true });
  fs.writeFileSync(".next/unpublished-prune-report.json", JSON.stringify(report, null, 2));
  console.log(`prune-unpublished: removed ${unpublishedDirs.length} folders (${unpublishedFiles.size} files) and ${removeStatic.length} unpublished-only files from out/_next; kept ${shared.length} shared file(s) that published pages reference.`);
  for (const f of shared) console.log(`  kept (shared): ${f}`);
} catch (err) {
  discardOutput(`prune-unpublished failed: ${err.message}`);
}
