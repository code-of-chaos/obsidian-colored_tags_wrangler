// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {BaseComponent, ExtraButtonComponent, SliderComponent, TextAreaComponent} from "obsidian";
import {NumberProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "../../../../services/ServiceProvider";
import {RowDataType} from "../../../../../contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordSliderComponent extends BaseComponent implements ISettingTagRecordComponent {
	public buttonEl:ExtraButtonComponent;
	public sliderEl:SliderComponent;
	public boxEl:HTMLElement;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(rowData: RowDataType, property_name: NumberProperties, min: number, max: number, step: number, enableReset: boolean = false, resetValue:number|null=null) {
		super();

		this.boxEl = rowData.parentEl.createDiv({"cls":"slider-box"});

		if (enableReset) {
			this.buttonEl = new ExtraButtonComponent(this.boxEl)
				.setIcon("reset")
				.setTooltip("restore defaults")
				.onClick(async () => {
					rowData.record[property_name] = resetValue == null ? min : resetValue;
					this.sliderEl.setValue(rowData.record[property_name])
					await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
				})
		}

		this.sliderEl = new SliderComponent(this.boxEl)
			.setLimits(min, max, step)
			.setValue(rowData.record[property_name])
			.setDynamicTooltip()
			.onChange(async (newValue) => {
				rowData.record[property_name] = newValue;
				await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record)
			})

	}
}
