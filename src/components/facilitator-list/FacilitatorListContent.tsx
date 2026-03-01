import type { SortKey } from "../../types";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorLoadingOverlay } from "./loading/FacilitatorLoadingOverlay";
import { FacilitatorPagination } from "./pagination/FacilitatorPagination";
import { getNextSortState } from "./sortState";
import { FacilitatorTable } from "./table/FacilitatorTable";
import type { UseFacilitatorSearchParamsResult } from "./useFacilitatorSearchParams";
import { useFacilitators } from "../../hooks/useFacilitators";

type FacilitatorListContentProps = Omit<
  UseFacilitatorSearchParamsResult,
  "setSearch"
>;

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
    return <FacilitatorLoadingOverlay />;
  }

  if (facilitators.status === "error") {
    return (
      <p className={styles.statusMessage}>先生一覧の取得に失敗しました。</p>
    );
  }

  if (facilitators.facilitators.length === 0) {
    return <p className={styles.statusMessage}>該当するデータはありません</p>;
  }

  return (
    <>
      <FacilitatorTable
        facilitators={facilitators.facilitators}
        sortKey={sort?.key}
        sortOrder={sort?.order}
        onSortChange={handleSortChange}
      />
      <FacilitatorPagination
        currentPage={page}
        totalPages={facilitators.totalPages}
        hasPrev={page > 1}
        hasNext={page < facilitators.totalPages}
        onPageChange={(nextPage) => {
          void setPage(nextPage);
        }}
      />
    </>
  );
}
