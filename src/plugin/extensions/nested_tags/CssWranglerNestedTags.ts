// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {ServiceProvider} from "../../services/ServiceProvider";
import {IColoredTagRecord} from "../../../contracts/plugin/settings/IColoredTagRecord";
import {rgbToString} from "../../../lib/ColorConverters";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class CssWranglerNestedTags implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _properties(record: IColoredTagRecord): Record<string, string> {
		return {
			"color": `${rgbToString(record.core_color_foreground)} !important`,
			"background": `${rgbToString(record.core_color_background)} !important`,
		}
	}

	private _selectors(theme: string, tagParts: string[]): string[] {
		return [
			`${theme} .tag[href="#${tagParts.join('/')}" i]`,
			`${theme} .cm-tag-${tagParts.join('')}`,
		]
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public getRules(): Record<string, Record<string, string>> {
		const dict: Record<string, Record<string, string>> = {};

		const allTagsInPlugin: IColoredTagRecord[] = ServiceProvider.tagRecords.getTagsFlat(false)
		const allTagNamesInPlugin: Record<string, IColoredTagRecord> = {};
		allTagsInPlugin.forEach(tag => allTagNamesInPlugin[tag.core_tagText] = tag);

		const allNestedTagsInVault: Record<string, unknown> = ServiceProvider.vaultTags.allNestedTags;

		const tags = ServiceProvider.vaultTags.allTags
			.filter(tag => tag.match(/\//gim))
			.map(tag => tag.split(/\//gim))

		Object.keys(allNestedTagsInVault)
			.filter(tag => allTagNamesInPlugin[tag])
			.forEach(tag => {
				const record = allTagNamesInPlugin[tag]

				const nestedRecordTags = tags.filter(t => t[0] == record.core_tagText)
				nestedRecordTags.forEach(tag => {
					this._selectors(themeSelectorLight, tag)
						.forEach((rule) => {
							dict[rule] = this._properties(record)
						})
					this._selectors(themeSelectorDark, tag)
						.forEach((rule) => {
							dict[rule] = this._properties(record)
						})
				})
			})



		return dict
	}
}
