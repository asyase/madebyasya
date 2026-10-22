"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Desktop-only cursor: a dot plus a ring that grows into a label over [data-cursor] elements. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor], a, button, [role=tab], input, label") as HTMLElement | null;
      setActive(!!t);
      setLabel(t?.dataset.cursor ?? null);
    };
    const leave = () => { x.set(-100); y.set(-100); };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 84 : active ? 44 : 28;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" style={{ x, y }} />
      <motion.div
        className="absolute left-0 top-0 grid place-items-center rounded-full border border-ink/40 font-mono text-[10px] uppercase tracking-[0.08em] text-ink"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, backgroundColor: label ? "rgba(255,165,214,0.92)" : "rgba(255,165,214,0)", borderColor: label ? "rgba(23,20,29,0)" : "rgba(23,20,29,0.35)" }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        {label && <span className="px-2 text-center leading-tight">{label}</span>}
      </motion.div>
    </div>
  );
}
