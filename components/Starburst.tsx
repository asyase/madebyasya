import clsx from "clsx";

export default function Starburst({ className, points = 8, spin = false }: { className?: string; points?: number; spin?: boolean }) {
  const d: string[] = [];
  const n = points * 2;
  for (let i = 0; i < n; i++) {
    const r = i % 2 === 0 ? 50 : 14;
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    d.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={clsx(spin && "animate-twinkle", className)}>
      <polygon points={d.join(" ")} fill="currentColor" />
    </svg>
  );
}
