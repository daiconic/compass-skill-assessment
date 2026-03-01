import type {
  Facilitator,
  SortKey,
  SortOrder,
} from "../../../types";
import angleDownIcon from "../../../assets/icon-angle-down.svg";
import styles from "./FacilitatorTable.module.css";

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
        </colgroup>
        <thead>
          <TableHeaderRow
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

type TableHeaderRowProps = Pick<
  FacilitatorTableProps,
  "sortKey" | "sortOrder" | "onSortChange"
>;

function TableHeaderRow({
  sortKey,
  sortOrder,
  onSortChange,
}: TableHeaderRowProps) {
  return (
    <tr>
      <th>
        <HeaderButton
          label="名前"
          column="name"
          activeSortKey={sortKey}
          activeSortOrder={sortOrder}
          onClick={onSortChange}
        />
      </th>
      <th>
        <HeaderButton
          label="ログインID"
          column="loginId"
          activeSortKey={sortKey}
          activeSortOrder={sortOrder}
          onClick={onSortChange}
        />
      </th>
    </tr>
  );
}

type HeaderButtonProps = {
  label: string;
  column: SortKey;
  activeSortKey?: SortKey;
  activeSortOrder?: SortOrder;
  onClick?: (column: SortKey) => void;
};

function HeaderButton({
  label,
  column,
  activeSortKey,
  activeSortOrder,
  onClick,
}: HeaderButtonProps) {
  const isActive = activeSortKey === column;
  const headerButtonClassName = [
    styles.headerButton,
    isActive ? styles.headerButtonActive : styles.headerButtonInactive,
  ].join(" ");
  const sortIconClassName = [
    styles.sortIcon,
    !isActive
      ? styles.sortIconNeutral
      : activeSortOrder === "asc"
        ? styles.sortIconAsc
        : styles.sortIconDesc,
  ].join(" ");

  return (
    <button
      type="button"
      className={headerButtonClassName}
      onClick={() => onClick?.(column)}
    >
      <span className={styles.headerLabel}>{label}</span>
      <img
        className={sortIconClassName}
        src={angleDownIcon}
        alt=""
        aria-hidden="true"
      />
    </button>
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
