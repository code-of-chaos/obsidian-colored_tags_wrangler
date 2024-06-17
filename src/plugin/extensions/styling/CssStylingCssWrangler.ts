// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {ServiceProvider} from "../../services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";
import {rgbaToString, rgbopacityToString} from "../../../lib/ColorConverters";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class CssStylingCssWrangler implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------

	getRules(): Record<string, Record<string, string>> {
		const dict: Record<string, Record<string, string>> = {};

		ServiceProvider.tagRecords
			.getTagsFlat(false)
			.filter(record => record.css_styling_enabled)
			.forEach(record => {
					this._selectors(themeSelectorLight, record)
						.forEach((rule) => {
							dict[rule] = this._properties(record)
						})
					this._selectors(themeSelectorDark, record)
						.forEach((rule) => {
							dict[rule] = this._properties(record)
						})
				}
			)
		return dict
	}

	private _properties(record: IColoredTagRecord): Record<string, string> {
		const dict: Record<string, string> = {}
		if (record.css_styling_bold_enabled) {
			dict["font-weight"] = "bold !important"
		}
		if (record.css_styling_italic_enabled) {
			dict["font-style"] = "italic !important"
		}
		if (record.css_styling_font_family !== undefined && record.css_styling_font_family !== null && record.css_styling_font_family !== "") {
			dict["font-family"] = `${record.css_styling_font_family} !important`
		}
		if (record.css_styling_font_size !== undefined && record.css_styling_font_size !== null && record.css_styling_font_size !== 0) {
			dict["font-size"] = `${record.css_styling_font_size}rem !important`
		}
		if (record.css_styling_opacity !== undefined && record.css_styling_opacity !== null && record.css_styling_opacity !== 1) {
			dict["color"] = `${rgbopacityToString(record.core_color_foreground, record.css_styling_opacity)} !important`
			dict["background-color"] = `${rgbopacityToString(record.core_color_background, record.css_styling_opacity)} !important`
		}

		return dict;
	}

	private _selectors(theme: string, record: IColoredTagRecord): string[] {
		return [
			`${theme} .tag[href="#${record.core_tagText}" i]`,
			`${theme} .cm-tag-${record.core_tagText}`,
		]
	}
}
