// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { IColoredTagRecord } from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {RGBA} from "../../../contracts/types/RGBA";
import {ServiceProvider} from "../../services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class BoldifyCssWrangler implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _assembleCss(selectors:string[]):string {
		return `
			${selectors.join(", \n")} { 
				font-weight: bold !important;
			}
		`
	}

	private _assembleRules(theme:string, record:IColoredTagRecord):string[]{
		return [this._assembleCss([
			`${theme} .tag[href="#${record.core_tagText}" i]`,
			`${theme} .cm-tag-${record.core_tagText}`
		])]
	}

	getRules(): string[] {
		return ServiceProvider.tagRecords
			.getTagsFlat(false)
			.filter(record => record.core_enabled && record.boldify_enabled)
			.flatMap(record =>
				this._assembleRules(themeSelectorLight, record)
				.concat(this._assembleRules(themeSelectorDark, record))
			)
	}
}
