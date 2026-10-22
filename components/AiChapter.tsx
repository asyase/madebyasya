"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import { ArrowUpRight, Award } from "lucide-react";
import Magnetic from "./Magnetic";
import Starburst from "./Starburst";
import { getProject } from "@/lib/content/projects";
import { site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

const ease = [0.2, 0.75, 0.2, 1] as const;

// The path so far – each step is from the CV.
const PATH = [
  { year: "2020", label: "Computer Science, Tallinn University" },
  { year: "2022", label: "Web Master intern, Telia" },
  { year: "2024–26", label: "Developer – e-commerce, business platforms & internal apps, Erply" },
  { year: "2026", label: "AI-powered software", now: true },
];

const LEARNED = [
  "Full-stack apps with Java, Spring Boot, Vue, REST and PostgreSQL",
  "AI-assisted development, code review, debugging and refactoring",
  "Structured, iterative prompting",
  "Grounding and hallucination mitigation, incl. RAG and MCP",
  "Structured outputs and prompt A/B tests",
  "Evaluating AI results and LLM parameters",
  "LLMOps basics",
  "Architecture, database design, unit tests and Swagger/OpenAPI",
];

const PRINCIPLES = [
  { a: "Context", b: "guesswork.", text: "Clear instructions, relevant data and thoughtful constraints." },
  { a: "Code", b: "blind trust.", text: "Structured outputs, deterministic checks and application-level validation." },
  { a: "Experiments", b: "assumptions.", text: "Test prompts, investigate failures and improve based on observed results." },
];

const APPLIED = ["ai-meal-planner", "ai-website-builder", "content-factory", "telegram-life-assistant", "n8n-automations"];

const planner = getProject("ai-meal-planner")!;
const COVER = planner.shots[0];

/** Redrawn pantry fragment shown when the real screenshot can't load. */
function PantryFragment() {
  const items = [["Eggs", "155"], ["Milk", "64"], ["Tomatoes", "18"], ["Cheese", "350"], ["Spinach", "23"], ["Rye bread", "259"]];
  return (
    <div className="grid h-full w-full grid-cols-[1.3fr_1fr] bg-paper text-ink" role="img" aria-label="Pantry with daily calories (redrawn, sample data)">
      <div className="border-r border-ink p-5 sm:p-7">
        <p className="font-display text-xl font-bold sm:text-2xl">Pantry</p>
        <ul className="mt-4 font-mono text-[11px] sm:text-xs">
          {items.map(([n, k]) => (
            <li key={n} className="flex justify-between border-t border-ink/15 py-2">
              <span>{n}</span>
              <span className="text-ink-soft">{k} kcal / 100 g</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between p-5 sm:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Today</p>
        <div>
          <p className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">1,240</p>
          <p className="mt-1 font-mono text-[11px] text-ink-soft">of 1,800 kcal</p>
          <div className="mt-4 h-[3px] bg-ink/10"><div className="h-full w-[69%] bg-pink-deep" /></div>
        </div>
      </div>
    </div>
  );
}

export default function AiChapter() {
  const href = useHref();
  const reduce = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLOListElement>(null);
  const pathIn = useInView(pathRef, { once: true, margin: "0px 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);
  const [failed, setFailed] = useState(!COVER?.src);

  return (
    <section id="ai" className="relative scroll-mt-20 overflow-x-clip bg-blush py-20 md:py-28" aria-labelledby="ai-title">
      <div className="frame">
        {/* The path so far */}
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="eyebrow text-pink-deep">A new chapter / 2026</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">The path so far</p>
        </div>
        <ol ref={pathRef} className="relative mt-5 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-ink/25 pt-4 sm:grid-cols-4 lg:gap-x-4" aria-label="Career path">
          <motion.span
            aria-hidden
            className="absolute -top-px left-0 h-[2px] w-full origin-left bg-ink"
            initial={false}
            animate={{ scaleX: pathIn || reduce ? 1 : 0.02 }}
            transition={{ duration: 1.6, ease }}
          />
          {PATH.map((p) => (
            <li key={p.year + p.label} className="relative min-w-0">
              <span className={p.now ? "absolute -top-[21px] left-0 hidden h-[11px] w-[11px] rounded-full bg-pink-deep ring-4 ring-blush lg:block" : "absolute -top-[19px] left-0 hidden h-[7px] w-[7px] rounded-full bg-ink ring-4 ring-blush lg:block"} aria-hidden />
              <p className={p.now ? "font-display text-lg font-extrabold tracking-tight text-pink-deep md:text-xl" : "font-display text-lg font-extrabold tracking-tight text-ink/70 md:text-xl"}>{p.year}</p>
              <p className={p.now ? "mt-1 text-xs font-semibold leading-snug text-ink md:text-[13px]" : "mt-1 text-xs leading-snug text-ink-soft md:text-[13px]"}>{p.label}</p>
            </li>
          ))}
        </ol>

        {/* Headline */}
        <h2 id="ai-title" className="mt-16 max-w-[17ch] font-display text-[clamp(2.9rem,7.4vw,7.6rem)] font-extrabold leading-[0.9] tracking-tightest md:mt-24">
          From full&#8209;stack development to <span className="serif-accent font-normal text-pink-deep">AI&#8209;powered products.</span>
        </h2>

        {/* Story + image */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-10 lg:col-span-4">
            <p className="text-xl leading-relaxed text-ink md:text-[1.4rem] md:leading-[1.45]">
              I&apos;ve recently taken my development journey further into AI – not just using it as a coding assistant, but building applications that integrate intelligent features into real software.
            </p>

            <div className="border-t border-ink pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Training</p>
              <p className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight">BCS Koolitus – Full-Stack AI Developer Programme</p>
              <div className="mt-6 flex items-end gap-6">
                <p className="font-display text-[clamp(4.5rem,8vw,7rem)] font-extrabold leading-[0.8] tracking-tightest">280</p>
                <p className="pb-1 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ink-soft">
                  academic hours
                  <br />7 weeks of contact learning
                </p>
              </div>
              <p className="mt-6 text-ink-soft">
                An intensive programme combining full-stack engineering with practical AI development, LLM integration, structured prompting, grounding, evaluation and testing.
              </p>
            </div>
          </div>

          <div className="relative lg:col-span-8 lg:col-start-5 lg:-mr-[var(--gutter)] lg:pl-8">
            <div ref={imgRef} className="relative aspect-[16/11] overflow-hidden bg-paper">
              <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
                {failed ? (
                  <div className="absolute inset-y-10 inset-x-0"><PantryFragment /></div>
                ) : (
                  <img src={COVER.src} alt={COVER.alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover object-left-top" />
                )}
              </motion.div>
            </div>
            {/* Award label */}
            <div className="relative z-10 -mt-14 ml-4 max-w-[30rem] bg-ink p-5 text-paper sm:-mt-16 sm:ml-[-1.5rem] sm:p-6 lg:ml-[-4rem]">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bubblegum">
                <Award className="h-3.5 w-3.5" aria-hidden /> Highlight
              </p>
              <p className="mt-2 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                <a href={href(`/work/${planner.slug}/`)} className="underline decoration-bubblegum decoration-2 underline-offset-4 hover:text-bubblegum">AI Nutrition & Weekly Meal Planner</a>
                {" "}– awarded by the <a href="https://www.ringit.ee/" target="_blank" rel="noreferrer" className="underline decoration-bubblegum decoration-2 underline-offset-4 hover:text-bubblegum">RingIT</a> company.
              </p>
            </div>
            <Starburst className="absolute -top-6 right-6 h-12 w-12 text-lav-deep lg:right-16" spin />
          </div>
        </div>

        {/* What it covered + practice */}
        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">What it covered</p>
            <p className="mt-4 text-lg leading-[1.75] text-ink">
              {LEARNED.map((l, i) => (
                <span key={l}>
                  {l}
                  {i < LEARNED.length - 1 && <span className="mx-2 font-mono text-lav-deep" aria-hidden>/</span>}
                </span>
              ))}
              .
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="serif-accent text-[clamp(1.5rem,2.3vw,2.1rem)] leading-[1.18] text-ink">
              And I didn&apos;t stop at learning. I&apos;ve been applying these skills to real projects – from an award-winning AI Meal Planner and commercial Claude API integrations to intelligent applications and workflow automation.
            </p>

            <ul className="mt-6 border-t border-ink/25" aria-label="Where it's applied">
              {APPLIED.map((slug) => {
                const p = getProject(slug)!;
                return (
                  <li key={slug}>
                    <a href={href(`/work/${slug}/`)} className="group flex items-baseline justify-between gap-4 border-b border-ink/25 py-3" data-cursor="Open case">
                      <span className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-pink-deep">{p.title.split(" – ")[0]}</span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">{p.status.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* How I work with AI */}
        <div className="mt-20 grid gap-12 border-t border-ink pt-12 md:mt-24 md:pt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">How I work with AI</p>
            <h3 className="mt-4 font-display text-[clamp(2.7rem,5.6vw,5.6rem)] font-extrabold leading-[0.9] tracking-tightest">
              I don&apos;t stop at <span className="serif-accent whitespace-nowrap font-normal text-lav-deep">a prompt.</span>
            </h3>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
              I use AI both as a development tool and as part of the applications I build. For me, working with AI means more than generating an answer – it&apos;s about giving the right context, questioning results, validating outputs and improving through experiments.
            </p>
          </div>

          <ol className="self-end lg:col-span-5 lg:col-start-8" aria-label="AI engineering principles">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p.a}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="group grid grid-cols-[2.5rem_1fr] border-t border-ink/25 py-5 last:border-b"
              >
                <span className="pt-1.5 font-mono text-xs text-pink-deep">0{i + 1} /</span>
                <div>
                  <p className="font-display text-[clamp(1.5rem,2.3vw,2.1rem)] font-bold leading-tight tracking-tight">
                    {p.a} <span className="serif-accent font-normal text-lav-deep transition-colors duration-300 group-hover:text-pink-deep">over</span> {p.b}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{p.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Lesson + link to the AI portfolio */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <figure className="lg:col-span-6">
            <blockquote className="serif-accent text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] text-ink">
              &ldquo;A convincing AI response isn&apos;t necessarily a correct one.&rdquo;
            </blockquote>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
              Lesson from an AI Meal Planner experiment
            </figcaption>
          </figure>
          <div className="lg:col-span-5 lg:col-start-8">
            <Magnetic>
              <a href={site.aiPortfolio} target="_blank" rel="noreferrer" data-cursor="Open ↗" className="group inline-flex items-center gap-3 rounded-full bg-ink py-4 pl-7 pr-4 text-base font-semibold text-paper">
                Explore my AI Engineering work
                <span className="grid h-9 w-9 place-items-center rounded-full bg-bubblegum text-ink transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
            </Magnetic>
            <p className="mt-3 max-w-[44ch] text-sm text-ink-soft">Explore real AI applications, integrations, architecture, experiments and technical case studies.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
