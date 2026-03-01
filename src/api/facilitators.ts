import { ApiError } from "./errors";
import type { SortKey, SortOrder } from "../types";

const FACILITATORS_ENDPOINT = "/api/facilitators";

export type GetFacilitatorsParams = {
  page?: number;
  limit?: number;
  sort?: SortKey;
  order?: SortOrder;
  search?: string;
};

export type GetFacilitatorsResponse = {
  data: {
    id: number;
    name: string;
    loginId: string;
  }[];
  totalCount: number;
};

/**
 * APIから先生の一覧を取得するクライアント
 * 各パラメータは任意
 */
export async function getFacilitators(
  params: GetFacilitatorsParams = {},
): Promise<GetFacilitatorsResponse> {
  const { page, limit, sort, order, search } = params;

  const searchTerm = search?.trim();
  const query = new URLSearchParams(
    Object.entries({
      page: page?.toString(),
      limit: limit?.toString(),
      sort,
      order,
      search: searchTerm || undefined,
    }).filter((entry): entry is [string, string] => entry[1] !== undefined),
  );

  const requestUrl = query.size
    ? `${FACILITATORS_ENDPOINT}?${query.toString()}`
    : FACILITATORS_ENDPOINT;

  const response = await fetch(requestUrl, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return (await response.json()) as GetFacilitatorsResponse;
}
