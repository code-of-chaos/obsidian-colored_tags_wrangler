// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
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
	assemble_css_light(): Array<string> {
		const opacity_border = this.plugin.settings.Kanban.Values.ListBorderOpacity;

		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {
					return this.assemble_css(
						"body.theme-light",
						tag_name,
						color,
						background_color,
						luminance_offset,
						opacity_border,
					)
				});
	}

	assemble_css_dark(): Array<string> {
		const opacity_border = this.plugin.settings.Kanban.Values.ListBorderOpacity;

		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {
					return this.assemble_css(
						"body.theme-dark",
						tag_name,
						color,
						background_color,
						luminance_offset,
						opacity_border,
					)
				});
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB, luminance_offset:number, opacity_border:number){
		return`
${theme} div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	background : rgb(${background_color.r}, ${background_color.g}, ${background_color.b}}) !important;
	border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
}
${theme} div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
}`

	}
}
