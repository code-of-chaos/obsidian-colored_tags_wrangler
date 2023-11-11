// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
import {hslToRgb, rgbToHsl} from "../../lib";
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
		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {

					let background_hsl = rgbToHsl(background_color);
					background_hsl.l += luminance_offset;

					return this.assemble_css(
						"body.theme-light",
						tag_name,
						color,
						hslToRgb(background_hsl)
					)
				});
	}

	assemble_css_dark(): Array<string> {
		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {

					let background_hsl = rgbToHsl(background_color);
					background_hsl.l -= luminance_offset;

					return this.assemble_css(
						"body.theme-dark",
						tag_name,
						color,
						hslToRgb(background_hsl)
					)
				});
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB){
		return`
${theme} div.kanban-plugin__item.has-tag-${tag_name} div.kanban-plugin__item-title-wrapper { 
	background: rgb(${background_color.r}, ${background_color.g}, ${background_color.b}) !important;
}
${theme} div.kanban-plugin__item.has-tag-${tag_name}{ 
	border-color: rgb(${color.r}, ${color.g}, ${color.b}) !important;
}`

	}
}
