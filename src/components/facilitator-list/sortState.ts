import type { FacilitatorSortKey } from "../../api/facilitators";

export type FacilitatorSortState = {
  sortKey?: FacilitatorSortKey;
  sortOrder?: "asc" | "desc";
};

export function getNextSortState(
  current: FacilitatorSortState,
  clickedColumn: FacilitatorSortKey,
): FacilitatorSortState {
  if (current.sortKey !== clickedColumn) {
    return {
      sortKey: clickedColumn,
      sortOrder: "asc",
    };
  }

  if (current.sortOrder === "asc") {
    return {
      sortKey: clickedColumn,
      sortOrder: "desc",
    };
  }

  if (current.sortOrder === "desc") {
    return {
      sortKey: undefined,
      sortOrder: undefined,
    };
  }

  return {
    sortKey: clickedColumn,
    sortOrder: "asc",
  };
}
