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

describe("color-converters edge cases", () => {
    describe("hexToRgb", () => {
        it("handles 3-digit hex", () => {
            // 3-digit hex is not supported, should return black
            expect(hexToRgb("#fff")).toEqual({ r: 0, g: 0, b: 0 });
        });

        it("handles hex with uppercase", () => {
            expect(hexToRgb("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
        });

        it("handles hex with mixed case", () => {
            expect(hexToRgb("#Ff00Aa")).toEqual({ r: 255, g: 0, b: 170 });
        });

        it("handles empty string", () => {
            expect(hexToRgb("")).toEqual({ r: 0, g: 0, b: 0 });
        });

        it("handles invalid characters", () => {
            expect(hexToRgb("#xyz")).toEqual({ r: 0, g: 0, b: 0 });
        });

        it("handles too short hex", () => {
            expect(hexToRgb("#ff")).toEqual({ r: 0, g: 0, b: 0 });
        });

        it("handles too long hex", () => {
            expect(hexToRgb("#ffffff0")).toEqual({ r: 0, g: 0, b: 0 });
        });
    });

    describe("rgbToHex", () => {
        it("handles min values", () => {
            expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
        });

        it("handles max values", () => {
            expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe("#ffffff");
        });

        it("handles values that need rounding", () => {
            expect(rgbToHex({ r: 128.7, g: 64.3, b: 32.1 })).toBe("#814020");
        });

        it("clamps values above 255", () => {
            expect(rgbToHex({ r: 300, g: 0, b: 0 })).toBe("#ff0000");
        });

        it("clamps values below 0", () => {
            expect(rgbToHex({ r: -10, g: 0, b: 0 })).toBe("#000000");
        });
    });

    describe("rgbToHsl", () => {
        it("handles pure red", () => {
            expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toEqual({ h: 0, s: 100, l: 50 });
        });

        it("handles pure green", () => {
            expect(rgbToHsl({ r: 0, g: 255, b: 0 })).toEqual({ h: 120, s: 100, l: 50 });
        });

        it("handles pure blue", () => {
            expect(rgbToHsl({ r: 0, g: 0, b: 255 })).toEqual({ h: 240, s: 100, l: 50 });
        });

        it("handles white", () => {
            expect(rgbToHsl({ r: 255, g: 255, b: 255 })).toEqual({ h: 0, s: 0, l: 100 });
        });

        it("handles black", () => {
            expect(rgbToHsl({ r: 0, g: 0, b: 0 })).toEqual({ h: 0, s: 0, l: 0 });
        });

        it("handles mid-gray", () => {
            expect(rgbToHsl({ r: 128, g: 128, b: 128 })).toEqual({ h: 0, s: 0, l: 50 });
        });
    });

    describe("hslToRgb", () => {
        it("roundtrips with rgbToHsl", () => {
            const original = { r: 123, g: 45, b: 200 };
            const hsl = rgbToHsl(original);
            const back = hslToRgb(hsl);
            // Allow small rounding error
            expect(Math.abs(back.r - original.r)).toBeLessThanOrEqual(1);
            expect(Math.abs(back.g - original.g)).toBeLessThanOrEqual(1);
            expect(Math.abs(back.b - original.b)).toBeLessThanOrEqual(1);
        });

        it("handles saturation 0", () => {
            expect(hslToRgb({ h: 0, s: 0, l: 50 })).toEqual({ r: 128, g: 128, b: 128 });
        });

        it("handles lightness 0", () => {
            expect(hslToRgb({ h: 0, s: 100, l: 0 })).toEqual({ r: 0, g: 0, b: 0 });
        });

        it("handles lightness 100", () => {
            expect(hslToRgb({ h: 0, s: 100, l: 100 })).toEqual({ r: 255, g: 255, b: 255 });
        });
    });

    describe("hexToRgba", () => {
        it("handles alpha 0", () => {
            expect(hexToRgba("#ff0000", 0)).toBe("rgba(255, 0, 0, 0)");
        });

        it("handles alpha 1", () => {
            expect(hexToRgba("#ff0000", 1)).toBe("rgba(255, 0, 0, 1)");
        });

        it("handles alpha 0.5", () => {
            expect(hexToRgba("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
        });
    });

    describe("rgbToString", () => {
        it("formats correctly", () => {
            expect(rgbToString({ r: 123, g: 45, b: 200 })).toBe("rgb(123, 45, 200)");
        });
    });

    describe("rgbaToString", () => {
        it("formats correctly", () => {
            expect(rgbaToString({ r: 123, g: 45, b: 200, a: 0.5 })).toBe("rgba(123, 45, 200, 0.5)");
        });
    });

    describe("getContrastColor", () => {
        it("returns black for mid-gray", () => {
            expect(getContrastColor({ r: 128, g: 128, b: 128 })).toEqual({ r: 0, g: 0, b: 0 });
        });

        it("returns white for very dark colors", () => {
            expect(getContrastColor({ r: 10, g: 10, b: 10 })).toEqual({ r: 255, g: 255, b: 255 });
        });

        it("returns black for very light colors", () => {
            expect(getContrastColor({ r: 245, g: 245, b: 245 })).toEqual({ r: 0, g: 0, b: 0 });
        });
    });

    describe("getContrastBool", () => {
        it("returns true for light gray", () => {
            expect(getContrastBool({ r: 200, g: 200, b: 200 })).toBe(true);
        });

        it("returns false for dark gray", () => {
            expect(getContrastBool({ r: 50, g: 50, b: 50 })).toBe(false);
        });
    });

    describe("adjustBrightness", () => {
        it("factor 1 returns same brightness (within rounding)", () => {
            const result = adjustBrightness({ r: 100, g: 100, b: 100 }, 1);
            // HSL conversion may cause small rounding errors
            expect(Math.abs(result.r - 100)).toBeLessThanOrEqual(1);
            expect(Math.abs(result.g - 100)).toBeLessThanOrEqual(1);
            expect(Math.abs(result.b - 100)).toBeLessThanOrEqual(1);
        });

        it("factor 0 returns black", () => {
            const result = adjustBrightness({ r: 100, g: 100, b: 100 }, 0);
            expect(result.r).toBe(0);
            expect(result.g).toBe(0);
            expect(result.b).toBe(0);
        });

        it("handles pure colors", () => {
            const result = adjustBrightness({ r: 255, g: 0, b: 0 }, 0.5);
            expect(result.r).toBeLessThan(255);
        });
    });
});
