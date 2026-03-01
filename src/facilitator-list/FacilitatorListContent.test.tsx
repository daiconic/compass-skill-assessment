// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FacilitatorListContent } from "./FacilitatorListContent";
import { useFacilitators } from "../hooks/useFacilitators";

vi.mock("../hooks/useFacilitators", () => ({
  FACILITATOR_PAGE_SIZE: 20,
  useFacilitators: vi.fn(),
}));

const mockedUseFacilitators = vi.mocked(useFacilitators);

const defaultProps: ComponentProps<typeof FacilitatorListContent> = {
  page: 1,
  search: "",
  sort: undefined,
  setPage: vi.fn(),
  setSort: vi.fn(),
};

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("FacilitatorListContent", () => {
  it("loading 状態ではローディング用コンポーネントを表示しページネーションは表示しない", () => {
    mockedUseFacilitators.mockReturnValue({
      status: "loading",
    });

    render(<FacilitatorListContent {...defaultProps} />);

    expect(screen.getByText("読み込み中...")).toBeTruthy();
    expect(screen.getByText("読み込み中...").parentElement?.getAttribute("aria-busy")).toBe("true");
    expect(screen.queryByRole("navigation", { name: "ページネーション" })).toBeNull();
  });

  it("error 状態ではエラーダイアログを表示しページネーションは表示しない", () => {
    const retry = vi.fn();

    mockedUseFacilitators.mockReturnValue({
      status: "error",
      error: new Error("failed"),
      retry,
    });

    render(<FacilitatorListContent {...defaultProps} />);

    expect(screen.getByRole("alertdialog")).toBeTruthy();
    expect(screen.getByText("通信エラーが発生しました。")).toBeTruthy();
    expect(screen.getByRole("button", { name: "リトライ" })).toBeTruthy();
    expect(screen.queryByRole("navigation", { name: "ページネーション" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "リトライ" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("success で該当データがない時はページネーションを表示しない", () => {
    mockedUseFacilitators.mockReturnValue({
      status: "success",
      facilitators: [],
      totalCount: 0,
      totalPages: 3,
    });

    render(<FacilitatorListContent {...defaultProps} />);

    expect(screen.getByText("該当するデータはありません")).toBeTruthy();
    expect(screen.queryByRole("navigation", { name: "ページネーション" })).toBeNull();
  });

  it("success で該当データがある時はページネーションを表示する", () => {
    mockedUseFacilitators.mockReturnValue({
      status: "success",
      facilitators: [
        {
          id: 1,
          name: "山田 太郎",
          loginId: "yamada",
        },
      ],
      totalCount: 21,
      totalPages: 3,
    });

    render(<FacilitatorListContent {...defaultProps} />);

    expect(screen.getByText("山田 太郎")).toBeTruthy();
    expect(screen.getByText("21件中 1〜1件を表示")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeTruthy();
  });
});
