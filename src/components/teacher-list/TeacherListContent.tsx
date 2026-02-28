import { useState } from "react";
import useSWR from "swr";
import styles from "./TeacherListContent.module.css";
import { TeacherListHeader } from "./header/TeacherListHeader";
import { TeacherPagination } from "./pagination/TeacherPagination";
import { TeacherTable } from "./table/TeacherTable";
import { getFacilitators } from "../../api/facilitators";
import type { Teacher } from "../../types";

const PAGE_SIZE = 20;

export function TeacherListContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    ["facilitators", currentPage],
    () => getFacilitators({ page: currentPage, limit: PAGE_SIZE }),
  );

  const teachers: Teacher[] = data?.data ?? [];
  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE));

  return (
    <main className={styles.content}>
      <TeacherListHeader title="先生一覧" />
      {isLoading ? (
        <p className={styles.statusMessage}>読み込み中...</p>
      ) : error ? (
        <p className={styles.statusMessage}>先生一覧の取得に失敗しました。</p>
      ) : teachers.length === 0 ? (
        <p className={styles.statusMessage}>表示できる先生がありません。</p>
      ) : (
        <TeacherTable teachers={teachers} />
      )}
      <TeacherPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrev={currentPage > 1}
        hasNext={currentPage < totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
