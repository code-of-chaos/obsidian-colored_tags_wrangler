import { describe, it, expect } from "vitest";
import { StylingExtension } from "../../../src/extensions/styling/ExtensionStyling";
import { CssWranglerStyling } from "../../../src/extensions/styling/CssWranglerStyling";
import { IColoredTagRecord, ICoreSettings } from "../../../src/types/settings";
import { RGB } from "obsidian";

describe("StylingExtension", () => {
    const color: RGB = { r: 255, g: 0, b: 0 };
    const bgColor: RGB = { r: 0, g: 0, b: 0 };

    const records: IColoredTagRecord[] = [];

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
        const ext = new StylingExtension(records, settings);
        expect(ext.extensionName).toBe("styling");
    });

    it("requires core extension", () => {
        const ext = new StylingExtension(records, settings);
        expect(ext.extensionRequirements).toEqual(["core"]);
    });

    it("is enabled by default", () => {
        const ext = new StylingExtension(records, settings);
        expect(ext.isEnabled).toBe(true);
    });

    it("generates no-wrap rule when tagsNoWrap is true", () => {
        const wrangler = new CssWranglerStyling(records, settings);
        const rules = wrangler.getRules();
        expect(rules["a.tag"]).toBeDefined();
        expect(rules["a.tag"]["white-space"]).toBe("pre");
    });

    it("does not generate no-wrap rule when tagsNoWrap is false", () => {
        const noWrapSettings = { ...settings, tagsNoWrap: false };
        const wrangler = new CssWranglerStyling(records, noWrapSettings);
        const rules = wrangler.getRules();
        expect(rules["a.tag"]).toBeUndefined();
    });

    it("uses custom tagsNoWrapText value", () => {
        const customSettings = { ...settings, tagsNoWrapText: "nowrap" };
        const wrangler = new CssWranglerStyling(records, customSettings);
        const rules = wrangler.getRules();
        expect(rules["a.tag"]["white-space"]).toBe("nowrap");
    });
});
