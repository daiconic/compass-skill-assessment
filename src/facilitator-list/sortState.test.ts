import { describe, expect, it } from "vitest";
import { getNextSortState } from "./sortState";

describe("getNextSortState", () => {
  it("starts ascending when no sort is active", () => {
    expect(getNextSortState(undefined, "name")).toEqual({
      key: "name",
      order: "asc",
    });
  });

  it("toggles to descending when the same column is clicked from ascending", () => {
    expect(
      getNextSortState(
        {
          key: "name",
          order: "asc",
        },
        "name",
      ),
    ).toEqual({
      key: "name",
      order: "desc",
    });
  });

  it("clears sorting when the same column is clicked from descending", () => {
    expect(
      getNextSortState(
        {
          key: "name",
          order: "desc",
        },
        "name",
      ),
    ).toBeUndefined();
  });

  it("switches to ascending when a different column is clicked", () => {
    expect(
      getNextSortState(
        {
          key: "name",
          order: "desc",
        },
        "loginId",
      ),
    ).toEqual({
      key: "loginId",
      order: "asc",
    });
  });
});
