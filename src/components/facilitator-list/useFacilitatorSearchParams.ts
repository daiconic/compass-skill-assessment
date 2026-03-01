import { parseAsStringLiteral, useQueryState, useQueryStates } from "nuqs";
import type { FacilitatorSort } from "./sortState";

export type UseFacilitatorSearchParamsResult = {
  search: string;
  sort?: FacilitatorSort;
  setSearch: (rawValue: string) => Promise<URLSearchParams>;
  setSort: (nextSort: FacilitatorSort | undefined) => Promise<URLSearchParams>;
};

/**
 * 検索条件をクエリパラメータで扱うhook
 */
export function useFacilitatorSearchParams(): UseFacilitatorSearchParamsResult {
  const [search, setQuerySearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [sortState, setQuerySortState] = useQueryStates({
    sort: parseAsStringLiteral(["name", "loginId"] as const),
    order: parseAsStringLiteral(["asc", "desc"] as const),
  });

  function setSearch(rawValue: string) {
    const normalized = rawValue.trim();

    return setQuerySearch(normalized === "" ? null : normalized);
  }

  function setSort(nextSort: FacilitatorSort | undefined) {
    return setQuerySortState({
      sort: nextSort?.key ?? null,
      order: nextSort?.order ?? null,
    });
  }

  const sort =
    sortState.sort && sortState.order
      ? {
          key: sortState.sort,
          order: sortState.order,
        }
      : undefined;

  return {
    search,
    sort,
    setSearch,
    setSort,
  };
}
