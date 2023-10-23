// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "./style_wrangler";
import ColoredTagWranglerPlugin from "../../main";
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerKanbanCards extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanCardsEl", plugin)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.customTagColors)
			.map(tagName => {
				const color: RGB = this.plugin.settings.customTagColors[tagName];
				// noinspection CssInvalidFunction,CssUnusedSymbol
				return `
					div.kanban-plugin__item.has-tag-${tagName.toLowerCase()} div.kanban-plugin__item-title-wrapper { 
						background: rgba(${color.r}, ${color.g}, ${color.b}, 0.2) !important;
					}
					div.kanban-plugin__item.has-tag-${tagName.toLowerCase()}{ 
						border-color: rgba(${color.r}, ${color.g}, ${color.b}, 0.3) !important;
					}
				`;
			}).join('\n');
	}
}
