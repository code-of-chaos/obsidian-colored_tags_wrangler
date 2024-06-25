// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {ServiceProvider} from "../../services/ServiceProvider";
import {IColoredTagRecord} from "../../../contracts/plugin/settings/IColoredTagRecord";
import {hslToRgb, rgbToHsl, rgbToString} from "../../../lib/ColorConverters";
import {themeSelectorDark, themeSelectorLight} from "../../services/css_styler/CssStylerService";
import {HSL} from "obsidian";
import {DropDownOptions, DropdownOptionsFromString} from "./DropDownOptions";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CssWranglerNestedTags implements ICssWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _getHsl(record: IColoredTagRecord) : [HSL, HSL] {
		return [
			rgbToHsl(record.core_color_foreground),
			rgbToHsl(record.core_color_background)
		]
	}
	private _propertiesSame(record: IColoredTagRecord, length:number): Record<string, string> {
		return {
			"color": `${rgbToString(record.core_color_foreground)} !important`,
			"background": `${rgbToString(record.core_color_background)} !important`,
		}
	}

	private _propertiesDarker(record: IColoredTagRecord, length:number): Record<string, string> {
		const [foreHsl, backHsl] = this._getHsl(record)

		const foreLum = foreHsl.l - (0.05 * length)
		const backLum = backHsl.l - (0.05 * length)

		return {
			"color": `${rgbToString(hslToRgb({...foreHsl, l : foreLum}))} !important`,
			"background": `${rgbToString(hslToRgb({...backHsl, l : backLum}))} !important`,
		}
	}

	private _propertiesLighter(record: IColoredTagRecord, length:number): Record<string, string> {
		const [foreHsl, backHsl] = this._getHsl(record)

		const foreLum = foreHsl.l + (0.05 * length)
		const backLum = backHsl.l + (0.05 * length)

		return {
			"color": `${rgbToString(hslToRgb({...foreHsl, l : foreLum}))} !important`,
			"background": `${rgbToString(hslToRgb({...backHsl, l : backLum}))} !important`,
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
	public getRules(): Record < string, Record < string, string >> {
		const dict: Record < string, Record < string, string >> = {};
		const allTagsInPlugin = ServiceProvider.tagRecords.getTagsFlat(false);

		const allTagNamesInPlugin = allTagsInPlugin.reduce(
			(acc: Record<string, IColoredTagRecord>, curr: IColoredTagRecord) => {
				acc[curr.core_tagText] = curr;
				return acc;
			}, {}
		);

		const allNestedTagsInVault = ServiceProvider.vaultTags.allNestedTagsAsDict;
		for (let tag of Object.keys(allNestedTagsInVault)) {
			if (allTagNamesInPlugin[tag]) {
				const record = allTagNamesInPlugin[tag];

				ServiceProvider.vaultTags.allNestedTags
					.filter(t => t[0] === record.core_tagText)
					.forEach(tag => {
						let cssProperties: Record<string, string>
						let dropdownValue: DropDownOptions | undefined;

						if (typeof record.nested_tags_dropdown === "string"){
							dropdownValue = DropdownOptionsFromString(record.nested_tags_dropdown);
						} else if (typeof record.nested_tags_dropdown === typeof DropDownOptions){
							dropdownValue = record.nested_tags_dropdown
						}

						console.log(dropdownValue)

						switch (dropdownValue){
							case DropDownOptions.Darker:
								cssProperties = this._propertiesDarker(record,tag.length)
								break;

							case DropDownOptions.Lighter:
								cssProperties = this._propertiesLighter(record,tag.length)
								break;

							case undefined:
							case DropDownOptions.Same:
								cssProperties = this._propertiesSame(record,tag.length)
								break;
						}

						this._selectors(themeSelectorLight, tag)
							.concat(this._selectors(themeSelectorDark, tag))
							.forEach((rule) => {dict[rule] = cssProperties;});
					});
			}
		}
		return dict;
	}
}
