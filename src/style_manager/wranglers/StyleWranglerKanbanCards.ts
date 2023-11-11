// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
import {rgbToHsl} from "../../lib";
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
	assemble_css_light(): Array<string> {
		const opacity_border = this.plugin.settings.Kanban.Values.CardBorderOpacity;

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
		const opacity_border = this.plugin.settings.Kanban.Values.CardBorderOpacity;

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
${theme} div.kanban-plugin__item.has-tag-${tag_name} div.kanban-plugin__item-title-wrapper { 
	background: rgb(${background_color.r}, ${background_color.g}, ${background_color.b}) !important;
}
${theme} div.kanban-plugin__item.has-tag-${tag_name}{ 
	border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
}`

	}
}
