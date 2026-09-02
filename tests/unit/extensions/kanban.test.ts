import { describe, it, expect } from "vitest";
import { KanbanExtension } from "../../../src/extensions/kanban/ExtensionKanban";
import { CssWranglerKanban } from "../../../src/extensions/kanban/CssWranglerKanban";
import { IColoredTagRecord, IKanbanSettings } from "../../../src/types/settings";

describe("KanbanExtension", () => {
    const records: IColoredTagRecord[] = [
        {
            id: "1",
            tag_name: "project/*",
            color: { r: 255, g: 0, b: 0 },
            background_color: { r: 0, g: 0, b: 0 },
            luminance_offset: 0.15,
            kanban_cards_enabled: true,
            kanban_lists_enabled: true,
        },
    ];

    const settings: IKanbanSettings = {
        enableCards: true,
        enableLists: true,
        hideHashtags: false,
        enableBackgroundOpacity: false,
        backgroundOpacity: 0.45,
        cardBackgroundOpacity: 0.2,
        cardBorderOpacity: 0.3,
        listBackgroundOpacity: 0.2,
        listBorderOpacity: 0.3,
    };

    it("has correct extension name", () => {
        const ext = new KanbanExtension(records, settings);
        expect(ext.extensionName).toBe("kanban");
    });

    it("requires core extension", () => {
        const ext = new KanbanExtension(records, settings);
        expect(ext.extensionRequirements).toEqual(["core"]);
    });

    it("generates card rules when enableCards is true", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const cardKeys = Object.keys(rules).filter((k) => k.includes("kanban-plugin__item"));
        expect(cardKeys.length).toBeGreaterThan(0);
    });

    it("generates list rules when enableLists is true", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const listKeys = Object.keys(rules).filter((k) => k.includes("kanban-plugin__lane"));
        expect(listKeys.length).toBeGreaterThan(0);
    });

    it("generates hide hashtag rules when hideHashtags is true", () => {
        const hideSettings = { ...settings, hideHashtags: true };
        const wrangler = new CssWranglerKanban(records, hideSettings);
        const rules = wrangler.getRules();
        const hideKeys = Object.keys(rules).filter((k) => k.includes("a.tag span"));
        expect(hideKeys.length).toBeGreaterThan(0);
    });

    it("applies !important to card border", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const cardRule = Object.values(rules).find((r) => r["border-color"]?.includes("!important"));
        expect(cardRule).toBeDefined();
    });

    it("uses has-tag- prefix for card selectors", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const cardSelector = Object.keys(rules).find((k) => k.includes("has-tag-"));
        expect(cardSelector).toBeDefined();
    });

    it("generates wildcard card selectors with class*", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const hasWildcard = Object.keys(rules).some((k) => 
            k.includes('[class*="has-tag-"]') || k.includes('kanban-plugin__item[class*=')
        );
        expect(hasWildcard).toBe(true);
    });

    it("does not generate rules when enableCards is false", () => {
        const noCardSettings = { ...settings, enableCards: false };
        const wrangler = new CssWranglerKanban(records, noCardSettings);
        const rules = wrangler.getRules();
        const cardKeys = Object.keys(rules).filter((k) => k.includes("kanban-plugin__item"));
        expect(cardKeys.length).toBe(0);
    });

    it("does not generate rules when enableLists is false", () => {
        const noListSettings = { ...settings, enableLists: false };
        const wrangler = new CssWranglerKanban(records, noListSettings);
        const rules = wrangler.getRules();
        const listKeys = Object.keys(rules).filter((k) => k.includes("kanban-plugin__lane"));
        expect(listKeys.length).toBe(0);
    });

    it("applies background opacity when enabled", () => {
        const opacitySettings = { ...settings, enableBackgroundOpacity: true, backgroundOpacity: 0.5 };
        const wrangler = new CssWranglerKanban(records, opacitySettings);
        const rules = wrangler.getRules();
        const bgRule = Object.values(rules).find((r) => r["background"]?.includes("rgba"));
        expect(bgRule).toBeDefined();
    });

    it("includes !important on card background", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const cardRule = Object.values(rules).find((r) => r["background"]?.includes("!important"));
        expect(cardRule).toBeDefined();
    });

    it("generates title wrapper background rule", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const titleKeys = Object.keys(rules).filter((k) => k.includes("kanban-plugin__item-title-wrapper"));
        expect(titleKeys.length).toBeGreaterThan(0);
    });

    it("generates list border-color with !important", () => {
        const wrangler = new CssWranglerKanban(records, settings);
        const rules = wrangler.getRules();
        const listRule = Object.values(rules).find((r) => 
            r["border-color"]?.includes("!important") && r["background"]
        );
        expect(listRule).toBeDefined();
    });

    it("generates cm-hashtag-begin hide rules", () => {
        const hideSettings = { ...settings, hideHashtags: true };
        const wrangler = new CssWranglerKanban(records, hideSettings);
        const rules = wrangler.getRules();
        const beginKeys = Object.keys(rules).filter((k) => k.includes("cm-hashtag-begin"));
        expect(beginKeys.length).toBeGreaterThan(0);
    });

    it("generates hide rules for both data-type and kanban-plugin divs", () => {
        const hideSettings = { ...settings, hideHashtags: true };
        const wrangler = new CssWranglerKanban(records, hideSettings);
        const rules = wrangler.getRules();
        const dataTypeKeys = Object.keys(rules).filter((k) => k.includes('data-type="kanban"'));
        const pluginKeys = Object.keys(rules).filter((k) => k.includes("kanban-plugin"));
        expect(dataTypeKeys.length).toBeGreaterThan(0);
        expect(pluginKeys.length).toBeGreaterThan(0);
    });

    it("generates rules for exact (non-wildcard) tags", () => {
        const exactRecords: IColoredTagRecord[] = [
            { id: "1", tag_name: "meeting", color: { r: 255, g: 0, b: 0 }, background_color: { r: 0, g: 0, b: 0 }, luminance_offset: 0.15, kanban_cards_enabled: true },
        ];
        const wrangler = new CssWranglerKanban(exactRecords, settings);
        const rules = wrangler.getRules();
        const cardSelector = Object.keys(rules).find((k) => k.includes("has-tag-meeting"));
        expect(cardSelector).toBeDefined();
    });

    it("generates rules for multiple records", () => {
        const multiRecords: IColoredTagRecord[] = [
            { id: "1", tag_name: "project/*", color: { r: 255, g: 0, b: 0 }, background_color: { r: 0, g: 0, b: 0 }, luminance_offset: 0.15, kanban_cards_enabled: true, kanban_lists_enabled: true },
            { id: "2", tag_name: "meeting", color: { r: 0, g: 255, b: 0 }, background_color: { r: 0, g: 0, b: 0 }, luminance_offset: 0.15, kanban_cards_enabled: true, kanban_lists_enabled: true },
        ];
        const wrangler = new CssWranglerKanban(multiRecords, settings);
        const rules = wrangler.getRules();
        const ruleCount = Object.keys(rules).length;
        expect(ruleCount).toBeGreaterThan(10);
    });
});
