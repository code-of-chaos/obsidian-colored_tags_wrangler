// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from ".old/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from ".old/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerKanbanCards extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: ColoredTagWranglerPlugin) {
		super(plugin, plugin.settings.Kanban);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCss(theme: string) {
		const important: string = this.getImportant();
		return this.getTags()
			.map(
				({tag_name, color, background_color}) => `
${theme} div.kanban-plugin__item.has-tag-${tag_name} div.kanban-plugin__item-title-wrapper { 
	background: ${this.getBackgroundWithOpacityString(background_color)} ${important};
}
${theme} div.kanban-plugin__item.has-tag-${tag_name}{ 
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}`
			);

	}
}
