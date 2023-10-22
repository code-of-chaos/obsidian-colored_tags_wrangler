// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "./style_wrangler";
import {RGB} from "obsidian";
import ColoredTagWranglerPlugin from "../main";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTags extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsEl", plugin)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.customTagColors)
			.map(tagName => {
				const color: RGB = this.plugin.settings.customTagColors[tagName];
				// This only works because of the style.css of the project
				//  TODO either filter the `#` here or in the setting_tab, but I need to do it somewhere.
				return `.tag[href="#${tagName}"], .cm-tag-${tagName} { --color: ${color.r}, ${color.g}, ${color.b}; }`;
			}).join('\n');
	}

}
