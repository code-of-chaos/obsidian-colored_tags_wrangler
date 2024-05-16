// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {
	SettingTagRecordToggleComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtension} from "../../../contracts/plugin/extensions/IExtension";


// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface RecordExtensionBoldify {
	boldify_enabled: boolean;
}

export class BoldifyExtension implements IExtension {
	public extensionName = 'Boldify';
	public TableContentPopulators : TableContentPopulator[] = [
		{
			title: this.extensionName,
			callback:(td,record) => {
				return new SettingTagRecordToggleComponent(td, record, "boldify_enabled");
			},
			classes:[]
		}
	]

	public static getDefaultRecord():RecordExtensionBoldify{
		return { boldify_enabled: false };
	}
}
