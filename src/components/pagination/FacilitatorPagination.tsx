import { useMemo } from "react";
import angleDownIcon from "../../assets/icon-angle-down.svg";
import styles from "./FacilitatorPagination.module.css";

type PageItem = number | "ellipsis";

type FacilitatorPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 9) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([
    1,
    totalPages,
    Math.max(2, currentPage - 1),
    currentPage,
    Math.min(totalPages - 1, currentPage + 1),
  ]);

  const sortedPages = [...pages].sort((left, right) => left - right);
  const items: PageItem[] = [];

  for (const page of sortedPages) {
    const prevPage = items.at(-1);

    if (typeof prevPage === "number" && page - prevPage > 1) {
      items.push("ellipsis");
    }

    items.push(page);
  }

  return items;
}

/**
 * Paginationの表示コンポーネント
 *
 * 10ページ以上の場合には...で端折ることにしている
 */
export function FacilitatorPagination({
  currentPage,
  totalPages,
  onPageChange,
}: FacilitatorPaginationProps) {
  const pageItems = useMemo(
    () => getPageItems(currentPage, totalPages),
    [currentPage, totalPages],
  );
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className={styles.controls} aria-label="ページネーション">
      <button
        type="button"
        className={`${styles.pagerBtn} ${styles.navBtn}`}
        aria-label="前へ"
        disabled={!hasPrev}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img
          className={`${styles.chevronIcon} ${styles.chevronLeft}`}
          src={angleDownIcon}
        />
      </button>
      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className={styles.pagerBtn}
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            className={`${styles.pagerBtn} ${currentPage === item ? styles.selected : ""}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className={`${styles.pagerBtn} ${styles.navBtn}`}
        aria-label="次へ"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img
          className={`${styles.chevronIcon} ${styles.chevronRight}`}
          src={angleDownIcon}
        />
      </button>
    </nav>
  );
}
