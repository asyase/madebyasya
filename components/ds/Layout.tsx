import { cssVar } from "@/lib/design-system/tokens";

type SpacingToken = "spacing.component.xs" | "spacing.component.sm" | "spacing.component.md" | "spacing.component.lg" | "spacing.component.xl";

/** Spacing is always a semantic token name, resolved to its CSS variable. */
const space = (token: SpacingToken) => `var(${cssVar(token)})`;

export function Stack({ direction = "vertical", gap = "spacing.component.md", align, wrap, children }: { direction?: "vertical" | "horizontal" | "responsive"; gap?: SpacingToken; align?: "start" | "center" | "end" | "stretch"; wrap?: boolean; children: React.ReactNode }) {
  return <div className="ds-stack" data-direction={direction} data-align={align} data-wrap={wrap || undefined} style={{ gap: space(gap) }}>{children}</div>;
}

export function Card({ variant = "elevated", padding = "spacing.component.lg", media = "none", maxWidth = "full", labelledBy, as: Tag = "section", children }: { variant?: "elevated" | "outlined"; padding?: "spacing.component.md" | "spacing.component.lg" | "spacing.component.xl"; media?: "none" | "pattern"; maxWidth?: "sm" | "md" | "full"; labelledBy?: string; as?: "section" | "article" | "div"; children: React.ReactNode }) {
  return (
    <Tag className="ds-card" data-variant={variant} data-max={maxWidth} aria-labelledby={labelledBy} style={{ "--_pad": space(padding) } as React.CSSProperties}>
      {media === "pattern" && <div className="ds-card__media" aria-hidden="true" />}
      {children}
    </Tag>
  );
}
