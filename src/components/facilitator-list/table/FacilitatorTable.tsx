import type {
  Facilitator,
  SortKey,
  SortOrder,
} from "../../../types";
import styles from "./FacilitatorTable.module.css";
import { FacilitatorTableHeader } from "./FacilitatorTableHeader";

type FacilitatorTableProps = {
  facilitators: Facilitator[];
  sortKey?: SortKey;
  sortOrder?: SortOrder;
  onSortChange?: (column: SortKey) => void;
};

export function FacilitatorTable({
  facilitators,
  sortKey,
  sortOrder,
  onSortChange,
}: FacilitatorTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table>
        <colgroup>
          <col className={styles.nameColumn} />
          <col className={styles.loginIdColumn} />
          <col className={styles.emptyColumn} />
        </colgroup>
        <thead>
          <FacilitatorTableHeader
            sortKey={sortKey}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
          />
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

function TableRow({ facilitator }: { facilitator: Facilitator }) {
  return (
    <tr>
      <td>
        <span className={styles.cellText}>{facilitator.name}</span>
      </td>
      <td>
        <span className={styles.cellText}>{facilitator.loginId}</span>
      </td>
      <td />
    </tr>
  );
}
