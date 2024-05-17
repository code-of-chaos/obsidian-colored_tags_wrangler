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

export class BoldifyCssWrangler implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _assembleCss(theme:string, selector:string, color:RGBA, background_color:RGBA):string {
		return ""
	}

	private _assembleRules(theme:string, record:IColoredTagRecord):string[]{
		return []
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
