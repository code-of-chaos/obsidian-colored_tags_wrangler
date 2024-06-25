// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {
	SettingTagRecordToggleComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtensionRecordStyling} from "./IExtensionRecordStyling";
import {ICssWrangler} from "src/contracts/plugin/services/css_styler/ICssWrangler";
import {CssWranglerStyling} from "./CssWranglerStyling";
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
export class ExtensionStyling extends AbstractExtension<IExtensionRecordStyling> {
	public cssWrangler: ICssWrangler = new CssWranglerStyling();
	public extensionName = "Styling";
	public description = "Style your tags even more!";
	public TableContentPopulators: TableContentPopulator[] = [
		// {
		// 	title: "Custom CSS styling",
		// 	callback: (rowData) => new SettingTagRecordToggleComponent(rowData, "css_styling_enabled"),
		// 	classes: ["header-wrap-every-word", "border-right-dotted"]
		// },
		{
			title: "Background Opacity",
			callback: (rowData) =>
				new SettingTagRecordSliderComponent(
					rowData,
					"css_styling_opacity",
					0.0, 1.0, .01,
					true,
					1.0
				),
			classes: ["header-wrap-every-word"]
		},
		{
			title: "Boldify",
			callback: (rowData) => new SettingTagRecordToggleComponent(rowData, "css_styling_bold_enabled"),
			classes: []
		},
		{
			title: "Italicize",
			callback: (rowData) => new SettingTagRecordToggleComponent(rowData, "css_styling_italic_enabled"),
			classes: []
		},
		{
			title: "Font Family",
			callback: (rowData) => new SettingTagRecordTextInputComponent(rowData, "css_styling_font_family"),
			classes: []
		},
		{
			title: "Font Size",
			callback: (rowData) => new SettingTagRecordSliderComponent(
				rowData,
				"css_styling_font_size",
				0.5, 2., .05,
				true,
				1
			),
			classes: []
		},
	]

	public getDefaultRecord(): IExtensionRecordStyling {
		return {
			css_styling_bold_enabled: false,
			css_styling_font_family: "",
			css_styling_font_size: 1.0,
			css_styling_italic_enabled: false,
			css_styling_opacity: 1.0,
		};
	}
}
