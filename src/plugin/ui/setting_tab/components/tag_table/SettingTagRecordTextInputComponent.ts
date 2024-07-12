// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TextComponent} from "obsidian";
import {TextProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordTextInputComponent extends TextComponent implements ISettingTagRecordComponent {
	constructor(rowData: RowDataType, property_name: TextProperties) {
		super(rowData.parentEl); // Obsidian's stuff

		this.setValue(rowData.record[property_name])
		this.onChange(async (newValue) => {
			rowData.record[property_name] = newValue;
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
		})
	}
}
