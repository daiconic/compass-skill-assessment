import angleDownIcon from "../../../assets/icon-angle-down.svg";
import styles from "./FacilitatorPagination.module.css";

type FacilitatorPaginationProps = {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange: (page: number) => void;
};

export function FacilitatorPagination({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
}: FacilitatorPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pager} aria-label="ページネーション">
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
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.pagerBtn} ${currentPage === page ? styles.selected : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
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
