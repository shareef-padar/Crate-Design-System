import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Avatar.module.css";

export type AvatarSize = "sm" | "md" | "lg";

const SIZE_CLASS: Record<AvatarSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export interface AvatarProps {
  /** Image URL. Falls back to initials, then icon, if absent. */
  src?: string;
  /** Name — used for the alt text and to derive initials. */
  name?: string;
  /** Custom fallback (e.g. an icon). Overrides initials. */
  fallback?: ReactNode;
  size?: AvatarSize;
  /** Square instead of circular. */
  square?: boolean;
  className?: string;
}

function initials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "");
}

/** Avatar with image, then initials, then icon fallback. */
export function Avatar({ src, name, fallback, size = "md", square, className }: AvatarProps) {
  const label = name || "Avatar";
  return (
    <span
      className={cx(styles.avatar, SIZE_CLASS[size], square && styles.square, className)}
      role="img"
      aria-label={label}
    >
      {src ? (
        <img src={src} alt="" className={styles.image} />
      ) : (
        <span className={styles.fallback} aria-hidden>
          {fallback ?? initials(name).toUpperCase()}
        </span>
      )}
    </span>
  );
}
