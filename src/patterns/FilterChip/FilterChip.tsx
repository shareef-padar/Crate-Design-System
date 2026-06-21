import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./FilterChip.module.css";

export interface FilterChipProps
  extends Omit<ComponentPropsWithoutRef<"button">, "aria-pressed"> {
  /** Whether the facet is active. */
  selected?: boolean;
  children: ReactNode;
}

/** Toggleable facet chip for filtering listings. */
export function FilterChip({
  selected = false,
  className,
  type = "button",
  children,
  ...rest
}: FilterChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx(styles.chip, selected && styles.selected, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
