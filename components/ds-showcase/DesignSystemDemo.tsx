"use client";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import StatusPill from "@/components/StatusPill";
import { useHref } from "@/lib/paths";
import { brands } from "@/lib/design-system/tokens";
import { componentNames } from "@/lib/design-system/contracts";
import { BrandSwitcher } from "./controls";
import Playground from "./Playground";
import Composer from "./Composer";
import TokenExplorer from "./TokenExplorer";
import DesignToCode from "./DesignToCode";
import MultibrandCompare from "./MultibrandCompare";
import ComponentDocs from "./ComponentDocs";

const SECTIONS = [
  { id: "playground", n: "01", title: "Playground", lead: "Every component with its variants, sizes and states. Preview hover and focus without a mouse, and change the preview width.", node: <Playground /> },
  { id: "composer", n: "02", title: "AI-ready composer", lead: "A request, the context a model would receive, the structured output, validation against the contracts and the rendered result.", node: <Composer /> },
  { id: "tokens", n: "03", title: "Tokens", lead: "Primitive → semantic → component. Follow a token through each brand, then change one and watch every dependent component update.", node: <><TokenExplorer /><div className="mt-6"><DesignToCode /></div></> },
  { id: "multibrand", n: "04", title: "Multibrand", lead: "One component tree, three fictional brands.", node: <MultibrandCompare /> },
  { id: "docs", n: "05", title: "Documentation", lead: "Rendered from the component contracts – the same data published for AI tools – with a live contrast report for the selected brand.", node: <ComponentDocs /> },
];

export default function DesignSystemDemo() {
  const href = useHref();
  return (
    <article>
      <header className="relative overflow-hidden pb-10 pt-28 md:pt-40">
        <div className="absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(206,209,248,.9),rgba(255,214,238,.5)_50%,transparent_70%)] blur-2xl" aria-hidden />
        <div className="frame">
          <a href={href("/work/ai-ready-design-system/")} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Read the case study
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusPill status={{ label: "Interactive prototype", tone: "proto" }} />
            <span className="eyebrow text-ink-soft">Independent concept · Fictional brands</span>
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7vw,6.2rem)] font-extrabold leading-[0.92] tracking-tightest">
            AI-Ready Multibrand <span className="serif-accent font-normal text-lav-deep">Design System</span>
          </h1>
          <p className="mt-8 max-w-[60ch] text-xl leading-relaxed text-ink-soft">
            A working component library with semantic tokens, {brands.length} brands and machine-readable contracts. Everything on this page is live – switch the brand anywhere and every example follows.
          </p>
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
            <div><dt className="eyebrow text-ink-soft">Components</dt><dd className="mt-1 font-display text-3xl font-bold">{componentNames.length}</dd></div>
            <div><dt className="eyebrow text-ink-soft">Brands</dt><dd className="mt-1 font-display text-3xl font-bold">{brands.length}</dd></div>
            <div>
              <dt className="eyebrow text-ink-soft">Machine-readable</dt>
              <dd className="mt-2 flex flex-wrap gap-2 font-mono text-sm">
                <a className="inline-flex items-center gap-1 rounded-full bg-peri/60 px-3 py-1 hover:bg-peri" href={href("/design-system/contracts.json")}>contracts.json <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
                <a className="inline-flex items-center gap-1 rounded-full bg-peri/60 px-3 py-1 hover:bg-peri" href={href("/design-system/tokens.json")}>tokens.json <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="sticky top-16 z-30 border-y border-ink/10 bg-paper/90 backdrop-blur md:top-20">
        <div className="frame flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Demo sections" className="no-scrollbar -mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="shrink-0 rounded-full border border-ink/15 px-3.5 py-1.5 font-mono text-xs hover:bg-blush">{s.n} {s.title}</a>
            ))}
          </nav>
          <BrandSwitcher size="sm" hideLegend compact className="shrink-0" />
        </div>
      </div>

      <div className="frame pb-24">
        {SECTIONS.map((s) => (
          <Reveal as="section" key={s.id} className="scroll-mt-44 border-b border-ink/10 py-14 md:py-20">
            <div id={s.id} className="scroll-mt-44" />
            <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <p className="font-mono text-xs text-pink-deep">{s.n}</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{s.title}</h2>
              </div>
              <p className="max-w-[60ch] text-lg leading-relaxed text-ink-soft md:col-span-8 md:pt-6">{s.lead}</p>
            </div>
            {s.node}
          </Reveal>
        ))}
        <p className="mt-12 max-w-[70ch] text-sm text-ink-soft">
          Aster Academy, Kord Energy and Mira Market are fictional brands created for this prototype. The composer is deterministic and does not call an AI model. No Figma library has been created yet.
        </p>
      </div>
    </article>
  );
}
