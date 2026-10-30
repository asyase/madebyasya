"use client";
import { ArrowUpRight, Award } from "lucide-react";
import clsx from "clsx";
import Shot from "./Shot";
import StatusPill from "./StatusPill";
import { categories, type Project } from "@/lib/content/projects";
import { useHref } from "@/lib/paths";

const catLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

export default function ProjectCard({ project, index, variant = "standard", highlights = false }: { project: Project; index: number; variant?: "wide" | "tall" | "standard"; highlights?: boolean }) {
  const href = useHref();
  const p = project;
  const cover = p.shots[0];
  const num = String(index + 1).padStart(2, "0");
  const chips = highlights && p.highlights ? p.highlights : p.stack;
  const max = highlights && p.highlights ? chips.length : variant === "wide" ? 7 : 5;

  return (
    <article className={clsx("group relative", variant === "wide" && "lg:grid lg:grid-cols-12 lg:items-end lg:gap-10")}>
      <a href={href(`/work/${p.slug}/`)} className="absolute inset-0 z-10 rounded-[24px]" data-cursor="Open case" aria-label={`${p.title} – read the case study`} />
      <div className={clsx("relative overflow-hidden rounded-[24px] ring-1 ring-ink/5", variant === "wide" ? "lg:col-span-8" : "")}>
        <Shot
          framed={!!p.cover}
          seed={p.slug}
          src={p.cover ?? cover?.src}
          alt={cover?.alt ?? p.title}
          label={p.title.split(" – ")[0]}
          meta={p.kicker}
          accent={p.accent}
          className={clsx(
            "transition-transform duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035]",
            variant === "tall" ? "aspect-[4/5]" : variant === "wide" ? "aspect-[16/10]" : "aspect-[4/3]",
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2">
          {p.cardBadge && <StatusPill status={p.cardBadge} />}
          {(p.awards || p.honors) && (
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-pink-deep backdrop-blur">
              <Award className="h-3.5 w-3.5" aria-hidden /> {p.awards ? (p.awards.length > 1 ? `${p.awards.length} awards` : "Award") : "Top grade (5)"}
            </span>
          )}
        </div>
        <span className="absolute bottom-4 right-4 grid h-12 w-12 translate-y-3 place-items-center rounded-full bg-bubblegum text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" aria-hidden>
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      <div className={clsx("mt-5", variant === "wide" && "lg:col-span-4 lg:mt-0 lg:pb-2")}>
        <div className="flex items-baseline gap-3">
          <span className="font-display text-4xl font-extrabold leading-none text-outline md:text-5xl">{num}</span>
          <p className="eyebrow text-ink-soft">
            {p.categories.map(catLabel).join(" · ")}{p.year ? ` – ${p.year}` : ""}
          </p>
        </div>
        <h3 className={clsx("mt-3 font-display font-bold leading-[1.02] tracking-tight", variant === "wide" ? "text-[clamp(1.9rem,3.2vw,3rem)]" : "text-[clamp(1.5rem,2.2vw,2.1rem)]")}>
          <span className="bg-[linear-gradient(var(--bubblegum),var(--bubblegum))] bg-[length:0%_0.32em] bg-[position:0_88%] bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_0.32em]">
            {p.title}
          </span>
        </h3>
        <p className={clsx("mt-3 text-ink-soft", variant !== "wide" && "line-clamp-3")}>{p.summary}</p>
        {p.awards?.some((a) => a.includes("RingIT")) ? (
          <p className="mt-3 flex items-start gap-2 font-display text-lg font-bold leading-snug tracking-tight">
            <Award className="mt-1 h-4 w-4 shrink-0 text-pink-deep" aria-hidden />
            <span>
              Awarded by the{" "}
              <a href="https://www.ringit.ee/" target="_blank" rel="noreferrer" className="relative z-20 underline decoration-bubblegum decoration-2 underline-offset-4 hover:text-pink-deep">RingIT</a>{" "}
              company.
            </span>
          </p>
        ) : (p.awards || p.honors) && (
          <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-pink-deep">
            <Award className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{(p.awards ?? p.honors)!.join(" · ")}</span>
          </p>
        )}
        <p className="mt-3 text-sm"><span className="font-semibold">Role – </span><span className="text-ink-soft">{p.role}</span></p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={chips === p.stack ? "Tech stack" : "Focus areas"}>
          {chips.slice(0, max).map((s) => (
            <li key={s} className="rounded-full border border-ink/12 bg-paper px-2.5 py-1 font-mono text-[11px] text-ink-soft">{s}</li>
          ))}
          {chips.length > max && <li className="px-1 py-1 font-mono text-[11px] text-ink-soft">+{chips.length - max}</li>}
        </ul>
      </div>
    </article>
  );
}
