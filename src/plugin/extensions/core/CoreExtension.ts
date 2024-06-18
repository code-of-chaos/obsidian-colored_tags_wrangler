// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {v4 as uuidV4} from "uuid";
import {SettingTagRecordColorComponent} from "../../ui/setting_tab/components/tag_table/SettingTagRecordColorComponent";
import {SettingTagRecordToggleComponent} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtensionRecordCore} from "./IExtensionRecordCssStyling";
import {CoreCssWrangler} from "./CoreCssWrangler";
import {AbstractExtension} from "../AbstractExtension";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CoreExtension extends AbstractExtension<IExtensionRecordCore> {
	public cssWrangler = new CoreCssWrangler()
	public extensionName = 'core';
	public description = "Core functionality of the plugin";
	public TableContentPopulators: TableContentPopulator[] = [
		{
			title: "Enable Colors",
			callback: (rowData) => {
				return new SettingTagRecordToggleComponent(rowData,
					"core_enabled");
			},
			classes: ["header-wrap-every-word", "border-right-dotted"]
		}, {
			title: "Text",
			callback: (rowData) => {
				return new SettingTagRecordColorComponent(rowData,
					"core_color_foreground");
			},
			classes: []
		}, {
			title: "Fill",
			callback: (rowData) => {
				return new SettingTagRecordColorComponent(rowData,
					"core_color_background");
			},
			classes: []
		},]

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public getDefaultRecord(): IExtensionRecordCore {
		return {
			core_enabled: true,
			core_id: uuidV4(),
			core_tagText: "new-tag",
			core_color_foreground: {r: 255, g: 255, b: 255},
			core_color_background: {r: 0, g: 0, b: 0},
		};
	}
}
