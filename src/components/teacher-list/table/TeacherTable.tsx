import type { Teacher } from "../../../types";
import styles from "./TeacherTable.module.css";

type TeacherTableProps = {
  teachers: Teacher[];
};

export function TeacherTable({ teachers }: TeacherTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <TableHeaderRow />
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id} teacher={teacher} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableHeaderRow() {
  return (
    <tr>
      <th>氏名</th>
      <th>ログインID</th>
    </tr>
  );
}

function TableRow({ teacher }: { teacher: Teacher }) {
  return (
    <tr>
      <td>{teacher.name}</td>
      <td>{teacher.loginId}</td>
    </tr>
  );
}
