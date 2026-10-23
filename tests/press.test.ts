import { describe, expect, it } from "vitest";
import { SEED, addItem, clipCount, parseItems, removeItem, searchItems } from "@/lib/press";

describe("parseItems", () => {
  it("ignores missing, broken and non-array storage instead of crashing the index", () => {
    // Regression: the page cast JSON.parse(raw) as PressItem[] and then called .filter on it.
    expect(parseItems(null)).toBeNull();
    expect(parseItems("{")).toBeNull();
    expect(parseItems('{"title":"x"}')).toBeNull();
  });

  it("drops clippings with an unknown status or missing fields", () => {
    expect(parseItems(JSON.stringify([SEED[0], { ...SEED[1], status: "Viral" }, { id: "3" }]))).toEqual([SEED[0]]);
  });
});

describe("searchItems", () => {
  it("searches title, detail and status, case-insensitive and trimmed", () => {
    expect(searchItems(SEED, " PITCH ").map((i) => i.id)).toEqual(["2"]);
    expect(searchItems(SEED, "interview").map((i) => i.id)).toEqual(["1"]);
    expect(searchItems(SEED, "")).toHaveLength(2);
    expect(searchItems(SEED, "podcast")).toEqual([]);
  });
});

describe("addItem / removeItem", () => {
  it("adds a trimmed clipping first and fills an empty detail", () => {
    const next = addItem(SEED, { title: "  Radio spot ", body: " ", status: "Archive" }, "c3", 9);
    expect(next[0]).toEqual({ id: "c3", title: "Radio spot", body: "No detail added", status: "Archive", createdAt: 9 });
  });

  it("refuses a blank title and removes by id", () => {
    expect(addItem(SEED, { title: " ", body: "x", status: "Pitch" }, "c4", 1)).toBe(SEED);
    expect(removeItem(SEED, "1").map((i) => i.id)).toEqual(["2"]);
  });
});

describe("clipCount", () => {
  it("uses the singular for one clip", () => {
    expect(clipCount(1)).toBe("1 LOCAL CLIP");
    expect(clipCount(0)).toBe("0 LOCAL CLIPS");
    expect(clipCount(2)).toBe("2 LOCAL CLIPS");
  });
});
