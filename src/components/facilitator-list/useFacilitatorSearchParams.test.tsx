// @vitest-environment jsdom

import { act, renderHook } from "@testing-library/react";
import {
  NuqsTestingAdapter,
  type UrlUpdateEvent,
} from "nuqs/adapters/testing";
import { describe, expect, it, vi } from "vitest";
import type { FacilitatorSort } from "./sortState";
import { useFacilitatorSearchParams } from "./useFacilitatorSearchParams";

describe("useFacilitatorSearchParams", () => {
  it("search クエリパラメータがないときは空文字を返す", () => {
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter searchParams="">{children}</NuqsTestingAdapter>
      ),
    });

    expect(result.current.search).toBe("");
  });

  it("初期の search クエリパラメータの値を返す", () => {
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter searchParams="?search=%E6%9C%A8%E6%9D%91">
          {children}
        </NuqsTestingAdapter>
      ),
    });

    expect(result.current.search).toBe("木村");
  });

  it("検索文字列を trim してクエリ文字列に保持する", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter searchParams="" onUrlUpdate={onUrlUpdate}>
          {children}
        </NuqsTestingAdapter>
      ),
    });

    await act(async () => {
      await result.current.setSearch("  木村  ");
    });

    expect(onUrlUpdate).toHaveBeenCalledOnce();
    expect(onUrlUpdate.mock.calls[0]?.[0].queryString).toBe("?search=木村");
  });

  it("空文字を適用したときは search クエリパラメータを削除する", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter
          searchParams="?search=%E6%9C%A8%E6%9D%91"
          onUrlUpdate={onUrlUpdate}
        >
          {children}
        </NuqsTestingAdapter>
      ),
    });

    await act(async () => {
      await result.current.setSearch("");
    });

    expect(onUrlUpdate).toHaveBeenCalledOnce();
    expect(onUrlUpdate.mock.calls[0]?.[0].queryString).toBe("");
  });

  it("空白文字だけを適用したときは search クエリパラメータを削除する", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter
          searchParams="?search=%E6%9C%A8%E6%9D%91"
          onUrlUpdate={onUrlUpdate}
        >
          {children}
        </NuqsTestingAdapter>
      ),
    });

    await act(async () => {
      await result.current.setSearch("   ");
    });

    expect(onUrlUpdate).toHaveBeenCalledOnce();
    expect(onUrlUpdate.mock.calls[0]?.[0].queryString).toBe("");
  });

  it("検索文字列を適用した後は正規化された値を返す", async () => {
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter searchParams="">{children}</NuqsTestingAdapter>
      ),
    });

    await act(async () => {
      await result.current.setSearch("  木村  ");
    });

    expect(result.current.search).toBe("木村");
  });

  it("sort クエリパラメータがないときは sortKey と sortOrder を返さない", () => {
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter searchParams="">{children}</NuqsTestingAdapter>
      ),
    });

    expect(result.current.sort).toBeUndefined();
  });

  it("初期の sort クエリパラメータから sortKey と sortOrder を返す", () => {
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter searchParams="?sort=loginId&order=desc">
          {children}
        </NuqsTestingAdapter>
      ),
    });

    expect(result.current.sort).toEqual({
      key: "loginId",
      order: "desc",
    });
  });

  it("sort を設定したときは sort と order をクエリ文字列に保持する", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter searchParams="" onUrlUpdate={onUrlUpdate}>
          {children}
        </NuqsTestingAdapter>
      ),
    });
    const nextSort: FacilitatorSort = {
      key: "name",
      order: "asc",
    };

    await act(async () => {
      await result.current.setSort(nextSort);
    });

    expect(onUrlUpdate).toHaveBeenCalledOnce();
    expect(onUrlUpdate.mock.calls[0]?.[0].queryString).toBe(
      "?sort=name&order=asc",
    );
    expect(result.current.sort).toEqual({
      key: "name",
      order: "asc",
    });
  });

  it("sort を変更したときは sort と order のクエリ文字列を更新する", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter
          searchParams="?sort=name&order=asc"
          onUrlUpdate={onUrlUpdate}
        >
          {children}
        </NuqsTestingAdapter>
      ),
    });
    const nextSort: FacilitatorSort = {
      key: "name",
      order: "desc",
    };

    await act(async () => {
      await result.current.setSort(nextSort);
    });

    expect(onUrlUpdate).toHaveBeenCalledOnce();
    expect(onUrlUpdate.mock.calls[0]?.[0].queryString).toBe(
      "?sort=name&order=desc",
    );
    expect(result.current.sort).toEqual({
      key: "name",
      order: "desc",
    });
  });

  it("sort を解除したときは sort と order をクエリ文字列から削除する", async () => {
    const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();
    const { result } = renderHook(() => useFacilitatorSearchParams(), {
      wrapper: ({ children }) => (
        <NuqsTestingAdapter
          searchParams="?search=%E6%9C%A8%E6%9D%91&sort=name&order=desc"
          onUrlUpdate={onUrlUpdate}
        >
          {children}
        </NuqsTestingAdapter>
      ),
    });

    await act(async () => {
      await result.current.setSort(undefined);
    });

    expect(onUrlUpdate).toHaveBeenCalledOnce();
    expect(onUrlUpdate.mock.calls[0]?.[0].queryString).toBe("?search=木村");
    expect(result.current.sort).toBeUndefined();
  });
});
