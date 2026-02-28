import styles from "./TeacherPagination.module.css";

type TeacherPaginationProps = {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPageChange?: (page: number) => void;
};

export function TeacherPagination({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
  onPageChange,
}: TeacherPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pager} aria-label="ページネーション">
      <button
        type="button"
        className={`${styles.pagerBtn} ${!hasPrev ? styles.disabled : ""}`}
        aria-disabled={!hasPrev}
        onClick={() => hasPrev && onPageChange?.(currentPage - 1)}
      >
        ←
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.pagerBtn} ${currentPage === page ? styles.selected : ""}`}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={`${styles.pagerBtn} ${!hasNext ? styles.disabled : ""}`}
        aria-disabled={!hasNext}
        onClick={() => hasNext && onPageChange?.(currentPage + 1)}
      >
        →
      </button>
    </nav>
  );
}
