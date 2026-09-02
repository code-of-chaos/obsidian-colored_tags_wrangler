import { describe, it, expect } from "vitest";
import { tagNameToHrefSelector, tagNameToClassSelector, tagNameToSearchQuery } from "../../../../src/lib/css-selectors";

describe("css-selectors", () => {
    describe("tagNameToHrefSelector", () => {
        it("exact match", () => {
            expect(tagNameToHrefSelector("project/HR")).toBe('[href="#project/HR" i]');
            expect(tagNameToHrefSelector("tag")).toBe('[href="#tag" i]');
            expect(tagNameToHrefSelector("#tag")).toBe('[href="#tag" i]');
        });

        it("wildcard uses prefix selector", () => {
            expect(tagNameToHrefSelector("project/*")).toBe('[href^="#project/" i]');
            expect(tagNameToHrefSelector("a/b/*")).toBe('[href^="#a/b/" i]');
        });

        it("escapes CSS special characters", () => {
            expect(tagNameToHrefSelector('tag"test')).toBe('[href="#tag\\"test" i]');
            expect(tagNameToHrefSelector("tag\\path")).toBe('[href="#tag\\\\path" i]');
        });

        it("handles accented wildcards", () => {
            const selector = tagNameToHrefSelector("café/*");
            expect(selector).toContain("café");
            expect(selector).toContain("^");
        });
    });

    describe("tagNameToClassSelector", () => {
        it("exact match", () => {
            expect(tagNameToClassSelector("project/HR", "cm-tag-")).toBe('[class~="cm-tag-projectHR" i]');
            expect(tagNameToClassSelector("tag", "has-tag-")).toBe('[class~="has-tag-tag" i]');
        });

        it("wildcard uses contains selector with exclusion", () => {
            expect(tagNameToClassSelector("project/*", "cm-tag-")).toBe(
                '[class*="cm-tag-project" i]:where(:not([class~="cm-tag-project" i]))'
            );
            expect(tagNameToClassSelector("a/b/*", "has-tag-")).toBe(
                '[class*="has-tag-ab" i]:where(:not([class~="has-tag-ab" i]))'
            );
        });

        it("escapes CSS special characters in class names", () => {
            expect(tagNameToClassSelector('tag"testing', "cm-tag-")).toBe('[class~="cm-tag-tag\\"testing" i]');
        });

        it("handles accented wildcards", () => {
            const selector = tagNameToClassSelector("café/*", "cm-tag-");
            expect(selector).toContain("class*");
            expect(selector).toContain(":not(");
        });
    });

    describe("tagNameToSearchQuery", () => {
        it("exact match", () => {
            expect(tagNameToSearchQuery("project/HR")).toBe("tag:#project/HR");
            expect(tagNameToSearchQuery("tag")).toBe("tag:#tag");
            expect(tagNameToSearchQuery("#tag")).toBe("tag:#tag");
        });

        it("wildcard uses regex", () => {
            expect(tagNameToSearchQuery("project/*")).toBe("tag:/^#project\\/.+/");
            expect(tagNameToSearchQuery("a/b/*")).toBe("tag:/^#a\\/b\\/.+/");
        });

        it("escapes regex special characters", () => {
            expect(tagNameToSearchQuery("tag.test/*")).toBe("tag:/^#tag\\.test\\/.+/");
            expect(tagNameToSearchQuery("tag+test/*")).toBe("tag:/^#tag\\+test\\/.+/");
        });

        it("handles accented wildcards", () => {
            const query = tagNameToSearchQuery("café/*");
            expect(query).toContain("café");
            expect(query).toContain(".+");
        });
    });
});
