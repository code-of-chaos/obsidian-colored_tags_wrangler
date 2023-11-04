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
export class StyleWranglerKanbanCards extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanCardsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.TagColors.ColorPicker)
			.map(tagUUID => {
				const {tag_name, color} = this.plugin.settings.TagColors.ColorPicker[tagUUID];

				const rgb:string = `${color.r}, ${color.g}, ${color.b}`;
				const opacity_background:string = this.plugin.settings.Kanban.Values.CardBackgroundOpacity.toString();
				const opacity_border:string = this.plugin.settings.Kanban.Values.CardBorderOpacity.toString();

				// noinspection CssInvalidFunction,CssUnusedSymbol
				return `
					div.kanban-plugin__item.has-tag-${tag_name} div.kanban-plugin__item-title-wrapper { 
						background: rgba(${rgb}, ${opacity_background}) !important;
					}
					div.kanban-plugin__item.has-tag-${tag_name}{ 
						border-color: rgba(${rgb}, ${opacity_border}) !important;
					}
				`;
			}).join('\n');
	}
}
