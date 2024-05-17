// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { IColoredTagRecord } from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {rgbaToString} from "../../../lib/ColorConverters";
import {RGBA} from "../../../contracts/types/RGBA";
import {ServiceProvider} from "../../services/ServiceProvider";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class CoreCssWrangler implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _assembleCss(theme:string, selector:string, color:RGBA, background_color:RGBA):string {
		return `
				${theme} ${selector} { 
					color: ${rgbaToString(color)} !important;
					background-color: ${rgbaToString(background_color)} !important;
				}`
	}

	private _assembleRules(theme:string, record:IColoredTagRecord):string[]{
		return [
			this._assembleCss(
				theme,
				`.tag[href="#${record.core_tagText}" i]`,
				record.core_color_foreground,
				record.core_color_background),
			this._assembleCss(
				theme,
				`.cm-tag-${record.core_tagText}`,
				record.core_color_foreground,
				record.core_color_background),

		]
	}

    getRulesThemeLight(): string[] {
		const theme = "body.theme-light";
		return ServiceProvider.tagRecords.getTagsFlat(false).flatMap(
			record => this._assembleRules(theme, record)
		)
	}

	getRulesThemeDark(): string[] {
		const theme = "body.theme-dark";
		return ServiceProvider.tagRecords.getTagsFlat(false).flatMap(
			record => this._assembleRules(theme, record)
		)
	}
}
