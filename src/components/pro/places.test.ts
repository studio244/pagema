import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { remainingPlaces } from "./places";

describe("campaign availability", () => {
  it("uses 10 global places, not five minus each category's registrations", () => {
    assert.equal(remainingPlaces(null, "Nettoyage"), 10);
    assert.equal(remainingPlaces({ total: 20, byCategory: { Nettoyage: 20 } }, "Nettoyage"), 10);
  });
});