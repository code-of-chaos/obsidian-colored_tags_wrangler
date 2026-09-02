import { describe, it, expect } from "vitest";
import { getTags, tagMatchesPattern } from "../../../../src/lib/tag-utils";
import { RGB } from "obsidian";

describe("tag-utils", () => {
    const color: RGB = { r: 1, g: 2, b: 3 };

    describe("getTags", () => {
        it("single tag mode preserves wildcard syntax", () => {
            const data = [{ tag_name: "project/*", color, background_color: color, luminance_offset: 0 }];
            const result = getTags(data, false, false);
            expect(result.map((t) => t.tag_name)).toEqual(["project/*"]);
        });

        it("multi-tag mode splits on semicolons and newlines", () => {
            const data = [{ tag_name: "a/*;b\n#c/*", color, background_color: color, luminance_offset: 0 }];
            const result = getTags(data, true, false);
            expect(result.map((t) => t.tag_name)).toEqual(["a/*", "b", "c/*"]);
        });

        it("remove_slash strips slashes from tags", () => {
            const data = [{ tag_name: "a/b/c", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, false, true).map((t) => t.tag_name)).toEqual(["abc"]);
            expect(getTags(data, false, false).map((t) => t.tag_name)).toEqual(["a/b/c"]);
        });

        it("filters out empty tags", () => {
            const data = [{ tag_name: ";;\n\nvalid", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, true, false).map((t) => t.tag_name)).toEqual(["valid"]);
        });

        it("strips leading hash from start of each tag", () => {
            const data = [{ tag_name: "#tag1;#tag2", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, true, false).map((t) => t.tag_name)).toEqual(["tag1", "tag2"]);
        });

        it("preserves color properties across split tags", () => {
            const color1: RGB = { r: 1, g: 2, b: 3 };
            const color2: RGB = { r: 4, g: 5, b: 6 };
            const data = [{ tag_name: "a/*;b", color: color1, background_color: color2, luminance_offset: 0.5 }];
            const result = getTags(data, true, false);
            expect(result.length).toBe(2);
            expect(result[0].color).toEqual(color1);
            expect(result[0].background_color).toEqual(color2);
            expect(result[0].luminance_offset).toBe(0.5);
        });

        it("handles multiple data entries", () => {
            const data = [
                { tag_name: "a/*", color, background_color: color, luminance_offset: 0 },
                { tag_name: "b", color, background_color: color, luminance_offset: 0 },
            ];
            expect(getTags(data, false, false).map((t) => t.tag_name)).toEqual(["a/*", "b"]);
        });

        it("trims whitespace around tags", () => {
            const data = [{ tag_name: "  a/*  ;  b  ", color, background_color: color, luminance_offset: 0 }];
            expect(getTags(data, true, false).map((t) => t.tag_name)).toEqual(["a/*", "b"]);
        });
    });

    describe("tagMatchesPattern", () => {
        it("wildcard matches descendants at any depth", () => {
            expect(tagMatchesPattern("project/*", "project/HR")).toBe(true);
            expect(tagMatchesPattern("project/*", "project/HR/team")).toBe(true);
            expect(tagMatchesPattern("project/*", "project/a/b/c/d")).toBe(true);
        });

        it("wildcard ignores leading hash and is case-insensitive", () => {
            expect(tagMatchesPattern("#Project/*", "#project/Budget/2026")).toBe(true);
            expect(tagMatchesPattern("PROJECT/*", "project/hr")).toBe(true);
            expect(tagMatchesPattern("project/*", "PROJECT/HR")).toBe(true);
        });

        it("wildcard does not match the parent tag itself", () => {
            expect(tagMatchesPattern("project/*", "project")).toBe(false);
            expect(tagMatchesPattern("project/*", "project/")).toBe(false);
        });

        it("wildcard does not match unrelated tags sharing a prefix", () => {
            expect(tagMatchesPattern("project/*", "projectile/HR")).toBe(false);
            expect(tagMatchesPattern("project/*", "projects/HR")).toBe(false);
            expect(tagMatchesPattern("a/*", "ab")).toBe(false);
            expect(tagMatchesPattern("a/*", "ab/c")).toBe(false);
        });

        it("wildcard does not match tags that are substrings", () => {
            expect(tagMatchesPattern("project/*", "myproject/HR")).toBe(false);
            expect(tagMatchesPattern("project/*", "not-project/HR")).toBe(false);
        });

        it("exact tag rules remain exact", () => {
            expect(tagMatchesPattern("project/HR", "#PROJECT/hr")).toBe(true);
            expect(tagMatchesPattern("project/HR", "project/HR")).toBe(true);
            expect(tagMatchesPattern("project/HR", "project/HR/active")).toBe(false);
            expect(tagMatchesPattern("project/HR", "project")).toBe(false);
        });

        it("empty patterns and tags", () => {
            expect(tagMatchesPattern("", "")).toBe(true);
            expect(tagMatchesPattern("tag", "")).toBe(false);
            expect(tagMatchesPattern("", "tag")).toBe(false);
        });

        it("wildcard with nested parent path", () => {
            expect(tagMatchesPattern("a/b/*", "a/b/c")).toBe(true);
            expect(tagMatchesPattern("a/b/*", "a/b/c/d")).toBe(true);
            expect(tagMatchesPattern("a/b/*", "a/b")).toBe(false);
            expect(tagMatchesPattern("a/b/*", "a/bc")).toBe(false);
            expect(tagMatchesPattern("a/b/*", "a/x/c")).toBe(false);
        });

        it("wildcard matches accented tags", () => {
            expect(tagMatchesPattern("café/*", "café/HR")).toBe(true);
            expect(tagMatchesPattern("café/*", "café")).toBe(false);
            expect(tagMatchesPattern("café/*", "cafe/HR")).toBe(false);
        });

        it("wildcard matches tags with spaces", () => {
            expect(tagMatchesPattern("my project/*", "my project/sub")).toBe(true);
            expect(tagMatchesPattern("my project/*", "my project")).toBe(false);
        });

        it("wildcard matches tags with special characters", () => {
            expect(tagMatchesPattern("tag-test/*", "tag-test/sub")).toBe(true);
            expect(tagMatchesPattern("tag.test/*", "tag.test/sub")).toBe(true);
            expect(tagMatchesPattern("tag+test/*", "tag+test/sub")).toBe(true);
        });
    });
});
