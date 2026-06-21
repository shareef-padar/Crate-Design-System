import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Timeline.module.css";

export type TimelineTone = "default" | "success" | "warning" | "danger" | "info";

export interface TimelineProps {
  children: ReactNode;
  className?: string;
}

/** Vertical sequence of events (e.g. a booking's status history). */
export function Timeline({ children, className }: TimelineProps) {
  return <ol className={cx(styles.timeline, className)}>{children}</ol>;
}

export interface TimelineItemProps {
  title: ReactNode;
  /** Timestamp or meta line. */
  time?: ReactNode;
  description?: ReactNode;
  tone?: TimelineTone;
  className?: string;
}

const TONE_CLASS: Record<TimelineTone, string | undefined> = {
  default: undefined,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
};

export function TimelineItem({
  title,
  time,
  description,
  tone = "default",
  className,
}: TimelineItemProps) {
  return (
    <li className={cx(styles.item, className)}>
      <span className={cx(styles.dot, TONE_CLASS[tone])} aria-hidden />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {time && <span className={styles.time}>{time}</span>}
        </div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </li>
  );
}
