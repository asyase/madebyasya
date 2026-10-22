import type { Metadata } from "next";
import Shell from "@/components/Shell";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description: "All projects by Anastasija Selevjorstova – full-stack systems, UX/UI design and AI applications.",
};

export default function WorkPage() {
  return (
    <Shell depth={1}>
      <WorkIndex />
    </Shell>
  );
}
