import useSWR from "swr";
import { getFacilitators } from "../api/facilitators";
import type { FacilitatorSort } from "../components/facilitator-list/sortState";
import type { Facilitator } from "../types";

export const FACILITATOR_PAGE_SIZE = 20;

export type UseFacilitatorsParams = {
  page: number;
  sort?: FacilitatorSort;
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
      totalCount: number;
      totalPages: number;
    };

/**
 * 先生の一覧を扱うhook
 */
export function useFacilitators({
  page,
  sort,
  search,
}: UseFacilitatorsParams): UseFacilitatorsResult {
  const { data, error, isLoading } = useSWR(
    ["facilitators", page, sort?.key, sort?.order, search],
    () =>
      getFacilitators({
        page,
        limit: FACILITATOR_PAGE_SIZE,
        sort: sort?.key,
        order: sort?.order,
        search,
      }),
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
    totalCount: data!.totalCount,
    totalPages: Math.max(1, Math.ceil(data!.totalCount / FACILITATOR_PAGE_SIZE)),
  };
}
