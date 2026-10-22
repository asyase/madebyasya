"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { projects } from "@/lib/content/projects";
import { skillGroups } from "@/lib/content/skills";
import { site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

type Line = { t: "in" | "out" | "dim" | "link" | "accent"; text: string; href?: string };

const BANNER: Line[] = [
  { t: "accent", text: "asya@tallinn ~ % portfolio --interactive" },
  { t: "dim", text: "Type `help` to see commands. Esc closes." },
];

export function openTerminal() {
  window.dispatchEvent(new Event("open-terminal"));
}

export default function Terminal() {
  const href = useHref();
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = el.closest("input, textarea, [contenteditable=true]");
      if (e.key === "`" && !typing) { e.preventDefault(); show(); }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-terminal", show);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("open-terminal", show); };
  }, [show]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
    else lastFocus.current?.focus?.();
  }, [open]);

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight }); }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    const out: Line[] = [{ t: "in", text: raw }];
    const add = (l: Line | Line[]) => out.push(...(Array.isArray(l) ? l : [l]));
    switch (cmd.split(" ")[0]) {
      case "":
        break;
      case "help":
        add([
          { t: "out", text: "about      who I am, in two lines" },
          { t: "out", text: "skills     the capability map, condensed" },
          { t: "out", text: "projects   selected work with links" },
          { t: "out", text: "contact    how to reach me" },
          { t: "out", text: "cv         open my resume" },
          { t: "out", text: "ai         open my AI portfolio" },
          { t: "out", text: "clear      clear the screen" },
          { t: "out", text: "exit       close the terminal" },
        ]);
        break;
      case "about":
        add([
          { t: "out", text: "Anastasija Selevjorstova – full-stack developer, UX/UI designer, AI & automation." },
          { t: "out", text: "BSc Computer Science (Tallinn University). Developer on the GoERP platform since 2024." },
        ]);
        break;
      case "skills":
        skillGroups.forEach((g) => add({ t: "out", text: `${g.title.padEnd(16)} ${g.skills.map((s) => s.name).slice(0, 5).join(" · ")}` }));
        break;
      case "projects":
      case "ls":
        projects.filter((p) => p.featured || p.slug === "home-cafe-pos" || p.slug === "stiilihub").forEach((p, i) =>
          add({ t: "link", text: `${String(i + 1).padStart(2, "0")}  ${p.title}`, href: href(`/work/${p.slug}/`) }),
        );
        add({ t: "link", text: "    → full index", href: href("/work/") });
        break;
      case "contact":
        add([
          { t: "link", text: `email     ${site.email}`, href: `mailto:${site.email}` },
          { t: "link", text: "github    github.com/asyase", href: site.github },
          { t: "link", text: "linkedin  linkedin.com/in/anastasija-selevjorstova", href: site.linkedin },
          { t: "out", text: `based in  ${site.location}` },
        ]);
        break;
      case "cv":
      case "resume":
        add({ t: "link", text: "Open resume (PDF)", href: href(site.cv) });
        break;
      case "ai":
        add({ t: "link", text: "Open the AI portfolio ↗", href: site.aiPortfolio });
        break;
      case "sudo":
        add({ t: "accent", text: "Permission granted. The fastest way to hire me: `contact`." });
        break;
      case "whoami":
        add({ t: "out", text: "a curious visitor. hello!" });
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
      case "close":
        setOpen(false);
        return;
      default:
        add({ t: "dim", text: `command not found: ${cmd}. Try \`help\`.` });
    }
    setLines((l) => [...l, ...out]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      if (value.trim()) setHistory((h) => [value, ...h]);
      setValue("");
      setHIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (history[i] !== undefined) { setHIndex(i); setValue(history[i]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Developer terminal"
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-[#1d1926] text-[#ece9f5] shadow-[0_40px_120px_-20px_rgba(48,42,75,.7)] ring-1 ring-white/10"
            initial={{ y: 30, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2" aria-hidden>
                <span className="h-3 w-3 rounded-full bg-bubblegum" />
                <span className="h-3 w-3 rounded-full bg-peri" />
                <span className="h-3 w-3 rounded-full bg-lavender" />
              </div>
              <p className="font-mono text-xs text-[#a9a3bd]">~/asya – zsh</p>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md p-1 text-[#a9a3bd] hover:bg-white/10 hover:text-white" aria-label="Close terminal">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div ref={bodyRef} className="h-[min(56vh,420px)] overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed" aria-live="polite" onClick={() => inputRef.current?.focus()}>
              {lines.map((l, i) =>
                l.t === "link" && l.href ? (
                  <a key={i} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block whitespace-pre-wrap text-peri underline decoration-peri/30 underline-offset-4 hover:text-bubblegum">
                    {l.text}
                  </a>
                ) : (
                  <p key={i} className={l.t === "in" ? "text-white before:mr-2 before:text-bubblegum before:content-['❯']" : l.t === "dim" ? "text-[#8e88a3]" : l.t === "accent" ? "text-bubblegum" : "whitespace-pre-wrap text-[#d7d3e6]"}>
                    {l.text}
                  </p>
                ),
              )}
              <div className="mt-1 flex items-center gap-2">
                <span className="text-bubblegum" aria-hidden>❯</span>
                <label htmlFor="terminal-input" className="sr-only">Command</label>
                <input
                  id="terminal-input"
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent text-white caret-bubblegum outline-none focus-visible:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
              {["help", "projects", "skills", "contact"].map((c) => (
                <button key={c} type="button" onClick={() => { run(c); inputRef.current?.focus(); }} className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-[#d7d3e6] hover:bg-bubblegum hover:text-ink">
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
