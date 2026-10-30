"use client";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useHref } from "@/lib/paths";

/**
 * The draft now lives at /work/from-prompt-to-product/ (still unpublished – local development and
 * preview builds only). This old draft address forwards there so there is only one version of the page.
 */
export default function DraftCaseStudy() {
  const href = useHref();
  const target = href("/work/from-prompt-to-product/");
  useEffect(() => {
    window.location.replace(target);
  }, [target]);
  return (
    <div className="frame grid min-h-[60vh] place-content-center gap-4 py-32 text-center">
      <p className="font-display text-3xl font-bold tracking-tight">From Prompt to Product has moved</p>
      <a href={target} className="mx-auto inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-paper">
        Open /work/from-prompt-to-product/ <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}
