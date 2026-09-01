import { describe, it, expect } from "vitest";
import {
    normalizeTagName,
    isWildcardTagName,
    escapeCssAttributeValue,
    escapeRegex,
    REGEX,
} from "../../../src/lib/string-utils";

describe("string-utils", () => {
    describe("normalizeTagName", () => {
        it("strips leading hashes and trims whitespace", () => {
            expect(normalizeTagName("#project/HR")).toBe("project/HR");
            expect(normalizeTagName("  #tag  ")).toBe("tag");
            expect(normalizeTagName("tag")).toBe("tag");
            expect(normalizeTagName("#")).toBe("");
            expect(normalizeTagName("")).toBe("");
            expect(normalizeTagName("##double")).toBe("double");
        });
    });

    describe("isWildcardTagName", () => {
        it("returns true only for valid wildcard patterns", () => {
            expect(isWildcardTagName("project/*")).toBe(true);
            expect(isWildcardTagName("#project/*")).toBe(true);
            expect(isWildcardTagName("a/b/c/*")).toBe(true);
            expect(isWildcardTagName("/*")).toBe(false);
            expect(isWildcardTagName("project")).toBe(false);
            expect(isWildcardTagName("project/*extra")).toBe(false);
            expect(isWildcardTagName("")).toBe(false);
        });
    });

    describe("escapeCssAttributeValue", () => {
        it("escapes backslashes", () => {
            expect(escapeCssAttributeValue("test\\path")).toBe("test\\\\path");
        });

        it("escapes double quotes", () => {
            expect(escapeCssAttributeValue('tag"testing')).toBe('tag\\"testing');
        });
    });

    describe("escapeRegex", () => {
        it("escapes special regex characters", () => {
            expect(escapeRegex("tag.test")).toBe("tag\\.test");
            expect(escapeRegex("tag+test")).toBe("tag\\+test");
            expect(escapeRegex("tag*test")).toBe("tag\\*test");
        });

        it("escapes forward slashes", () => {
            expect(escapeRegex("a/b")).toBe("a\\/b");
        });
    });

    describe("REGEX", () => {
        it("SLASH matches forward slashes", () => {
            expect("a/b/c".split(REGEX.SLASH)).toEqual(["a", "b", "c"]);
        });

        it("SPLIT matches semicolons and newlines", () => {
            expect("a;b\nc".split(REGEX.SPLIT)).toEqual(["a", "b", "c"]);
        });
    });
});
