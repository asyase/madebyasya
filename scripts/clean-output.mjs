// Runs before every build: removes the previous out/ so a failed build can never leave
// an older (possibly preview) export behind. Only touches the generated out/ folder.
import fs from "node:fs";
import { outDir } from "./out-safety.mjs";

const out = outDir({ mustExist: false });
if (out) {
  fs.rmSync(out, { recursive: true, force: true });
  console.log("clean-output: removed previous out/");
}
