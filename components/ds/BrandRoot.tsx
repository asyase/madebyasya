import "./ds.css";
import clsx from "clsx";
import { overrideVariables, tokenStylesheet, type BrandId, type SemanticOverrides } from "@/lib/design-system/tokens";

const STYLESHEET = tokenStylesheet();

/**
 * Applies a brand's tokens to everything inside it. Components never know
 * which brand they are in – they only read component tokens.
 */
export default function BrandRoot({ brand, overrides, className, children }: { brand: BrandId; overrides?: SemanticOverrides; className?: string; children: React.ReactNode }) {
  return (
    <div className={clsx("ds-root", className)} data-brand={brand} style={overrideVariables(overrides) as React.CSSProperties}>
      {/* React hoists and de-duplicates this, so the token sheet loads once per page. */}
      <style href="ds-tokens" precedence="medium">{STYLESHEET}</style>
      {children}
    </div>
  );
}
