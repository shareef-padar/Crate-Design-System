import { cx } from "../../utils/cx";
import styles from "./PriceDisplay.module.css";

export type Currency = "AED" | "SAR";
export type PriceSize = "md" | "lg";

export interface PriceDisplayProps {
  amount: number;
  currency?: Currency;
  /** Per-unit, e.g. "sqft". Rendered as "/ sqft". */
  unit?: string;
  /** Billing period, e.g. "month". Rendered as "per month". */
  period?: string;
  /** BCP-47 locale for number formatting. Default "en-AE". */
  locale?: string;
  size?: PriceSize;
  /** Put the unit + period on their own line beneath the amount. */
  stacked?: boolean;
  /** Align the block. Default "start". */
  align?: "start" | "end";
  className?: string;
}

/** Price with transparent currency + unit + period — price transparency is a Cargoz rule. */
export function PriceDisplay({
  amount,
  currency = "AED",
  unit,
  period,
  locale = "en-AE",
  size = "md",
  stacked = false,
  align = "start",
  className,
}: PriceDisplayProps) {
  // Show cents only when the amount actually has them (AED 9.60), else whole (AED 18).
  const hasFraction = !Number.isInteger(amount);
  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  }).format(amount);

  const meta = (unit || period) && (
    <span className={styles.metaGroup}>
      {unit && <span className={styles.meta}>/ {unit}</span>}
      {period && <span className={styles.meta}>per {period}</span>}
    </span>
  );

  return (
    <span
      className={cx(
        styles.price,
        size === "lg" && styles.lg,
        stacked && styles.stacked,
        align === "end" && styles.alignEnd,
        className,
      )}
    >
      <span className={styles.amount}>{formatted}</span>
      {meta}
    </span>
  );
}
