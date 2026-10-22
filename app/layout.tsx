import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/content/site";

// Self-hosted with size-adjusted fallbacks: preloaded, no layout shift on swap.
const display = localFont({
  src: [
    { path: "../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Arial",
});
const serif = localFont({
  src: [
    { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – Full-Stack Developer & UX/UI Designer`, template: `%s · ${site.short}` },
  description: site.description,
  authors: [{ name: site.name }],
  keywords: ["Full-stack developer", "UX/UI designer", "AI engineer", "Tallinn", "Java", "Spring Boot", "React", "Next.js", "Claude API"],
  openGraph: {
    type: "website",
    title: `${site.name} – Creative mind. Developer logic.`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#FCFAFB",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
