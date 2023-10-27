// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {IObsidianSemanticColorsIndex, ObsidianSemanticColors}
	from "src/lib/ObsidianSemanticColors";
import {
	hexToRgb, RGBa,
	rgbToHsl,
	stringToHsl,
	stringToRgb, stringToRgba
} from "src/lib/ColorConverters";
import {HSL} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTagsSemanticColors extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsSemanticColorsEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {

		const enumIndex: IObsidianSemanticColorsIndex = ObsidianSemanticColors;

		return Object.keys(this.plugin.settings?.TagColors.SemanticObsidianColors)
			.map(tagName => {
				// Iterate over the enum and find the key
				const css_var: string = this.plugin.settings.TagColors.SemanticObsidianColors[tagName];
				const css_key = enumIndex[css_var];

				let colorFormat = "unknown";

				const found_value:string = getComputedStyle(document.body).getPropertyValue(css_key).trim();
				if (found_value === "" || found_value === null){
					return;
				}

				if (found_value.startsWith("hsl(")) {
					colorFormat = "hsl";
				} else if (found_value.startsWith("rgb(")) {
					colorFormat = "rgb";
				} else if (found_value.startsWith("rgba(")) {
						colorFormat = "rgba";
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
					case "rgba":
						let rgba:RGBa = stringToRgba(found_value);
						convertedColor = rgbToHsl({r:rgba.r, g:rgba.g, b:rgba.b});
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
