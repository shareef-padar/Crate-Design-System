import { type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./SegmentedControl.module.css";

export interface SegmentOption {
  value: string;
  label: ReactNode;
}

export type SegmentedControlVariant = "pill" | "card";

export interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible label for the group. */
  label?: string;
  /**
   * "pill" (default): full-pill gray track, selected option an elevated
   * white chip with a shadow. "card": bordered white rounded-rect track,
   * selected option a plain gray fill, no shadow — for a "By Cargo / By
   * Space"-style toggle sitting directly on a page (not inside a form row).
   */
  variant?: SegmentedControlVariant;
  /**
   * Draw the track's own background/padding. Set false to embed the control
   * inside another bordered container (e.g. alongside a Stepper in one
   * shared row) — the selected option switches from an elevated white pill
   * to a filled+bordered one, since there's no track behind it for contrast.
   * Ignored when `variant="card"` (the card's own border is never dropped).
   */
  bordered?: boolean;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  variant = "pill",
  bordered = true,
  className,
}: SegmentedControlProps) {
  const isCard = variant === "card";
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cx(
        styles.track,
        isCard && styles.card,
        !isCard && !bordered && styles.unbordered,
        className,
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={selected}
            type="button"
            className={cx(
              styles.option,
              isCard && styles.cardOption,
              !isCard && !bordered && styles.optionUnbordered,
              selected &&
                (isCard ? styles.cardSelected : bordered ? styles.selected : styles.selectedUnbordered),
            )}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
