import type { ReactNode, SubmitEvent } from "react";
import type { SortKey } from "../../types";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorListHeader } from "./header/FacilitatorListHeader";
import { FacilitatorLoadingOverlay } from "./loading/FacilitatorLoadingOverlay";
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

  if (facilitators.status === "loading") {
    return (
      <FacilitatorListLayout
        search={search}
        onSearchSubmit={handleSearchSubmit}
      >
        <FacilitatorLoadingOverlay />
      </FacilitatorListLayout>
    );
  }

  if (facilitators.status === "error") {
    return (
      <FacilitatorListLayout
        search={search}
        onSearchSubmit={handleSearchSubmit}
      >
        <p className={styles.statusMessage}>先生一覧の取得に失敗しました。</p>
      </FacilitatorListLayout>
    );
  }

  if (facilitators.facilitators.length === 0) {
    return (
      <FacilitatorListLayout
        search={search}
        onSearchSubmit={handleSearchSubmit}
      >
        <p className={styles.statusMessage}>該当するデータはありません</p>
      </FacilitatorListLayout>
    );
  }

  return (
    <FacilitatorListLayout search={search} onSearchSubmit={handleSearchSubmit}>
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
    </FacilitatorListLayout>
  );
}

type FacilitatorListLayoutProps = {
  search: string;
  onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

function FacilitatorListLayout({
  search,
  onSearchSubmit,
  children,
}: FacilitatorListLayoutProps) {
  return (
    <main className={styles.content}>
      <FacilitatorListHeader
        title="先生一覧"
        searchDefaultValue={search}
        onSearchSubmit={onSearchSubmit}
      />
      {children}
    </main>
  );
}
