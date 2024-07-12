// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ExtraButtonComponent} from "obsidian";
import {arrayMove} from "src/lib/ArrayUtils";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordNavigators implements ISettingTagRecordComponent {
	disabled: boolean;
	private El: HTMLElement;
	
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

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	setDisabled(disabled: boolean): this {
		this.disabled = disabled;
		this.El.hidden = disabled;
		return this;
	}

	then(_cb: (component: this) => any): this {
		return this;
	}
}
