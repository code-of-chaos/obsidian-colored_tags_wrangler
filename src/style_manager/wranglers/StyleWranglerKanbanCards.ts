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
		const opacity_background:string = this.plugin.settings.Kanban.Values.CardBackgroundOpacity.toString();
		const opacity_border:string = this.plugin.settings.Kanban.Values.CardBorderOpacity.toString();

		return this.get_tags()
			.map(
				({tag_name, color}) => `
				div.kanban-plugin__item.has-tag-${tag_name} div.kanban-plugin__item-title-wrapper { 
					background: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_background}) !important;
				}
				div.kanban-plugin__item.has-tag-${tag_name}{ 
					border-color: rgba(${color.r}, ${color.g}, ${color.b}, ${opacity_border}) !important;
				}`
			)
			.join('\n');
	}
}
