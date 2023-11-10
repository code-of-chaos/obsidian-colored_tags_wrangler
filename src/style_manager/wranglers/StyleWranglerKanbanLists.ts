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
		const opacity_border: string = this.plugin.settings.Kanban.Values.ListBorderOpacity.toString();

		return this.get_tags()
			.map(
				({tag_name, color, background_color, background_opacity}) => `
div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	background : rgba(${background_color.r}, ${background_color.g}, ${background_color.b}, ${background_opacity}) !important;
	border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
}
div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
}`
			)
			.join('\n');
	}
}
