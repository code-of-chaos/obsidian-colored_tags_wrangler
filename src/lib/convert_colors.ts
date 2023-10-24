// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB, HSL}
	from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function hexToRgb(hexColor:string) : RGB{
	return {
		r: parseInt(hexColor.slice(1, 3), 16),
		g: parseInt(hexColor.slice(3, 5), 16),
		b: parseInt(hexColor.slice(5, 7), 16)
	}
}
// ---------------------------------------------------------------------------------------------------------------------
export function rgbToHex(rgb: RGB): string {
	const toHex = (c: number) => c.toString(16).padStart(2, "0");
	return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}
// ---------------------------------------------------------------------------------------------------------------------
export function rgbToHsl(rgb: RGB): HSL {
	// Normalize RGB values to the range [0, 1]
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;

	// Find the maximum and minimum values among R, G, and B
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);

	// Calculate the lightness (L)
	const l = (max + min) / 2;

	let h = 0;
	let s = 0;

	if (max !== min) {
		// Calculate the saturation (S)
		s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

		// Calculate the hue (H)
		if (max === r) {
			h = (60 * ((g - b) / (max - min)) + 360) % 360;
		} else if (max === g) {
			h = 60 * ((b - r) / (max - min)) + 120;
		} else {
			h = 60 * ((r - g) / (max - min)) + 240;
		}
	}

	return { h, s, l };
}
// ---------------------------------------------------------------------------------------------------------------------
export function hslToRgb(hsl: { h: number; s: number; l: number }): RGB {
	const { h, s, l } = hsl;

	// Ensure the hue is within the range [0, 360]
	const normalizedHue = (h % 360 + 360) % 360;

	// Convert the saturation and lightness to the [0, 1] range
	const normalizedSaturation = Math.max(0, Math.min(1, s));
	const normalizedLightness = Math.max(0, Math.min(1, l));

	const chroma = (1 - Math.abs(2 * normalizedLightness - 1)) * normalizedSaturation;
	const x = chroma * (1 - Math.abs(((normalizedHue / 60) % 2) - 1));
	const m = normalizedLightness - chroma / 2;

	let r = 0, g = 0, b = 0;

	if (normalizedHue >= 0 && normalizedHue < 60) {
		r = chroma;
		g = x;
	} else if (normalizedHue >= 60 && normalizedHue < 120) {
		r = x;
		g = chroma;
	} else if (normalizedHue >= 120 && normalizedHue < 180) {
		g = chroma;
		b = x;
	} else if (normalizedHue >= 180 && normalizedHue < 240) {
		g = x;
		b = chroma;
	} else if (normalizedHue >= 240 && normalizedHue < 300) {
		r = x;
		b = chroma;
	} else {
		r = chroma;
		b = x;
	}

	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return { r, g, b };
}
