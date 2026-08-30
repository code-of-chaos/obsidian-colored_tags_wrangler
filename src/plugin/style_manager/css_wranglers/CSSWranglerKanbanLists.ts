// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerKanbanLists extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super(plugin, plugin.settings.Kanban);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCss(theme:string){
		const important:string = this.getImportant();
		return this.getTags(false)
			.map(({tag_name, color, background_color}) => {
				const hrefSelectors = Array.from(new Set([
					`a[href="#${tag_name}" i]`,
					`a[href="${encodeURI("#" + tag_name)}" i]`,
					`a[href="#${encodeURIComponent(tag_name)}" i]`
				])).join(", ");

				return `
${theme} div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text :is(${hrefSelectors})){
	background: ${this.getBackgroundWithOpacityString(background_color)} ${important};
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}
${theme} div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text :is(${hrefSelectors})){
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}`;
			});
	}
}
