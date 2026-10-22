"use client";
/* eslint-disable @next/next/no-img-element */
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import Starburst from "./Starburst";
import { site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

const ORBIT = ["React", "Java 21", "Spring Boot", "Figma", "PostgreSQL", "Claude API", "Next.js", "n8n"];

const ease = [0.2, 0.75, 0.2, 1] as const;

// Entrance animations are CSS-driven so the hero paints before JavaScript loads.
function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={"block overflow-hidden pb-[0.06em] " + (className ?? "")}>
      <span className="hero-rise block" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  const href = useHref();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const orbX = useTransform(sx, (v) => v * -28);
  const orbY = useTransform(sy, (v) => v * -22);
  const picX = useTransform(sx, (v) => v * 8);
  const picY = useTransform(sy, (v) => v * 6);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section onPointerMove={onMove} className="grain relative isolate overflow-hidden pb-16 pt-20 md:pb-20 md:pt-28 lg:pt-24" aria-labelledby="hero-title">
      {/* atmosphere */}
      <div className="tech-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_70%_40%,#000_10%,transparent_70%)]" aria-hidden />
      <div className="absolute -right-[10%] -top-[20%] -z-20 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] rounded-full bg-[radial-gradient(circle,rgba(255,214,238,.9),rgba(206,209,248,.55)_45%,transparent_70%)] blur-2xl" aria-hidden />

      {/* vertical metadata */}
      <p className="eyebrow absolute left-3 top-1/2 hidden origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap text-ink-soft xl:block" aria-hidden>
        {site.coords} – {site.location}
      </p>
      <p className="eyebrow absolute right-3 top-1/2 hidden origin-right -translate-y-1/2 rotate-90 whitespace-nowrap text-ink-soft xl:block" aria-hidden>
        Portfolio · 2026 edition · Design × Build × AI
      </p>

      <div className="frame relative">
        <div className="grid items-end gap-y-6 lg:grid-cols-12">
          {/* Headline */}
          <div className="relative z-10 lg:col-span-7">
            <div className="hero-fade mb-4 md:mb-5" style={{ animationDelay: "0.1s" }}>
              <p className="font-display text-[1.35rem] font-bold leading-tight tracking-tight md:text-2xl">{site.name}</p>
              <p className="eyebrow mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-soft">
                <span className="inline-block h-2 w-2 rounded-full bg-bubblegum" aria-hidden />
                Full-stack developer <span className="text-lavender" aria-hidden>·</span> AI developer <span className="text-lavender" aria-hidden>·</span> UX/UI designer
                <span className="text-lavender" aria-hidden>/</span> <span className="whitespace-nowrap">{site.location}</span>
              </p>
            </div>
            <h1 id="hero-title" className="font-display text-[clamp(3rem,13.4vw,3.6rem)] font-extrabold leading-[0.84] tracking-tightest sm:text-[clamp(3.6rem,11.2vw,11rem)] lg:text-[clamp(3.6rem,min(9.4vw,15.5svh),11rem)] xl:text-[clamp(3.6rem,min(11.2vw,15.5svh),11rem)]">
              <Line delay={0.15}>Creative</Line>
              <Line delay={0.25} className="pl-[14%]">
                <span className="serif-accent font-normal text-pink-deep">mind.</span>
              </Line>
              <Line delay={0.35}>
                <span className="text-outline">Developer</span>
              </Line>
              <Line delay={0.45} className="pl-[30%]">
                <span className="relative">
                  logic.
                  <Starburst className="absolute -right-[0.55em] -top-[0.05em] h-[0.42em] w-[0.42em] text-bubblegum" spin />
                </span>
              </Line>
            </h1>

            {/* CTAs – kept inside the first viewport */}
            <div className="hero-fade mt-7 flex flex-wrap items-center gap-3 md:mt-9" style={{ animationDelay: "0.55s" }}>
              <Magnetic>
                <a href={href("/work/")} data-cursor="All work" className="group inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-base font-semibold text-paper shadow-[0_18px_40px_-18px_rgba(23,20,29,.7)] md:py-3.5 md:pl-7">
                  Explore my work
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-bubblegum text-ink transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </a>
              </Magnetic>
              <a href={href(site.cv)} target="_blank" rel="noreferrer" data-cursor="PDF" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-base font-semibold transition-colors hover:border-ink hover:bg-blush/60 md:py-4">
                View resume <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Portrait */}
          <div className="relative mx-auto w-[min(82vw,420px)] lg:col-span-5 lg:-ml-[12%] lg:w-full lg:max-w-[min(520px,calc((100svh-150px)*0.706))] lg:justify-self-end">
            <div className="relative aspect-[770/1091]">
              {/* orbit ring */}
              <div className="pointer-events-none absolute left-1/2 top-[34%] aspect-square w-[78%] sm:w-[118%] lg:w-[94%] xl:w-[104%] min-[1360px]:w-[118%] -translate-x-1/2 -translate-y-1/2 [container-type:inline-size]" aria-hidden>
                <div className="absolute inset-0 rounded-full border border-dashed border-lav-deep/30" />
                <div className="absolute inset-0 animate-orbit">
                  {ORBIT.map((t, i) => {
                    const a = (360 / ORBIT.length) * i;
                    return (
                      <div key={t} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${a}deg) translateY(-50cqw)` }}>
                        <div style={{ transform: `rotate(${-a}deg)` }}>
                          <span className="absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2">
                            <span className="block animate-counter whitespace-nowrap rounded-full border border-ink/10 bg-paper/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink shadow-sm backdrop-blur sm:text-[11px]">
                            {t}
                          </span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* glass orb */}
              <motion.div style={{ x: orbX, y: orbY }} className="absolute -left-[16%] top-[4%] -z-10 aspect-square w-[46%] animate-float" aria-hidden>
                <div className="h-full w-full rounded-full shadow-[inset_-18px_-24px_50px_rgba(85,90,166,.45),inset_14px_16px_40px_rgba(255,255,255,.9),0_40px_80px_-30px_rgba(85,90,166,.6)] [background:radial-gradient(circle_at_32%_26%,#fff_0%,rgba(255,255,255,.75)_7%,transparent_20%),radial-gradient(circle_at_72%_78%,rgba(255,165,214,.95),transparent_52%),radial-gradient(circle_at_50%_45%,#e4e6ff_0%,#ced1f8_40%,#a7abde_85%)]" />
              </motion.div>

              <motion.img
                style={{ x: picX, y: picY }}
                src={href("/images/portrait-hero.webp")}
                srcSet={`${href("/images/portrait-hero-480.webp")} 480w, ${href("/images/portrait-hero-600.webp")} 600w, ${href("/images/portrait-hero.webp")} 770w`}
                sizes="(min-width: 1024px) 40vw, 70vw"
                alt="Portrait of Anastasija Selevjorstova in a pink sweater, smiling"
                width={770}
                height={1091}
                fetchPriority="high"
                className="hero-portrait relative h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(48,42,75,.18)]"
              />
              <Starburst className="absolute right-[6%] top-[12%] h-6 w-6 text-lav-deep" spin />
              <Starburst className="absolute bottom-[28%] left-[2%] h-4 w-4 text-pink-deep [animation-delay:1.2s]" spin />

              {/* caption tag */}
              <div className="absolute bottom-[10%] right-0 rotate-[4deg] rounded-xl bg-ink px-3 py-2 text-paper shadow-xl sm:right-[-4%]">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-lavender">Now</p>
                <p className="text-sm font-semibold leading-tight">Full-stack developer</p>
              </div>
            </div>
          </div>
        </div>

        <a href={href("/#work")} className="mx-auto mt-10 hidden w-fit flex-col items-center gap-2 text-ink-soft md:flex" aria-label="Scroll to the next section">
          <span className="flex h-11 w-7 justify-center rounded-full border border-ink/25 pt-2">
            <span className="h-2 w-1 animate-scrolldot rounded-full bg-ink" />
          </span>
          <span className="eyebrow flex items-center gap-1">Scroll <ArrowDown className="h-3 w-3" aria-hidden /></span>
        </a>
      </div>
    </section>
  );
}
