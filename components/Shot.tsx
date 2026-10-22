"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import clsx from "clsx";
import Starburst from "./Starburst";
import { useHref } from "@/lib/paths";

type Props = {
  src?: string;
  alt: string;
  label?: string;
  meta?: string;
  accent?: "pink" | "lavender" | "rose" | "peri";
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  /** Card style: the screen sits inside the pastel card, muted and tinted, with small stars around it. */
  framed?: boolean;
  seed?: string;
};

// Small deterministic PRNG so each card gets its own, stable star layout.
function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const tints = {
  pink: "bg-bubblegum",
  lavender: "bg-lavender",
  rose: "bg-bubblegum/70",
  peri: "bg-lavender",
};

function Sprinkles({ seed, accent }: { seed: string; accent: keyof typeof accents }) {
  const r = rng(seed);
  const colors = accent === "pink" || accent === "rose" ? ["text-bubblegum", "text-pink-deep/50", "text-paper", "text-lavender"] : ["text-lavender", "text-lav-deep/45", "text-paper", "text-bubblegum"];
  // Stars live in the free band above the screen and in the side margins.
  const spots = Array.from({ length: 7 }, (_, i) => {
    const top = i < 4;
    const x = top ? 4 + r() * 92 : i % 2 ? 1.5 + r() * 5 : 93.5 - r() * 5 + 0;
    const y = top ? 3 + r() * 10 : 22 + r() * 60;
    const size = 7 + r() * (i === 0 ? 14 : 9);
    return { x, y, size, rot: r() * 40 - 20, color: colors[Math.floor(r() * colors.length)], delay: r() * 4 };
  });
  return (
    <>
      {spots.map((s, i) => (
        <span key={i} className="absolute block" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, transform: `rotate(${s.rot}deg)` }}>
          <span className="block h-full w-full animate-twinkle" style={{ animationDelay: `${s.delay}s` }}>
            <Starburst points={4} className={clsx("h-full w-full", s.color)} />
          </span>
        </span>
      ))}
    </>
  );
}

const accents = {
  pink: { bg: "from-blush via-ivory to-bubblegum/80", star: "text-bubblegum", orb: "bg-bubblegum/50" },
  lavender: { bg: "from-peri via-ivory to-lavender/80", star: "text-lavender", orb: "bg-lavender/50" },
  rose: { bg: "from-rose via-ivory to-blush", star: "text-bubblegum/80", orb: "bg-rose" },
  peri: { bg: "from-ivory via-peri to-lavender/70", star: "text-paper", orb: "bg-paper/60" },
};

/**
 * Screenshot with a designed poster fallback, shown when the image is missing
 * or can't be loaded (e.g. offline, or a host that blocks external images).
 */
export default function Shot({ src: rawSrc, alt, label, meta, accent = "lavender", className, imgClassName, eager, framed, seed }: Props) {
  const href = useHref();
  const src = rawSrc && rawSrc.startsWith("/") ? href(rawSrc) : rawSrc;
  const [failed, setFailed] = useState(!src);
  const a = accents[accent];
  return (
    <div className={clsx("relative overflow-hidden bg-gradient-to-br", a.bg, className)}>
      {framed && !failed && src ? (
        <>
          <div className="tech-grid absolute inset-0 opacity-70" aria-hidden />
          <div aria-hidden><Sprinkles seed={seed ?? alt} accent={accent} /></div>
          <div className="absolute inset-x-[9%] bottom-[-6%] top-[17%] -rotate-[1.2deg] overflow-hidden rounded-t-[14px] bg-paper shadow-[0_24px_50px_-24px_rgba(48,42,75,.45)] ring-1 ring-ink/5 transition-transform duration-700 group-hover:rotate-0">
            <img
              src={src}
              alt={alt}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              onError={() => setFailed(true)}
              className="h-full w-full object-cover object-left-top contrast-[.92] saturate-[.35] transition-[filter] duration-700 group-hover:saturate-100 group-hover:contrast-100"
            />
            <div className={clsx("pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-0", tints[accent])} aria-hidden />
          </div>
        </>
      ) : !failed && src ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={clsx("h-full w-full object-cover object-top", imgClassName)}
        />
      ) : (
        <div className="absolute inset-0 [container-type:size]" role="img" aria-label={alt}>
          <div className="tech-grid absolute inset-0 opacity-80" aria-hidden />
          <div className={clsx("absolute -bottom-[30cqh] -right-[12cqw] h-[80cqh] w-[80cqh] rounded-full blur-2xl", a.orb)} aria-hidden />
          <Starburst className={clsx("absolute right-[7cqw] top-[10cqh] h-[22cqh] w-[22cqh]", a.star)} />
          <div className="absolute inset-x-[6cqw] bottom-[9cqh]">
            {meta && <p className="mb-[2cqh] font-mono text-[clamp(9px,2.2cqw,12px)] uppercase tracking-[0.14em] text-ink-soft">{meta}</p>}
            <p className="max-w-[85%] font-display text-[clamp(1.1rem,7cqw,4.2rem)] font-extrabold leading-[0.95] tracking-tight text-ink">
              {label ?? alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
