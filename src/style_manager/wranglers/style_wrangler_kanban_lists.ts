// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/style_wrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB}
	from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerKanbanLists extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanTitlesEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.customTagColors)
			.map(tagName => {
				const color: RGB = this.plugin.settings.customTagColors[tagName];

				const rgb:string = `${color.r}, ${color.g}, ${color.b}`;
				const opacity_background:string = this.plugin.settings.kanbanListBackgroundOpacity.toString();
				const opacity_border:string = this.plugin.settings.kanbanListBorderOpacity.toString();

				// noinspection CssInvalidFunction,CssUnusedSymbol
				return `
					div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a[href="#${tagName.toLowerCase()}"]){
						background : rgba(${rgb}, ${opacity_background}) !important;
						border-color: rgba(${rgb}, ${opacity_border}) !important;
					}
					div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a[href="#${tagName.toLowerCase()}"]){
						border-color: rgba(${rgb}, ${opacity_border}) !important;
					}
				`;
			}).join('\n');
	}
}
