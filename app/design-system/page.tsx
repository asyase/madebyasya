import type { Metadata } from "next";
import Shell from "@/components/Shell";
import DesignSystemDemo from "@/components/ds-showcase/DesignSystemDemo";

export const metadata: Metadata = {
  title: "Design System Demo",
  description:
    "Interactive prototype of an AI-ready multibrand design system: component playground, semantic tokens, three fictional brands and a schema-driven UI composer.",
  openGraph: { images: [{ url: "/work/ai-ready-design-system/playground.webp" }] },
};

export default function DesignSystemPage() {
  return (
    <Shell depth={1}>
      <DesignSystemDemo />
    </Shell>
  );
}
