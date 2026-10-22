import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkingStyle from "@/components/WorkingStyle";
import Disciplines from "@/components/Disciplines";
import AiChapter from "@/components/AiChapter";
import SelectedWork from "@/components/SelectedWork";
import Expertise from "@/components/Expertise";
import About from "@/components/About";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <Shell depth={0}>
      <Hero />
      <Marquee />
      <SelectedWork />
      <WorkingStyle />
      <Disciplines />
      <AiChapter />
      <Expertise />
      <Experience />
      <About />
    </Shell>
  );
}
