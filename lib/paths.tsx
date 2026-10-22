"use client";
import { createContext, useContext } from "react";

// Internal URLs are written as absolute paths ("/work/x/").
// With NEXT_PUBLIC_RELATIVE=1 (static preview builds) they are rewritten
// relative to the current page depth, so the export works under any sub-path.
const RELATIVE = process.env.NEXT_PUBLIC_RELATIVE === "1";
const DepthContext = createContext(0);

export function DepthProvider({ depth, children }: { depth: number; children: React.ReactNode }) {
  return <DepthContext.Provider value={depth}>{children}</DepthContext.Provider>;
}

export function resolveHref(path: string, depth: number) {
  if (!path.startsWith("/") || !RELATIVE) return path;
  if (depth === 0 && path.startsWith("/#")) return path.slice(1);
  const base = depth === 0 ? "./" : "../".repeat(depth);
  const rest = path.slice(1);
  if (!rest) return base === "./" ? "./" : base;
  // Directory pages need an explicit index.html on hosts without directory indexes.
  const [p, hash] = rest.split("#");
  const file = p === "" ? "" : p.endsWith("/") ? p + "index.html" : p;
  return base + file + (hash !== undefined ? "#" + hash : "");
}

export function useHref() {
  const depth = useContext(DepthContext);
  return (path: string) => resolveHref(path, depth);
}
