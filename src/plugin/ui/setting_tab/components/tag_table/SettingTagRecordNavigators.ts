// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	ISettingTagRecordComponent
} from "../../../../../contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ExtraButtonComponent} from "obsidian";
import {arrayMove} from "../../../../../lib/ArrayUtils";
import {ServiceProvider} from "../../../../services/ServiceProvider";
import {RowDataType} from "../../../../../contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordNavigators implements ISettingTagRecordComponent {
	disabled: boolean;
	private El: HTMLElement;

	// This is just a recreation of the obsidian tag spans
	//		Although I should be able to create some sort of system to update them easily?
	//		Currently, this is done by giving them specific Ids tied to the uuid of the records.

	constructor(rowData: RowDataType, enableRemove: boolean = true, redrawCallback: () => Promise<void>) {
		this.El = rowData.parentEl.createDiv()
		this.El.addClass("navigator-parent");
		const recordIndex = ServiceProvider.tagRecords.getTagIndex(rowData.record)

		if (enableRemove) {
			new ExtraButtonComponent(this.El)
				.setIcon("trash")
				.setTooltip("Delete record")
				.onClick(async () => {
					await ServiceProvider.tagRecords.removeTag(rowData.record)
					await redrawCallback()
				})
				.extraSettingsEl.classList.add("navigator-trash");
		}

		if (recordIndex !== 0) {
			new ExtraButtonComponent(this.El)
				.setIcon("up-chevron-glyph")
				.setTooltip("Move up")
				.onClick(async () => {
					// reorder stuff here!!!
					// console.warn(ServiceProvider.plugin.app.lastEvent)
					// console.warn(ServiceProvider.plugin.app.lastEvent?.shiftKey)
					arrayMove(ServiceProvider.tagRecords.getTags(), recordIndex, recordIndex - 1)
					ServiceProvider.settings.debounceSaveToFile()
					await redrawCallback()
				})
				.extraSettingsEl.classList.add("navigator-chevron-up");
		}

		if (recordIndex !== ServiceProvider.tagRecords.getTagCount() - 1) {
			new ExtraButtonComponent(this.El)
				.setIcon("down-chevron-glyph")
				.setTooltip("Move down")
				.onClick(async () => {
					// reorder stuff here!!!
					arrayMove(ServiceProvider.tagRecords.getTags(), recordIndex, recordIndex + 1)
					ServiceProvider.settings.debounceSaveToFile()
					await redrawCallback()
				})
				.extraSettingsEl.classList.add("navigator-chevron-down");
		}
	}

	setDisabled(disabled: boolean): this {
		this.disabled = disabled;
		this.El.hidden = disabled;
		return this;
	}

	then(cb: (component: this) => any): this {
		return this;
	}
}
