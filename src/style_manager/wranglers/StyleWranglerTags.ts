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
		const background_opacity_hover = this.plugin.settings.TagColors.Values.BackgroundOpacityHover;
		return this.get_tags()
			.map(
				({tag_name, color, background_color, background_opacity}) => this.assemble_css(
					"body.theme-light",
					tag_name,
					color,
					background_color,
					1-background_opacity,
					1-background_opacity_hover
				));
	}

	assemble_css_dark(): Array<string> {
		const background_opacity_hover = this.plugin.settings.TagColors.Values.BackgroundOpacityHover;
		return this.get_tags()
			.map(
				({tag_name, color, background_color, background_opacity}) => this.assemble_css(
					"body.theme-dark",
					tag_name,
					color,
					background_color,
					background_opacity,
					background_opacity_hover
				));
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB, background_opacity:number, background_opacity_hover:number){
		return`
${theme} .tag[href="#${tag_name}"], .cm-tag-${tag_name} { 
	--color: rgb(${color.r}, ${color.g}, ${color.b});
	--color-hover: var(--color);
	--background: rgba(${background_color.r}, ${background_color.g}, ${background_color.b}, ${background_opacity});
	--background-hover: rgba(${background_color.r}, ${background_color.g}, ${background_color.b}, ${background_opacity_hover});
}`

	}

}
