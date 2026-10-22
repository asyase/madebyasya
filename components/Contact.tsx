"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Download, TerminalSquare } from "lucide-react";
import Starburst from "./Starburst";
import Magnetic from "./Magnetic";
import { openTerminal } from "./Terminal";
import { site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

function TallinnClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Tallinn" }).format(new Date());
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 20_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now ?? "--:--"}</span>;
}

const BURST = Array.from({ length: 12 }, (_, i) => i);

export default function Contact() {
  const href = useHref();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(0);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      const r = document.createRange();
      const el = document.getElementById("contact-email");
      if (el) { r.selectNodeContents(el); window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(r); }
    }
    setCopied(Date.now());
  }
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(0), 2200);
    return () => clearTimeout(id);
  }, [copied]);

  const links = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    { label: "AI portfolio", href: site.aiPortfolio },
  ];

  return (
    <footer id="contact" className="relative scroll-mt-16 overflow-hidden bg-gradient-to-br from-blush via-ivory to-peri" aria-labelledby="contact-title">
      <div className="tech-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" aria-hidden />
      <div className="frame relative pb-10 pt-24 md:pt-36">
        <p className="eyebrow text-pink-deep">Contact</p>
        <h2 id="contact-title" className="mt-4 font-display text-[clamp(3.2rem,11vw,11rem)] font-extrabold leading-[0.84] tracking-tightest">
          Have an idea?
          <br />
          <span className="serif-accent font-normal text-lav-deep">Let&apos;s</span> make it real.
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[46ch] text-lg text-ink-soft lg:col-span-5">
            <span className="block font-semibold text-ink">Good ideas deserve more than a mockup.</span>
            <span className="mt-2 block">I bring together design, full-stack development and AI to turn ideas into thoughtful, functional digital products.</span>
            <span className="mt-2 block">Open to full-time opportunities and collaborations – remote or hybrid.</span>
          </p>

          <div className="lg:col-span-7">
            <p className="eyebrow mb-3 text-ink-soft">Write to me</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} id="contact-email" className="break-all font-display text-[clamp(1.4rem,3.6vw,3rem)] font-bold leading-none tracking-tight underline decoration-bubblegum decoration-4 underline-offset-8 hover:decoration-pink-deep">
                {site.email}
              </a>
              <div className="relative">
                <Magnetic>
                  <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper" data-cursor="Copy">
                    {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                    {copied ? "Copied!" : "Copy email"}
                  </button>
                </Magnetic>
                <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
                <AnimatePresence>
                  {copied && !reduce && (
                    <motion.div key={copied} className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden>
                      {BURST.map((i) => {
                        const a = (Math.PI * 2 * i) / BURST.length;
                        return (
                          <motion.span
                            key={i}
                            className="absolute -ml-2 -mt-2 block h-4 w-4"
                            initial={{ x: 0, y: 0, scale: 0.2, opacity: 1, rotate: 0 }}
                            animate={{ x: Math.cos(a) * 90, y: Math.sin(a) * 70, scale: 1, opacity: 0, rotate: 140 }}
                            transition={{ duration: 0.9, ease: [0.1, 0.8, 0.3, 1] }}
                          >
                            <Starburst className={i % 3 === 0 ? "h-4 w-4 text-pink-deep" : i % 3 === 1 ? "h-4 w-4 text-lav-deep" : "h-4 w-4 text-bubblegum"} />
                          </motion.span>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-4 py-2.5 text-sm font-semibold backdrop-blur hover:border-ink hover:bg-paper">
                    {l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </li>
              ))}
              <li>
                <a href={href(site.cv)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-4 py-2.5 text-sm font-semibold backdrop-blur hover:border-ink hover:bg-paper">
                  Resume <Download className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* oversized wordmark */}
        <div className="relative mt-24 select-none" aria-hidden>
          <p className="whitespace-nowrap font-display text-[19vw] font-extrabold leading-[0.8] tracking-tightest text-gradient lg:text-[17.5vw] 2xl:text-[15rem]">
            Anastasija
          </p>
          <Starburst className="absolute right-[2%] top-0 h-[6vw] max-h-24 w-[6vw] max-w-24 text-pink-deep" spin />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-6 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {site.name} · {site.location}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={openTerminal} className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-2 font-mono text-xs hover:bg-ink hover:text-paper">
              <TerminalSquare className="h-4 w-4" aria-hidden /> Open terminal <kbd className="rounded bg-paper px-1.5 text-ink">`</kbd>
            </button>
            <a href="#main" className="inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-2 font-mono text-xs hover:bg-ink hover:text-paper">
              <ArrowUp className="h-4 w-4" aria-hidden /> Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
