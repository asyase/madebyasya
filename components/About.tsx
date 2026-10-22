"use client";
/* eslint-disable @next/next/no-img-element */
import { Plane, Sparkles, Mic2, BookOpen } from "lucide-react";
import Reveal from "./Reveal";
import Starburst from "./Starburst";
import { site } from "@/lib/content/site";
import { useHref } from "@/lib/paths";

const interests = [
  { icon: Sparkles, title: "Dance & Cheer", text: "Movement, creativity and team spirit – dance and TalTech cheerleading.", tone: "bg-blush" },
  { icon: Plane, title: "Travel", text: "Exploring new places and perspectives – cruises especially.", tone: "bg-peri" },
  { icon: Mic2, title: "Events & Community", text: "Meeting people, sharing ideas and finding inspiration through events, conferences and new experiences.", tone: "bg-rose" },
  { icon: BookOpen, title: "Curiosity", text: "Always learning, experimenting and exploring new possibilities.", tone: "bg-ivory" },
];

export default function About() {
  const href = useHref();
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-20 md:py-32" aria-labelledby="about-title">
      <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-[440px]">
            <div className="relative overflow-hidden rounded-t-full rounded-b-[28px] bg-peri">
              <img src={href("/images/portrait-about.webp")} alt="Anastasija cheerleading with pom-poms at a basketball game" width={840} height={1120} loading="lazy" className="aspect-[3/4] w-full object-cover object-top" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bubblegum/20 via-transparent to-transparent" />
            </div>
            <Starburst className="absolute -right-4 top-10 h-14 w-14 text-bubblegum" spin />
            <div className="absolute -bottom-6 -left-2 rounded-2xl bg-ink px-4 py-3 text-paper shadow-xl sm:-left-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-lavender">Speaks</p>
              <p className="mt-1 text-sm font-semibold">
                {site.languages.map((l) => `${l.name} ${l.level}`).join(" · ")}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow text-pink-deep">About me</p>
          <h2 id="about-title" className="mt-4 font-display text-[clamp(2rem,4.2vw,3.8rem)] font-bold leading-[1.02] tracking-tight">
            I love the space where structured thinking meets creativity – where a complex system becomes an <span className="serif-accent font-normal text-lav-deep">effortless</span> experience.
          </h2>
          <div className="mt-8 grid max-w-[64ch] gap-5 text-[1.05rem] text-ink-soft">
            <p>
              With a background in Computer Science and UX/UI design, I love exploring how technology works – and how to make it work better for people.
            </p>
            <p>
              What makes my perspective different is that I&apos;ve experienced digital systems from different sides: as someone using them in everyday work, helping customers navigate them, investigating real user problems, and eventually developing the applications themselves.
            </p>
            <p>
              My customer-facing experience taught me to listen, understand user needs, investigate issues and see beyond technical requirements. I&apos;ve worked with reported problems, reproduced errors across devices and platforms, and learned how much clarity, reliability and thoughtful design matter in real situations.
            </p>
            <p>
              Today I bring that understanding into software development – combining technical logic, user-centred thinking and creativity to build functional, intuitive digital experiences. I&apos;m naturally curious, proactive and always eager to learn: I enjoy technical challenges, new approaches and improving my work, and more recently that curiosity has led me deeper into{" "}
              <a href={href("/#ai")} className="font-semibold text-ink underline decoration-bubblegum decoration-2 underline-offset-4">AI-powered development and automation</a>.
            </p>
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {interests.map(({ icon: Icon, title, text, tone }, i) => (
              <Reveal as="li" key={title} delay={i * 70} className={`flex items-start gap-4 rounded-2xl p-5 ${tone}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg font-bold leading-tight">{title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
