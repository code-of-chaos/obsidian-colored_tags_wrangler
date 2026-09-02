import { describe, it, expect } from "vitest";
import { CanvasExtension } from "../../../src/extensions/canvas/ExtensionCanvas";
import { CssWranglerCanvas } from "../../../src/extensions/canvas/CssWranglerCanvas";
import { IColoredTagRecord, ICanvasSettings } from "../../../src/types/settings";

describe("CanvasExtension", () => {
    const records: IColoredTagRecord[] = [
        {
            id: "1",
            tag_name: "project/*",
            color: { r: 255, g: 0, b: 0 },
            background_color: { r: 0, g: 0, b: 0 },
            luminance_offset: 0.15,
            canvas_enabled: true,
        },
        {
            id: "2",
            tag_name: "meeting",
            color: { r: 0, g: 255, b: 0 },
            background_color: { r: 0, g: 0, b: 0 },
            luminance_offset: 0.15,
            canvas_enabled: false,
        },
    ];

    const settings: ICanvasSettings = {
        enableBackgroundOpacity: false,
        backgroundOpacity: 0.45,
        cardBorderOpacity: 0.3,
        cardBackgroundLuminanceOffset: 0.15,
    };

    it("has correct extension name", () => {
        const ext = new CanvasExtension(records, settings);
        expect(ext.extensionName).toBe("canvas");
    });

    it("requires core extension", () => {
        const ext = new CanvasExtension(records, settings);
        expect(ext.extensionRequirements).toEqual(["core"]);
    });

    it("generates CSS rules for canvas nodes with canvas_enabled", () => {
        const wrangler = new CssWranglerCanvas(records, settings);
        const rules = wrangler.getRules();
        const canvasKeys = Object.keys(rules).filter((k) => k.includes("canvas-node"));
        expect(canvasKeys.length).toBeGreaterThan(0);
    });

    it("does not generate rules for canvas_disabled records", () => {
        const disabledRecords = records.filter((r) => !r.canvas_enabled);
        const wrangler = new CssWranglerCanvas(disabledRecords, settings);
        const rules = wrangler.getRules();
        expect(Object.keys(rules).length).toBe(0);
    });

    it("sets --canvas-color CSS variable", () => {
        const wrangler = new CssWranglerCanvas(records, settings);
        const rules = wrangler.getRules();
        const canvasRule = Object.values(rules).find((r) => r["--canvas-color"]);
        expect(canvasRule).toBeDefined();
        expect(canvasRule!["--canvas-color"]).toBe("255, 0, 0");
    });

    it("applies background opacity when enabled", () => {
        const opacitySettings = { ...settings, enableBackgroundOpacity: true, backgroundOpacity: 0.5 };
        const wrangler = new CssWranglerCanvas(records, opacitySettings);
        const rules = wrangler.getRules();
        const bgRule = Object.values(rules).find((r) => r["background"]?.includes("rgba"));
        expect(bgRule).toBeDefined();
    });

    it("generates rules for both themes", () => {
        const wrangler = new CssWranglerCanvas(records, settings);
        const rules = wrangler.getRules();
        const lightKeys = Object.keys(rules).filter((k) => k.includes("theme-light"));
        const darkKeys = Object.keys(rules).filter((k) => k.includes("theme-dark"));
        expect(lightKeys.length).toBeGreaterThan(0);
        expect(darkKeys.length).toBeGreaterThan(0);
    });

    it("includes !important on background and border-color", () => {
        const wrangler = new CssWranglerCanvas(records, settings);
        const rules = wrangler.getRules();
        const values = Object.values(rules);
        for (const rule of values) {
            expect(rule.background).toContain("!important");
            expect(rule["border-color"]).toContain("!important");
        }
    });

    it("uses :is() selector with all href variants", () => {
        const wrangler = new CssWranglerCanvas(records, settings);
        const rules = wrangler.getRules();
        const keys = Object.keys(rules);
        const hasIsSelector = keys.some((k) => k.includes(":is("));
        expect(hasIsSelector).toBe(true);
    });

    it("generates rules for multiple canvas-enabled records", () => {
        const multiRecords: IColoredTagRecord[] = [
            { id: "1", tag_name: "project/*", color: { r: 255, g: 0, b: 0 }, background_color: { r: 0, g: 0, b: 0 }, luminance_offset: 0.15, canvas_enabled: true },
            { id: "2", tag_name: "meeting", color: { r: 0, g: 255, b: 0 }, background_color: { r: 0, g: 0, b: 0 }, luminance_offset: 0.15, canvas_enabled: true },
        ];
        const wrangler = new CssWranglerCanvas(multiRecords, settings);
        const rules = wrangler.getRules();
        const ruleCount = Object.keys(rules).length;
        expect(ruleCount).toBe(4);
    });

    it("uses rgb when background opacity is disabled", () => {
        const wrangler = new CssWranglerCanvas(records, settings);
        const rules = wrangler.getRules();
        const values = Object.values(rules);
        for (const rule of values) {
            expect(rule.background).toContain("rgb");
            expect(rule.background).not.toContain("rgba");
        }
    });
});
