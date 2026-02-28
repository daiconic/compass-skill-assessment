import { useState } from "react";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorListHeader } from "./header/FacilitatorListHeader";
import { FacilitatorPagination } from "./pagination/FacilitatorPagination";
import { FacilitatorTable } from "./table/FacilitatorTable";
import { useFacilitators } from "../../hooks/useFacilitators";

export function FacilitatorListContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const facilitators = useFacilitators({ page: currentPage });

  const totalPages = facilitators.status === "success" ? facilitators.totalPages : 1;
  const hasNext =
    facilitators.status === "success" && currentPage < facilitators.totalPages;

  return (
    <main className={styles.content}>
      <FacilitatorListHeader title="先生一覧" />
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
