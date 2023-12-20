// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/plugin/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerCSS extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleCSS", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css_light(): Array<string> {
		return [this.assemble_css()]
	}

	assemble_css_dark(): Array<string> {
		return [this.assemble_css()]
	}

	private assemble_css(){
		let css:string = ""
		if (this.plugin.settings.CSS.TagsNoWrap){
			css += `
			a.tag {
				white-space: ${this.plugin.settings.CSS.TagsNoWrapText};
			}
			`
		}

		return css

	}

}
