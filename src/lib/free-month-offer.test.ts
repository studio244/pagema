import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { FREE_MONTH_PLACES_REMAINING } from "./free-month-offer";

describe("free first month campaign", () => {
  it("has 10 remaining places across the campaign", () => {
    assert.equal(FREE_MONTH_PLACES_REMAINING, 10);
  });
});