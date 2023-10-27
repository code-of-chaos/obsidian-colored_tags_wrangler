// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import {RGB}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
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
			.map(tagName => {
				const color: RGB = this.plugin.settings.TagColors.ColorPicker[tagName];
				// noinspection CssInvalidFunction
				return `
					.tag[href="#${tagName}"], .cm-tag-${tagName} { 
						--color: rgb(${color.r}, ${color.g}, ${color.b});
						--color-hover: var(--color);
						--background: rgba(${color.r}, ${color.g}, ${color.b}, ${background_opacity});
						--background-hover: rgba(${color.r}, ${color.g}, ${color.b}, ${background_opacity_hover});
					}`;
			}).join('\n');
	}

}
