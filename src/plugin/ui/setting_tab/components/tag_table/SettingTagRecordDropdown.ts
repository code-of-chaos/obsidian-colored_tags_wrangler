// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {DropdownComponent} from "obsidian";
import {DropdownProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
type conversionType<T> = (value:string) => T
export class SettingTagRecordDropdownComponent<T> extends DropdownComponent implements ISettingTagRecordComponent {
	constructor(rowData: RowDataType, property_name: DropdownProperties, options: Record<string, string>, callback:conversionType<T> | undefined = undefined) {
		super(rowData.parentEl); // Obsidian's stuff

		this.addOptions(options)
		this.setValue(rowData.record[property_name] ?? options[0])
		this.onChange(async (newValue) => {
			// @ts-ignore
			rowData.record[property_name] = callback !== undefined ? callback(newValue) : newValue
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
		})
	}
}
