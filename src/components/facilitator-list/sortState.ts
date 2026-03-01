import type { FacilitatorSortKey } from "../../api/facilitators";

export type FacilitatorSort = {
  key: FacilitatorSortKey;
  order: "asc" | "desc";
};

export function getNextSortState(
  current: FacilitatorSort | undefined,
  clickedColumn: FacilitatorSortKey,
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
