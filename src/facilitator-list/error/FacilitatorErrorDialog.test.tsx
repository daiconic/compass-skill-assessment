// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FacilitatorErrorDialog } from "./FacilitatorErrorDialog";

afterEach(() => {
  cleanup();
});

describe("FacilitatorErrorDialog", () => {
  it("エラーメッセージとリトライボタンを表示する", () => {
    render(<FacilitatorErrorDialog onRetry={vi.fn()} />);

    expect(screen.getByRole("alertdialog")).toBeTruthy();
    expect(screen.getByText("通信エラーが発生しました。")).toBeTruthy();
    expect(screen.getByRole("button", { name: "リトライ" })).toBeTruthy();
  });

  it("リトライボタン押下で onRetry を呼ぶ", () => {
    const onRetry = vi.fn();

    render(<FacilitatorErrorDialog onRetry={onRetry} />);

    fireEvent.click(screen.getByRole("button", { name: "リトライ" }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
