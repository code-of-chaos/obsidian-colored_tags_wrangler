import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/api/tags.ts", import.meta.url), "utf8");
const javascript = ts.transpileModule(source, {
    compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
    },
}).outputText;
const tags = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);

// ---------- normalizeTagName ----------

test("normalizeTagName strips leading hash and trims whitespace", () => {
    assert.equal(tags.normalizeTagName("#project/HR"), "project/HR");
    assert.equal(tags.normalizeTagName("  #tag  "), "tag");
    assert.equal(tags.normalizeTagName("tag"), "tag");
    assert.equal(tags.normalizeTagName("#"), "");
    assert.equal(tags.normalizeTagName(""), "");
    assert.equal(tags.normalizeTagName("##double"), "#double");
});

// ---------- isWildcardTagName ----------

test("isWildcardTagName returns true only for valid wildcard patterns", () => {
    assert.equal(tags.isWildcardTagName("project/*"), true);
    assert.equal(tags.isWildcardTagName("#project/*"), true);
    assert.equal(tags.isWildcardTagName("a/b/c/*"), true);
    assert.equal(tags.isWildcardTagName("/*"), false);
    assert.equal(tags.isWildcardTagName("project"), false);
    assert.equal(tags.isWildcardTagName("project/*extra"), false);
    assert.equal(tags.isWildcardTagName(""), false);
});

// ---------- tagMatchesPattern ----------

test("wildcard matches descendants at any depth", () => {
    assert.equal(tags.tagMatchesPattern("project/*", "project/HR"), true);
    assert.equal(tags.tagMatchesPattern("project/*", "project/HR/team"), true);
    assert.equal(tags.tagMatchesPattern("project/*", "project/a/b/c/d"), true);
});

test("wildcard ignores leading hash and is case-insensitive", () => {
    assert.equal(tags.tagMatchesPattern("#Project/*", "#project/Budget/2026"), true);
    assert.equal(tags.tagMatchesPattern("PROJECT/*", "project/hr"), true);
    assert.equal(tags.tagMatchesPattern("project/*", "PROJECT/HR"), true);
});

test("wildcard does not match the parent tag itself", () => {
    assert.equal(tags.tagMatchesPattern("project/*", "project"), false);
    assert.equal(tags.tagMatchesPattern("project/*", "project/"), false);
});

test("wildcard does not match unrelated tags sharing a prefix", () => {
    assert.equal(tags.tagMatchesPattern("project/*", "projectile/HR"), false);
    assert.equal(tags.tagMatchesPattern("project/*", "projects/HR"), false);
    assert.equal(tags.tagMatchesPattern("a/*", "ab"), false);
    assert.equal(tags.tagMatchesPattern("a/*", "ab/c"), false);
});

test("wildcard does not match tags that are substrings", () => {
    assert.equal(tags.tagMatchesPattern("project/*", "myproject/HR"), false);
    assert.equal(tags.tagMatchesPattern("project/*", "not-project/HR"), false);
});

test("exact tag rules remain exact", () => {
    assert.equal(tags.tagMatchesPattern("project/HR", "#PROJECT/hr"), true);
    assert.equal(tags.tagMatchesPattern("project/HR", "project/HR"), true);
    assert.equal(tags.tagMatchesPattern("project/HR", "project/HR/active"), false);
    assert.equal(tags.tagMatchesPattern("project/HR", "project"), false);
    assert.equal(tags.tagMatchesPattern("tag", "tag"), true);
    assert.equal(tags.tagMatchesPattern("tag", "tag/child"), false);
    assert.equal(tags.tagMatchesPattern("tag", "othertag"), false);
});

test("empty patterns and tags", () => {
    assert.equal(tags.tagMatchesPattern("", ""), true);
    assert.equal(tags.tagMatchesPattern("tag", ""), false);
    assert.equal(tags.tagMatchesPattern("", "tag"), false);
});

test("wildcard with nested parent path", () => {
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/b/c"), true);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/b/c/d"), true);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/b"), false);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/bc"), false);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/x/c"), false);
});

// ---------- get_tags ----------

test("get_tags single tag mode preserves wildcard syntax", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: "project/*", color, background_color: color, luminance_offset: 0}];
    const result = tags.get_tags(data, false, false);
    assert.deepEqual(result.map(t => t.tag_name), ["project/*"]);
});

test("get_tags multi-tag mode splits on semicolons and newlines", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: "a/*;b\n#c/*", color, background_color: color, luminance_offset: 0}];
    const result = tags.get_tags(data, true, false);
    assert.deepEqual(result.map(t => t.tag_name), ["a/*", "b", "c/*"]);
});

test("get_tags remove_slash strips slashes from tags", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: "a/b/c", color, background_color: color, luminance_offset: 0}];
    assert.deepEqual(tags.get_tags(data, false, true).map(t => t.tag_name), ["abc"]);
    assert.deepEqual(tags.get_tags(data, false, false).map(t => t.tag_name), ["a/b/c"]);
});

test("get_tags filters out empty tags", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: ";;\n\nvalid", color, background_color: color, luminance_offset: 0}];
    assert.deepEqual(tags.get_tags(data, true, false).map(t => t.tag_name), ["valid"]);
});

test("get_tags strips leading hash from start of each tag", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: "#tag1;#tag2", color, background_color: color, luminance_offset: 0}];
    assert.deepEqual(tags.get_tags(data, true, false).map(t => t.tag_name), ["tag1", "tag2"]);
});

test("get_tags preserves color properties across split tags", () => {
    const color1 = {r: 1, g: 2, b: 3};
    const color2 = {r: 4, g: 5, b: 6};
    const data = [
        {tag_name: "a/*;b", color: color1, background_color: color2, luminance_offset: 0.5},
    ];
    const result = tags.get_tags(data, true, false);
    assert.equal(result.length, 2);
    assert.deepEqual(result[0].color, color1);
    assert.deepEqual(result[0].background_color, color2);
    assert.equal(result[0].luminance_offset, 0.5);
    assert.deepEqual(result[1].color, color1);
});

test("get_tags handles multiple data entries", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [
        {tag_name: "a/*", color, background_color: color, luminance_offset: 0},
        {tag_name: "b", color, background_color: color, luminance_offset: 0},
    ];
    assert.deepEqual(tags.get_tags(data, false, false).map(t => t.tag_name), ["a/*", "b"]);
});

test("get_tags trims whitespace around tags", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: "  a/*  ;  b  ", color, background_color: color, luminance_offset: 0}];
    assert.deepEqual(tags.get_tags(data, true, false).map(t => t.tag_name), ["a/*", "b"]);
});

// ---------- tagNameToHrefSelector ----------

test("tagNameToHrefSelector exact match", () => {
    assert.equal(tags.tagNameToHrefSelector("project/HR"), '[href="#project/HR" i]');
    assert.equal(tags.tagNameToHrefSelector("tag"), '[href="#tag" i]');
    assert.equal(tags.tagNameToHrefSelector("#tag"), '[href="#tag" i]');
});

test("tagNameToHrefSelector wildcard uses prefix selector", () => {
    assert.equal(tags.tagNameToHrefSelector("project/*"), '[href^="#project/" i]');
    assert.equal(tags.tagNameToHrefSelector("a/b/*"), '[href^="#a/b/" i]');
});

test("tagNameToHrefSelector escapes CSS special characters", () => {
    assert.equal(tags.tagNameToHrefSelector('tag"test'), '[href="#tag\\"test" i]');
    assert.equal(tags.tagNameToHrefSelector("tag\\path"), '[href="#tag\\\\path" i]');
});

// ---------- tagNameToClassSelector ----------

test("tagNameToClassSelector exact match", () => {
    assert.equal(tags.tagNameToClassSelector("project/HR", "cm-tag-"), '[class~="cm-tag-projectHR" i]');
    assert.equal(tags.tagNameToClassSelector("tag", "has-tag-"), '[class~="has-tag-tag" i]');
});

test("tagNameToClassSelector wildcard uses contains selector with exclusion", () => {
    assert.equal(
        tags.tagNameToClassSelector("project/*", "cm-tag-"),
        '[class*="cm-tag-project" i]:where(:not([class~="cm-tag-project" i]))'
    );
    assert.equal(
        tags.tagNameToClassSelector("a/b/*", "has-tag-"),
        '[class*="has-tag-ab" i]:where(:not([class~="has-tag-ab" i]))'
    );
});

test("tagNameToClassSelector escapes CSS special characters in class names", () => {
    assert.equal(
        tags.tagNameToClassSelector('tag"testing', "cm-tag-"),
        '[class~="cm-tag-tag\\"testing" i]'
    );
});

// ---------- tagNameToSearchQuery ----------

test("tagNameToSearchQuery exact match", () => {
    assert.equal(tags.tagNameToSearchQuery("project/HR"), "tag:#project/HR");
    assert.equal(tags.tagNameToSearchQuery("tag"), "tag:#tag");
    assert.equal(tags.tagNameToSearchQuery("#tag"), "tag:#tag");
});

test("tagNameToSearchQuery wildcard uses regex", () => {
    assert.equal(tags.tagNameToSearchQuery("project/*"), "tag:/^#project\\/.+/");
    assert.equal(tags.tagNameToSearchQuery("a/b/*"), "tag:/^#a\\/b\\/.+/");
});

test("tagNameToSearchQuery escapes regex special characters", () => {
    assert.equal(tags.tagNameToSearchQuery("tag.test/*"), "tag:/^#tag\\.test\\/.+/");
    assert.equal(tags.tagNameToSearchQuery("tag+test/*"), "tag:/^#tag\\+test\\/.+/");
});

// ---------- CSS selectors distinguish exact tags from descendant wildcards ----------

test("CSS selectors distinguish exact tags from descendant wildcards", () => {
    assert.equal(tags.tagNameToHrefSelector("project/HR"), '[href="#project/HR" i]');
    assert.equal(tags.tagNameToHrefSelector("project/*"), '[href^="#project/" i]');
    assert.equal(tags.tagNameToClassSelector("project/HR", "cm-tag-"), '[class~="cm-tag-projectHR" i]');
    assert.equal(
        tags.tagNameToClassSelector("project/*", "cm-tag-"),
        '[class*="cm-tag-project" i]:where(:not([class~="cm-tag-project" i]))'
    );
});

// ---------- graph export uses a descendant-tag regular expression for wildcards ----------

test("graph export uses a descendant-tag regular expression for wildcards", () => {
    assert.equal(tags.tagNameToSearchQuery("project/HR"), "tag:#project/HR");
    assert.equal(tags.tagNameToSearchQuery("project/*"), "tag:/^#project\\/.+/");
});

// ---------- wildcard edge cases with slashes ----------

test("tagMatchesPattern handles tags with multiple slashes", () => {
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/b/c"), true);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/b/c/d/e"), true);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/b"), false);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/bc"), false);
    assert.equal(tags.tagMatchesPattern("a/b/*", "a/x/c"), false);
});

test("/* alone is not a valid wildcard pattern", () => {
    assert.equal(tags.isWildcardTagName("/*"), false);
    assert.equal(tags.tagMatchesPattern("/*", "anything"), false);
    assert.equal(tags.tagMatchesPattern("/*", "/"), false);
});

test("tagMatchesPattern is case-insensitive for both pattern and tag", () => {
    assert.equal(tags.tagMatchesPattern("Project/*", "project/hr"), true);
    assert.equal(tags.tagMatchesPattern("PROJECT/*", "project/HR"), true);
    assert.equal(tags.tagMatchesPattern("project/*", "PROJECT/HR"), true);
});

// ---------- multiple data entries with wildcards ----------

test("get_tags handles multiple entries with mixed wildcards and exact tags", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [
        {tag_name: "project/*", color, background_color: color, luminance_offset: 0},
        {tag_name: "meeting", color, background_color: color, luminance_offset: 0},
        {tag_name: "a/b/*;c", color, background_color: color, luminance_offset: 0},
    ];
    const result = tags.get_tags(data, true, false);
    assert.deepEqual(result.map(t => t.tag_name), ["project/*", "meeting", "a/b/*", "c"]);
});

// ---------- remove_slash with wildcards ----------

test("get_tags remove_slash strips all slashes including from wildcards", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: "a/b/*", color, background_color: color, luminance_offset: 0}];
    const result = tags.get_tags(data, false, true);
    assert.deepEqual(result.map(t => t.tag_name), ["ab*"]);
});

test("get_tags with remove_slash=false preserves wildcard slashes", () => {
    const color = {r: 1, g: 2, b: 3};
    const data = [{tag_name: "a/b/*", color, background_color: color, luminance_offset: 0}];
    const result = tags.get_tags(data, false, false);
    assert.deepEqual(result.map(t => t.tag_name), ["a/b/*"]);
});
