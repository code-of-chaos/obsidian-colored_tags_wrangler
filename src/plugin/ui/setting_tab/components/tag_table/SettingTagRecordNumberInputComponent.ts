// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TextComponent} from "obsidian";
import {NumberProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordNumberInputComponent extends TextComponent implements ISettingTagRecordComponent {
	constructor(rowData: RowDataType, property_name: NumberProperties, placeholder:number = 0) {
		super(rowData.parentEl); // Obsidian's stuff

		this.inputEl.classList.add("settingTagRecordNumberInputComponent");
		this.setPlaceholder(placeholder.toString())
		this.setValue(rowData.record[property_name]?.toString() ?? "")
		this.onChange(async (newValue) => {
			rowData.record[property_name] = Number.parseInt(newValue);
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
		})
	}
}
