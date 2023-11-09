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
		const opacity_background: string = this.plugin.settings.Kanban.Values.ListBackgroundOpacity.toString();
		const opacity_border: string = this.plugin.settings.Kanban.Values.ListBorderOpacity.toString();

		return this.get_tags()
			.map(
				({tag_name, color}) => `
					div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
						background : rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_background}) !important;
						border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
					}
					div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
						border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
					}`
			)
			.join('\n');
	}
}
