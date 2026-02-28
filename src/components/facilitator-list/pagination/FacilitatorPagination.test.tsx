// @vitest-environment jsdom
import type { ComponentProps } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import styles from "./FacilitatorPagination.module.css";
import { FacilitatorPagination } from "./FacilitatorPagination";

const defaultProps: ComponentProps<typeof FacilitatorPagination> = {
  currentPage: 3,
  totalPages: 5,
  hasPrev: true,
  hasNext: true,
  onPageChange: vi.fn(),
};

afterEach(() => {
  cleanup();
});

describe("FacilitatorPagination", () => {
  it("totalPages の数だけページ番号ボタンが表示される", () => {
    render(
      <FacilitatorPagination
        {...defaultProps}
        totalPages={5}
      />,
    );

    expect(screen.getByRole("button", { name: "1" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "2" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "3" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "4" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "5" })).toBeTruthy();
  });

  it("currentPage のページ番号だけ selected クラスを持つ", () => {
    render(
      <FacilitatorPagination
        {...defaultProps}
        currentPage={3}
      />,
    );

    const currentPageButton = screen.getByRole("button", { name: "3" });
    const otherPageButton = screen.getByRole("button", { name: "2" });

    expect(currentPageButton.classList.contains(styles.selected)).toBe(true);
    expect(otherPageButton.classList.contains(styles.selected)).toBe(false);
  });

  it('nav に aria-label="ページネーション" がある', () => {
    render(
      <FacilitatorPagination
        {...defaultProps}
      />,
    );

    expect(screen.getByRole("navigation", { name: "ページネーション" })).toBeTruthy();
  });

  it("hasPrev=false のとき前へボタンが disabled になる", () => {
    render(<FacilitatorPagination {...defaultProps} hasPrev={false} />);

    expect((screen.getByRole("button", { name: "←" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("hasNext=false のとき次へボタンが disabled になる", () => {
    render(<FacilitatorPagination {...defaultProps} hasNext={false} />);

    expect((screen.getByRole("button", { name: "→" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("hasPrev=true のとき前へボタンは disabled ではない", () => {
    render(<FacilitatorPagination {...defaultProps} hasPrev />);

    expect((screen.getByRole("button", { name: "←" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("hasNext=true のとき次へボタンは disabled ではない", () => {
    render(<FacilitatorPagination {...defaultProps} hasNext />);

    expect((screen.getByRole("button", { name: "→" }) as HTMLButtonElement).disabled).toBe(false);
  });

  it("前へボタン押下で currentPage - 1 が onPageChange に渡る", () => {
    const onPageChange = vi.fn();

    render(
      <FacilitatorPagination
        {...defaultProps}
        currentPage={3}
        hasPrev
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "←" }));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("次へボタン押下で currentPage + 1 が onPageChange に渡る", () => {
    const onPageChange = vi.fn();

    render(
      <FacilitatorPagination
        {...defaultProps}
        currentPage={3}
        hasNext
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "→" }));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("ページ番号ボタン押下でそのページ番号が onPageChange に渡る", () => {
    const onPageChange = vi.fn();

    render(
      <FacilitatorPagination
        {...defaultProps}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "4" }));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("disabled の前へボタンを押しても onPageChange は呼ばれない", () => {
    const onPageChange = vi.fn();

    render(
      <FacilitatorPagination
        {...defaultProps}
        hasPrev={false}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "←" }));

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disabled の次へボタンを押しても onPageChange は呼ばれない", () => {
    const onPageChange = vi.fn();

    render(
      <FacilitatorPagination
        {...defaultProps}
        hasNext={false}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "→" }));

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
