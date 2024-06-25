// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {rgbopacityToString, rgbToString} from "../../../lib/ColorConverters";
import {ServiceProvider} from "../../services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class CssWranglerCanvasCard implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _properties(record: IColoredTagRecord): Record<string, string> {
		const dict: Record<string, string> = {}

		if (record.canvas_card_enable_border){
			dict["border-color"] = `${rgbToString(record.core_color_foreground)} !important`
		}
		if (record.canvas_card_enable_background){
			// dict["--canvas-color"] = `${record.core_color_foreground.r}, ${record.core_color_foreground.g}, ${record.core_color_foreground.b}`
			dict["background-color"] = `${rgbopacityToString(record.core_color_background, record.canvas_card_background_opacity)} !important`
		}

		return dict
	}

	private _selectors(theme: string, record: IColoredTagRecord): string[] {
		return [
			`${theme} div.canvas-node > div.canvas-node-container:has(a.tag)[href="#${record.core_tagText}" i]`,
			`${theme} div.canvas-node:has(div.canvas-node-container:has(a.tag)[href="#${record.core_tagText}" i])`,
			`${theme} div.canvas-node-container:has(div.markdown-embed-content a[href="#${record.core_tagText}" i])`
		]
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public getRules(): Record<string, Record<string, string>> {
		const dict: Record<string, Record<string, string>> = {};

		ServiceProvider.tagRecords
			.getTagsFlat(false)
			.filter(record => {
				return record.canvas_card_enable_border
					|| record.canvas_card_enable_background
					|| record.canvas_card_background_opacity !== ServiceProvider.extensions.CanvasCards.getDefaultRecord().canvas_card_background_opacity;
			})
			// Sort of lowest to highest priority
			.sort((a, b) => {
				if (a.canvas_card_priority === undefined || b.canvas_card_priority === undefined) return 1
				return a.canvas_card_priority >= b.canvas_card_priority ? 1 : -1
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
