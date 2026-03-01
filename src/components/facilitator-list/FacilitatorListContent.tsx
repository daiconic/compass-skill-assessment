import type { SubmitEvent } from "react";
import { useState } from "react";
import type { FacilitatorSortKey } from "../../api/facilitators";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorListHeader } from "./header/FacilitatorListHeader";
import { FacilitatorPagination } from "./pagination/FacilitatorPagination";
import { getNextSortState } from "./sortState";
import { FacilitatorTable } from "./table/FacilitatorTable";
import { useFacilitators } from "../../hooks/useFacilitators";
import { useFacilitatorSearchParams } from "./useFacilitatorSearchParams";

export function FacilitatorListContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<FacilitatorSortKey | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>();
  const { search, setSearch } = useFacilitatorSearchParams();
  const facilitators = useFacilitators({
    page: currentPage,
    search,
    sort: sortKey,
    order: sortOrder,
  });

  const totalPages =
    facilitators.status === "success" ? facilitators.totalPages : 1;
  const hasNext =
    facilitators.status === "success" && currentPage < facilitators.totalPages;

  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextSearch = String(formData.get("search") ?? "");

    setCurrentPage(1);
    void setSearch(nextSearch);
  }

  function handleSortChange(column: FacilitatorSortKey) {
    const nextSortState = getNextSortState(
      {
        sortKey,
        sortOrder,
      },
      column,
    );

    setCurrentPage(1);
    setSortKey(nextSortState.sortKey);
    setSortOrder(nextSortState.sortOrder);
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
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      )}
      <FacilitatorPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrev={currentPage > 1}
        hasNext={hasNext}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
