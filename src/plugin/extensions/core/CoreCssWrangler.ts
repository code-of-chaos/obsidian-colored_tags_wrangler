// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {rgbToString} from "../../../lib/ColorConverters";
import {ServiceProvider} from "../../services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class CoreCssWrangler implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _properties(record: IColoredTagRecord): Record<string, string> {
		return {
			"color": `${rgbToString(record.core_color_foreground)} !important`,
			"background": `${rgbToString(record.core_color_background)} !important`,
		}
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

		ServiceProvider.tagRecords
			.getTagsFlat(false)
			.filter(record => record.core_enabled)
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
