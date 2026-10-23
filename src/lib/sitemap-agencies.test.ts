import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { publishedAgencySitemapEntries } from "./sitemap-agencies";

describe("public agency sitemap", () => {
  it("includes each published detail in French and Arabic", async () => {
    assert.deepEqual(await publishedAgencySitemapEntries(async () => [{ slug: "asomovit-nettoyage" }]), [
      { path: "/services/asomovit-nettoyage" }, { path: "/ar/services/asomovit-nettoyage" },
    ]);
  });
  it("paginates beyond the first 500 published records", async () => {
    const ranges: number[][] = [];
    const entries = await publishedAgencySitemapEntries(async (from, to) => {
      ranges.push([from, to]);
      return from === 0 ? Array.from({ length: 500 }, (_, i) => ({ slug: `agency-${i}` })) : [{ slug: "last-agency" }];
    });
    assert.deepEqual(ranges, [[0, 499], [500, 999]]);
    assert.equal(entries.length, 1002);
    assert.equal(entries.at(-1)?.path, "/ar/services/last-agency");
  });
  it("rejects failures instead of returning a partial sitemap", async () => {
    await assert.rejects(publishedAgencySitemapEntries(async (from) => {
      if (from > 0) throw new Error("source unavailable");
      return Array.from({ length: 500 }, (_, i) => ({ slug: `agency-${i}` }));
    }), /source unavailable/);
  });
  it("does not invent entries when no published agencies exist", async () => {
    assert.deepEqual(await publishedAgencySitemapEntries(async () => []), []);
  });
  it("rejects slugs that could escape the agency route", async () => {
    await assert.rejects(publishedAgencySitemapEntries(async () => [{ slug: "../inscription" }]), /Invalid/);
  });
});