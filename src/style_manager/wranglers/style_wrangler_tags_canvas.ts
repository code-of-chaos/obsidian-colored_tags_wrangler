// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/style_wrangler";
import {RGB, HSL}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {hslToRgb, rgbToHsl} from "src/lib/convert_colors";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTagsCanvas extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsCanvasEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.customTagColors)
			.map(tagName => {
				const color: RGB = this.plugin.settings.customTagColors[tagName];

				const opacity_border:string = this.plugin.settings.CanvasCardBorderOpacity.toString();

				const hsl:HSL = rgbToHsl(color);
				hsl.l -= this.plugin.settings.CanvasCardBackgroundLuminanceOffset;
				const color2 = hslToRgb(hsl);
				const rgb:string = `${color2.r}, ${color2.g}, ${color2.b}`;

				// noinspection CssInvalidFunction,CssUnusedSymbol
				return `
					div.canvas-node-container:has(div.markdown-embed-content a[href="#${tagName}"]) {
						background : rgb(${rgb}) !important;
						border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
					}`;
			}).join('\n');
	}

}