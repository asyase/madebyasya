import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import Icon from "./Icon";
import type { IconName } from "@/lib/design-system/contracts";

export function Badge({ label, tone = "neutral", size = "md", icon }: { label: string; tone?: "neutral" | "info" | "success" | "warning" | "danger"; size?: "sm" | "md"; icon?: IconName }) {
  return (
    <span className="ds-badge" data-tone={tone} data-size={size}>
      {icon && <Icon name={icon} />}
      {label}
    </span>
  );
}

const alertIcons = { info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert };
const alertNames = { info: "Information", success: "Success", warning: "Warning", danger: "Error" };

export function Alert({ tone = "info", title, text, children, onDismiss, focusRef }: { tone?: "info" | "success" | "warning" | "danger"; title?: string; text?: string; children?: React.ReactNode; onDismiss?: () => void; focusRef?: React.Ref<HTMLDivElement> }) {
  const I = alertIcons[tone];
  const urgent = tone === "danger" || tone === "warning";
  return (
    <div className="ds-alert" data-tone={tone} role={urgent ? "alert" : "status"} ref={focusRef} tabIndex={focusRef ? -1 : undefined}>
      <I className="ds-icon" aria-hidden="true" />
      <div className="ds-alert__body">
        <span className="sr-only">{alertNames[tone]}: </span>
        {title && <p className="ds-alert__title">{title}</p>}
        {text && <p className="ds-alert__text">{text}</p>}
        {children}
      </div>
      {onDismiss && (
        <button type="button" className="ds-alert__close" onClick={onDismiss} aria-label="Dismiss message">
          <X className="ds-icon" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
