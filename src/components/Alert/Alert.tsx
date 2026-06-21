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

export type AlertTone = "info" | "success" | "warning" | "danger";

const TONE_CLASS: Record<AlertTone, string> = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
};

const ICON: Record<AlertTone, ComponentType<IconProps>> = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  danger: XCircle,
};

export interface AlertProps {
  tone?: AlertTone;
  /** Optional bold title above the message. */
  title?: ReactNode;
  children?: ReactNode;
  /** Show a close button and call this when dismissed. */
  onClose?: () => void;
  className?: string;
}

/** Inline status message. Subtle tinted background, tone border, tone icon. */
export function Alert({ tone = "info", title, children, onClose, className }: AlertProps) {
  // Errors/warnings are assertive; info/success are polite status.
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";
  const ToneIcon = ICON[tone];
  return (
    <div className={cx(styles.alert, TONE_CLASS[tone], className)} role={role}>
      <ToneIcon className={styles.icon} weight="fill" aria-hidden />
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <div className={styles.message}>{children}</div>}
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
