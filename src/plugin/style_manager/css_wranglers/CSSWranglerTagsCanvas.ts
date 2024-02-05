// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler} from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin from "src/main";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerTagsCanvas extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super(plugin,plugin.settings.TagColors);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCss(theme:string){
		const important:string = this.getImportant();
		return this.getTags(false)
			.map(
				({tag_name, color, background_color}) => `
${theme} div.canvas-node-container:has(div.markdown-embed-content a[href="#${tag_name}" i]) {
	--canvas-color : ${color.r}, ${color.g}, ${color.b} !important;
	background : ${this.getBackgroundWithOpacityString(background_color)} ${important};
	border-color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
}`
			);
	}
}
