// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ColorComponent} from "obsidian";
import {IColoredTagRecord} from "src/contracts/plugin/settings/IColoredTagRecord";
import {RGBSelectorProperties} from "src/plugin/extensions/ExtensionProperties";
import {hexToRGBA, rgbaToHex} from "../../../../../lib/ColorConverters";
import {RGBA} from "../../../../../contracts/types/RGBA";
import {updateRecord, updateTagRecordRow} from "../../../../../lib/ColoredTagRecordUtils";
import {
	ISettingTagRecordComponent
} from "../../../../../contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordColorComponent extends ColorComponent implements ISettingTagRecordComponent {
    id: string;

	constructor(containerEl: HTMLElement, record:IColoredTagRecord, property_name: RGBSelectorProperties ) {
		super(containerEl); // Obsidian's stuff

		let value : RGBA = record[property_name] as RGBA;
		this.setValue(rgbaToHex(value))

		this.onChange(async (newValue) => {
			record[property_name] = hexToRGBA(newValue, 1);
			await updateRecord(record)
			await updateTagRecordRow(record) // Updates the preview element
		})

	}
}
