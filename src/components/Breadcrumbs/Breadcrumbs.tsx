import { Fragment, type ReactNode } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./Breadcrumbs.module.css";

export interface Crumb {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/** Navigation breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cx(styles.nav, className)}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li className={styles.item}>
                {item.href && !last ? (
                  <a className={styles.link} href={item.href}>
                    {item.label}
                  </a>
                ) : (
                  <span className={styles.current} aria-current={last ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
              {!last && (
                <li className={styles.separator} aria-hidden>
                  <CaretRight className={styles.caret} />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
