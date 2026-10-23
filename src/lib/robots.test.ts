import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";

// A named crawler's group replaces the wildcard group; rules are not inherited.
const robots = readFileSync(new URL("../../public/robots.txt", import.meta.url), "utf8");
function directivesFor(agent: string) {
  const groups = robots.split(/\n\s*\n/).map((group) => group.split("\n"));
  return groups.find((lines) => lines.includes(`User-agent: ${agent}`)) ?? [];
}
describe("public crawler access", () => {
  for (const agent of ["Googlebot", "Bingbot", "*"]) {
    it(`${agent} excludes API paths but allows public pages`, () => {
      const directives = directivesFor(agent);
      assert.ok(directives.includes("Disallow: /api/"));
      assert.ok(directives.includes("Allow: /"));
      assert.equal(directives.includes("Disallow: /"), false);
    });
  }
});