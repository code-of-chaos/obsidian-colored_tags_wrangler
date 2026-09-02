import { describe, it, expect } from "vitest";
import { CanvasExtension } from "../../../src/extensions/canvas/ExtensionCanvas";
import { CssWranglerCanvas } from "../../../src/extensions/canvas/CssWranglerCanvas";
import { IColoredTagRecord, ICanvasSettings } from "../../../src/types/settings";
import { RGB } from "obsidian";

describe("CanvasExtension", () => {
    const color: RGB = { r: 255, g: 0, b: 0 };
    const bgColor: RGB = { r: 0, g: 0, b: 0 };

    const records: IColoredTagRecord[] = [
        {
            id: "1",
            tag_name: "project/*",
            color,
            background_color: bgColor,
            luminance_offset: 0.15,
            canvas_enabled: true,
        },
        {
            id: "2",
            tag_name: "meeting",
            color,
            background_color: bgColor,
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
});
