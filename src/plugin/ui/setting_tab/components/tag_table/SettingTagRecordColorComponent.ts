// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ColorComponent} from "obsidian";
import {RGBSelectorProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {hexToRGBA, rgbaToHex} from "src/lib/ColorConverters";
import {RGBA} from "src/contracts/types/RGBA";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordColorComponent extends ColorComponent implements ISettingTagRecordComponent {
	constructor(rowData: RowDataType, property_name: RGBSelectorProperties) {
		super(rowData.parentEl); // Obsidian's stuff

		let value: RGBA = rowData.record[property_name] as RGBA;
		this.setValue(rgbaToHex(value))

		this.onChange(async (newValue) => {
			rowData.record[property_name] = hexToRGBA(newValue, 1);
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
			await rowData.rowUpdateCallback() // Updates the preview element
		})

	}
}
