// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB, HSL}
	from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface RGBa extends RGB {
	a: number;
}

export function hexToRgb(hexColor:string) : RGB{
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

// ---------------------------------------------------------------------------------------------------------------------
export function hexToRGBA(hex:string, alpha:number):string {
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
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ---------------------------------------------------------------------------------------------------------------------
export function stringToHsl(txt:string):HSL{
	const hslArray = txt
		.replace("hsl(", "")
		.replace(")", "")
		.split(",")
		.map(v=> v.trim())
	return {
		h:Number(hslArray[0]),
		s:hslArray[1].endsWith("%")
			? (Number(hslArray[1].replace("%", "")) / 100)
			: (Number(hslArray[1])),
		l:hslArray[2].endsWith("%")
			? (Number(hslArray[2].replace("%", "")) / 100)
			: (Number(hslArray[2])),
	}
}

// ---------------------------------------------------------------------------------------------------------------------
export function stringToRgb(txt:string):RGB{
	const textArray = txt
		.replace("rgb(", "")
		.replace(")", "")
		.split(",")
		.map(v=> v.trim())
	return {
		r:Number(textArray[0]),
		g:Number(textArray[1]),
		b:Number(textArray[2]),
	}
}

export function stringToRgba(txt:String):RGBa{
	const textArray = txt
		.replace("rgba(", "")
		.replace(")", "")
		.split(",")
		.map(v=> v.trim())
	return {
		r:Number(textArray[0]),
		g:Number(textArray[1]),
		b:Number(textArray[2]),
		a:Number(textArray[3])
	}
}
