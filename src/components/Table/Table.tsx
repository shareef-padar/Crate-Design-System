import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Table.module.css";

type Align = "start" | "center" | "end";
const ALIGN_CLASS: Record<Align, string | undefined> = {
  start: undefined,
  center: styles.center,
  end: styles.end,
};

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  /** Accessible caption / summary for the table. */
  caption?: ReactNode;
  /**
   * Alternating row background instead of border-separated rows — for a
   * plain key-value/feature list with no header row. Default false (the
   * usual bordered-row data table).
   */
  zebra?: boolean;
}

/** Data table. Wrapped in a horizontal-scroll container for narrow screens. */
export function Table({ caption, zebra = false, className, children, ...rest }: TableProps) {
  return (
    <div className={styles.wrap}>
      <table className={cx(styles.table, zebra && styles.zebra, className)} {...rest}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

export const Thead = (props: ComponentPropsWithoutRef<"thead">) => <thead {...props} />;
export const Tbody = (props: ComponentPropsWithoutRef<"tbody">) => <tbody {...props} />;

export type TrProps = ComponentPropsWithoutRef<"tr">;
export const Tr = ({ className, ...rest }: TrProps) => (
  <tr className={cx(styles.tr, className)} {...rest} />
);

export interface ThProps extends Omit<ComponentPropsWithoutRef<"th">, "align"> {
  align?: Align;
  /**
   * Tint this cell as part of an emphasized column (e.g. "recommended" in a
   * comparison table). Apply to every `Th`/`Td` in that column — a `<col>`
   * can't carry text color, so there's no single column-level switch.
   */
  highlighted?: boolean;
}
export const Th = ({ align = "start", highlighted = false, className, ...rest }: ThProps) => (
  <th
    scope="col"
    className={cx(ALIGN_CLASS[align], highlighted && styles.highlighted, className)}
    {...rest}
  />
);

export interface TdProps extends Omit<ComponentPropsWithoutRef<"td">, "align"> {
  align?: Align;
  /** Tint this cell as part of an emphasized column. See `Th`'s `highlighted`. */
  highlighted?: boolean;
}
export const Td = ({ align = "start", highlighted = false, className, ...rest }: TdProps) => (
  <td
    className={cx(ALIGN_CLASS[align], highlighted && styles.highlighted, className)}
    {...rest}
  />
);
