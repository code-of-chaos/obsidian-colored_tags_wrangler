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
export class StyleWranglerTagsVarColors extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsCssVarsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.TagColors.CssVars)
			.map(tagUUID => {
				const {tag_name, color,background} = this.plugin.settings.TagColors.CssVars[tagUUID];
				// noinspection CssInvalidFunction
				return `
					.tag[href="#${tag_name}"], .cm-tag-${tag_name} { 
						--color: var(${color});
						--color-hover: var(--color);
						--background: var(${background});
						--background-hover: var(--background);
					}`;
			}).join('\n');
	}

}
