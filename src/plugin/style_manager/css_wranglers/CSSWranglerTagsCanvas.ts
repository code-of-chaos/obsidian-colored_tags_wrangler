// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler} from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import {RGB} from "obsidian";
import ColoredTagWranglerPlugin from "src/main";
import {get_tags} from "../../../api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerTagsCanvas extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsCanvasEl", plugin);
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

	private assembleCss(theme:string, is_light_theme:boolean){
		const important:string = this.getImportant();
		return this.getTags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => `
${theme} div.canvas-node-container:has(div.markdown-embed-content a[href="#${tag_name}"]) {
	background : ${this.getBackgroundString(this.getBackgroundColorLuminanceOffset(background_color, luminance_offset, is_light_theme))} ${important};
	border-color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
}`
				);



	}
}
