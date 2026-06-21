import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cx, spaceVar, type Space } from "../../utils/cx";
import styles from "./Stack.module.css";

type Align = "start" | "center" | "end" | "stretch";
type Justify = "start" | "center" | "end" | "between";

const ALIGN: Record<Align, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};
const JUSTIFY: Record<Justify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

export interface StackProps extends ComponentPropsWithoutRef<"div"> {
  /** Vertical gap between children (space scale step). */
  gap?: Space;
  /** Cross-axis (horizontal) alignment. */
  align?: Align;
  /** Main-axis (vertical) distribution. */
  justify?: Justify;
}

/** Vertical layout. Children are spaced with a token gap; direction-agnostic. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap = 4, align = "stretch", justify = "start", className, style, ...rest },
  ref,
) {
  const vars: CSSProperties = {
    gap: spaceVar(gap),
    alignItems: ALIGN[align],
    justifyContent: JUSTIFY[justify],
    ...style,
  };
  return (
    <div ref={ref} className={cx(styles.stack, className)} style={vars} {...rest} />
  );
});
