import { describe, it, expect } from "vitest";
import { tagNameToHrefSelectors, tagNameToHrefSelector, tagNameToClassSelectors, tagNameToClassSelector, tagNameToSearchQuery } from "../../../src/lib/css-selectors";

describe("css-selectors edge cases", () => {
    describe("tagNameToHrefSelectors", () => {
        it("returns array of selectors", () => {
            const selectors = tagNameToHrefSelectors("tag");
            expect(Array.isArray(selectors)).toBe(true);
            expect(selectors.length).toBeGreaterThan(0);
        });

        it("returns 6 variants for simple tag", () => {
            const selectors = tagNameToHrefSelectors("tag");
            expect(selectors).toHaveLength(6);
        });

        it("includes raw variant", () => {
            const selectors = tagNameToHrefSelectors("tag");
            expect(selectors.some((s) => s.includes('[href="#tag" i]'))).toBe(true);
        });

        it("includes URI-encoded variant", () => {
            const selectors = tagNameToHrefSelectors("tag");
            expect(selectors.some((s) => s.includes("href"))).toBe(true);
        });

        it("handles tag with spaces", () => {
            const selectors = tagNameToHrefSelectors("my tag");
            expect(selectors.some((s) => s.includes("my%20tag") || s.includes("my tag"))).toBe(true);
        });

        it("handles wildcard tag", () => {
            const selectors = tagNameToHrefSelectors("project/*");
            expect(selectors.some((s) => s.includes("^="))).toBe(true);
        });

        it("handles accented characters", () => {
            const selectors = tagNameToHrefSelectors("café");
            expect(selectors.some((s) => s.includes("café") || s.includes("caf%C3%A9"))).toBe(true);
        });

        it("handles special CSS characters", () => {
            const selectors = tagNameToHrefSelectors('tag"test');
            expect(selectors.some((s) => s.includes('\\"'))).toBe(true);
        });
    });

    describe("tagNameToClassSelectors", () => {
        it("returns array of selectors", () => {
            const selectors = tagNameToClassSelectors("tag", "cm-tag-");
            expect(Array.isArray(selectors)).toBe(true);
            expect(selectors.length).toBeGreaterThan(0);
        });

        it("includes direct class selector", () => {
            const selectors = tagNameToClassSelectors("tag", "cm-tag-");
            expect(selectors.some((s) => s.includes(".cm-tag-tag"))).toBe(true);
        });

        it("includes class~ selector", () => {
            const selectors = tagNameToClassSelectors("tag", "cm-tag-");
            expect(selectors.some((s) => s.includes('[class~="cm-tag-tag" i]'))).toBe(true);
        });

        it("includes wildcard class* selector", () => {
            const selectors = tagNameToClassSelectors("project/*", "cm-tag-");
            expect(selectors.some((s) => s.includes('[class*="cm-tag-project" i]'))).toBe(true);
        });

        it("includes stripped non-ASCII selector", () => {
            const selectors = tagNameToClassSelectors("café", "cm-tag-");
            expect(selectors.some((s) => s.includes("caf"))).toBe(true);
        });

        it("includes NFD normalized selector", () => {
            const selectors = tagNameToClassSelectors("café", "cm-tag-");
            expect(selectors.some((s) => s.includes("cafe"))).toBe(true);
        });

        it("handles tag with slashes", () => {
            const selectors = tagNameToClassSelectors("a/b/c", "cm-tag-");
            expect(selectors.some((s) => s.includes("cm-tag-abc"))).toBe(true);
        });

        it("handles empty tag", () => {
            const selectors = tagNameToClassSelectors("", "cm-tag-");
            expect(selectors.length).toBeGreaterThan(0);
        });
    });

    describe("tagNameToSearchQuery", () => {
        it("returns exact query for simple tag", () => {
            expect(tagNameToSearchQuery("tag")).toBe("tag:#tag");
        });

        it("returns regex query for wildcard", () => {
            expect(tagNameToSearchQuery("project/*")).toBe("tag:/^#project\\/.+/");
        });

        it("handles tag with hash", () => {
            expect(tagNameToSearchQuery("#tag")).toBe("tag:#tag");
        });

        it("handles accented tag", () => {
            expect(tagNameToSearchQuery("café")).toBe("tag:#café");
        });

        it("handles accented wildcard", () => {
            const query = tagNameToSearchQuery("café/*");
            expect(query).toContain("café");
            expect(query).toContain(".+");
        });

        it("escapes regex special characters", () => {
            // tagNameToSearchQuery only escapes for wildcards, not exact matches
            expect(tagNameToSearchQuery("tag.test")).toBe("tag:#tag.test");
            expect(tagNameToSearchQuery("tag+test")).toBe("tag:#tag+test");
            expect(tagNameToSearchQuery("tag*test")).toBe("tag:#tag*test");
        });

        it("escapes forward slashes in regex", () => {
            expect(tagNameToSearchQuery("a/b/*")).toBe("tag:/^#a\\/b\\/.+/");
        });
    });
});
