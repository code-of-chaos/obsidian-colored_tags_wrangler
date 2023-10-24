// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/style_wrangler";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTagsSemanticColors extends StyleWrangler {
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
		return Object.keys(this.plugin.settings?.TagSemanticColors)
			.map(tagName => {
				const css_var: string = this.plugin.settings.TagSemanticColors[tagName];
				// noinspection CssInvalidFunction
				return `
					.tag[href="#${tagName}"], .cm-tag-${tagName} { 
						--color: var(${css_var});
						--color-hover: var(${css_var});
						--background: var(${css_var});
						--background-hover: var(${css_var});
					}`;
			}).join('\n');
	}

}
