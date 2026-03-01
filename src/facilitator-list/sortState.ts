import type { SortKey, SortOrder } from "../types";

export type FacilitatorSort = {
  key: SortKey;
  order: SortOrder;
};

export function getNextSortState(
  current: FacilitatorSort | undefined,
  clickedColumn: SortKey,
): FacilitatorSort | undefined {
  if (current?.key !== clickedColumn) {
    return {
      key: clickedColumn,
      order: "asc",
    };
  }

  if (current.order === "asc") {
    return {
      key: clickedColumn,
      order: "desc",
    };
  }

  if (current.order === "desc") {
    return undefined;
  }

  return {
    key: clickedColumn,
    order: "asc",
  };
}
