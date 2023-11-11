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
		const background_luminance_offset = this.plugin.settings.Canvas.Values.CardBackgroundLuminanceOffset;

		return this.get_tags()
			.map(
				({tag_name, color, background_color,background_opacity}) => {
					const hsl:HSL = rgbToHsl(background_color);
					hsl.l += background_opacity;
					const color2 = hslToRgb(hsl);
					const background_rgb:string = `${color2.r}, ${color2.g}, ${color2.b}`;
					return this.assemble_css(
						"body.theme-light",
						tag_name,
						color,
						background_rgb,
						opacity_border,
					)
				});
	}

	assemble_css_dark(): Array<string> {
		const opacity_border = this.plugin.settings.Canvas.Values.CardBorderOpacity;
		const background_luminance_offset = this.plugin.settings.Canvas.Values.CardBackgroundLuminanceOffset;

		return this.get_tags()
			.map(
				({tag_name, color, background_color, background_opacity}) => {
					const hsl:HSL = rgbToHsl(background_color);
					hsl.l -= background_opacity;
					const color2 = hslToRgb(hsl);
					const background_rgb:string = `${color2.r}, ${color2.g}, ${color2.b}`;
					return this.assemble_css(
						"body.theme-dark",
						tag_name,
						color,
						background_rgb,
						opacity_border,
					)
				});
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_rgb:string, opacity_border:number){
		return`
${theme} div.canvas-node-container:has(div.markdown-embed-content a[href="#${tag_name}"]) {
	background : rgb(${background_rgb}) !important;
	border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
}`

	}
}
