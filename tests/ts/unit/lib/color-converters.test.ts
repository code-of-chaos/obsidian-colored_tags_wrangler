import { describe, it, expect } from "vitest";
import {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    hexToRgba,
    rgbToString,
    rgbaToString,
    getContrastColor,
    getContrastBool,
    adjustBrightness,
} from "../../../../src/lib/color-converters";

describe("color-converters", () => {
    describe("hexToRgb", () => {
        it("converts hex to RGB", () => {
            expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
            expect(hexToRgb("#00ff00")).toEqual({ r: 0, g: 255, b: 0 });
            expect(hexToRgb("#0000ff")).toEqual({ r: 0, g: 0, b: 255 });
        });

        it("handles hex without #", () => {
            expect(hexToRgb("ff0000")).toEqual({ r: 255, g: 0, b: 0 });
        });

        it("returns black for invalid hex", () => {
            expect(hexToRgb("invalid")).toEqual({ r: 0, g: 0, b: 0 });
        });
    });

    describe("rgbToHex", () => {
        it("converts RGB to hex", () => {
            expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe("#ff0000");
            expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe("#00ff00");
            expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe("#0000ff");
        });

        it("handles single digit values", () => {
            expect(rgbToHex({ r: 1, g: 2, b: 3 })).toBe("#010203");
        });
    });

    describe("rgbToHsl", () => {
        it("converts RGB to HSL", () => {
            expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
            expect(rgbToHsl({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, l: 50 });
            expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
        });

        it("handles grayscale", () => {
            expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, l: 50 });
        });
    });

    describe("hslToRgb", () => {
        it("converts HSL to RGB", () => {
            expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
            expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ r: 0, g: 255, b: 0 });
            expect(hslToRgb({ h: 240, s: 100, l: 50 })).toEqual({ r: 0, g: 0, b: 255 });
        });

        it("handles grayscale", () => {
            expect(hslToRgb({ h: 0, s: 0, l: 50 })).toEqual({ r: 128, g: 128, b: 128 });
        });
    });

    describe("hexToRgba", () => {
        it("converts hex to RGBA string", () => {
            expect(hexToRgba("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
        });
    });

    describe("rgbToString", () => {
        it("converts RGB to string", () => {
            expect(rgbToString({ r: 255, g: 0, b: 0 })).toBe("rgb(255, 0, 0)");
        });
    });

    describe("rgbaToString", () => {
        it("converts RGBA to string", () => {
            expect(rgbaToString({ r: 255, g: 0, b: 0, a: 0.5 })).toBe("rgba(255, 0, 0, 0.5)");
        });
    });

    describe("getContrastColor", () => {
        it("returns black for light colors", () => {
            expect(getContrastColor({ r: 255, g: 255, b: 255 })).toEqual({ r: 0, g: 0, b: 0 });
        });

        it("returns white for dark colors", () => {
            expect(getContrastColor({ r: 0, g: 0, b: 0 })).toEqual({ r: 255, g: 255, b: 255 });
        });
    });

    describe("getContrastBool", () => {
        it("returns true for light colors", () => {
            expect(getContrastBool({ r: 255, g: 255, b: 255 })).toBe(true);
        });

        it("returns false for dark colors", () => {
            expect(getContrastBool({ r: 0, g: 0, b: 0 })).toBe(false);
        });
    });

    describe("adjustBrightness", () => {
        it("increases brightness", () => {
            const result = adjustBrightness({ r: 100, g: 100, b: 100 }, 1.5);
            expect(result.r).toBeGreaterThan(100);
            expect(result.g).toBeGreaterThan(100);
            expect(result.b).toBeGreaterThan(100);
        });

        it("decreases brightness", () => {
            const result = adjustBrightness({ r: 100, g: 100, b: 100 }, 0.5);
            expect(result.r).toBeLessThan(100);
            expect(result.g).toBeLessThan(100);
            expect(result.b).toBeLessThan(100);
        });
    });
});
