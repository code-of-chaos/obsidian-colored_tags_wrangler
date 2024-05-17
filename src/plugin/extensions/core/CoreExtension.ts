// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {RGBA} from "../../../contracts/types/RGBA";
import {v4 as uuidV4} from "uuid";
import {SettingTagRecordColorComponent} from "../../ui/setting_tab/components/tag_table/SettingTagRecordColorComponent";
import {IExtension} from "../../../contracts/plugin/extensions/IExtension";
import {
	SettingTagRecordToggleComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtensionRecordCore} from "./IExtensionRecordBoldify";


// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CoreExtension implements IExtension{
	public extensionName = 'Default';
	public TableContentPopulators : TableContentPopulator[] = [
		{
			title:"Enable",
			callback:(rowData) => {
				return new SettingTagRecordToggleComponent(rowData,
					"core_enabled");
			},
			classes:[]
		},{
			title:"Text",
			callback:(rowData) => {
				return new SettingTagRecordColorComponent(rowData,
					"core_color_foreground");
			},
			classes:[]
		},{
			title:"Fill",
			callback:(rowData) => {
				return new SettingTagRecordColorComponent(rowData,
					"core_color_background");
			},
			classes:[]
		},]

	public getDefaultRecord():IExtensionRecordCore{
		return {
			core_enabled: true,
			core_id: uuidV4(),
			core_tagText : "new-tag",
			core_color_foreground : {r:255,g:255,b:255,a:1.0},
			core_color_background : {r:0,g:0,b:0,a:1.0},
		};
	}
}
