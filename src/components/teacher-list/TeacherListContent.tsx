import styles from "./TeacherListContent.module.css";
import { TeacherListHeader } from "./header/TeacherListHeader";
import { TeacherPagination } from "./pagination/TeacherPagination";
import { TeacherTable } from "./table/TeacherTable";
import type { Teacher } from "../../types";

const dummies: Teacher[] = [
  { id: 1, name: "先生1", loginId: "teacher1" },
  { id: 2, name: "先生2", loginId: "teacher2" },
  { id: 3, name: "先生3", loginId: "teacher3" },
  { id: 4, name: "先生4", loginId: "teacher4" },
  { id: 5, name: "先生5", loginId: "teacher5" },
];

export function TeacherListContent() {
  return (
    <main className={styles.content}>
      <TeacherListHeader title="先生一覧" />
      <TeacherTable teachers={dummies} />
      <TeacherPagination
        currentPage={1}
        totalPages={5}
        hasPrev={false}
        hasNext
      />
    </main>
  );
}
