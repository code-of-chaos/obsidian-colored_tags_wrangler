// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler} from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin from "src/main";
import {isWildcardTagName} from "src/api/tags";

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
			.map(({tag_name, color, background_color}) => {
				const wildcard = isWildcardTagName(tag_name);
				const tagPrefix = wildcard ? tag_name.slice(0, -1) : tag_name;
				const hrefOperator = wildcard ? "^" : "";

				const hrefSelectors = Array.from(new Set([
					`a[href${hrefOperator}="#${tag_name}" i]`,
					`a[href${hrefOperator}="${encodeURI("#" + tag_name)}" i]`,
					`a[href${hrefOperator}="#${encodeURIComponent(tag_name)}" i]`,
					...(wildcard ? [
						`a[href${hrefOperator}="#${tagPrefix}" i]`,
						`a[href${hrefOperator}="${encodeURI("#" + tagPrefix)}" i]`,
						`a[href${hrefOperator}="#${encodeURIComponent(tagPrefix)}" i]`,
					] : [])
				])).join(", ");

				return `
${theme} div.canvas-node-container:has(div.markdown-embed-content :is(${hrefSelectors})) {
	--canvas-color : ${color.r}, ${color.g}, ${color.b} !important;
	background : ${this.getBackgroundWithOpacityString(background_color)} ${important};
	border-color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
}`;
			});
	}
}
