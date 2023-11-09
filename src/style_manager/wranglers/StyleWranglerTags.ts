// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
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
	assemble_css(): string {
		const background_opacity = this.plugin.settings.TagColors.Values.BackgroundOpacity;
		const background_opacity_hover = this.plugin.settings.TagColors.Values.BackgroundOpacityHover;

		return Object.keys(this.plugin.settings?.TagColors.ColorPicker)
			.map(tagUUID => {
				const {tag_name, color} = this.plugin.settings.TagColors.ColorPicker[tagUUID];

				if (this.plugin.settings?.TagColors.EnableMultipleTags){
					let tag_names = tag_name.split(";")
					return tag_names.map(
						tag=> this._assemble_css_tag(tag, color, background_opacity, background_opacity_hover)
					).join("\n")

				} else {
					return this._assemble_css_tag(tag_name, color, background_opacity, background_opacity_hover)
				}
			}).join('\n');
	}

	private _assemble_css_tag(tag_name:string, color:RGB, background_opacity:number, background_opacity_hover:number){
		return `
		.tag[href="#${tag_name}"], .cm-tag-${tag_name} { 
			--color: rgb(${color.r}, ${color.g}, ${color.b});
			--color-hover: var(--color);
			--background: rgba(${color.r}, ${color.g}, ${color.b}, ${background_opacity});
			--background-hover: rgba(${color.r}, ${color.g}, ${color.b}, ${background_opacity_hover});
		}`;
	}

}
