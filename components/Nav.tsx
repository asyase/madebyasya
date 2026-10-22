"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import clsx from "clsx";
import { nav, site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

export default function Nav() {
  const href = useHref();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the menu item for the section in view (home page only).
  useEffect(() => {
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        const best = [...visible.entries()].filter(([, r]) => r > 0).sort((a, b) => ids.indexOf(b[0]) - ids.indexOf(a[0]))[0];
        setCurrent(best ? best[0] : null);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuBtnRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <header
        className={clsx(
          "fixed inset-x-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-500",
          scrolled ? "bg-paper/80 shadow-[0_1px_0_var(--line)] backdrop-blur-xl" : "bg-transparent",
        )}
        style={{ top: "env(safe-area-inset-top, 0px)" }}
      >
        <nav aria-label="Main" className="frame flex h-16 items-center justify-between gap-6 md:h-20">
          <a href={href("/")} className="group -my-1 flex shrink-0 items-center" data-cursor="Home" aria-label="Anastasija Selevjorstova – home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={href("/images/logo-nav.webp")} alt="" width={215} height={160} className="h-12 w-auto transition-transform duration-300 group-hover:-rotate-2 md:h-14" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => {
              const on = current === n.href.split("#")[1];
              return (
              <li key={n.label}>
                <a href={href(n.href)} aria-current={on ? "location" : undefined} className={clsx("relative rounded-full px-3.5 py-2 text-[0.92rem] font-medium transition-colors hover:bg-blush/70 hover:text-ink", on ? "bg-blush/80 text-ink" : "text-ink/80")}>
                  {n.label}
                </a>
              </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={site.aiPortfolio} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.85rem] font-medium text-lav-deep hover:bg-peri/60" data-cursor="Open ↗">
              AI portfolio <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a href={href(site.cv)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.85rem] font-semibold text-paper transition-transform hover:-translate-y-0.5" data-cursor="PDF">
              Resume <Download className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            Menu <Menu className="h-4 w-4" aria-hidden />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-paper"
            style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="frame flex h-16 items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={href("/images/logo-nav-light.webp")} alt="Anastasija Selevjorstova" width={215} height={160} className="h-12 w-auto" />
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-semibold text-ink">
                Close <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <ul className="frame mt-8 flex flex-1 flex-col gap-1">
              {nav.map((n, i) => (
                <motion.li key={n.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <a href={href(n.href)} onClick={() => setOpen(false)} className="group flex items-baseline gap-4 border-b border-paper/10 py-3">
                    <span className="font-mono text-xs text-lavender">0{i + 1}</span>
                    <span className="font-display text-5xl font-bold tracking-tight transition-colors group-hover:text-bubblegum">{n.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="frame flex flex-wrap gap-3 py-8">
              <a href={href(site.cv)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-bubblegum px-5 py-3 font-semibold text-ink">
                Resume <Download className="h-4 w-4" aria-hidden />
              </a>
              <a href={site.aiPortfolio} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-5 py-3 font-semibold">
                AI portfolio <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
