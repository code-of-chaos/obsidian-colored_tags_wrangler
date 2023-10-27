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
			.map(tagName => {
				const {color,background} = this.plugin.settings.TagColors.CssVars[tagName];
				// noinspection CssInvalidFunction
				return `
					.tag[href="#${tagName}"], .cm-tag-${tagName} { 
						--color: var(${color});
						--color-hover: var(--color);
						--background: var(${background});
						--background-hover: var(--background);
					}`;
			}).join('\n');
	}

}
