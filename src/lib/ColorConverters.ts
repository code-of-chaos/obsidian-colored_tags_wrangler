// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {HSL, RGB} from "obsidian";
import {RGBA} from "../contracts/types/RGBA";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function hexToRgb(hexColor: string): RGB {
	const hex = hexColor.replace("#", "");
	return {
		r: parseInt(hex.slice(0, 2), 16),
		g: parseInt(hex.slice(2, 4), 16),
		b: parseInt(hex.slice(4, 6), 16)
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

	return {h, s, l};
}

// ---------------------------------------------------------------------------------------------------------------------
export function hslToRgb(hsl: { h: number; s: number; l: number }): RGB {
	const {h, s, l} = hsl;

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

	return {r, g, b};
}

// ---------------------------------------------------------------------------------------------------------------------
export function hexToRGBA(hex: string, alpha: number): RGBA {
	// Remove the hash (#) from the beginning of the HEX string
	hex = hex.replace(/^#/, '');

	// Ensure the alpha value is between 0 and 1
	if (alpha < 0) alpha = 0;
	if (alpha > 1) alpha = 1;

	// Parse the HEX values into separate red, green, and blue components
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Convert the RGB values and alpha to the rgba format
	return {r, g, b, a: alpha}
}

// ---------------------------------------------------------------------------------------------------------------------
export function stringToHsl(txt: string): HSL {
	const hslArray = txt
		.replace("hsl(", "")
		.replace(")", "")
		.split(",")
		.map(v => v.trim())
	return {
		h: Number(hslArray[0]),
		s: hslArray[1].endsWith("%")
			? (Number(hslArray[1].replace("%", "")) / 100)
			: (Number(hslArray[1])),
		l: hslArray[2].endsWith("%")
			? (Number(hslArray[2].replace("%", "")) / 100)
			: (Number(hslArray[2])),
	}
}

// ---------------------------------------------------------------------------------------------------------------------
export function stringToRgb(txt: string): RGB {
	const textArray = txt
		.replace("rgb(", "")
		.replace(")", "")
		.split(",")
		.map(v => v.trim())
	return {
		r: Number(textArray[0]),
		g: Number(textArray[1]),
		b: Number(textArray[2]),
	}
}

export function stringToRgba(txt: String): RGBA {
	const textArray = txt
		.replace("rgba(", "")
		.replace(")", "")
		.split(",")
		.map(v => v.trim())
	return {
		r: Number(textArray[0]),
		g: Number(textArray[1]),
		b: Number(textArray[2]),
		a: Number(textArray[3])
	}
}

export function rgbToString(color: RGB): string {
	return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export function rgbaToString(color: RGBA): string {
	return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
}

export function rgbaToHex(color: RGBA): string {
	const {r, g, b} = color;
	return '#' + [r, g, b].map(x => {
		const hex = x.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	}).join('');
}


export function getContrastColor(rgb: RGB): RGB {
	// Calculate the brightness of the foreground color (simple approximation)
	let brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
	// If the foreground is bright, use black; otherwise use white
	return brightness > 128 ? {r: 0, g: 0, b: 0} : {r: 255, g: 255, b: 255};
}

export function getContrastBool(rgb: RGB): boolean {
	return getContrastColor(rgb).r === 0
}


function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

export function adjustBrightness(rgb: RGB, factor: number): RGB {
	const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;

	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h = 0, s = 0, l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	l = clamp(l * factor, 0, 1);

	let r1: number, g1: number, b1: number;
	if (s === 0) {
		r1 = g1 = b1 = l;
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r1 = hue2rgb(p, q, h + 1 / 3);
		g1 = hue2rgb(p, q, h);
		b1 = hue2rgb(p, q, h - 1 / 3);
	}

	return {
		r: clamp(Math.round(r1 * 255), 0, 255),
		g: clamp(Math.round(g1 * 255), 0, 255),
		b: clamp(Math.round(b1 * 255), 0, 255)
	};

	function hue2rgb(p: number, q: number, t: number): number {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return clamp(p + (q - p) * 6 * t, 0, 1);
		if (t < 1 / 2) return clamp(q, 0, 1);
		if (t < 2 / 3) return clamp(p + (q - p) * (2 / 3 - t) * 6, 0, 1);
		return clamp(p, 0, 1);
	}
}
