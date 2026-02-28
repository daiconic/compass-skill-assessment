import type { Facilitator } from "../../../types";
import styles from "./FacilitatorTable.module.css";

type FacilitatorTableProps = {
  facilitators: Facilitator[];
};

export function FacilitatorTable({ facilitators }: FacilitatorTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <TableHeaderRow />
        </thead>
        <tbody>
          {facilitators.map((facilitator) => (
            <TableRow key={facilitator.id} facilitator={facilitator} />
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

function TableRow({ facilitator }: { facilitator: Facilitator }) {
  return (
    <tr>
      <td>{facilitator.name}</td>
      <td>{facilitator.loginId}</td>
    </tr>
  );
}
