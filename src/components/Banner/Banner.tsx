import { type ComponentType, type ReactNode } from "react";
import { Info, CheckCircle, Warning, XCircle, X, type IconProps } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import { IconButton } from "../IconButton";
import styles from "./Banner.module.css";

export type BannerTone = "info" | "success" | "warning" | "danger";

const TONE_CLASS: Record<BannerTone, string> = {
  info: styles.info,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
};

const ICON: Record<BannerTone, ComponentType<IconProps>> = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  danger: XCircle,
};

export interface BannerProps {
  tone?: BannerTone;
  children: ReactNode;
  /** Optional action element (e.g. a Button or Link), shown at the end. */
  action?: ReactNode;
  /** Show a close button and call this when dismissed. */
  onClose?: () => void;
  className?: string;
}

/** Full-width, page-level announcement bar. Use Alert for inline, in-context messages. */
export function Banner({ tone = "info", children, action, onClose, className }: BannerProps) {
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";
  const ToneIcon = ICON[tone];
  return (
    <div className={cx(styles.banner, TONE_CLASS[tone], className)} role={role}>
      <ToneIcon className={styles.icon} weight="fill" aria-hidden />
      <div className={styles.message}>{children}</div>
      {action && <div className={styles.action}>{action}</div>}
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
