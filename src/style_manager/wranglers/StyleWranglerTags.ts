// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB}
	from "obsidian";
import {hslToRgb, rgbToHsl} from "../../lib";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTags extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css_light(): Array<string> {
		const luminance_offset_hover = this.plugin.settings.TagColors.Values.BackgroundOpacityHover;
		return this.get_tags()
			.map(
				({tag_name, color, background_color, luminance_offset}) => this.assemble_css(
					"body.theme-light",
					tag_name,
					color,
					background_color
				));
	}

	assemble_css_dark(): Array<string> {
		const luminance_offset_hover = this.plugin.settings.TagColors.Values.BackgroundOpacityHover;
		return this.get_tags()
			.map(
				({tag_name, color, background_color, luminance_offset}) => this.assemble_css(
					"body.theme-dark",
					tag_name,
					color,
					background_color
				));
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB){
		let important = this.plugin.settings.FolderNote.Values.ForceImportant ? "!important" : ""

		// noinspection CssInvalidPropertyValue,CssInvalidFunction
		return` 
${theme} .tag[href="#${tag_name}"], 
${theme} .cm-tag-${tag_name} { 
	color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
	background-color: rgb(${background_color.r}, ${background_color.g}, ${background_color.b}) ${important};
}
`
	}

}
