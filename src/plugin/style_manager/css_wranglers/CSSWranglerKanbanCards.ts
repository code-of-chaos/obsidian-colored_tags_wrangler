// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {tagNameToClassSelector} from "src/api/tags";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerKanbanCards extends CSSWrangler {
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
			.map(
				({tag_name, color, background_color}) => `
${theme} div.kanban-plugin__item${tagNameToClassSelector(tag_name, "has-tag-")} div.kanban-plugin__item-title-wrapper {
	background: ${ this.getBackgroundWithOpacityString(background_color)} ${important};
}
${theme} div.kanban-plugin__item${tagNameToClassSelector(tag_name, "has-tag-")}{
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}`
			);

	}
}
