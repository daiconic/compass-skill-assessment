import type { SubmitEvent } from "react";
import type { SortKey } from "../../types";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorListHeader } from "./header/FacilitatorListHeader";
import { FacilitatorPagination } from "./pagination/FacilitatorPagination";
import { getNextSortState } from "./sortState";
import { FacilitatorTable } from "./table/FacilitatorTable";
import { useFacilitators } from "../../hooks/useFacilitators";
import { useFacilitatorSearchParams } from "./useFacilitatorSearchParams";

export function FacilitatorListContent() {
  const { page, search, sort, setPage, setSearch, setSort } =
    useFacilitatorSearchParams();
  const facilitators = useFacilitators({
    page,
    search,
    sort,
  });

  const totalPages = facilitators.status === "success" ? facilitators.totalPages : 1;
  const hasNext = facilitators.status === "success" && page < facilitators.totalPages;

  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextSearch = String(formData.get("search") ?? "");

    void setSearch(nextSearch);
  }

  function handleSortChange(column: SortKey) {
    const nextSortState = getNextSortState(sort, column);

    void setSort(nextSortState);
  }

  return (
    <main className={styles.content}>
      <FacilitatorListHeader
        title="先生一覧"
        searchDefaultValue={search}
        onSearchSubmit={handleSearchSubmit}
      />
      {facilitators.status === "loading" ? (
        <p className={styles.statusMessage}>読み込み中...</p>
      ) : facilitators.status === "error" ? (
        <p className={styles.statusMessage}>先生一覧の取得に失敗しました。</p>
      ) : facilitators.facilitators.length === 0 ? (
        <p className={styles.statusMessage}>表示できる先生がありません。</p>
      ) : (
        <FacilitatorTable
          facilitators={facilitators.facilitators}
          sortKey={sort?.key}
          sortOrder={sort?.order}
          onSortChange={handleSortChange}
        />
      )}
      <FacilitatorPagination
        currentPage={page}
        totalPages={totalPages}
        hasPrev={page > 1}
        hasNext={hasNext}
        onPageChange={(nextPage) => {
          void setPage(nextPage);
        }}
      />
    </main>
  );
}
