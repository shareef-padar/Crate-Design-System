import { type ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";
import styles from "./Heading.module.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingColor = "primary" | "secondary" | "inherit";

const SIZE_CLASS: Record<HeadingSize, string> = {
  display: styles.display,
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
};

export interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
  /** Semantic heading level (renders the matching <h1>–<h6> tag). Default: 2. */
  level?: HeadingLevel;
  /**
   * Visual size, decoupled from the semantic level so you can keep a correct document
   * outline while choosing the right scale. Defaults to match `level`.
   */
  size?: HeadingSize;
  color?: HeadingColor;
}

/** Headings in Manrope. Semantic level and visual size are independent. */
export function Heading({
  level = 2,
  size,
  color = "primary",
  className,
  ...rest
}: HeadingProps) {
  const Tag = `h${level}` as const;
  const visual = size ?? (`h${level}` as HeadingSize);
  return (
    <Tag
      className={cx(
        styles.heading,
        SIZE_CLASS[visual],
        color === "secondary" && styles.secondary,
        className,
      )}
      {...rest}
    />
  );
}
