// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TextComponent} from "obsidian";
import {NumberProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {
	ISettingTagRecordComponent
} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "../../../../services/ServiceProvider";
import {RowDataType} from "../../../../../contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordNumberInputComponent extends TextComponent implements ISettingTagRecordComponent{
	constructor(rowData:RowDataType, property_name: NumberProperties) {
		super(rowData.parentEl); // Obsidian's stuff

		this.setValue(rowData.record[property_name].toString())
		this.onChange(async (newValue) => {
			rowData.record[property_name] = Number.parseInt(newValue);
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
		})
	}
}
