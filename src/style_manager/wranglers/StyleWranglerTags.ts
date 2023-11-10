// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
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
		const background_opacity_hover = this.plugin.settings.TagColors.Values.BackgroundOpacityHover;

		return this.get_tags()
			.map(
				({tag_name, color, background_color, background_opacity}) => `
.tag[href="#${tag_name}"], .cm-tag-${tag_name} { 
	--color: rgb(${color.r}, ${color.g}, ${color.b});
	--color-hover: var(--color);
	--background: rgba(${background_color.r}, ${background_color.g}, ${background_color.b}, ${background_opacity});
	--background-hover: rgba(${background_color.r}, ${background_color.g}, ${background_color.b}, ${background_opacity_hover});
}`
			)
			.join('\n');
	}

}
