import useSWR from "swr";
import { getFacilitators } from "../api/facilitators";
import type { Facilitator } from "../types";

const PAGE_SIZE = 20;

export type UseFacilitatorsParams = {
  page: number;
  sort?: "name";
  order?: "asc" | "desc";
  search?: string;
};

export type UseFacilitatorsResult =
  | {
      status: "loading";
    }
  | {
      status: "error";
      error: Error;
    }
  | {
      status: "success";
      facilitators: Facilitator[];
      totalPages: number;
    };

/**
 * 先生の一覧を扱うhook
 */
export function useFacilitators({
  page,
  sort,
  order,
  search,
}: UseFacilitatorsParams): UseFacilitatorsResult {
  const { data, error, isLoading } = useSWR(
    ["facilitators", page, sort, order, search],
    () => getFacilitators({ page, limit: PAGE_SIZE, sort, order, search }),
  );

  if (isLoading) {
    return {
      status: "loading",
    };
  }

  if (error) {
    return {
      status: "error",
      error,
    };
  }

  // keyがnullishになることはないので、データは必ず存在する
  return {
    status: "success",
    facilitators: data!.data,
    totalPages: Math.max(1, Math.ceil(data!.totalCount / PAGE_SIZE)),
  };
}
