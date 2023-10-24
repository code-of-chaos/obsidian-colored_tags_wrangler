// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/style_wrangler";
import {RGB}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTagsCanvas extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsCanvasEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.customTagColors)
			.map(tagName => {
				const color: RGB = this.plugin.settings.customTagColors[tagName];


				const rgb:string = `${color.r}, ${color.g}, ${color.b}`;
				const opacity_background:string = this.plugin.settings.kanbanCardBackgroundOpacity.toString();
				const opacity_border:string = this.plugin.settings.kanbanCardBorderOpacity.toString();

				// noinspection CssInvalidFunction,CssUnusedSymbol
				return `
					div.canvas-node-container:has(div.markdown-embed-content a[href="#${tagName}"]) {
						background : rgba(${rgb}, ${opacity_background}) !important;
						border-color: rgba(${rgb}, ${opacity_border}) !important;
					}`;
			}).join('\n');
	}

}
