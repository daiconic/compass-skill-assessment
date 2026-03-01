// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FacilitatorListContent } from "./FacilitatorListContent";
import { useFacilitatorSearchParams } from "./useFacilitatorSearchParams";
import { useFacilitators } from "../../hooks/useFacilitators";

vi.mock("../../hooks/useFacilitators", () => ({
  useFacilitators: vi.fn(),
}));

vi.mock("./useFacilitatorSearchParams", () => ({
  useFacilitatorSearchParams: vi.fn(),
}));

const mockedUseFacilitators = vi.mocked(useFacilitators);
const mockedUseFacilitatorSearchParams = vi.mocked(useFacilitatorSearchParams);

function mockSearchParams() {
  mockedUseFacilitatorSearchParams.mockReturnValue({
    page: 1,
    search: "",
    sort: undefined,
    setPage: vi.fn(),
    setSearch: vi.fn(),
    setSort: vi.fn(),
  });
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("FacilitatorListContent", () => {
  it("loading 状態ではローディング用コンポーネントを表示しページネーションは表示しない", () => {
    mockSearchParams();
    mockedUseFacilitators.mockReturnValue({
      status: "loading",
    });

    render(<FacilitatorListContent />);

    expect(screen.getByRole("heading", { name: "先生一覧" })).toBeTruthy();
    expect(screen.getByText("読み込み中...")).toBeTruthy();
    expect(screen.getByText("読み込み中...").parentElement?.getAttribute("aria-busy")).toBe("true");
    expect(screen.queryByRole("navigation", { name: "ページネーション" })).toBeNull();
  });

  it("error 状態ではエラーメッセージを表示しページネーションは表示しない", () => {
    mockSearchParams();
    mockedUseFacilitators.mockReturnValue({
      status: "error",
      error: new Error("failed"),
    });

    render(<FacilitatorListContent />);

    expect(screen.getByText("先生一覧の取得に失敗しました。")).toBeTruthy();
    expect(screen.queryByRole("navigation", { name: "ページネーション" })).toBeNull();
  });

  it("success で該当データがない時はページネーションを表示しない", () => {
    mockSearchParams();
    mockedUseFacilitators.mockReturnValue({
      status: "success",
      facilitators: [],
      totalPages: 3,
    });

    render(<FacilitatorListContent />);

    expect(screen.getByText("該当するデータはありません")).toBeTruthy();
    expect(screen.queryByRole("navigation", { name: "ページネーション" })).toBeNull();
  });

  it("success で該当データがある時はページネーションを表示する", () => {
    mockSearchParams();
    mockedUseFacilitators.mockReturnValue({
      status: "success",
      facilitators: [
        {
          id: 1,
          name: "山田 太郎",
          loginId: "yamada",
        },
      ],
      totalPages: 3,
    });

    render(<FacilitatorListContent />);

    expect(screen.getByText("山田 太郎")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeTruthy();
  });
});
