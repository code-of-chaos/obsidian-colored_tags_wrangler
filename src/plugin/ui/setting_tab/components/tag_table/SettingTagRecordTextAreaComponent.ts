// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TextAreaComponent} from "obsidian";
import {
	IColoredTagRecord,
	RGBSelectorProperties,
	TextAreaProperties
} from "src/contracts/plugin/settings/IColoredTagRecord";
import {updateRecord, updateTagRecordRow} from "src/lib/ColoredTagRecordUtils";
import {
	ISettingTagRecordComponent
} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordTextAreaComponent extends TextAreaComponent implements ISettingTagRecordComponent{
	constructor(containerEl: HTMLElement, record:IColoredTagRecord, property_name: TextAreaProperties) {
		super(containerEl); // Obsidian's stuff

		this.setValue(record[property_name])
		this.onChange(async (newValue) => {
			this.inputEl.style.height = 'auto'; // else it just keeps adding height
			this.inputEl.style.height = this.calcHeight();

			record[property_name] = newValue;
			await updateRecord(record)
			await updateTagRecordRow(record) // Updates the preview element
		})

		this.inputEl.style.height = this.calcHeight();
	}

	private calcHeight(){
		return `${this.inputEl.scrollHeight + 5}px`;
	}
}
