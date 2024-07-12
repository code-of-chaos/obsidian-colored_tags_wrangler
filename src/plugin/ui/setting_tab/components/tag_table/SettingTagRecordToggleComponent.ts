// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ToggleComponent} from "obsidian";
import {BooleanProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordToggleComponent extends ToggleComponent implements ISettingTagRecordComponent {
	constructor(rowData: RowDataType, property_name: BooleanProperties) {
		super(rowData.parentEl); // Obsidian's stuff
		
		// @ts-ignore
		this.setValue(rowData.record[property_name] as boolean)
		this.onChange(async (newValue) => {
			// @ts-ignore // I still don't get why???
			rowData.record[property_name] = newValue;
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
		})
	}
}
