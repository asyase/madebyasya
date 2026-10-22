"use client";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function Magnetic({ children, strength = 0.35, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }} className={className ?? "inline-block"}>
      {children}
    </motion.div>
  );
}
