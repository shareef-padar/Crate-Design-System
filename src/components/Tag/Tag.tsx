import { type ReactNode } from "react";
import { X } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./Tag.module.css";

export type TagTone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

const TONE_CLASS: Record<TagTone, string> = {
  neutral: styles.neutral,
  accent: styles.accent,
  success: styles.success,
  warning: styles.warning,
  danger: styles.danger,
  info: styles.info,
};

export interface TagProps {
  tone?: TagTone;
  /** Optional leading icon. Decorative. */
  icon?: ReactNode;
  /**
   * Called when the remove (×) button is clicked. When provided, a remove
   * button is rendered. Omit for a non-removable tag.
   */
  onRemove?: () => void;
  /**
   * Accessible label for the remove button, e.g. "Remove Dubai filter".
   * Defaults to "Remove" — override it so screen-reader users know *what*
   * is being removed.
   */
  removeLabel?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A removable token — for active filters, selected values, recipients.
 * Distinct from `Badge` (read-only status) and `FilterChip` (toggle).
 */
export function Tag({
  tone = "neutral",
  icon,
  onRemove,
  removeLabel = "Remove",
  children,
  className,
}: TagProps) {
  return (
    <span className={cx(styles.tag, TONE_CLASS[tone], className)}>
      {icon && (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {onRemove && (
        <button type="button" className={styles.remove} onClick={onRemove} aria-label={removeLabel}>
          <X weight="bold" aria-hidden />
        </button>
      )}
    </span>
  );
}
