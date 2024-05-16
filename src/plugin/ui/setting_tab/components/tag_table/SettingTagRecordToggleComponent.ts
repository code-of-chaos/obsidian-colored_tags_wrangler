// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ToggleComponent} from "obsidian";
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {BooleanProperties} from "src/contracts/plugin/extensions/ExtensionProperties";
import {updateRecord, updateTagRecordRow} from "src/lib/ColoredTagRecordUtils";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordToggleComponent extends ToggleComponent implements ISettingTagRecordComponent {
	constructor(containerEl: HTMLElement, record:IColoredTagRecord, property_name: BooleanProperties ) {
		super(containerEl); // Obsidian's stuff

		if (property_name in record) {
			this.setValue(record[property_name] as boolean);
		}

		this.onChange(async (newValue) => {
			record[property_name] = newValue;
			await updateRecord(record)
			await updateTagRecordRow(record) // Updates the preview element
		})
	}
}
