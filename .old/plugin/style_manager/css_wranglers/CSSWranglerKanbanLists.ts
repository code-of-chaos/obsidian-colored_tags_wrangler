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
export class CSSWranglerKanbanLists extends CSSWrangler {
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
		return this.getTags(false)
			.map(
				({tag_name, color, background_color}) => `
${theme} div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	background: ${this.getBackgroundWithOpacityString(background_color)} ${important};
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}
${theme} div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a[href="#${tag_name}"]){
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}`
			);
	}
}
