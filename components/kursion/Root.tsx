import "./kursion.css";
import clsx from "clsx";
import { kursionStylesheet } from "@/lib/consistency/tokens";

const SHEET = kursionStylesheet();

/** Applies the Kursion UI tokens to everything inside it. */
export default function KursionRoot({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("k-root", className)}>
      <style href="kursion-tokens" precedence="medium">{SHEET}</style>
      {children}
    </div>
  );
}
