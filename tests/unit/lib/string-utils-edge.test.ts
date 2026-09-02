import { describe, it, expect } from "vitest";
import {
    normalizeTagName,
    isWildcardTagName,
    escapeCssAttributeValue,
    escapeRegex,
    REGEX,
} from "../../../src/lib/string-utils";

describe("string-utils edge cases", () => {
    describe("normalizeTagName edge cases", () => {
        it("handles empty string", () => {
            expect(normalizeTagName("")).toBe("");
        });

        it("handles only whitespace", () => {
            expect(normalizeTagName("   ")).toBe("");
        });

        it("handles only hash", () => {
            expect(normalizeTagName("#")).toBe("");
        });

        it("handles multiple hashes", () => {
            expect(normalizeTagName("###tag")).toBe("tag");
        });

        it("handles hash in middle", () => {
            expect(normalizeTagName("ta#g")).toBe("ta#g");
        });

        it("handles hash at end", () => {
            expect(normalizeTagName("tag#")).toBe("tag#");
        });

        it("handles leading and trailing whitespace", () => {
            expect(normalizeTagName("  tag  ")).toBe("tag");
        });

        it("handles newlines", () => {
            expect(normalizeTagName("\ntag\n")).toBe("tag");
        });

        it("handles tabs", () => {
            expect(normalizeTagName("\ttag\t")).toBe("tag");
        });

        it("preserves case", () => {
            expect(normalizeTagName("TAG")).toBe("TAG");
            expect(normalizeTagName("Tag")).toBe("Tag");
        });

        it("handles unicode", () => {
            expect(normalizeTagName("café")).toBe("café");
        });

        it("handles emoji", () => {
            expect(normalizeTagName("🎉")).toBe("🎉");
        });
    });

    describe("isWildcardTagName edge cases", () => {
        it("handles empty string", () => {
            expect(isWildcardTagName("")).toBe(false);
        });

        it("handles only /*", () => {
            expect(isWildcardTagName("/*")).toBe(false);
        });

        it("handles /* at start", () => {
            // /* at start: normalizedTag = "/sub", which doesn't end with "/*"
            expect(isWildcardTagName("/*/sub")).toBe(false);
        });

        it("handles /* in middle", () => {
            // a/*/b ends with /b, not /*, so it's not a wildcard
            expect(isWildcardTagName("a/*/b")).toBe(false);
        });

        it("handles /* at end with prefix", () => {
            expect(isWildcardTagName("tag/*")).toBe(true);
        });

        it("handles multiple /*", () => {
            expect(isWildcardTagName("a/*/b/*")).toBe(true);
        });

        it("handles tag ending with *", () => {
            expect(isWildcardTagName("tag*")).toBe(false);
        });

        it("handles tag ending with /", () => {
            expect(isWildcardTagName("tag/")).toBe(false);
        });

        it("handles hash before wildcard", () => {
            expect(isWildcardTagName("#tag/*")).toBe(true);
        });

        it("handles unicode before wildcard", () => {
            expect(isWildcardTagName("café/*")).toBe(true);
        });
    });

    describe("escapeCssAttributeValue edge cases", () => {
        it("handles empty string", () => {
            expect(escapeCssAttributeValue("")).toBe("");
        });

        it("handles no special characters", () => {
            expect(escapeCssAttributeValue("tag")).toBe("tag");
        });

        it("handles backslash", () => {
            expect(escapeCssAttributeValue("tag\\path")).toBe("tag\\\\path");
        });

        it("handles double quote", () => {
            expect(escapeCssAttributeValue('tag"testing')).toBe('tag\\"testing');
        });

        it("handles both backslash and quote", () => {
            expect(escapeCssAttributeValue('tag\\"test')).toBe('tag\\\\\\"test');
        });

        it("handles multiple backslashes", () => {
            expect(escapeCssAttributeValue("a\\b\\c")).toBe("a\\\\b\\\\c");
        });

        it("handles multiple quotes", () => {
            expect(escapeCssAttributeValue('a"b"c')).toBe('a\\"b\\"c');
        });

        it("handles unicode", () => {
            expect(escapeCssAttributeValue("café")).toBe("café");
        });
    });

    describe("escapeRegex edge cases", () => {
        it("handles empty string", () => {
            expect(escapeRegex("")).toBe("");
        });

        it("handles no special characters", () => {
            expect(escapeRegex("tag")).toBe("tag");
        });

        it("handles all regex special characters", () => {
            expect(escapeRegex("\\")).toBe("\\\\");
            expect(escapeRegex("^")).toBe("\\^");
            expect(escapeRegex("$")).toBe("\\$");
            expect(escapeRegex(".")).toBe("\\.");
            expect(escapeRegex("*")).toBe("\\*");
            expect(escapeRegex("+")).toBe("\\+");
            expect(escapeRegex("?")).toBe("\\?");
            expect(escapeRegex("(")).toBe("\\(");
            expect(escapeRegex(")")).toBe("\\)");
            expect(escapeRegex("[")).toBe("\\[");
            expect(escapeRegex("]")).toBe("\\]");
            expect(escapeRegex("{")).toBe("\\{");
            expect(escapeRegex("}")).toBe("\\}");
            expect(escapeRegex("|")).toBe("\\|");
        });

        it("handles forward slash", () => {
            expect(escapeRegex("/")).toBe("\\/");
        });

        it("handles multiple special characters", () => {
            expect(escapeRegex("a.b*c+d")).toBe("a\\.b\\*c\\+d");
        });

        it("handles unicode", () => {
            expect(escapeRegex("café")).toBe("café");
        });
    });

    describe("REGEX", () => {
        it("SLASH matches forward slashes", () => {
            expect("a/b/c".split(REGEX.SLASH)).toEqual(["a", "b", "c"]);
        });

        it("SLASH does not match backslashes", () => {
            expect("a\\b\\c".split(REGEX.SLASH)).toEqual(["a\\b\\c"]);
        });

        it("SPLIT matches semicolons", () => {
            expect("a;b;c".split(REGEX.SPLIT)).toEqual(["a", "b", "c"]);
        });

        it("SPLIT matches newlines", () => {
            expect("a\nb\nc".split(REGEX.SPLIT)).toEqual(["a", "b", "c"]);
        });

        it("SPLIT matches both", () => {
            expect("a;b\nc".split(REGEX.SPLIT)).toEqual(["a", "b", "c"]);
        });

        it("SPLIT does not match commas", () => {
            expect("a,b,c".split(REGEX.SPLIT)).toEqual(["a,b,c"]);
        });

        it("SPLIT does not match spaces", () => {
            expect("a b c".split(REGEX.SPLIT)).toEqual(["a b c"]);
        });
    });
});
