import { useState } from "react";
import { Star } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./RatingStars.module.css";

export interface RatingStarsProps {
  /** Rating from 0 to `max`. */
  value: number;
  max?: number;
  /** Number of reviews, shown beside the stars. */
  count?: number;
  /** Override the review count text (e.g. "2,000+"). */
  countLabel?: string;
  /** Show the numeric value next to the stars. Default true. */
  showValue?: boolean;
  size?: "sm" | "md";
  /** "full" shows the whole star track; "compact" shows one star + value + count. */
  variant?: "full" | "compact";
  /** When provided, the rating becomes an interactive input. */
  onChange?: (value: number) => void;
  className?: string;
}

/** Star rating. Read-only display by default; pass `onChange` for an interactive input. */
export function RatingStars({
  value,
  max = 5,
  count,
  countLabel,
  showValue = true,
  size = "md",
  variant = "full",
  onChange,
  className,
}: RatingStarsProps) {
  const [hover, setHover] = useState<number | null>(null);

  if (onChange) {
    const shown = hover ?? value;
    return (
      <span
        className={cx(styles.rating, size === "sm" && styles.sm, className)}
        role="radiogroup"
        aria-label={`Rate out of ${max}`}
        onMouseLeave={() => setHover(null)}
      >
        {Array.from({ length: max }, (_, i) => {
          const v = i + 1;
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={value === v}
              aria-label={`${v} star${v > 1 ? "s" : ""}`}
              className={cx(styles.starButton, v <= shown && styles.starOn)}
              onClick={() => onChange(v)}
              onMouseEnter={() => setHover(v)}
            >
              <Star weight="fill" />
            </button>
          );
        })}
      </span>
    );
  }
  const pct = Math.max(0, Math.min(1, value / max)) * 100;
  const reviews = countLabel ?? (count != null ? count.toLocaleString() : undefined);
  const label =
    `Rated ${value.toFixed(1)} out of ${max}` +
    (reviews ? `, ${reviews} reviews` : "");

  if (variant === "compact") {
    return (
      <span
        className={cx(styles.rating, size === "sm" && styles.sm, className)}
        role="img"
        aria-label={label}
      >
        <span className={cx(styles.star, styles.compactStar)} aria-hidden>
          <Star weight="fill" />
        </span>
        <span className={styles.value} aria-hidden>
          {value.toFixed(1)}
          {reviews && <span className={styles.count}> ({reviews} reviews)</span>}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cx(styles.rating, size === "sm" && styles.sm, className)}
      role="img"
      aria-label={label}
    >
      <span className={styles.starWrap} aria-hidden>
        <span className={styles.track}>
          {Array.from({ length: max }, (_, i) => (
            <span key={i} className={styles.star}>
              <Star weight="fill" />
            </span>
          ))}
        </span>
        <span className={styles.fill} style={{ inlineSize: `${pct}%` }}>
          {Array.from({ length: max }, (_, i) => (
            <span key={i} className={styles.star}>
              <Star weight="fill" />
            </span>
          ))}
        </span>
      </span>
      {showValue && (
        <span className={styles.value} aria-hidden>
          {value.toFixed(1)}
          {reviews && <span className={styles.count}> ({reviews})</span>}
        </span>
      )}
    </span>
  );
}
