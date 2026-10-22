import Starburst from "./Starburst";

const WORDS = ["Full-stack", "UX research", "AI engineering", "Spring Boot", "React & Next.js", "LLM evaluation", "PostgreSQL", "Figma", "Claude API", "n8n"];

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {WORDS.map((w, i) => (
        <li key={w + hidden} className="flex items-center gap-8 whitespace-nowrap">
          <span className={i % 3 === 2 ? "serif-accent text-3xl text-bubblegum md:text-4xl" : "font-display text-2xl font-bold uppercase tracking-tight md:text-3xl"}>{w}</span>
          <Starburst className="h-4 w-4 text-lavender" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group relative overflow-hidden bg-ink py-5 text-paper" role="region" aria-label="Disciplines">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
