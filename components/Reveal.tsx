"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Fades content up as it scrolls in. Content that is already on screen at load
 * is never hidden, so the first frame is always complete.
 */
export default function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"rest" | "hidden" | "shown">("rest");
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    setState("hidden");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState("shown"); io.disconnect(); }
    }, { rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag
      ref={ref as any}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : undefined }}
      className={clsx(
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]",
        state === "hidden" && "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
