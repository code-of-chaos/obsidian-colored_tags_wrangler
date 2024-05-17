// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../../../../../contracts/plugin/settings/IColoredTagRecord";
import {ISettingTagRecordComponent} from "../../../../../contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ExtraButtonComponent} from "obsidian";
import {arrayMove} from "../../../../../lib/ArrayUtils";
import ColoredTagWranglerPlugin from "../../../../ColoredTagWranglerPlugin";
import {removeRecord} from "../../../../../lib/ColoredTagRecordUtils";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordNavigators implements ISettingTagRecordComponent{
	private El: HTMLElement;
	disabled: boolean;

	// This is just a recreation of the obsidian tag spans
	//		Although I should be able to create some sort of system to update them easily?
	//		Currently, this is done by giving them specific Ids tied to the uuid of the records.

	constructor(parentEl : HTMLElement, record:IColoredTagRecord, enableRemove:boolean, redrawCallback : () => Promise<void>) {
		this.El = parentEl.createDiv()
		this.El.addClass("navigator-parent");
		const settingsManager = ColoredTagWranglerPlugin.instance.settings;
		const recordIndex = settingsManager.getTagIndex(record)


		new ExtraButtonComponent(this.El)
			.setIcon("trash")
			.setTooltip("Delete")
			.onClick(async () => {
				await removeRecord(record)
				await redrawCallback()
			})
			.setDisabled(!enableRemove)
			.extraSettingsEl.classList.add("navigator-trash");

		if (recordIndex !== 0) {
			new ExtraButtonComponent(this.El)
				.setIcon("up-chevron-glyph")
				.setTooltip("Move up")
				.onClick(async () => {
					// reorder stuff here!!!
					arrayMove(settingsManager.data.TagColors, recordIndex, recordIndex-1)
					settingsManager.DebounceSaveToFile()
					await redrawCallback()
				})
				.extraSettingsEl.classList.add("navigator-chevron-up");
		}

		if (recordIndex !== settingsManager.data.TagColors.length -1) {
			new ExtraButtonComponent(this.El)
				.setIcon("down-chevron-glyph")
				.setTooltip("Move down")
				.onClick(async () => {
					// reorder stuff here!!!
					arrayMove(settingsManager.data.TagColors, recordIndex, recordIndex+1)
					settingsManager.DebounceSaveToFile()
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
