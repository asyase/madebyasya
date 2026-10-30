"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, Check, ChevronDown, Code2, Copy, Figma, Maximize2, Minimize2, X, ZoomIn } from "lucide-react";
import { FIGMA_HREF, PROTOTYPE_HREF, sourceLabel, type Shot, type Source } from "@/lib/content/drafts/prompt-to-product";
import { useHref } from "@/lib/paths";

/**
 * A screenshot that opens full size in a dialog. `thumb` shows the whole image (no cropping)
 * inside a fixed 4:3 frame so galleries stay tidy; the caption is rendered once, below the image.
 */
export function EvidenceImage({ shot, className, thumb, hideCaption, tall }: { shot: Shot; className?: string; thumb?: boolean; hideCaption?: boolean; tall?: boolean }) {
  const href = useHref();
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(false);
  const [natural, setNatural] = useState(0);
  const big = useRef<HTMLImageElement>(null);
  const src = href(shot.src);
  // 2× exports (Figma @2x frames, 2× prototype captures) are shown at their design size when zoomed.
  const scale = shot.scale ?? (/@2x|\/07\//.test(shot.src) ? 2 : 1);
  const open = () => {
    setZoom(false);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  return (
    <figure className={clsx("min-w-0 overflow-hidden rounded-[20px] bg-paper ring-1 ring-ink/10", className)}>
      <button type="button" onClick={open} className="group relative block w-full cursor-zoom-in text-left" aria-haspopup="dialog" aria-label={`View full size: ${shot.alt}`} data-cursor="Enlarge">
        {thumb ? (
          <span className="flex aspect-[4/3] items-center justify-center bg-ivory p-2">
            <img src={src} alt={shot.alt} className="max-h-full max-w-full object-contain" loading="lazy" />
          </span>
        ) : tall ? (
          <span className="relative block max-h-[480px] overflow-hidden bg-ivory md:max-h-[640px]">
            <img src={src} alt={shot.alt} className="block h-auto w-full" loading="lazy" />
            <span className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-paper to-transparent pb-3 text-xs font-semibold" aria-hidden>Open full size</span>
          </span>
        ) : (
          <img src={src} alt={shot.alt} className="block h-auto w-full" loading="lazy" />
        )}
        <span className={clsx("absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ink ring-1 ring-ink/10 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100", thumb ? "opacity-100" : "opacity-100 md:opacity-0")} aria-hidden>
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>
      {!hideCaption && (
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-ink/10 px-4 py-2 text-sm text-ink-soft">
          <span>{shot.caption}</span>
          {!thumb && <SourceTag source={shot.source} />}
        </figcaption>
      )}
      <dialog
        ref={dialog}
        onClick={(ev) => ev.target === dialog.current && close()}
        aria-label={shot.caption}
        className={clsx("m-auto max-h-[94vh] max-w-[96vw] overflow-auto rounded-2xl bg-paper p-0 text-ink backdrop:bg-ink/80 backdrop:backdrop-blur-sm", zoom ? "h-[94vh] w-[96vw]" : "w-fit")}
      >
        <div className="sticky left-0 top-0 z-10 flex items-center justify-between gap-3 border-b border-ink/10 bg-paper px-3 py-2 sm:px-4">
          <p className="min-w-0 truncate font-mono text-xs">{shot.caption}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => {
                // Read the size here: onLoad can fire before hydration for cached images.
                if (big.current?.naturalWidth) setNatural(big.current.naturalWidth);
                setZoom(!zoom);
              }}
              aria-pressed={zoom}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-ink/15 px-3 text-sm font-semibold hover:border-ink/40"
            >
              {zoom ? <Minimize2 className="h-4 w-4" aria-hidden /> : <ZoomIn className="h-4 w-4" aria-hidden />}
              {zoom ? "Fit to screen" : "Actual size"}
            </button>
            <button type="button" onClick={close} className="grid h-10 w-10 place-items-center rounded-full hover:bg-blush" aria-label="Close full-size view">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
        <img
          ref={big}
          src={src}
          alt={shot.alt}
          onLoad={(e) => setNatural(e.currentTarget.naturalWidth)}
          style={zoom && natural ? { width: natural / scale, maxWidth: "none" } : undefined}
          className={clsx("mx-auto block h-auto", !zoom && "max-w-full")}
        />
      </dialog>
    </figure>
  );
}

/** Who made a piece of evidence. */
export function SourceTag({ source, className }: { source: Source; className?: string }) {
  return (
    <span className={clsx("inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]", source === "figma-ai" ? "bg-ivory text-ink ring-1 ring-ink/10" : source === "code" ? "border border-dashed border-lav-deep/50 text-lav-deep" : "bg-peri text-ink", className)}>
      {sourceLabel[source]}
    </span>
  );
}

/** The exact prompt as used: collapsed when long, with a copy button. */
export function PromptBlock({ text, id }: { text: string; id: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const long = text.length > 240;
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow text-ink-soft">Exact prompt</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper"><Check className="h-3 w-3" aria-hidden /> As used</span>
      </div>
      <div className="relative mt-2">
        <pre id={id} className={clsx("whitespace-pre-wrap break-words rounded-2xl bg-[#1d1926] p-4 font-mono text-[12px] leading-relaxed text-[#ece9f5]", !open && long && "max-h-[168px] overflow-hidden")}>{text}</pre>
        {!open && long && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 rounded-b-2xl bg-gradient-to-t from-[#1d1926] to-transparent" aria-hidden />}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {long && (
          <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-semibold hover:border-ink/40">
            <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden /> {open ? "Collapse prompt" : "Show full prompt"}
          </button>
        )}
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            } catch { /* clipboard unavailable */ }
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-1.5 text-sm font-semibold hover:border-ink/40"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          <span aria-live="polite">{copied ? "Copied" : "Copy prompt"}</span>
        </button>
      </div>
    </div>
  );
}

/** Expandable detail block used for full tables and technical notes. */
export function More({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <details className={clsx("group rounded-[20px] bg-ivory p-4 sm:p-5", className)}>
      <summary className="flex cursor-pointer list-none items-center gap-2 font-display text-lg font-bold tracking-tight [&::-webkit-details-marker]:hidden">
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden /> {title}
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

/**
 * The two ways to explore the work, kept visibly separate: the coded HTML prototype (primary) and the
 * view-only Figma file (secondary). Both open in a new tab; full width on phones, side by side from 640px.
 */
export function ExploreLinks({ dark, className }: { dark?: boolean; className?: string }) {
  const href = useHref();
  const links = [
    { label: "Try Interactive Prototype", note: "HTML · CSS · JavaScript prototype", href: href(PROTOTYPE_HREF), Icon: Code2, primary: true },
    { label: "View Figma Design", note: "Figma file · view only", href: FIGMA_HREF, Icon: Figma, primary: false },
  ];
  return (
    <ul className={clsx("flex flex-col gap-2 sm:flex-row sm:flex-wrap", className)}>
      {links.map(({ label, note, href: to, Icon, primary }) => (
        <li key={label}>
          <a
            href={to}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              "inline-flex min-h-[52px] w-full items-center gap-3 rounded-full px-5 py-2.5 font-semibold sm:w-fit",
              primary ? (dark ? "bg-bubblegum text-ink hover:bg-paper" : "bg-ink text-paper hover:bg-pink-deep") : dark ? "border border-paper/40 text-paper hover:bg-paper/10" : "border border-ink/20 text-ink hover:border-ink/50",
            )}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden />
            <span className="grid text-left leading-tight">
              {label}
              <span className={clsx("font-mono text-[10px] font-normal uppercase tracking-[0.1em]", primary ? "opacity-70" : dark ? "text-paper/70" : "text-ink-soft")}>{note}</span>
            </span>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
