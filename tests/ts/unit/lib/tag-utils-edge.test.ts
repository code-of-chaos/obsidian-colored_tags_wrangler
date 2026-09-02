import { describe, it, expect } from "vitest";
import { getTags, tagMatchesPattern } from "../../../../src/lib/tag-utils";
import { RGB } from "obsidian";

describe("tag-utils edge cases", () => {
    const color: RGB = { r: 1, g: 2, b: 3 };

    describe("getTags edge cases", () => {
        it("handles empty array", () => {
            expect(getTags([], false, false)).toEqual([]);
        });

        it("handles tag with only whitespace", () => {
            const data = [{ tag_name: "   ", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, false, false)).toEqual([]);
        });

        it("handles tag with only semicolons", () => {
            const data = [{ tag_name: ";;;", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, true, false)).toEqual([]);
        });

        it("handles tag with multiple consecutive separators", () => {
            const data = [{ tag_name: "a;;;b", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, true, false).map((t) => t.tag_name)).toEqual(["a", "b"]);
        });

        it("handles tag starting with separator", () => {
            const data = [{ tag_name: ";a", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, true, false).map((t) => t.tag_name)).toEqual(["a"]);
        });

        it("handles tag ending with separator", () => {
            const data = [{ tag_name: "a;", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, true, false).map((t) => t.tag_name)).toEqual(["a"]);
        });

        it("handles tag with only hash", () => {
            const data = [{ tag_name: "#", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, false, false)).toEqual([]);
        });

        it("handles tag with multiple hashes", () => {
            const data = [{ tag_name: "###tag", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, false, false).map((t) => t.tag_name)).toEqual(["tag"]);
        });

        it("preserves color across many tags", () => {
            const color1: RGB = { r: 1, g: 2, b: 3 };
            const data = [{ tag_name: "a;b;c;d;e", color: color1, background_color: color1, luminance_offset: 0.5 }];
            const result = getTags(data, true, false);
            expect(result).toHaveLength(5);
            result.forEach((r) => {
                expect(r.color).toEqual(color1);
                expect(r.luminance_offset).toBe(0.5);
            });
        });

        it("handles multiple data entries with overlapping tags", () => {
            const data = [
                { tag_name: "a", color, background_color: color, luminance_offset: 0 },
                { tag_name: "a", color, background_color: color, luminance_offset: 0 },
            ];
            expect(getTags(data, false, false)).toHaveLength(2);
        });
    });

    describe("tagMatchesPattern edge cases", () => {
        it("handles empty pattern and tag", () => {
            expect(tagMatchesPattern("", "")).toBe(true);
        });

        it("handles pattern with only wildcard", () => {
            expect(tagMatchesPattern("/*", "anything")).toBe(false);
        });

        it("handles tag with only slash", () => {
            expect(tagMatchesPattern("a/*", "/")).toBe(false);
        });

        it("handles very long tag names", () => {
            const longTag = "a".repeat(1000);
            expect(tagMatchesPattern(`${longTag}/*`, `${longTag}/b`)).toBe(true);
        });

        it("handles unicode in pattern and tag", () => {
            expect(tagMatchesPattern("🎉/*", "🎉/party")).toBe(true);
        });

        it("handles emoji in tag", () => {
            expect(tagMatchesPattern("tag/*", "tag/🎉")).toBe(true);
        });

        it("handles spaces in wildcard prefix", () => {
            expect(tagMatchesPattern("my project/*", "my project/sub")).toBe(true);
            expect(tagMatchesPattern("my project/*", "my project")).toBe(false);
        });

        it("handles dots in tag name", () => {
            expect(tagMatchesPattern("v1.0/*", "v1.0/feature")).toBe(true);
            expect(tagMatchesPattern("v1.0/*", "v1.0extra")).toBe(false);
        });

        it("handles plus signs", () => {
            expect(tagMatchesPattern("c++/*", "c++/advanced")).toBe(true);
        });

        it("handles @ symbols", () => {
            expect(tagMatchesPattern("@scope/*", "@scope/module")).toBe(true);
        });

        it("handles multiple slashes in wildcard", () => {
            expect(tagMatchesPattern("a/b/c/*", "a/b/c/d")).toBe(true);
            expect(tagMatchesPattern("a/b/c/*", "a/b/c")).toBe(false);
            expect(tagMatchesPattern("a/b/c/*", "a/b/d")).toBe(false);
        });
    });
});
