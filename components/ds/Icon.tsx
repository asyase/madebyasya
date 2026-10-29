import { ArrowRight, Calendar, Check, Download, Heart, Info, Lock, Mail, Plus, Search, ShoppingBag, User, type LucideIcon } from "lucide-react";
import type { IconName } from "@/lib/design-system/contracts";

const icons: Record<IconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  check: Check,
  mail: Mail,
  lock: Lock,
  user: User,
  search: Search,
  calendar: Calendar,
  "shopping-bag": ShoppingBag,
  heart: Heart,
  download: Download,
  plus: Plus,
  info: Info,
};

/** Decorative icon from the approved set. Meaning always comes from adjacent text. */
export default function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = icons[name];
  return <C className={className ?? "ds-icon"} aria-hidden="true" focusable="false" strokeWidth={2} />;
}
