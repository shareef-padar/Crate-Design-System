import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cx } from "../../utils/cx";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  pageCount: number;
  onPageChange: (page: number) => void;
  /** How many page numbers to show around the current one. Default 1. */
  siblings?: number;
  className?: string;
}

/** Build the page list with ellipses, e.g. [1, "…", 4, 5, 6, "…", 20]. */
function pages(page: number, count: number, siblings: number): (number | "…")[] {
  const range = (a: number, b: number) =>
    Array.from({ length: b - a + 1 }, (_, i) => a + i);
  if (count <= 5 + siblings * 2) return range(1, count);
  const left = Math.max(2, page - siblings);
  const right = Math.min(count - 1, page + siblings);
  const out: (number | "…")[] = [1];
  if (left > 2) out.push("…");
  out.push(...range(left, right));
  if (right < count - 1) out.push("…");
  out.push(count);
  return out;
}

/** Page navigation for long result lists. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  className,
}: PaginationProps) {
  const items = pages(page, pageCount, siblings);
  const go = (p: number) => p >= 1 && p <= pageCount && p !== page && onPageChange(p);

  return (
    <nav aria-label="Pagination" className={cx(styles.nav, className)}>
      <button
        type="button"
        className={styles.arrow}
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
      >
        <CaretLeft />
      </button>
      {items.map((it, i) =>
        it === "…" ? (
          <span key={`gap-${i}`} className={styles.ellipsis} aria-hidden>
            …
          </span>
        ) : (
          <button
            key={it}
            type="button"
            className={cx(styles.page, it === page && styles.current)}
            aria-label={`Page ${it}`}
            aria-current={it === page ? "page" : undefined}
            onClick={() => go(it)}
          >
            {it}
          </button>
        ),
      )}
      <button
        type="button"
        className={styles.arrow}
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => go(page + 1)}
      >
        <CaretRight />
      </button>
    </nav>
  );
}
