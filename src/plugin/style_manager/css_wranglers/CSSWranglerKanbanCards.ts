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
export class CSSWranglerKanbanCards extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanCardsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCssLight(): Array<string> {
		return this.assembleCss("body.theme-light", true)
	}

	assembleCssDark(): Array<string> {
		return this.assembleCss("body.theme-dark", false)
	}

	private assembleCss(theme:string,is_light_theme:boolean){
		const important:string = this.getImportant();
		return this.getTags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {
					const background = this.getBackgroundString(this.getBackgroundColorLuminanceOffset(background_color, luminance_offset, is_light_theme));
					return `
${theme} div.kanban-plugin__item.has-tag-${tag_name} div.kanban-plugin__item-title-wrapper { 
	background: ${background} ${important};
}
${theme} div.kanban-plugin__item.has-tag-${tag_name}{ 
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}`
				}
			);

	}
}
