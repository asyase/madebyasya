"use client";
import { createContext, useContext } from "react";
import clsx from "clsx";

export const AnnotationContext = createContext<{ show: boolean; tone: "before" | "after" }>({ show: false, tone: "after" });

/** Numbered marker that ties a spot in the interface to an annotation. Decorative – the list carries the meaning. */
export function Marker({ n, className }: { n: number; className?: string }) {
  const { show, tone } = useContext(AnnotationContext);
  if (!show) return null;
  return (
    <span aria-hidden className={clsx("mx-1 inline-grid h-5 w-5 shrink-0 place-items-center rounded-full align-middle font-mono text-[11px] font-bold leading-none text-white shadow ring-2 ring-white", tone === "before" ? "bg-pink-deep" : "bg-lav-deep", className)}>
      {n}
    </span>
  );
}
