// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import {HSL, RGB}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {hslToRgb, rgbToHsl}
	from "src/lib/ColorConverters";
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
	assemble_css_light(): Array<string> {
		const opacity_border = this.plugin.settings.Canvas.Values.CardBorderOpacity;

		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {
					let hsl_background = rgbToHsl(background_color);
					hsl_background.l -= luminance_offset
					return this.assemble_css(
						"body.theme-light",
						tag_name,
						color,
						hslToRgb(hsl_background)
					)
				});
	}

	assemble_css_dark(): Array<string> {
		return this.get_tags()
			.map(
				({tag_name, color, background_color, luminance_offset}) => {
					let hsl_background = rgbToHsl(background_color);
					hsl_background.l -= luminance_offset
					return this.assemble_css(
						"body.theme-dark",
						tag_name,
						color,
						hslToRgb(hsl_background)
					)
				});
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB){
		return`
${theme} div.canvas-node-container:has(div.markdown-embed-content a[href="#${tag_name}"]) {
	background : rgb(${background_color.r}, ${background_color.g}, ${background_color.b}) !important;
	border-color: rgb(${color.r}, ${color.g}, ${color.b}) !important;
}`

	}
}
