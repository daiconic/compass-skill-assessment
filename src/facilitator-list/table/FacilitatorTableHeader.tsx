import type { SortKey, SortOrder } from "../../types";
import angleDownIcon from "../../assets/icon-angle-down.svg";
import styles from "./FacilitatorTable.module.css";

type FacilitatorTableHeaderProps = {
  sortKey?: SortKey;
  sortOrder?: SortOrder;
  onSortChange?: (column: SortKey) => void;
};

export function FacilitatorTableHeader({
  sortKey,
  sortOrder,
  onSortChange,
}: FacilitatorTableHeaderProps) {
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
      <th>
        <div
          className={`${styles.headerButton} ${styles.headerButtonInactive}`}
          aria-hidden="true"
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

function getHeaderButtonClassName(isActive: boolean) {
  return [
    styles.headerButton,
    isActive ? styles.headerButtonActive : styles.headerButtonInactive,
  ].join(" ");
}

function getSortIconClassName(isActive: boolean, activeSortOrder?: SortOrder) {
  if (!isActive) {
    return [styles.sortIcon, styles.sortIconNeutral].join(" ");
  }

  const sortStateClassName =
    activeSortOrder === "asc" ? styles.sortIconAsc : styles.sortIconDesc;

  return [styles.sortIcon, sortStateClassName].join(" ");
}

function HeaderButton({
  label,
  column,
  activeSortKey,
  activeSortOrder,
  onClick,
}: HeaderButtonProps) {
  const isActive = activeSortKey === column;
  const headerButtonClassName = getHeaderButtonClassName(isActive);
  const sortIconClassName = getSortIconClassName(isActive, activeSortOrder);

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
