// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "./style_wrangler";
import ColoredTagWranglerPlugin from "../main";
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerKanbanTitles extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanTitlesEl", plugin)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.customTagColors)
			.map(tagName => {
				const color: RGB = this.plugin.settings.customTagColors[tagName];
				// noinspection CssInvalidFunction
				return `
					div.kanban-plugin__lane:has(a[href="#${tagName}"]){
						background : rgba(${color.r}, ${color.g}, ${color.b}, 0.2) !important;
					}`;
			}).join('\n');
	}
}
