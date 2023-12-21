// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/plugin/style_manager/css_wranglers/StyleWrangler";
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
		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {
					return this.assemble_css(
						"body.theme-light",
						tag_name,
						color,
						this.get_background_color(
							background_color,
							luminance_offset,
							true
						)
					)
				});
	}

	assemble_css_dark(): Array<string> {
		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {
					return this.assemble_css(
						"body.theme-dark",
						tag_name,
						color,
						this.get_background_color(
							background_color,
							luminance_offset,
							false
						)
					)
				});
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB){
		const important:string = this.get_important();

		return`
${theme} div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	background: ${this.get_background_string(background_color)} ${important};
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}
${theme} div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}`

	}
}
