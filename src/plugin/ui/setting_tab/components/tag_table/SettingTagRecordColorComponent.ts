// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ColorComponent, TextComponent} from "obsidian";
import {RGBSelectorProperties} from "src/contracts/plugin/services/extensions/ExtensionProperties";
import {hexToHEX, hexToRGBA, rgbaToHex} from "src/lib/ColorConverters";
import {RGBA} from "src/contracts/types/RGBA";
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordColorComponent extends ColorComponent implements ISettingTagRecordComponent {
	private readonly hexInput: HTMLInputElement;
	private readonly tooltipEl: HTMLElement;
	private isMouseInside: boolean = false;
	private get tooltipEnabled(): boolean {
		return ServiceProvider.settings.data.Config.SettingsTooltipEnabled;
	}

	constructor(rowData: RowDataType, property_name: RGBSelectorProperties) {
		const wrapper = rowData.parentEl.createDiv();
		const colorInputEl = wrapper.createDiv();
		super(colorInputEl);

		let value: RGBA = rowData.record[property_name] as RGBA;
		const hexValue = rgbaToHex(value);
		this.setValue(hexValue);

		// Wrapper to align inputs
		wrapper.addClass("hex-color-wrapper");

		// Tooltip
		this.tooltipEl = wrapper.createDiv();
		this.tooltipEl.innerText = "press Ctrl to edit hex value";
		this.tooltipEl.addClass("hex-color-tooltip");

		// Hex input field
		this.hexInput = document.createElement("input");
		this.hexInput.type = "text";
		this.hexInput.value = hexValue;
		this.hexInput.addClass("hex-color-input"); // Initially hidden

		// Show hex input on hover/focus
		wrapper.addEventListener("mouseenter", (event: MouseEvent) => {
			this.isMouseInside = true;
			if (this.tooltipEnabled) this.tooltipEl.style.display = "block";
			if (!event.ctrlKey) return;
			this.hexInput.style.display = "inline-block";
			colorInputEl.style.display = "none";
		});
		wrapper.addEventListener("mouseleave", () => { // Doesnt need the MouseEvent arg
			this.isMouseInside = false;
			if (this.tooltipEnabled) this.tooltipEl.style.display = "none";

			this.hexInput.style.display = "none";
			colorInputEl.style.display = "inline-block";
		});
		document.addEventListener("keydown", (event: KeyboardEvent) => {
			if (!(event.key === "Control" && this.isMouseInside)) return;
			this.hexInput.style.display = "inline-block";
			colorInputEl.style.display = "none";
			if (this.tooltipEnabled) this.tooltipEl.style.display = "none";
		});
		document.addEventListener("keyup", (event: KeyboardEvent) => {
			if (!(event.key === "Control" && !this.isMouseInside)) return;
			this.hexInput.style.display = "none";
			colorInputEl.style.display = "inline-block";
		});

		// Sync color input with hex field
		this.hexInput.addEventListener("change", async () => {
			this.setValue(hexToHEX(this.hexInput.value, true));
			rowData.record[property_name] = hexToRGBA(this.hexInput.value, 1);
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record);
			await rowData.rowUpdateCallback();
		});

		// Sync hex field when color changes
		this.onChange(async (newValue) => {
			this.hexInput.value = newValue;
			rowData.record[property_name] = hexToRGBA(newValue, 1);
			await ServiceProvider.tagRecords.addOrUpdateTag(rowData.record);
			await rowData.rowUpdateCallback();
		});


		wrapper.appendChild(this.hexInput);
	}
}
