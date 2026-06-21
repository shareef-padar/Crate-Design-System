import { type ComponentType, type ReactNode } from "react";
import {
  Info,
  CheckCircle,
  Warning,
  XCircle,
  X,
  type IconProps,
} from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { IconButton } from "../IconButton";
import styles from "./Alert.module.css";

export type AlertTone = "info" | "success" | "warning" | "danger" | "neutral";

/** An optional, low-emphasis follow-up action rendered inside the alert. */
export interface AlertAction {
  label: ReactNode;
  onClick?: () => void;
  /** Render as a link instead of a button. */
  href?: string;
}

const TONE_CLASS: Record<AlertTone, string> = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  neutral: styles.neutral,
};

const ICON: Record<AlertTone, ComponentType<IconProps>> = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  danger: XCircle,
  neutral: Info,
};

export interface AlertProps {
  tone?: AlertTone;
  /** Optional bold title above the message. Ignored when `compact`. */
  title?: ReactNode;
  children?: ReactNode;
  /**
   * Optional follow-up action. Rendered as a low-emphasis, tone-coloured
   * link/button — deliberately NOT a solid filled button, which would
   * compete with the alert surface and (in `danger`) read as destructive.
   */
  action?: AlertAction;
  /** Single-line, denser layout for terse inline notices. Drops the title. */
  compact?: boolean;
  /** Show a close button and call this when dismissed. */
  onClose?: () => void;
  className?: string;
}

/** Inline status message. Subtle tinted background, tone border, tone icon. */
export function Alert({
  tone = "info",
  title,
  children,
  action,
  compact = false,
  onClose,
  className,
}: AlertProps) {
  // Errors/warnings are assertive; info/success/neutral are polite status.
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";
  const ToneIcon = ICON[tone];
  return (
    <div
      className={cx(styles.alert, TONE_CLASS[tone], compact && styles.compact, className)}
      role={role}
    >
      <ToneIcon className={styles.icon} weight="fill" aria-hidden />
      <div className={styles.body}>
        {title && !compact && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.message}>{children}</div>}
        {action &&
          (action.href ? (
            <a className={styles.action} href={action.href}>
              {action.label}
            </a>
          ) : (
            <button type="button" className={styles.action} onClick={action.onClick}>
              {action.label}
            </button>
          ))}
      </div>
      {onClose && (
        <IconButton
          variant="ghost"
          size="sm"
          label="Dismiss"
          onClick={onClose}
          className={styles.close}
          icon={<X />}
        />
      )}
    </div>
  );
}
