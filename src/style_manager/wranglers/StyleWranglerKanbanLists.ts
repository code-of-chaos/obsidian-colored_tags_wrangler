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
export class StyleWranglerKanbanLists extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanListsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.TagColors.ColorPicker)
			.map(tagName => {
				const color: RGB = this.plugin.settings.TagColors.ColorPicker[tagName];

				const rgb:string = `${color.r}, ${color.g}, ${color.b}`;
				const opacity_background:string = this.plugin.settings.Kanban.Values.ListBackgroundOpacity.toString();
				const opacity_border:string = this.plugin.settings.Kanban.Values.ListBorderOpacity.toString();

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
