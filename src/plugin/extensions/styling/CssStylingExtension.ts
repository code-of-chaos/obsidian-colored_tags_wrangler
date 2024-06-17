// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordToggleComponent} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtensionRecordCssStyling} from "./IExtensionRecordCssStyling";
import { ICssWrangler } from "src/contracts/plugin/services/css_styler/ICssWrangler";
import {CssStylingCssWrangler} from "./CssStylingCssWrangler";
import {AbstractExtension} from "../AbstractExtension";
import {
	SettingTagRecordSliderComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordSliderComponent";
import {
	SettingTagRecordTextInputComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordTextInputComponent";


// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CssStylingExtension extends AbstractExtension {
    public cssWrangler: ICssWrangler = new CssStylingCssWrangler();
	public extensionName = 'styling';
	public description = "TEMP extensions, used to styling tags";
	public TableContentPopulators : TableContentPopulator[] = [
		{
			title: "Custom CSS styling",
			callback:(rowData) => new SettingTagRecordToggleComponent(rowData, "css_styling_enabled"),
			classes:["header-wrap-every-word", "border-right-dotted"]
		},
		{
			title: "Boldify",
			callback:(rowData) => new SettingTagRecordToggleComponent(rowData, "css_styling_boldify_enabled"),
			classes:[]
		},
		{
			title: "Italicize",
			callback:(rowData) => new SettingTagRecordToggleComponent(rowData, "css_styling_italic_enabled"),
			classes:[]
		},
		{
			title: "Font Family",
			callback:(rowData) => new SettingTagRecordTextInputComponent(rowData, "css_styling_font_family"),
			classes:[]
		},
		{
			title: "Font Size",
			callback:(rowData) => new SettingTagRecordSliderComponent(
				rowData,
				"css_styling_font_size",
				0,10,.25,
				true
			),
			classes:[]
		},
	]

	public getDefaultRecord():IExtensionRecordCssStyling{
		return {
			css_styling_enabled:false,
			css_styling_boldify_enabled: false,
			css_styling_font_family: "",
			css_styling_font_size: 0,
			css_styling_italic_enabled: false,
		};
	}
}
