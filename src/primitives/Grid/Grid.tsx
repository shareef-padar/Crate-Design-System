import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cx, spaceVar, type Space } from "../../utils/cx";
import styles from "./Grid.module.css";

export interface GridProps extends ComponentPropsWithoutRef<"div"> {
  /** Gap between grid items (space scale step). */
  gap?: Space;
  /**
   * Minimum width of each column. Columns auto-fit and wrap based on the grid's OWN
   * width — so the same Grid reflows correctly in a wide page or a narrow sidebar
   * (container-adaptive, no breakpoints needed). Default: "16rem".
   */
  min?: string;
  /**
   * Fixed column count. Overrides `min` auto-fit behavior when you need an exact grid
   * (e.g. a 12-column page scaffold). Omit for responsive auto-fit.
   */
  columns?: number;
}

/** Responsive CSS grid. Auto-fits by default; pass `columns` for a fixed grid. */
export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { gap = 4, min = "16rem", columns, className, style, ...rest },
  ref,
) {
  const vars: CSSProperties = {
    gap: spaceVar(gap),
    gridTemplateColumns: columns
      ? `repeat(${columns}, minmax(0, 1fr))`
      : `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`,
    ...style,
  };
  return (
    <div ref={ref} className={cx(styles.grid, className)} style={vars} {...rest} />
  );
});
