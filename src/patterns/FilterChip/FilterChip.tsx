import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./FilterChip.module.css";

export type FilterChipSize = "sm" | "md";

export interface FilterChipProps
  extends Omit<ComponentPropsWithoutRef<"button">, "aria-pressed"> {
  /** Whether the facet is active. */
  selected?: boolean;
  /** Optional leading icon (e.g. a Phosphor icon). Decorative. */
  icon?: ReactNode;
  /** `sm` for a compact row of quick-pick values (e.g. under a Stepper). */
  size?: FilterChipSize;
  children: ReactNode;
}

/** Toggleable facet chip for filtering listings. */
export function FilterChip({
  selected = false,
  icon,
  size = "md",
  className,
  type = "button",
  children,
  ...rest
}: FilterChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx(
        styles.chip,
        size === "sm" && styles.sm,
        selected && styles.selected,
        className,
      )}
      {...rest}
    >
      {icon && (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
