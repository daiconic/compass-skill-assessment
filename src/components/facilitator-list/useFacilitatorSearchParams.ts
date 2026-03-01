import { useQueryState } from "nuqs";

export type UseFacilitatorSearchParamsResult = {
  search: string;
  setSearch: (rawValue: string) => Promise<URLSearchParams>;
};

/**
 * 検索条件をクエリパラメータで扱うhook
 */
export function useFacilitatorSearchParams(): UseFacilitatorSearchParamsResult {
  const [search, setQuerySearch] = useQueryState("search", {
    defaultValue: "",
  });

  function setSearch(rawValue: string) {
    const normalized = rawValue.trim();

    return setQuerySearch(normalized === "" ? null : normalized);
  }

  return {
    search,
    setSearch,
  };
}
