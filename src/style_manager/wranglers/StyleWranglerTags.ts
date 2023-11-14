// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB}
	from "obsidian";
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
		return this.get_tags()
			.map(
				({tag_name, color, background_color}) => this.assemble_css(
					"body.theme-light",
					tag_name,
					color,
					background_color
				));
	}

	assemble_css_dark(): Array<string> {
		return this.get_tags()
			.map(
				({tag_name, color, background_color}) => this.assemble_css(
					"body.theme-dark",
					tag_name,
					color,
					background_color
				));
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB){
		const important:string = this.get_important();

		// noinspection CssInvalidPropertyValue,CssInvalidFunction,CssUnusedSymbol
		return` 
${theme} .tag[href="#${tag_name}"], 
${theme} .cm-tag-${tag_name} { 
	color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
	background-color: ${this.get_background_string(background_color)} ${important};
}
`
	}

}
