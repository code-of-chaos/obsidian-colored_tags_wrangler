import { describe, it, expect } from "vitest";
import { CoreExtension } from "../../../src/extensions/core/ExtensionCore";
import { CssWranglerCore } from "../../../src/extensions/core/CssWranglerCore";
import { IColoredTagRecord, ICoreSettings } from "../../../src/types/settings";
import { RGB } from "obsidian";

describe("CoreExtension", () => {
    const color: RGB = { r: 255, g: 0, b: 0 };
    const bgColor: RGB = { r: 0, g: 0, b: 0 };

    const records: IColoredTagRecord[] = [
        {
            id: "1",
            tag_name: "project/*",
            color,
            background_color: bgColor,
            luminance_offset: 0.15,
        },
    ];

    const settings: ICoreSettings = {
        enableMultipleTags: true,
        enableSeparateBackground: true,
        enableBackgroundOpacity: false,
        backgroundOpacity: 0.45,
        luminanceOffset: 0.15,
        noteTags: true,
        noteProperties: true,
        noteBackgrounds: false,
        tagsNoWrap: true,
        tagsNoWrapText: "pre",
    };

    it("has correct extension name", () => {
        const ext = new CoreExtension(records, settings);
        expect(ext.extensionName).toBe("core");
    });

    it("has no requirements", () => {
        const ext = new CoreExtension(records, settings);
        expect(ext.extensionRequirements).toEqual([]);
    });

    it("is enabled by default", () => {
        const ext = new CoreExtension(records, settings);
        expect(ext.isEnabled).toBe(true);
    });

    it("generates CSS rules for tags", () => {
        const wrangler = new CssWranglerCore(records, settings);
        const rules = wrangler.getRules();
        expect(Object.keys(rules).length).toBeGreaterThan(0);
    });

    it("generates href selector for reading view", () => {
        const wrangler = new CssWranglerCore(records, settings);
        const rules = wrangler.getRules();
        const hrefKeys = Object.keys(rules).filter((k) => k.includes(".tag[href"));
        expect(hrefKeys.length).toBeGreaterThan(0);
    });

    it("generates class selector for CM6 editing view", () => {
        const wrangler = new CssWranglerCore(records, settings);
        const rules = wrangler.getRules();
        const cmKeys = Object.keys(rules).filter((k) => k.includes(".cm-hashtag"));
        expect(cmKeys.length).toBeGreaterThan(0);
    });

    it("does not generate rules when noteTags is false", () => {
        const disabledSettings = { ...settings, noteTags: false };
        const wrangler = new CssWranglerCore(records, disabledSettings);
        const rules = wrangler.getRules();
        expect(Object.keys(rules).length).toBe(0);
    });

    it("generates rules for both themes", () => {
        const wrangler = new CssWranglerCore(records, settings);
        const rules = wrangler.getRules();
        const lightKeys = Object.keys(rules).filter((k) => k.includes("theme-light"));
        const darkKeys = Object.keys(rules).filter((k) => k.includes("theme-dark"));
        expect(lightKeys.length).toBeGreaterThan(0);
        expect(darkKeys.length).toBeGreaterThan(0);
    });
});
