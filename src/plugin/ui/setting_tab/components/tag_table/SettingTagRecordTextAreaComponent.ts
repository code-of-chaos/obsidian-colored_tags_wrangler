// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TextAreaComponent} from "obsidian";
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {updateRecord, updateTagRecordRow} from "src/lib/ColoredTagRecordUtils";
import {
	ISettingTagRecordComponent
} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordTextAreaComponent extends TextAreaComponent implements ISettingTagRecordComponent{
	constructor(containerEl: HTMLElement, record:IColoredTagRecord) {
		super(containerEl); // Obsidian's stuff

		this.setValue(record.tagText)
		this.onChange(async (newValue) => {
			this.inputEl.style.height = 'auto'; // else it just keeps adding height
			this.inputEl.style.height = this.calcHeight();

			record.tagText = newValue;
			await updateTagRecordRow(record) // Updates the preview element
			await updateRecord(record)
		})

		this.inputEl.style.height = this.calcHeight();
	}

	private calcHeight(){
		return `${this.inputEl.scrollHeight + 5}px`;
	}
}
