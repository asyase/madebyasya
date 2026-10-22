import clsx from "clsx";
import type { Status } from "@/lib/content/projects";

const tones = {
  done: "bg-ink text-paper",
  shipped: "bg-bubblegum text-ink",
  wip: "bg-peri text-ink",
  proto: "bg-blush text-ink",
  concept: "bg-paper/90 text-ink ring-1 ring-ink/25 backdrop-blur",
};
const dots = { done: "bg-bubblegum", shipped: "bg-ink", wip: "bg-lav-deep animate-pulse", proto: "bg-pink-deep", concept: "bg-ink/40" };

export default function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em]", tones[status.tone], className)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", dots[status.tone])} aria-hidden />
      {status.label}
    </span>
  );
}
