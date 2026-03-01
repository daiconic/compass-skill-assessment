// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FacilitatorSearchForm } from "./FacilitatorSearchForm";

afterEach(() => {
  cleanup();
});

describe("FacilitatorSearchForm", () => {
  it("submit 時に入力中の検索クエリを onSubmit に渡す", () => {
    const onSubmit = vi.fn();

    render(
      <FacilitatorSearchForm
        defaultValue=""
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "山田 太郎",
      },
    });
    fireEvent.submit(screen.getByRole("textbox").closest("form")!);

    expect(onSubmit).toHaveBeenCalledWith("山田 太郎");
  });

  it("入力が空でも空文字列を onSubmit に渡す", () => {
    const onSubmit = vi.fn();

    render(
      <FacilitatorSearchForm
        defaultValue=""
        onSubmit={onSubmit}
      />,
    );

    fireEvent.submit(screen.getByRole("textbox").closest("form")!);

    expect(onSubmit).toHaveBeenCalledWith("");
  });
});
