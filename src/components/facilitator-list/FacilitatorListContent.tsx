import type { SubmitEvent } from "react";
import { useState } from "react";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorListHeader } from "./header/FacilitatorListHeader";
import { FacilitatorPagination } from "./pagination/FacilitatorPagination";
import { FacilitatorTable } from "./table/FacilitatorTable";
import { useFacilitators } from "../../hooks/useFacilitators";

export function FacilitatorListContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedSearch, setAppliedSearch] = useState("");
  const facilitators = useFacilitators({
    page: currentPage,
    search: appliedSearch,
  });

  const totalPages =
    facilitators.status === "success" ? facilitators.totalPages : 1;
  const hasNext =
    facilitators.status === "success" && currentPage < facilitators.totalPages;

  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = String(formData.get("search") ?? "");

    setCurrentPage(1);
    setAppliedSearch(search);
  }

  return (
    <main className={styles.content}>
      <FacilitatorListHeader
        title="先生一覧"
        onSearchSubmit={handleSearchSubmit}
      />
      {facilitators.status === "loading" ? (
        <p className={styles.statusMessage}>読み込み中...</p>
      ) : facilitators.status === "error" ? (
        <p className={styles.statusMessage}>先生一覧の取得に失敗しました。</p>
      ) : facilitators.facilitators.length === 0 ? (
        <p className={styles.statusMessage}>表示できる先生がありません。</p>
      ) : (
        <FacilitatorTable facilitators={facilitators.facilitators} />
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
