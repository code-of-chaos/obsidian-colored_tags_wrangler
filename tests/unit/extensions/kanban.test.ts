import { describe, it, expect } from "vitest";
import { KanbanExtension } from "../../../src/extensions/kanban/ExtensionKanban";
import { CssWranglerKanban } from "../../../src/extensions/kanban/CssWranglerKanban";
import { IColoredTagRecord, IKanbanSettings } from "../../../src/types/settings";
import { RGB } from "obsidian";

describe("KanbanExtension", () => {
    const color: RGB = { r: 255, g: 0, b: 0 };
    const bgColor: RGB = { r: 0, g: 0, b: 0 };

    const records: IColoredTagRecord[] = [
        {
            id: "1",
            tag_name: "project/*",
            color,
            background_color: bgColor,
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
        // Check if any selector contains the wildcard pattern
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
});
