import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { filterPartnerExamples } from "./offers";

describe("partner offer search", () => {
  it("filters by activity", () => {
    assert.deepEqual(filterPartnerExamples("Nettoyage", "").map((o) => o.id), ["exemple-nettoyage-casablanca"]);
  });
  it("filters by city", () => {
    assert.deepEqual(filterPartnerExamples("", "Rabat").map((o) => o.id), ["exemple-impression-rabat"]);
  });
  it("requires both activity and city to match", () => {
    assert.equal(filterPartnerExamples("Nettoyage", "Rabat").length, 0);
    assert.equal(filterPartnerExamples("Nettoyage", "Casablanca").length, 1);
  });
  it("shows all three examples without filters", () => {
    assert.equal(filterPartnerExamples("", "").length, 3);
  });
});