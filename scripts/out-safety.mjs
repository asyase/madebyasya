// Shared guards for the build-output scripts.
// Every deletion goes through removeInsideOut(), which refuses anything outside out/.
import fs from "node:fs";
import path from "node:path";

export const ROOT = process.cwd();
export const OUT = path.join(ROOT, "out");

/** Resolve out/ and make sure it is a real folder directly inside the project. */
export function outDir({ mustExist = true } = {}) {
  if (!fs.existsSync(OUT)) {
    if (mustExist) throw new Error("out/ does not exist – run next build first.");
    return null;
  }
  const st = fs.lstatSync(OUT);
  if (st.isSymbolicLink() || !st.isDirectory()) throw new Error("out/ must be a real folder, not a link.");
  const real = fs.realpathSync(OUT);
  if (path.dirname(real) !== fs.realpathSync(ROOT)) throw new Error(`Unexpected out/ location: ${real}`);
  return real;
}

/** Delete a file or folder, but only if it resolves strictly inside out/. */
export function removeInsideOut(target) {
  const out = outDir();
  const abs = path.resolve(out, target);
  const rel = path.relative(out, abs);
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) throw new Error(`Refusing to delete outside out/: ${target}`);
  if (!fs.existsSync(abs)) return false;
  const real = fs.realpathSync(abs);
  const realRel = path.relative(out, real);
  if (!realRel || realRel.startsWith("..") || path.isAbsolute(realRel)) throw new Error(`Refusing to delete a link that points outside out/: ${target}`);
  fs.rmSync(abs, { recursive: true, force: true });
  return true;
}

/** Remove the whole generated out/ folder (used when pruning or verification fails). */
export function discardOutput(reason) {
  const out = outDir({ mustExist: false });
  if (out) fs.rmSync(out, { recursive: true, force: true });
  console.error(`\n✖ ${reason}\n  out/ was deleted so no partial or unverified output can be deployed.\n`);
  process.exit(1);
}

/** All files under a folder, as paths relative to out/ with forward slashes. */
export function listFiles(dirAbs, base = outDir()) {
  const result = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else result.push(path.relative(base, p).split(path.sep).join("/"));
    }
  };
  if (fs.existsSync(dirAbs)) walk(dirAbs);
  return result;
}

export const TEXT_EXT = /\.(html|txt|js|mjs|css|json|xml|svg|map|webmanifest)$/i;
