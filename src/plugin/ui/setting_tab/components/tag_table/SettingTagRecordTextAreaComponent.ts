// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TextAreaComponent} from "obsidian";
import {TextAreaProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordTextAreaComponent extends TextAreaComponent implements ISettingTagRecordComponent {
	constructor(rowData: RowDataType, property_name: TextAreaProperties) {
		super(rowData.parentEl); // Obsidian's stuff

		this.setValue(rowData.record[property_name])
		this.onChange(async (newValue) => {
			this.inputEl.style.height = 'auto'; // else it just keeps adding height
			this.inputEl.style.height = this.calcHeight();

			rowData.record[property_name] = newValue;
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
			await rowData.rowUpdateCallback() // Updates the preview element
		})

		this.inputEl.style.height = this.calcHeight();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private calcHeight() {
		return `${this.inputEl.scrollHeight + 5}px`;
	}
}
