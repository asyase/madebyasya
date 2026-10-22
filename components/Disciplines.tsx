"use client";
/* eslint-disable @next/next/no-img-element */
/*
 * "How I work" – three stages, each illustrated by a different real project:
 *   Design  → Telia internal platform UX audit (Bachelor's thesis)
 *   Develop → Modular furniture e-commerce (component-based availability)
 *   Connect → LifterTrans (Vue → Spring Boot REST → PostgreSQL)
 * Three elements persist and are re-composed by layout animation between stages:
 * the image plate, the ink rule and the large figure.
 */
import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { getProject } from "@/lib/content/projects";
import { useHref } from "@/lib/paths";

type Mode = "design" | "develop" | "connect";

const telia = getProject("telia-ux-audit")!;
const furniture = getProject("modular-furniture-store")!;
const lifter = getProject("liftertrans")!;

const MODES: { id: Mode; label: string; motto: string; title: string; accent: string; copy: string; habit: string; project: { slug: string; name: string } }[] = [
  {
    id: "design",
    label: "Design",
    motto: "Understand the problem. Explore possibilities. Plan with intention.",
    habit: "I map requirements and user flows, explore a few directions and share early ideas for feedback before choosing one.",
    title: "Every detail starts with a",
    accent: "decision.",
    copy: "I explore user needs, structure information and design experiences that feel intuitive before a single component is built.",
    project: { slug: telia.slug, name: "Telia internal platform – UX audit, Bachelor's thesis" },
  },
  {
    id: "develop",
    label: "Develop",
    motto: "Break it down. Build thoughtfully. Test and improve.",
    habit: "I split larger tasks into small steps, own the implementation, keep the team in the loop and adjust when a better idea appears.",
    title: "Design becomes",
    accent: "functionality.",
    copy: "I build responsive interfaces and full-stack applications, connecting frontend experiences with real logic and data.",
    project: { slug: furniture.slug, name: "Modular furniture e-commerce platform" },
  },
  {
    id: "connect",
    label: "Connect",
    motto: "Bring perspectives, technologies and ideas together.",
    habit: "I keep design and engineering in one conversation – across frontend, backend, APIs, databases and AI integrations – because mixed perspectives make stronger products.",
    title: "Everything works",
    accent: "together.",
    copy: "I connect interfaces, backend services, APIs, databases and integrations into complete applications that solve real problems.",
    project: { slug: lifter.slug, name: "LifterTrans – transport management system" },
  },
];

const ease = [0.7, 0, 0.2, 1] as const;
const morph = { layout: { duration: 0.85, ease } };

/* ------------------------------------------------------------ image + fallbacks */

function Crop({ src, alt, fallback, position = "left top", className }: { src?: string; alt: string; fallback: React.ReactNode; position?: string; className?: string }) {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={clsx("relative h-full w-full overflow-hidden bg-paper", className)}>
      {failed ? fallback : <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" style={{ objectPosition: position }} />}
    </div>
  );
}

/** Redrawn customer search (shown only if the real screenshot can't load). */
function SearchRedraw() {
  const rows = [["Mari Tamm", "Mobile · TV", "Active"], ["Jaan Kask", "Home internet", "Active"], ["Liis Saar", "Mobile", "Overdue"], ["Peeter Mets", "Landline · TV", "Active"]];
  return (
    <div className="absolute left-0 top-0 h-[520px] w-[760px] origin-top-left border border-ink bg-paper p-8 text-ink max-lg:scale-[0.47] sm:max-lg:scale-[0.85]" role="img" aria-label="Customer search screen (redrawn)">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Customer search</p>
      <div className="mt-3 flex items-center justify-between border border-ink px-4 py-3">
        <span className="text-lg">Name, ID code or phone number</span>
        <span className="bg-ink px-4 py-1.5 text-sm font-semibold text-paper">Search</span>
      </div>
      <div className="mt-2 flex gap-2 font-mono text-[11px]">
        {["All services", "Mobile", "TV", "Home internet"].map((f, i) => (
          <span key={f} className={clsx("border px-2.5 py-1", i === 0 ? "border-ink bg-ink text-paper" : "border-ink/30")}>{f}</span>
        ))}
      </div>
      <table className="mt-6 w-full text-left text-sm">
        <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
          <tr className="border-b border-ink"><th className="py-2 font-normal">Customer</th><th className="font-normal">Services</th><th className="font-normal">Status</th></tr>
        </thead>
        <tbody>
          {rows.map(([n, s, st]) => (
            <tr key={n} className="border-b border-ink/15">
              <td className="py-3 font-semibold">{n}</td><td>{s}</td>
              <td><span className={clsx("font-mono text-[11px]", st === "Overdue" ? "text-pink-deep" : "text-ink-soft")}>{st}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilterRedraw() {
  const groups: [string, string[]][] = [["Service", ["Mobile", "TV", "Home internet", "Landline"]], ["Status", ["Active", "Overdue", "Closed"]]];
  return (
    <div className="h-full w-full bg-ink p-5 text-paper" role="img" aria-label="Filter panel (redrawn)">
      <p className="font-display text-lg font-bold">Filters</p>
      {groups.map(([g, items]) => (
        <div key={g} className="mt-4 border-t border-paper/20 pt-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-bubblegum">{g}</p>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            {items.map((it, i) => (
              <li key={it} className="flex items-center gap-2"><span className={clsx("h-3 w-3 border border-paper", i === 0 && "bg-bubblegum")} />{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function StoreRedraw() {
  return (
    <div className="grid h-full w-full grid-cols-[1.1fr_1fr] bg-paper text-ink" role="img" aria-label="Product page (redrawn)">
      <div className="bg-rose" />
      <div className="flex flex-col justify-center gap-3 border-l border-ink p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Tables / Modular</p>
        <p className="font-display text-2xl font-bold leading-tight">Oak table, 160 cm</p>
        <div className="flex gap-1.5">{["#d9c3a5", "#3b3330", "#f3efe8"].map((c) => <span key={c} className="h-5 w-5 border border-ink/30" style={{ background: c }} />)}</div>
        <p className="font-mono text-xs">Top · Legs · Fasteners</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ design fragment */

const FIELD_STATES = {
  default: { label: "Default", border: "border-ink", value: "", msg: "Enter a name, ID code or phone number.", tone: "text-ink-soft" },
  error: { label: "Error", border: "border-pink-deep", value: "3890", msg: "ID code is 11 digits – check the number and try again.", tone: "text-pink-deep" },
  confirm: { label: "Confirm", border: "border-ink", value: "38901234567", msg: "Customer found. Open the profile?", tone: "text-ink" },
} as const;
type FieldState = keyof typeof FIELD_STATES;

function StatesFragment() {
  const [s, setS] = useState<FieldState>("error");
  const st = FIELD_STATES[s];
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Interaction states</p>
        <div className="flex gap-3" role="group" aria-label="Choose a state">
          {(Object.keys(FIELD_STATES) as FieldState[]).map((k) => (
            <button key={k} type="button" aria-pressed={s === k} onClick={() => setS(k)} className={clsx("font-mono text-[11px] uppercase tracking-[0.1em] underline-offset-4", s === k ? "text-ink underline decoration-bubblegum decoration-2" : "text-ink-soft hover:text-ink")}>
              {FIELD_STATES[k].label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 bg-paper p-4 outline outline-1 outline-ink">
        <label htmlFor="hiw-field" className="block text-sm font-semibold">Customer ID code</label>
        <motion.input
          id="hiw-field"
          readOnly
          value={st.value}
          placeholder="e.g. 38901234567"
          className={clsx("mt-2 w-full border-2 bg-paper px-3 py-2 font-mono text-sm outline-none transition-colors", st.border)}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={s} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={clsx("mt-2 text-[13px]", st.tone)}>
            {st.msg}
          </motion.p>
        </AnimatePresence>
        {s === "confirm" && (
          <div className="mt-3 flex gap-2">
            <span className="bg-ink px-3 py-1.5 text-xs font-semibold text-paper">Open profile</span>
            <span className="border border-ink px-3 py-1.5 text-xs font-semibold">Cancel</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ develop data */

type Tok = [string, ("k" | "s" | "f" | "c")?];
const CODE: Tok[][] = [
  [["// A table exists only if every part is available.", "c"]],
  [["function ", "k"], ["availability", "f"], ["(variant, qty) {"]],
  [["  const ", "k"], ["parts = variant.components;  "], ["// top, legs, screws…", "c"]],
  [["  const ", "k"], ["buildable = Math."], ["min", "f"], ["("]],
  [["    ...parts."], ["map", "f"], ["((p) => Math."], ["floor", "f"], ["(p.stock / p.perUnit))"]],
  [["  );"]],
  [],
  [["  if ", "k"], ["(buildable >= qty) "], ["return ", "k"], ["{ state: "], ['"In stock"', "s"], [" };"]],
  [["  if ", "k"], ["(parts."], ["every", "f"], ["((p) => p.restockDate))"]],
  [["    return ", "k"], ["{ state: "], ['"On order"', "s"], [", eta: "], ["leadTime", "f"], ["(parts) };"]],
  [["  return ", "k"], ["{ state: "], ['"Pending"', "s"], [" };"]],
  [["}"]],
];
const NOTES = [
  { id: "a", lines: [1, 3], title: "Products made of parts", text: "Each product is assembled from components, so availability is computed from the parts' inventory." },
  { id: "b", lines: [4, 6], title: "Quantity-aware", text: "Status and delivery estimate update as the quantity in the cart changes." },
  { id: "c", lines: [8, 11], title: "Three honest states", text: "In stock, On order or Pending, with a fallback message when stock runs short." },
];
const tokCls = { k: "text-pink-deep", s: "text-lav-deep", f: "font-semibold", c: "text-ink-soft italic" } as const;

/** Live fragment running the same idea: change the quantity, the state follows. */
function StockFragment() {
  const [qty, setQty] = useState(1);
  const state = qty <= 3 ? { label: "In stock", note: "Ships in 2–3 days", dot: "bg-ink" } : qty <= 6 ? { label: "On order", note: "Estimated lead time: 3 weeks", dot: "bg-lav-deep" } : { label: "Pending", note: "Not enough parts – we'll confirm a date", dot: "bg-pink-deep" };
  return (
    <div className="bg-paper p-4 text-ink outline outline-1 outline-ink">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">Try it · sample stock</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center border border-ink">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-9 w-9 place-items-center hover:bg-blush"><Minus className="h-4 w-4" /></button>
          <span className="w-10 text-center font-mono text-sm tabular-nums" aria-live="polite" aria-label={`Quantity ${qty}`}>{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(9, q + 1))} className="grid h-9 w-9 place-items-center hover:bg-blush"><Plus className="h-4 w-4" /></button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={state.label} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="flex items-center gap-2 whitespace-nowrap font-display text-lg font-bold">
            <span className={clsx("h-2 w-2 rounded-full", state.dot)} aria-hidden />
            {state.label}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-2 text-[13px] text-ink-soft">{state.note}</p>
    </div>
  );
}

/* ------------------------------------------------------------ connect data */

const NODES = [
  { id: "ui", x: 3, label: "Vue frontend", tech: "Vue 3 · Vite", detail: "Admin and driver views. Each screen calls the backend through REST endpoints; I integrated the Vue features with them." },
  { id: "api", x: 24, label: "REST API", tech: "Spring Boot", detail: "Controllers expose the endpoints, documented and tested with Swagger / OpenAPI." },
  { id: "auth", x: 45, label: "Roles", tech: "ADMIN · DRIVER", detail: "Authentication and role-based access decide what each user can see and change." },
  { id: "logic", x: 64, label: "Business logic", tech: "Service layer", detail: "CRUD for jobs, drivers and customers – the rules of the transport company live here, not in the UI." },
  { id: "db", x: 95, label: "PostgreSQL", tech: "JPA · Hibernate", detail: "Entities are persisted through JPA / Hibernate into PostgreSQL." },
];
const ZONES = [
  { label: "Client", from: 0, to: 14 },
  { label: "Server – Spring Boot", from: 18, to: 80 },
  { label: "Data", from: 86, to: 100 },
];

/* ------------------------------------------------------------ positions */

const PLATE: Record<Mode, string> = {
  design: "lg:left-[calc(var(--gutter)*-1)] lg:top-0 lg:h-[74%] lg:w-[54%] lg:opacity-100",
  develop: "lg:left-[57%] lg:top-0 lg:h-[56%] lg:w-[43%] lg:opacity-100",
  connect: "lg:left-0 lg:top-[50%] lg:h-px lg:w-[4%] lg:opacity-0",
};
const RULE: Record<Mode, string> = {
  design: "lg:left-0 lg:top-[90%] lg:h-px lg:w-[34%]",
  develop: "lg:left-[53%] lg:top-0 lg:h-full lg:w-px",
  connect: "lg:left-0 lg:top-[50%] lg:h-px lg:w-full",
};
const FIGURE: Record<Mode, string> = {
  design: "lg:right-0 lg:top-[64%]",
  develop: "lg:right-0 lg:top-[72%]",
  connect: "lg:right-0 lg:top-[62%]",
};
const FIG: Record<Mode, { value: string; caption: string }> = {
  design: { value: "10", caption: "Nielsen heuristics used to evaluate every proposal" },
  develop: { value: "3", caption: "availability states, derived from component stock" },
  connect: { value: "4", caption: "layers between a click and the database" },
};

const enter = {
  initial: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  animate: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, transition: { duration: 0.2 } } };

/* ------------------------------------------------------------ component */

export default function Disciplines() {
  const href = useHref();
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<Mode>("design");
  const [note, setNote] = useState("a");
  const [node, setNode] = useState("api");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent, i: number) {
    const next = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[e.key];
    if (!next) return;
    e.preventDefault();
    const j = (i + next + MODES.length) % MODES.length;
    setMode(MODES[j].id);
    tabs.current[j]?.focus();
  }

  const active = MODES.find((m) => m.id === mode)!;
  const activeNote = NOTES.find((n) => n.id === note)!;
  const activeNode = NODES.find((n) => n.id === node)!;
  const stagger = (i: number) => ({ duration: 0.7, ease, delay: 0.25 + i * 0.07 });
  const plateImg = mode === "develop" ? furniture.shots[0] : telia.shots[1];

  return (
    <section id="practice" className="relative scroll-mt-16 overflow-x-clip bg-ivory pb-16 md:pb-24" aria-labelledby="process-title">
      <MotionConfig reducedMotion="user">
        {/* Transition band: from mindset to process */}
        <div className="bg-ink text-paper">
          <div className="frame flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8 md:py-8">
            <p className="flex items-baseline gap-4 font-display text-[clamp(1.35rem,2.6vw,2.4rem)] font-bold uppercase leading-tight tracking-tight">
              <span className="font-mono text-xs font-normal text-bubblegum">02</span>
              <span>
                In practice – three stages, <span className="serif-accent font-normal normal-case text-bubblegum">three real projects</span>
              </span>
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-paper/70" aria-hidden>Design · Develop · Connect ↓</p>
          </div>
        </div>

        <div className="frame pt-16 md:pt-24">
          {/* Masthead */}
          <div>
            <p className="eyebrow flex items-center gap-3 text-pink-deep">
              <span className="font-mono">02</span>
              <span className="h-px w-8 bg-pink-deep" aria-hidden />
              How I work in practice
            </p>
            <h2 id="process-title" className="mt-6 max-w-[15ch] font-display text-[clamp(2.8rem,7.6vw,7.5rem)] font-extrabold leading-[0.9] tracking-tightest">
              From design decisions to <span className="serif-accent font-normal text-lav-deep">working systems.</span>
            </h2>
          </div>

          {/* Stage index – the words are the controls */}
          <div role="tablist" aria-label="Stages" className="mt-10 flex flex-col gap-1 lg:flex-row lg:items-baseline lg:justify-between lg:gap-0">
            {MODES.map((m, i) => {
              const on = mode === m.id;
              return (
                <button
                  key={m.id}
                  ref={(el) => { tabs.current[i] = el; }}
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={on}
                  aria-controls="process-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setMode(m.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  data-cursor={on ? undefined : m.label}
                  className={clsx(
                    "group relative flex items-start gap-2 text-left font-display text-[clamp(3.2rem,6.3vw,6.6rem)] font-extrabold uppercase leading-[0.86] tracking-tightest transition-colors duration-500",
                    on ? "text-ink" : "text-ink/55 hover:text-ink/80",
                  )}
                >
                  <span className="mt-[0.35em] font-mono text-xs font-normal normal-case tracking-normal text-pink-deep">0{i + 1}</span>
                  {m.label}
                  {on && <motion.span layoutId="stage-mark" className="absolute -bottom-2 left-7 right-0 hidden h-[3px] bg-bubblegum lg:block" transition={{ duration: 0.6, ease }} />}
                </button>
              );
            })}
          </div>

          {/* Stage statement */}
          <div className="mt-12 grid gap-6 lg:ml-[30%] lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id + "-t"} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35 }}>
                <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-pink-deep">{active.motto}</p>
                <h3 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-[1] tracking-tight">
                  {active.title} <span className="serif-accent font-normal text-pink-deep">{active.accent}</span>
                </h3>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id + "-c"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, delay: 0.05 }}>
                <p className="text-lg leading-relaxed text-ink-soft">{active.copy}</p>
                <p className="mt-3 border-l-2 border-bubblegum pl-4 text-[15px] leading-snug text-ink">{active.habit}</p>
                <a href={href(`/work/${active.project.slug}/`)} className="group mt-4 inline-flex items-baseline gap-2 border-b border-ink pb-0.5 text-sm font-semibold">
                  <span className="font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-ink-soft">Example</span>
                  {active.project.name}
                  <ArrowUpRight className="h-3.5 w-3.5 self-center transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Artboard */}
          <LayoutGroup>
            <div id="process-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} className="relative mt-14 flex flex-col gap-10 lg:mt-20 lg:block lg:h-[740px] xl:h-[660px]">
              {/* Persistent: plate (its image changes with the stage's project) */}
              <motion.figure layout transition={morph} className={clsx("relative z-0 w-full overflow-hidden lg:absolute lg:aspect-auto", mode === "develop" ? "aspect-[16/10]" : "aspect-[760/520]", PLATE[mode], mode === "connect" && "hidden lg:block")}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={plateImg?.src ?? mode} className="absolute inset-0" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease }}>
                    <Crop
                      src={plateImg?.src}
                      alt={plateImg?.alt ?? ""}
                      fallback={mode === "develop" ? <StoreRedraw /> : <SearchRedraw />}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.figure>

              {/* Persistent: rule */}
              <motion.div layout transition={morph} aria-hidden className={clsx("hidden bg-ink lg:absolute lg:block", RULE[mode])} />

              {/* Persistent: figure */}
              <motion.div layout transition={morph} className={clsx("order-last lg:absolute", FIGURE[mode])}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="text-left lg:text-right">
                    <p className="font-display text-[clamp(5rem,11vw,10.5rem)] font-extrabold leading-[0.8] tracking-tightest">{FIG[mode].value}</p>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft lg:ml-auto lg:max-w-[22ch]">{FIG[mode].caption}</p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <AnimatePresence mode="wait">
                {/* ------------------------------------------------ DESIGN */}
                {mode === "design" && (
                  <motion.div key="design" className="contents">
                    <motion.div {...enter} transition={stagger(0)} className="relative z-10 w-[72%] max-w-[340px] self-end lg:max-w-none lg:absolute lg:left-[36%] lg:top-[40%] lg:h-[50%] lg:w-[21%]">
                      <Crop src={telia.shots[0]?.src} alt={telia.shots[0]?.alt ?? "Filter improvements"} fallback={<FilterRedraw />} position="center top" className="aspect-[3/4] lg:aspect-auto" />
                      <p className="mt-2 font-mono text-[11px] text-ink-soft">Filter improvements</p>
                    </motion.div>

                    <motion.div {...enter} transition={stagger(1)} className="relative z-10 w-full max-w-[360px] lg:absolute lg:left-[62%] lg:top-0 lg:w-[24%]">
                      <StatesFragment />
                    </motion.div>

                    <ol className="grid gap-6 lg:absolute lg:left-[62%] lg:top-[50%] lg:w-[19%] lg:gap-5">
                      {[
                        ["Find the customer first", "Customer search was redesigned to be clear and fast."],
                        ["Validate before submit", "Forms explain what's wrong and what to do next."],
                        ["Confirm what can't be undone", "Important actions ask before they happen."],
                      ].map(([t, d], i) => (
                        <motion.li key={t} {...enter} transition={stagger(2 + i)} className="border-t border-ink pt-3">
                          <p className="font-display text-base font-bold leading-tight"><span className="mr-2 font-mono text-xs font-normal text-pink-deep">0{i + 1}</span>{t}</p>
                          <p className="mt-1 text-sm leading-snug text-ink-soft">{d}</p>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                )}

                {/* ------------------------------------------------ DEVELOP */}
                {mode === "develop" && (
                  <motion.div key="develop" className="contents">
                    <motion.div {...enter} transition={stagger(0)} className="min-w-0 lg:absolute lg:left-0 lg:top-0 lg:w-[50%]">
                      <p className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">availability.js – simplified illustration</p>
                      <pre tabIndex={0} className="overflow-x-auto font-mono text-[12.5px] leading-[2] text-ink sm:text-[14px] lg:text-[12px] xl:text-[14px]" aria-label="Simplified illustration of the availability logic">
                        {CODE.map((line, i) => {
                          const n = i + 1;
                          const lit = n >= activeNote.lines[0] && n <= activeNote.lines[1];
                          return (
                            <div key={i} className="relative flex">
                              {lit && <motion.span layoutId="code-hl" className="absolute inset-y-0 -left-2 right-0 bg-blush" transition={{ duration: 0.45, ease }} aria-hidden />}
                              <span className={clsx("relative mr-6 w-5 select-none text-right tabular-nums", lit ? "text-pink-deep" : "text-ink/60")}>{n}</span>
                              <code className="relative whitespace-pre">
                                {line.map(([t, c], j) => <span key={j} className={c ? tokCls[c] : undefined}>{t}</span>)}
                              </code>
                            </div>
                          );
                        })}
                      </pre>
                    </motion.div>

                    <ol className="grid gap-0 sm:grid-cols-3 sm:gap-6 lg:absolute lg:left-0 lg:top-[72%] lg:w-[50%]" aria-label="Implementation notes – select one to highlight its code">
                      {NOTES.map((nt, i) => {
                        const on = note === nt.id;
                        return (
                          <motion.li key={nt.id} {...enter} transition={stagger(1 + i)}>
                            <button type="button" onClick={() => setNote(nt.id)} onMouseEnter={() => setNote(nt.id)} onFocus={() => setNote(nt.id)} aria-pressed={on} className={clsx("block w-full border-t-2 py-3 text-left transition-colors", on ? "border-pink-deep" : "border-ink/20 hover:border-ink")}>
                              <span className={clsx("block font-mono text-xs tabular-nums", on ? "text-pink-deep" : "text-ink/60")}>L{nt.lines[0]}–{nt.lines[1]}</span>
                              <span className={clsx("mt-1 block font-display text-base font-bold leading-tight", on ? "text-ink" : "text-ink/60")}>{nt.title}</span>
                              <span className="mt-1 block text-sm leading-snug text-ink-soft">{nt.text}</span>
                            </button>
                          </motion.li>
                        );
                      })}
                    </ol>

                    <motion.div {...fade} transition={stagger(2)} className="relative z-10 w-full max-w-[340px] lg:absolute lg:left-[55%] lg:top-[44%] lg:w-[25%]">
                      <StockFragment />
                    </motion.div>

                    <motion.p {...fade} transition={stagger(3)} className="font-mono text-xs leading-relaxed text-ink-soft lg:absolute lg:left-[57%] lg:top-[66%] lg:w-[18%]">
                      HTML · SCSS · JavaScript · Go Templates · REST APIs · Adyen · Montonio
                    </motion.p>
                  </motion.div>
                )}

                {/* ------------------------------------------------ CONNECT */}
                {mode === "connect" && (
                  <motion.div key="connect" className="contents">
                    {/* architectural zones */}
                    {ZONES.map((z, i) => (
                      <motion.div key={z.label} {...fade} transition={stagger(i)} aria-hidden className="hidden lg:absolute lg:top-[28%] lg:block" style={{ left: `${z.from}%`, width: `${z.to - z.from}%` }}>
                        <span className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">{z.label}</span>
                        <span className="mt-2 block h-2.5 border-x border-t border-ink/40" />
                      </motion.div>
                    ))}

                    <ol className="relative grid gap-0 border-l border-ink pl-5 lg:static lg:border-0 lg:pl-0" aria-label="Request path – select a layer">
                      {NODES.map((n, i) => {
                        const on = node === n.id;
                        const last = i === NODES.length - 1;
                        return (
                          <motion.li key={n.id} {...fade} transition={stagger(i)} className="lg:absolute lg:top-[50%] lg:h-0 lg:w-0" style={{ left: `${n.x}%` }}>
                            <button
                              type="button"
                              onClick={() => setNode(n.id)}
                              onMouseEnter={() => setNode(n.id)}
                              onFocus={() => setNode(n.id)}
                              aria-pressed={on}
                              className={clsx(
                                "group relative block py-3 text-left",
                                "lg:absolute lg:-top-12 lg:flex lg:h-24 lg:w-[12rem] lg:flex-col lg:justify-between lg:py-0",
                                last ? "lg:-right-[6px] lg:items-end lg:pr-5 lg:text-right" : "lg:-left-[6px] lg:pl-5",
                              )}
                            >
                              <span className={clsx("absolute -left-[25px] top-[18px] block h-[11px] w-[11px] rounded-full border border-ink transition-colors lg:top-1/2 lg:-translate-y-1/2", last ? "lg:left-auto lg:right-[0.5px]" : "lg:left-[0.5px]", on ? "bg-bubblegum" : "bg-paper")} aria-hidden />
                              <span className={clsx("block whitespace-nowrap font-display text-[clamp(1rem,1.5vw,1.6rem)] font-bold leading-none transition-colors", on ? "text-ink" : "text-ink/60 group-hover:text-ink")}>{n.label}</span>
                              <span className="mt-1 block whitespace-nowrap font-mono text-xs text-ink-soft lg:mt-0">{n.tech}</span>
                            </button>
                          </motion.li>
                        );
                      })}
                    </ol>

                    {!reduce && (
                      <motion.span aria-hidden className="hidden h-[6px] w-[6px] rounded-full bg-pink-deep lg:absolute lg:top-[50%] lg:block" style={{ marginTop: -2.5 }} initial={{ left: "3%" }} animate={{ left: ["3%", "95%", "3%"] }} transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }} />
                    )}

                    {/* selected layer */}
                    <div className="lg:absolute lg:left-0 lg:top-[66%] lg:w-[44%]" aria-live="polite">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={activeNode.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                          <p className="font-mono text-xs uppercase tracking-[0.12em] text-pink-deep">{String(NODES.indexOf(activeNode) + 1).padStart(2, "0")} / {activeNode.label}</p>
                          <p className="mt-2 max-w-[40ch] font-display text-[clamp(1.25rem,1.9vw,1.75rem)] font-semibold leading-[1.15] tracking-tight">{activeNode.detail}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* my part */}
                    <motion.div {...fade} transition={stagger(5)} className="border-t border-ink pt-4 lg:absolute lg:left-[50%] lg:top-[66%] lg:w-[26%]">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">My part · team of three</p>
                      <p className="mt-2 text-[15px] leading-snug">Backend REST APIs with Java and Spring Boot, ADMIN/DRIVER roles, CRUD for jobs, drivers and customers, and connecting the Vue frontend to the endpoints.</p>
                      <p className="mt-3 font-mono text-xs text-ink-soft">Swagger / OpenAPI · Docker · Git</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>
      </MotionConfig>
    </section>
  );
}
