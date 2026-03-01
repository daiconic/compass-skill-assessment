// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("endAdornment を渡すと右側に描画される", () => {
    render(
      <TextInput
        endAdornment={<button type="button" aria-label="検索" />}
      />,
    );

    expect(screen.getByRole("button", { name: "検索" })).toBeTruthy();
  });
});
