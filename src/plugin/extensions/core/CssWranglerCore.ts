// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {ICssWrangler} from "src/contracts/plugin/services/css_styler/ICssWrangler";
import {rgbToString} from "src/lib/ColorConverters";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {themeSelectorDark, themeSelectorLight} from "src/plugin/services/css_styler/CssStylerService";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CssWranglerCore implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _properties(record: IColoredTagRecord): Record<string, string> {
		return {
			"color": `${rgbToString(record.core_color_foreground)}`,
			"background": `${rgbToString(record.core_color_background)}`,
			"stroke": `${rgbToString(record.core_color_foreground)}`,
			"transition": "color 0.25s ease-in-out, background 0.25s ease-in-out",
		}
	}

	private _selectors(theme: string, record: IColoredTagRecord): string[] {
		return [
			`${theme} .tag[href="#${record.core_tagText}" i]`,
			`${theme} .cm-tag-${record.core_tagText}`,
			`${theme} .ctw-tag-${record.core_tagText}`,

			...this._additionalUnderscoredTagSelectors(theme, record, "cm"),
			...this._additionalUnderscoredTagSelectors(theme, record, "ctw"),
		]
	}

	private _additionalUnderscoredTagSelectors(theme:string, record: IColoredTagRecord, prefix:string) : string[] {
		const underscores = (record.core_tagText.match(/_/g) || []).length;
		if (underscores == 0) return [];

		console.warn(record.core_tagText, underscores)

		return Array.from(
			{ length: underscores + 1 },
			(_, i) => {
				const spanSelectors = Array.from({ length: i + 1 }, () => "span.cm-hashtag").join(" + ");
				return `${theme} .${prefix}-tag-${record.core_tagText.replace("/","")} + ${spanSelectors}`;
			}
		);
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
