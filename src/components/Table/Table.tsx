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
}

/** Data table. Wrapped in a horizontal-scroll container for narrow screens. */
export function Table({ caption, className, children, ...rest }: TableProps) {
  return (
    <div className={styles.wrap}>
      <table className={cx(styles.table, className)} {...rest}>
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
}
export const Th = ({ align = "start", className, ...rest }: ThProps) => (
  <th scope="col" className={cx(ALIGN_CLASS[align], className)} {...rest} />
);

export interface TdProps extends Omit<ComponentPropsWithoutRef<"td">, "align"> {
  align?: Align;
}
export const Td = ({ align = "start", className, ...rest }: TdProps) => (
  <td className={cx(ALIGN_CLASS[align], className)} {...rest} />
);
