import { describe, expect, it } from "bun:test";
import { FREE_MONTH_PLACES_REMAINING } from "./free-month-offer";

describe("free first month campaign", () => {
  it("has 10 remaining places across the campaign", () => {
    expect(FREE_MONTH_PLACES_REMAINING).toBe(10);
  });
});