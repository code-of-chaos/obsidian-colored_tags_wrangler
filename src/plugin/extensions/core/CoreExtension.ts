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
			title:"Enabled",
			callback:(td,record) => {
				return new SettingTagRecordToggleComponent(td, record, "core_enabled");
			},
			classes:[]
		},{
			title:"Text Color",
			callback:(td, record) => {
				return new SettingTagRecordColorComponent(td, record, "core_color_foreground");
			},
			classes:[]
		},{
			title:"Background Color",
			callback:(td, record) => {
				return new SettingTagRecordColorComponent(td, record, "core_color_background");
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
