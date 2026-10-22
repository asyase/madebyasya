"use client";
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, CircleDashed, CircleDot, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import Shot from "./Shot";
import StatusPill from "./StatusPill";
import Gallery from "./Gallery";
import ArchitectureExplorer from "./ArchitectureExplorer";
import Reveal from "./Reveal";
import Starburst from "./Starburst";
import { categories, projects, type Project } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

function Section({ n, title, children, id }: { n: string; title: string; children: React.ReactNode; id: string }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-ink/10 py-14 md:grid-cols-12 md:gap-10 md:py-20">
      <div className="md:col-span-3">
        <p className="font-mono text-xs text-pink-deep">{n}</p>
        <h2 id={id} className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      </div>
      <div className="min-w-0 md:col-span-9">{children}</div>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-[72ch] gap-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-lg leading-relaxed">
          <Starburst className="mt-2 h-3 w-3 shrink-0 text-pink-deep" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

const featureIcon = {
  done: <CheckCircle2 className="h-4 w-4 text-pink-deep" aria-hidden />,
  proto: <CircleDot className="h-4 w-4 text-lav-deep" aria-hidden />,
  planned: <CircleDashed className="h-4 w-4 text-ink-soft" aria-hidden />,
};
const featureLabel = { done: "Implemented", proto: "Prototype", planned: "Planned" };

export default function CaseStudy({ project: p }: { project: Project }) {
  const href = useHref();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];

  // Build the numbered story only from sections that have content.
  const story: { key: string; title: string; node: React.ReactNode }[] = [];
  if (p.problem) story.push({ key: "problem", title: "Problem", node: <p className="max-w-[64ch] text-xl leading-relaxed md:text-2xl">{p.problem}</p> });
  if (p.insights) story.push({ key: "insights", title: "Design insights", node: <><Bullets items={p.insights} /><p className="mt-5 font-mono text-xs text-ink-soft">From analysing the task and the interface – not from formal user research.</p></> });
  if (p.approach) story.push({ key: "approach", title: "Approach", node: <Bullets items={p.approach} /> });
  if (p.design) story.push({ key: "design", title: "Design decisions", node: <Bullets items={p.design} /> });
  if (p.architecture) story.push({ key: "architecture", title: "Architecture", node: <ArchitectureExplorer nodes={p.architecture.nodes} caption={p.architecture.caption} /> });
  if (p.features) story.push({
    key: "features",
    title: "Features",
    node: (
      <ul className="grid gap-x-8 sm:grid-cols-2">
        {p.features.map((f) => (
          <li key={f.label} className="flex items-start gap-3 border-b border-ink/10 py-3">
            <span className="mt-1">{featureIcon[f.state]}</span>
            <span className="flex-1">
              {f.label}
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">{featureLabel[f.state]}</span>
            </span>
          </li>
        ))}
      </ul>
    ),
  });
  if (p.implementation || p.code) story.push({
    key: "implementation",
    title: "Implementation",
    node: (
      <div className="grid gap-8">
        {p.implementation && <Bullets items={p.implementation} />}
        {p.code && (
          <figure className="overflow-hidden rounded-[20px] bg-[#1d1926] text-[#ece9f5]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 font-mono text-xs">
              <span className="text-white">{p.code.file}</span>
              <span className="text-[#8e88a3]">{p.code.lang}</span>
            </div>
            <pre tabIndex={0} className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.75]"><code>{p.code.body}</code></pre>
            <figcaption className="border-t border-white/10 px-5 py-3 font-mono text-xs text-[#a9a3bd]">{p.code.note}</figcaption>
          </figure>
        )}
      </div>
    ),
  });
  if (p.challenges) story.push({
    key: "challenges",
    title: "Challenges",
    node: (
      <div className="grid gap-4">
        {p.challenges.map((c) => (
          <div key={c.challenge} className="grid gap-4 rounded-2xl bg-ivory p-5 md:grid-cols-2">
            <div>
              <p className="eyebrow text-pink-deep">Challenge</p>
              <p className="mt-1.5">{c.challenge}</p>
            </div>
            <div>
              <p className="eyebrow text-lav-deep">Solution</p>
              <p className="mt-1.5">{c.solution}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  });
  if (p.result || p.numbers || p.lessons) story.push({
    key: "result",
    title: "Result",
    node: (
      <div className="grid gap-10">
        {p.numbers && (
          <ul className="grid gap-4 sm:grid-cols-3">
            {p.numbers.map((n) => (
              <li key={n.label} className="rounded-2xl bg-ink p-5 text-paper">
                <p className="font-display text-3xl font-extrabold tracking-tight text-bubblegum md:text-4xl">{n.value}</p>
                <p className="mt-2 text-sm text-paper/75">{n.label}</p>
              </li>
            ))}
          </ul>
        )}
        {p.result && <Bullets items={p.result} />}
        {p.lessons && (
          <div>
            <p className="eyebrow mb-3 text-ink-soft">Lessons</p>
            <ul className="grid gap-2">
              {p.lessons.map((l) => <li key={l} className="serif-accent text-2xl leading-snug md:text-3xl">“{l}”</li>)}
            </ul>
          </div>
        )}
      </div>
    ),
  });

  const cover = p.shots[0];
  const cats = p.categories.map((c) => categories.find((x) => x.id === c)?.label).join(" · ");

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden pb-12 pt-28 md:pt-40">
        <div className="absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,214,238,.9),rgba(206,209,248,.5)_50%,transparent_70%)] blur-2xl" aria-hidden />
        <div className="frame">
          <a href={href("/work/")} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All work
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-display text-5xl font-extrabold leading-none text-outline">{String(i + 1).padStart(2, "0")}</span>
            <span className="sr-only">Project status:</span>
            <StatusPill status={p.status} />
            <span className="eyebrow text-ink-soft">{cats}</span>
          </div>
          <h1 className="mt-6 max-w-6xl font-display text-[clamp(2.6rem,7vw,6.8rem)] font-extrabold leading-[0.92] tracking-tightest">{p.title}</h1>
          <p className="mt-8 max-w-[58ch] text-xl leading-relaxed text-ink-soft md:text-2xl">{p.summary}</p>

          {p.honors && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.honors.map((h) => (
                <li key={h} className="inline-flex items-center gap-2 rounded-full bg-peri px-4 py-2 text-sm font-semibold">
                  <Award className="h-4 w-4" aria-hidden /> {h}
                </li>
              ))}
            </ul>
          )}
          {p.awards && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.awards.map((a) => (
                <li key={a}>
                  {a.includes("RingIT") ? (
                    <a href="https://www.ringit.ee/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-bubblegum px-4 py-2 text-sm font-semibold underline-offset-4 hover:underline">
                      <Award className="h-4 w-4" aria-hidden /> {a} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-bubblegum px-4 py-2 text-sm font-semibold">
                      <Award className="h-4 w-4" aria-hidden /> {a}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-12 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div><dt className="eyebrow text-ink-soft">My role</dt><dd className="mt-2 font-medium">{p.role}</dd></div>
            <div><dt className="eyebrow text-ink-soft">Type</dt><dd className="mt-2 font-medium">{p.kicker}</dd></div>
            {p.context && <div><dt className="eyebrow text-ink-soft">Context</dt><dd className="mt-2 font-medium">{p.context}</dd></div>}
            <div>
              <dt className="eyebrow text-ink-soft">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => <span key={s} className="rounded-full bg-peri/60 px-2.5 py-1 font-mono text-[11px]">{s}</span>)}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {cover && (
        <div className="frame">
          <Shot src={cover.src} alt={cover.alt} label={p.title.split(" – ")[0]} meta={cover.caption ?? p.kicker} accent={p.accent} eager className="aspect-[16/9] rounded-[28px] ring-1 ring-ink/10" />
        </div>
      )}

      <div className="frame mt-10">
        {story.length > 0 && (
          <nav aria-label="On this page" className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {story.map((s, k) => (
              <a key={s.key} href={`#${s.key}`} className="shrink-0 rounded-full border border-ink/15 px-3.5 py-1.5 font-mono text-xs hover:bg-blush">
                {String(k + 1).padStart(2, "0")} {s.title}
              </a>
            ))}
            {p.shots.length > 1 && <a href="#screens" className="shrink-0 rounded-full border border-ink/15 px-3.5 py-1.5 font-mono text-xs hover:bg-blush">Screens</a>}
          </nav>
        )}

        {story.map((s, k) => (
          <div key={s.key} id={s.key} className="scroll-mt-24">
            <Section n={String(k + 1).padStart(2, "0")} title={s.title} id={`${s.key}-title`}>{s.node}</Section>
          </div>
        ))}

        {p.shots.length > 1 && (
          <div id="screens" className="scroll-mt-24">
            <Section n="↳" title="Screens" id="screens-title"><Gallery project={p} /></Section>
          </div>
        )}

        {p.links.length > 0 && (
          <Section n="↗" title="Links" id="links-title">
            <ul className="flex flex-wrap gap-3">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-paper hover:bg-pink-deep">
                    {l.label} <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            {p.links.some((l) => l.href.startsWith(site.aiPortfolio)) && (
              <p className="mt-4 text-sm text-ink-soft">The AI portfolio has the complete technical write-up for this project.</p>
            )}
          </Section>
        )}
      </div>

      {/* Next / previous */}
      <nav aria-label="More projects" className="frame mt-10 grid gap-4 pb-24 md:grid-cols-2">
        {[{ dir: "Previous", p: prev }, { dir: "Next", p: next }].map(({ dir, p: q }) => (
          <a key={dir} href={href(`/work/${q.slug}/`)} className={clsx("group flex min-h-[200px] flex-col justify-between rounded-[24px] p-6 md:p-8", dir === "Next" ? "bg-ink text-paper" : "bg-ivory")} data-cursor={dir}>
            <span className={clsx("eyebrow flex items-center gap-2", dir === "Next" ? "text-bubblegum" : "text-pink-deep")}>
              {dir === "Previous" && <ArrowLeft className="h-3.5 w-3.5" aria-hidden />}
              {dir} project
              {dir === "Next" && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />}
            </span>
            <span className="mt-8 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">{q.title}</span>
          </a>
        ))}
      </nav>
    </article>
  );
}
