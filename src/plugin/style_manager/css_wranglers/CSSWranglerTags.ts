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
export class CSSWranglerTags extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCssLight(): Array<string> {
		return this.assembleCss("body.theme-light")
	}

	assembleCssDark(): Array<string> {
		return this.assembleCss("body.theme-dark")
	}

	private assembleCss(theme:string){
		const important:string = this.getImportant();

		return this.getTags().map(
			({tag_name, color, background_color}) => ` 
				${theme} .tag[href="#${tag_name}"], 
				${theme} .cm-tag-${tag_name} { 
					color: ${this.getForegroundString(color)} ${important};
					background-color: ${this.getBackgroundString(background_color)} ${important};
				}`
		)
	}

}
