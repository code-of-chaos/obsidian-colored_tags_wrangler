// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {ServiceProvider} from "../../services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";
import {rgbopacityToString} from "../../../lib/ColorConverters";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CssWranglerStyling implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _properties(record: IColoredTagRecord): Record<string, string> {
		const dict: Record<string, string> = {}
		if (record.css_styling_bold_enabled) {
			dict["font-weight"] = "bold"
		}
		if (record.css_styling_italic_enabled) {
			dict["font-style"] = "italic"
		}
		if (record.css_styling_font_family !== undefined && record.css_styling_font_family !== null && record.css_styling_font_family !== "") {
			dict["font-family"] = `${record.css_styling_font_family}`
		}
		if (record.css_styling_font_size !== undefined && record.css_styling_font_size !== null && record.css_styling_font_size !== 1) {
			dict["font-size"] = `${record.css_styling_font_size}em`
		}
		if (record.css_styling_opacity !== undefined && record.css_styling_opacity !== null && record.css_styling_opacity !== 1) {
			if (record.core_enabled){
				dict["background-color"] = `${rgbopacityToString(record.core_color_background, record.css_styling_opacity)} !important`
			} else {
				dict["background-color"] = `hsla(var(--accent-h), var(--accent-s), var(--accent-l), ${record.css_styling_opacity})`
			}
		}

		return dict;
	}

	private _selectors(theme: string, record: IColoredTagRecord): string[] {
		return [
			`${theme} .tag[href="#${record.core_tagText}" i]`,
			`${theme} .cm-tag-${record.core_tagText}`,
		]
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public getRules(): Record<string, Record<string, string>> {
		const dict: Record<string, Record<string, string>> = {};

		// Only use the default record for the specific extension we are in,
		//		No need to check all the available keys in all available extensions
		const defaultRecord = ServiceProvider.extensions.Extensions.Styling.getDefaultRecord()

		ServiceProvider.tagRecords
			.getTagsFlat(false)
			.filter(record => {
				// @ts-ignore
				return Object.keys(defaultRecord).first(key => record[key] !== defaultRecord[key])
			})
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
}
