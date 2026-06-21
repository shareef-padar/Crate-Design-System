import { type ReactNode } from "react";
import { Badge, type BadgeTone } from "../../components/Badge";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

const MAP: Record<BookingStatus, { tone: BadgeTone; label: string }> = {
  pending: { tone: "warning", label: "Pending" },
  confirmed: { tone: "info", label: "Confirmed" },
  active: { tone: "success", label: "Active" },
  completed: { tone: "neutral", label: "Completed" },
  cancelled: { tone: "danger", label: "Cancelled" },
};

export interface StatusPillProps {
  status: BookingStatus;
  /** Override the default label. */
  label?: ReactNode;
  className?: string;
}

/** Booking-state pill — maps Cargoz statuses to consistent tones. */
export function StatusPill({ status, label, className }: StatusPillProps) {
  const { tone, label: defaultLabel } = MAP[status];
  return (
    <Badge tone={tone} dot className={className}>
      {label ?? defaultLabel}
    </Badge>
  );
}
