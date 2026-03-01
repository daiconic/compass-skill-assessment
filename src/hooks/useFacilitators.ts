import { useCallback } from "react";
import useSWR from "swr";
import { getFacilitators } from "../api/facilitators";
import type { FacilitatorSort } from "../facilitator-list/sortState";
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
      retry: () => void;
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
  const { data, error, mutate } = useSWR(
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

  const retry = useCallback(() => {
    void mutate();
  }, [mutate]);

  if (error) {
    return {
      status: "error",
      error,
      retry,
    };
  }

  if (!data) {
    return {
      status: "loading",
    };
  }

  // keyがnullishになることはないので、データは必ず存在する
  return {
    status: "success",
    facilitators: data.data,
    totalCount: data.totalCount,
    totalPages: Math.max(1, Math.ceil(data.totalCount / FACILITATOR_PAGE_SIZE)),
  };
}
