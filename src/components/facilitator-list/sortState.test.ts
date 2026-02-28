import { describe, expect, it } from "vitest";
import { getNextSortState } from "./sortState";

describe("getNextSortState", () => {
  it("starts ascending when no sort is active", () => {
    expect(getNextSortState({}, "name")).toEqual({
      sortKey: "name",
      sortOrder: "asc",
    });
  });

  it("toggles to descending when the same column is clicked from ascending", () => {
    expect(
      getNextSortState(
        {
          sortKey: "name",
          sortOrder: "asc",
        },
        "name",
      ),
    ).toEqual({
      sortKey: "name",
      sortOrder: "desc",
    });
  });

  it("clears sorting when the same column is clicked from descending", () => {
    expect(
      getNextSortState(
        {
          sortKey: "name",
          sortOrder: "desc",
        },
        "name",
      ),
    ).toEqual({
      sortKey: undefined,
      sortOrder: undefined,
    });
  });

  it("switches to ascending when a different column is clicked", () => {
    expect(
      getNextSortState(
        {
          sortKey: "name",
          sortOrder: "desc",
        },
        "loginId",
      ),
    ).toEqual({
      sortKey: "loginId",
      sortOrder: "asc",
    });
  });
});
