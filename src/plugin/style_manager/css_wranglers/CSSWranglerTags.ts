// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerTags extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super(plugin, plugin.settings.TagColors);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _assembleCss(theme:string, selector:string, important:string, color:RGB, background_color:RGB):string {
		return ` 
				${theme} ${selector} { 
					color: ${this.getForegroundString(color)} ${important};
					background-color: ${this.getBackgroundWithOpacityString(background_color)} ${important};
				}`
	}
	assembleCss(theme:string){
		const important:string = this.getImportant();

		return [
			...this.getTags(false).map(
				(v) => this._assembleCss(
					theme, `.tag[href="#${v.tag_name}"]`, important, v.color, v.background_color)
			),
			...this.getTags().map(
				(v) => this._assembleCss(
					theme, `.cm-tag-${v.tag_name}`,important, v.color, v.background_color)
			)]
	}

}
