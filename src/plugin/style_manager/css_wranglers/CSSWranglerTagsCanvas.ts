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
	assembleCss(theme:string){
		const important:string = this.getImportant();
		return this.getTags()
			.map(
				({tag_name, color, background_color}) => `
${theme} div.canvas-node-container:has(div.markdown-embed-content a[href="#${tag_name}"]) {
	background : ${this.getBackgroundWithOpacityString(background_color)} ${important};
	border-color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
}`
				);



	}
}
