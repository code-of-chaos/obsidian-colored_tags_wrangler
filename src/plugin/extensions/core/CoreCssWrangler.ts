// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { IColoredTagRecord } from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {rgbaToString} from "../../../lib/ColorConverters";
import {RGBA} from "../../../contracts/types/RGBA";
import {ServiceProvider} from "../../services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class CoreCssWrangler implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _assembleCss(selectors:string[], color:RGBA, background_color:RGBA):string {
		return `
			${selectors.join(",\n")} {
				color: ${rgbaToString(color)} !important;
				background-color: ${rgbaToString(background_color)} !important;
			}
		`
	}

	private _assembleRules(theme:string, record:IColoredTagRecord):string{
		return this._assembleCss(
			[
				`${theme} .tag[href="#${record.core_tagText}" i]`,
				`${theme} .cm-tag-${record.core_tagText}`,
			],
			record.core_color_foreground,
			record.core_color_background,
		)
	}

	getRules(): string[] {
		return ServiceProvider.tagRecords
			.getTagsFlat(false)
			.filter(record => record.core_enabled)
			.flatMap(record => [
				this._assembleRules(themeSelectorLight, record),
				this._assembleRules(themeSelectorDark, record)
			])
	}
}
