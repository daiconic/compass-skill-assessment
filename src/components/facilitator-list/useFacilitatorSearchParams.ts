import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import type { FacilitatorSort } from "./sortState";

export type UseFacilitatorSearchParamsResult = {
  page: number;
  search: string;
  sort?: FacilitatorSort;
  setPage: (nextPage: number) => Promise<URLSearchParams>;
  setSearch: (rawValue: string) => Promise<URLSearchParams>;
  setSort: (nextSort: FacilitatorSort | undefined) => Promise<URLSearchParams>;
};

function normalizePage(page: number) {
  return Math.max(1, page);
}

/**
 * 検索条件をクエリパラメータで扱うhook
 */
export function useFacilitatorSearchParams(): UseFacilitatorSearchParamsResult {
  const [params, setParams] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    sort: parseAsStringLiteral(["name", "loginId"] as const),
    order: parseAsStringLiteral(["asc", "desc"] as const),
  });

  function setPage(nextPage: number) {
    return setParams({
      page: normalizePage(nextPage),
    });
  }

  function setSearch(rawValue: string) {
    const normalized = rawValue.trim();

    return setParams({
      page: 1,
      search: normalized === "" ? null : normalized,
    });
  }

  function setSort(nextSort: FacilitatorSort | undefined) {
    return setParams({
      page: 1,
      sort: nextSort?.key ?? null,
      order: nextSort?.order ?? null,
    });
  }

  const sort =
    params.sort && params.order
      ? {
          key: params.sort,
          order: params.order,
        }
      : undefined;

  return {
    page: normalizePage(params.page),
    search: params.search,
    sort,
    setPage,
    setSearch,
    setSort,
  };
}
