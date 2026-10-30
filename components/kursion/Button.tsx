import type { LucideIcon } from "lucide-react";

export type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md";
  type?: "button" | "submit";
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  /** Accessible name when the visible label is ambiguous, e.g. "Edit Python basics". */
  "aria-label"?: string;
  /** Documentation only: preview a state without interacting. */
  forceState?: "hover" | "focus";
};

/** The only button in Kursion UI. Hierarchy comes from the variant, never from custom styles. */
export default function Button({ children, variant = "primary", size = "md", type = "button", icon: Icon, loading, disabled, fullWidth, onClick, forceState, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className="k-btn"
      data-variant={variant}
      data-size={size}
      data-full={fullWidth || undefined}
      data-force={forceState}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-label={rest["aria-label"]}
      onClick={loading ? undefined : onClick}
    >
      {loading ? <span className="k-spinner" aria-hidden /> : Icon && <Icon className="k-icon" aria-hidden />}
      {children}
    </button>
  );
}
