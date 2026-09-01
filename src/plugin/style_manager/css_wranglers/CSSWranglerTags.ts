// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
import {tagNameToClassSelector, tagNameToHrefSelector} from "src/api/tags";
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
					theme, `.tag${tagNameToHrefSelector(v.tag_name)}`, important, v.color, v.background_color)
			),
			...this.getTags(false).map(
				(v) => this._assembleCss(
					theme, `:where(.cm-hashtag)${tagNameToClassSelector(v.tag_name, "cm-tag-")}`,important, v.color, v.background_color)
			)]
	}

}
