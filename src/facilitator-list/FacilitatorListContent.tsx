import type { SortKey } from "../types";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorPagination } from "../components/pagination/FacilitatorPagination";
import { FacilitatorErrorDialog } from "./error/FacilitatorErrorDialog";
import { FacilitatorLoadingOverlay } from "./loading/FacilitatorLoadingOverlay";
import { getNextSortState } from "./sortState";
import { FacilitatorTable } from "./table/FacilitatorTable";
import {
  FACILITATOR_PAGE_SIZE,
  useFacilitators,
} from "../hooks/useFacilitators";
import type { UseFacilitatorSearchParamsResult } from "../hooks/useFacilitatorSearchParams";

type FacilitatorListContentProps = Omit<
  UseFacilitatorSearchParamsResult,
  "setSearch"
>;

/**
 * 先生一覧の一覧部分
 */
export function FacilitatorListContent({
  page,
  setPage,
  sort,
  setSort,
  search,
}: FacilitatorListContentProps) {
  const facilitators = useFacilitators({
    page,
    search,
    sort,
  });

  function handleSortChange(column: SortKey) {
    const nextSortState = getNextSortState(sort, column);

    void setSort(nextSortState);
  }

  if (facilitators.status === "loading") {
    return (
      <div className={styles.loadingArea}>
        <FacilitatorLoadingOverlay />
      </div>
    );
  }

  if (facilitators.status === "error") {
    return <FacilitatorErrorDialog onRetry={facilitators.retry} />;
  }

  if (facilitators.facilitators.length === 0) {
    return <p className={styles.statusMessage}>該当するデータはありません</p>;
  }

  /** 表示されている最初の件数 */
  const firstVisibleItem = (page - 1) * FACILITATOR_PAGE_SIZE + 1;
  /** 表示されている最後の件数 */
  const lastVisibleItem =
    firstVisibleItem + facilitators.facilitators.length - 1;

  return (
    <div>
      <FacilitatorTable
        facilitators={facilitators.facilitators}
        sortKey={sort?.key}
        sortOrder={sort?.order}
        onSortChange={handleSortChange}
      />
      <div className={styles.paginationRow}>
        <p className={styles.paginationSummary}>
          {`${facilitators.totalCount}件中 ${firstVisibleItem}〜${lastVisibleItem}件を表示`}
        </p>
        <FacilitatorPagination
          currentPage={page}
          totalPages={facilitators.totalPages}
          onPageChange={(nextPage) => {
            void setPage(nextPage);
          }}
        />
      </div>
    </div>
  );
}
