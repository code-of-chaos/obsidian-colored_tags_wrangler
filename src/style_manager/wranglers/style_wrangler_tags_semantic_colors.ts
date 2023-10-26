// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/style_wrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {IObsidianSemanticColorsIndex, ObsidianSemanticColors}
	from "src/lib/obsidian_semantic_colors";
import {hexToRgb, rgbToHsl, stringToHsl, stringToRgb} from "src/lib/convert_colors";
import {HSL} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTagsSemanticColors extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {

		const enumIndex: IObsidianSemanticColorsIndex = ObsidianSemanticColors;

		return Object.keys(this.plugin.settings?.TagSemanticColors)
			.map(tagName => {
				// Iterate over the enum and find the key
				const css_var: string = this.plugin.settings.TagSemanticColors[tagName];
				const css_key = enumIndex[css_var];

				let colorFormat = "unknown";

				const found_value:string = getComputedStyle(document.body).getPropertyValue(css_key).trim();
				if (found_value.startsWith("hsl(")) {
					colorFormat = "hsl";
				} else if (found_value.startsWith("rgb(")) {
					colorFormat = "rgb";
				} else if (found_value.startsWith("#")) {
					colorFormat = "hex";
				} else {
					console.error("Unknown color format:", found_value);
					return;
				}

				let convertedColor : HSL;

				switch (colorFormat) {
					case "hsl":
						convertedColor = stringToHsl(found_value);
						break;
					case "rgb":
						convertedColor = rgbToHsl(stringToRgb(found_value));
						break;
					case "hex":
						// HEX format is already recognized
						convertedColor = rgbToHsl(hexToRgb(found_value));
						break;
					default:
						console.error("Unknown color format:", found_value);
						return;
				}

				const new_color = {...convertedColor, l:convertedColor.l-0.35}
				const new_css = `hsl(${new_color.h}, ${new_color.s*100}%, ${new_color.l*100}%)`;

				// noinspection CssInvalidFunction
				return `
					.tag[href="#${tagName}"], .cm-tag-${tagName} { 
						--color: var(${css_key});
						--color-hover: var(${css_key});
						--background: ${new_css};
						--background-hover: ${new_css};
					}`;
			}).join('\n');
	}

}
