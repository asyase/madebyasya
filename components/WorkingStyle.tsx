"use client";
/*
 * Section 01 – HOW I THINK.
 * Mindset and working style, set as a short manifesto: an oversized statement,
 * a personal paragraph, then three principles as a typographic staircase.
 * The practical process (Design / Develop / Connect) follows in its own section.
 */
import { motion } from "framer-motion";
import clsx from "clsx";

const ease = [0.2, 0.75, 0.2, 1] as const;

const PRINCIPLES = [
  {
    word: "Independent",
    tail: "by nature.",
    text: "I take ownership, think ahead and explore solutions on my own.",
    indent: "lg:pl-0",
  },
  {
    word: "Structured",
    tail: "in my approach.",
    text: "I turn complex ideas into clear plans, manageable steps and organised workflows.",
    note: "Structure gives clarity – and leaves room to experiment and improve.",
    indent: "lg:pl-[9%]",
  },
  {
    word: "Collaborative",
    tail: "in my mindset.",
    text: "I value open discussion, different perspectives and building stronger solutions together.",
    indent: "lg:pl-[18%]",
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
};

export default function WorkingStyle() {
  return (
    <section id="process" className="relative scroll-mt-20 overflow-x-clip border-t border-ink bg-paper pb-24 pt-16 md:pb-36 md:pt-24" aria-labelledby="mindset-title">
      <div className="frame">
        <p className="eyebrow flex items-center gap-3 text-pink-deep">
          <span className="font-mono">01</span>
          <span className="h-px w-8 bg-pink-deep" aria-hidden />
          How I think
        </p>

        <motion.h2
          id="mindset-title"
          {...reveal}
          transition={{ duration: 0.8, ease }}
          className="mt-6 max-w-[14ch] font-display text-[clamp(2.8rem,7.6vw,7.5rem)] font-extrabold leading-[0.9] tracking-tightest"
        >
          Creative thinking. <span className="serif-accent font-normal text-pink-deep">Structured execution.</span>
        </motion.h2>

        {/* Personal statement – offset right for an asymmetric rhythm */}
        <motion.div {...reveal} transition={{ duration: 0.8, ease, delay: 0.1 }} className="mt-12 grid max-w-[60ch] gap-4 text-lg leading-relaxed text-ink-soft md:mt-16 lg:ml-[41%]">
          <p>
            <span className="text-ink">I love bringing clarity to complex ideas</span> – thinking independently, organising the work into meaningful steps, and staying open to the better solutions that emerge through collaboration.
          </p>
        </motion.div>

        {/* Principles – the manifesto */}
        <ol className="mt-16 border-t border-ink md:mt-24" aria-label="Working principles">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.word}
              {...reveal}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              className={clsx("group grid gap-x-10 gap-y-2 border-b border-ink/15 py-6 md:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-baseline", p.indent)}
            >
              <p className="font-display text-[clamp(2.3rem,5.4vw,5rem)] font-extrabold leading-[0.95] tracking-tightest">
                <span className="relative">
                  {p.word}
                  <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-bubblegum transition-transform duration-500 group-hover:scale-x-100" />
                </span>{" "}
                <span className="serif-accent text-[0.62em] font-normal text-lav-deep transition-colors duration-300 group-hover:text-pink-deep">{p.tail}</span>
              </p>
              <div>
                <p className="text-[17px] leading-snug text-ink">{p.text}</p>
                {p.note && <p className="mt-2 font-mono text-xs leading-relaxed text-ink-soft">↳ {p.note}</p>}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
