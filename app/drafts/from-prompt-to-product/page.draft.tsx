// DRAFT ROUTE – local development and `npm run build:preview` only.
// The ".draft.tsx" extension is registered as a page extension in next.config.mjs only when unpublished
// case studies are shown, so the production build (`npm run build`) never creates this page.
import type { Metadata } from "next";
import Shell from "@/components/Shell";
import DraftCaseStudy from "@/components/prompt-showcase/DraftCaseStudy";

export const metadata: Metadata = {
  title: "Draft – From Prompt to Product",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Shell depth={2}>
      <DraftCaseStudy />
    </Shell>
  );
}
