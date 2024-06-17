// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ExtraButtonComponent, SliderComponent} from "obsidian";
import {NumberProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "../../../../services/ServiceProvider";
import {RowDataType} from "../../../../../contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordSliderComponent extends SliderComponent implements ISettingTagRecordComponent {
	constructor(rowData: RowDataType, property_name: NumberProperties, min: number, max: number, step: number, enableReset: boolean = false) {
		super(rowData.parentEl); // Obsidian's stuff

		this.setLimits(min, max, step)
		this.setValue(rowData.record[property_name])
		this.onChange(async (newValue) => {
			rowData.record[property_name] = newValue;
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
		})

		if (enableReset) {
			new ExtraButtonComponent(rowData.parentEl)
				.setIcon("reset")
				.onClick(async () => {
					rowData.record[property_name] = min;
					this.setValue(rowData.record[property_name])
					await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
				})
		}
	}
}
