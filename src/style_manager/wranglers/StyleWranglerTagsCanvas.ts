// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import {RGB, HSL}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {hslToRgb, rgbToHsl} from "src/lib/ColorConverters";
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
		const opacity_border = this.plugin.settings.Canvas.Values.CardBorderOpacity;
		const background_luminance_offset = this.plugin.settings.Canvas.Values.CardBackgroundLuminanceOffset;


		return this.get_tags()
			.map(
				({tag_name, color, background_color}) => {
					const hsl:HSL = rgbToHsl(background_color);
					hsl.l -= background_luminance_offset;
					const color2 = hslToRgb(hsl);
					const background_rgb:string = `${color2.r}, ${color2.g}, ${color2.b}`;

					return `
div.canvas-node-container:has(div.markdown-embed-content a[href="#${tag_name}"]) {
	background : rgb(${background_rgb}) !important;
	border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
}`
				}
			)
			.join('\n');
	}
}
