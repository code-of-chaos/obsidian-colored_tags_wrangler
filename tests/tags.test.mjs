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

test("a trailing /* matches descendants only and ignores case", () => {
    assert.equal(tags.tagMatchesPattern("project/*", "project/HR"), true);
    assert.equal(tags.tagMatchesPattern("#Project/*", "#project/Budget/2026"), true);
    assert.equal(tags.tagMatchesPattern("project/*", "project"), false);
    assert.equal(tags.tagMatchesPattern("project/*", "projectile/HR"), false);
});

test("exact tag rules remain exact", () => {
    assert.equal(tags.tagMatchesPattern("project/HR", "#PROJECT/hr"), true);
    assert.equal(tags.tagMatchesPattern("project/HR", "project/HR/active"), false);
});

test("multiple tag entries preserve wildcard syntax", () => {
    const color = {r: 1, g: 2, b: 3};
    const configuredTags = [{
        tag_name: " #project/*; meeting/weekly\npeople ",
        color,
        background_color: color,
        luminance_offset: 0,
    }];

    assert.deepEqual(
        tags.get_tags(configuredTags, true, false).map(({tag_name}) => tag_name),
        ["project/*", "meeting/weekly", "people"]
    );
});

test("CSS selectors distinguish exact tags from descendant wildcards", () => {
    assert.equal(tags.tagNameToHrefSelector("project/HR"), '[href="#project/HR" i]');
    assert.equal(tags.tagNameToHrefSelector("project/*"), '[href^="#project/" i]');
    assert.equal(tags.tagNameToClassSelector("project/HR", "cm-tag-"), '[class~="cm-tag-projectHR" i]');
    assert.equal(
        tags.tagNameToClassSelector("project/*", "cm-tag-"),
        '[class*="cm-tag-project" i]:where(:not([class~="cm-tag-project" i]))'
    );
});

test("graph export uses a descendant-tag regular expression for wildcards", () => {
    assert.equal(tags.tagNameToSearchQuery("project/HR"), "tag:#project/HR");
    assert.equal(tags.tagNameToSearchQuery("project/*"), "tag:/^#project\\/.+/");
});
