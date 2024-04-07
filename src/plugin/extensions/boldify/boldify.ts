// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {
	SettingTagRecordToggleComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";


// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagRecordBoldifyExtension {
	ext_boldify: boolean;
}

export class BoldifyExtension {
	public static extensionName = 'Boldify';
	public static TableContentPopulator : TableContentPopulator = {
		title: this.extensionName,
		callback:(td,record) => {
			return new SettingTagRecordToggleComponent(td, record, "ext_boldify");
		},
		classes:[]
	}

	public static getDefaultRecord():IColoredTagRecordBoldifyExtension{
		return { ext_boldify: true };
	}
}
