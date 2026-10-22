"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import Shot from "./Shot";
import type { Project } from "@/lib/content/projects";

export default function Gallery({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shots = project.shots;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setOpen((o) => (o! + 1) % shots.length);
      if (e.key === "ArrowLeft") setOpen((o) => (o! - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shots.length]);

  if (!shots.length) return null;
  return (
    <>
      <ul className="grid gap-5 md:grid-cols-2">
        {shots.map((s, i) => (
          <li key={s.src} className={shots.length % 2 === 1 && i === 0 ? "md:col-span-2" : ""}>
            <figure>
              <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden rounded-[20px] ring-1 ring-ink/10" data-cursor="Enlarge" aria-label={`Enlarge: ${s.alt}`}>
                <Shot src={s.src} alt={s.alt} label={s.caption ?? s.alt} meta={project.title.split(" – ")[0]} accent={project.accent} className="aspect-[16/10] transition-transform duration-700 group-hover:scale-[1.02]" />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-paper/90 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden>
                  <Maximize2 className="h-4 w-4" />
                </span>
              </button>
              {s.caption && <figcaption className="mt-2 font-mono text-xs text-ink-soft">{String(i + 1).padStart(2, "0")} – {s.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} onClose={() => setOpen(null)} onClick={(e) => e.target === dialog.current && setOpen(null)} className="m-auto max-h-[92vh] w-[min(1200px,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm" aria-label="Screenshot viewer">
        {open !== null && (
          <div className="relative">
            <Shot src={shots[open].src} alt={shots[open].alt} label={shots[open].caption} accent={project.accent} className="min-h-[50vh] max-h-[80vh] rounded-2xl" imgClassName="!h-auto max-h-[80vh] object-contain" eager />
            <div className="mt-3 flex items-center justify-between gap-4 text-paper">
              <p className="font-mono text-xs">{open + 1} / {shots.length} – {shots[open].caption ?? shots[open].alt}</p>
              <div className="flex gap-2">
                {shots.length > 1 && (
                  <>
                    <button type="button" onClick={() => setOpen((open - 1 + shots.length) % shots.length)} className="grid h-10 w-10 place-items-center rounded-full bg-paper/15 hover:bg-paper/30" aria-label="Previous screenshot"><ChevronLeft className="h-5 w-5" /></button>
                    <button type="button" onClick={() => setOpen((open + 1) % shots.length)} className="grid h-10 w-10 place-items-center rounded-full bg-paper/15 hover:bg-paper/30" aria-label="Next screenshot"><ChevronRight className="h-5 w-5" /></button>
                  </>
                )}
                <button type="button" onClick={() => setOpen(null)} className="grid h-10 w-10 place-items-center rounded-full bg-paper text-ink" aria-label="Close viewer" autoFocus><X className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
