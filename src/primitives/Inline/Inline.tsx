import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cx, spaceVar, type Space } from "../../utils/cx";
import styles from "./Inline.module.css";

type Align = "start" | "center" | "end" | "baseline" | "stretch";
type Justify = "start" | "center" | "end" | "between";

const ALIGN: Record<Align, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline",
  stretch: "stretch",
};
const JUSTIFY: Record<Justify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

export interface InlineProps extends ComponentPropsWithoutRef<"div"> {
  /** Horizontal gap between children (space scale step). */
  gap?: Space;
  /** Cross-axis (vertical) alignment. */
  align?: Align;
  /** Main-axis (horizontal) distribution. */
  justify?: Justify;
  /** Allow items to wrap onto multiple lines. Default: true. */
  wrap?: boolean;
}

/**
 * Horizontal layout. Uses flex row, so it automatically reverses visual order in RTL —
 * no direction-specific code needed.
 */
export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  {
    gap = 3,
    align = "center",
    justify = "start",
    wrap = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const vars: CSSProperties = {
    gap: spaceVar(gap),
    alignItems: ALIGN[align],
    justifyContent: JUSTIFY[justify],
    flexWrap: wrap ? "wrap" : "nowrap",
    ...style,
  };
  return (
    <div ref={ref} className={cx(styles.inline, className)} style={vars} {...rest} />
  );
});
