import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { cx, spaceVar, type Space } from "../../utils/cx";
import styles from "./Box.module.css";

export type BoxSurface = "none" | "surface" | "raised" | "sunken";
export type BoxRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";

export interface BoxProps extends ComponentPropsWithoutRef<"div"> {
  /** Padding on all sides (space scale step). */
  padding?: Space;
  /** Block (vertical) padding — overrides `padding` on the block axis. */
  paddingBlock?: Space;
  /** Inline (horizontal) padding — overrides `padding` on the inline axis. */
  paddingInline?: Space;
  /** Surface background from the semantic tokens. */
  background?: BoxSurface;
  /** Corner radius. */
  radius?: BoxRadius;
  /** Draw a 1px semantic border. */
  border?: boolean;
}

const SURFACE_VAR: Record<Exclude<BoxSurface, "none">, string> = {
  surface: "var(--crate-color-surface)",
  raised: "var(--crate-color-surface-raised)",
  sunken: "var(--crate-color-surface-sunken)",
};

/** Generic container. Spacing and surfaces come from tokens; nothing hard-coded. */
export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  {
    padding,
    paddingBlock,
    paddingInline,
    background = "none",
    radius = "none",
    border = false,
    className,
    style,
    ...rest
  },
  ref,
) {
  const vars: CSSProperties = {
    padding: spaceVar(padding),
    paddingBlock: spaceVar(paddingBlock),
    paddingInline: spaceVar(paddingInline),
    background: background === "none" ? undefined : SURFACE_VAR[background],
    borderRadius: radius === "none" ? undefined : `var(--crate-radius-${radius})`,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={cx(styles.box, border && styles.bordered, className)}
      style={vars}
      {...rest}
    />
  );
});
