// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { IColoredTagRecord } from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {ServiceProvider} from "../../services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class CssStylingCssWrangler implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _assembleCss(selectors:string[], record:IColoredTagRecord):string {
		const properties = [
			record.css_styling_boldify_enabled ? "font-weight: bold !important;" : "",
			record.css_styling_italic_enabled ? "font-style: italic !important;" : "",
			(record.css_styling_font_family !== undefined && record.css_styling_font_family !== null && record.css_styling_font_family !== "")  ? `font-family : ${record.css_styling_font_family} !important;` : "",
			(record.css_styling_font_size !== undefined && record.css_styling_font_size !== null && record.css_styling_font_size !== 0) ? `font-size : ${record.css_styling_font_size}em !important;` : "",
		]

		return `
			${selectors.join(", ")} {${properties.join("")}}
		`
	}

	private _assembleRules(theme:string, record:IColoredTagRecord):string[]{
		return [
			this._assembleCss(
				[
					`${theme} .tag[href="#${record.core_tagText}" i]`,
					`${theme} .cm-tag-${record.core_tagText}`
				],
				record
			)
		]
	}

	getRules(): string[] {
		return ServiceProvider.tagRecords
			.getTagsFlat(false)
			.filter(record => record.css_styling_enabled)
			.flatMap(record =>
				this._assembleRules(themeSelectorLight, record)
				.concat(this._assembleRules(themeSelectorDark, record))
			)
	}
}
