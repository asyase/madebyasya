import { Ban, CheckCheck, CircleAlert, CircleCheck, CircleDashed, CircleDot, Info, Megaphone, TriangleAlert, type LucideIcon } from "lucide-react";
import { statuses, type StatusId } from "@/lib/consistency/tokens";

const statusIcons: Record<StatusId, LucideIcon> = { draft: CircleDashed, published: Megaphone, open: CircleDot, completed: CheckCheck, cancelled: Ban };

/** Status is always text + icon + colour – never colour alone. Labels come from one vocabulary. */
export function StatusBadge({ status }: { status: StatusId }) {
  const I = statusIcons[status];
  return (
    <span className="k-badge" data-status={status}>
      <I className="k-icon" aria-hidden />
      {statuses[status].label}
    </span>
  );
}

const alertIcons = { info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleAlert };

export function Alert({ tone = "info", title, children, focusRef }: { tone?: keyof typeof alertIcons; title?: string; children?: React.ReactNode; focusRef?: React.Ref<HTMLDivElement> }) {
  const I = alertIcons[tone];
  return (
    <div className="k-alert" data-tone={tone} role={tone === "danger" || tone === "warning" ? "alert" : "status"} ref={focusRef} tabIndex={focusRef ? -1 : undefined}>
      <I className="k-icon" aria-hidden />
      <div className="k-alert__body">
        {title && <p className="k-alert__title">{title}</p>}
        {children}
      </div>
    </div>
  );
}
