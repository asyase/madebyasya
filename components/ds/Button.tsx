import Icon from "./Icon";
import type { IconName } from "@/lib/design-system/contracts";

export type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  iconStart?: IconName;
  iconEnd?: IconName;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  /** Documentation only: preview a state without interacting. */
  forceState?: "hover" | "focus";
};

export default function Button({ label, variant = "primary", size = "md", type = "button", iconStart, iconEnd, fullWidth, disabled, onClick, forceState }: ButtonProps) {
  return (
    <button
      type={type}
      className="ds-button"
      data-variant={variant}
      data-size={size}
      data-full={fullWidth || undefined}
      data-force-state={forceState}
      disabled={disabled}
      onClick={onClick}
    >
      {iconStart && <Icon name={iconStart} />}
      {label}
      {iconEnd && <Icon name={iconEnd} />}
    </button>
  );
}
