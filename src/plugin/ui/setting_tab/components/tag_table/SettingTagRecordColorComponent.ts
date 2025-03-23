// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ColorComponent, TextComponent} from "obsidian";
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
	private hexInput: HTMLInputElement;
	private isMouseInside: boolean = false;

	constructor(rowData: RowDataType, property_name: RGBSelectorProperties) {
		const wrapper = rowData.parentEl.createDiv();
		const colorInputEl = wrapper.createDiv();
		super(colorInputEl);

		let value: RGBA = rowData.record[property_name] as RGBA;
		const hexValue = rgbaToHex(value);
		this.setValue(hexValue);

		// Wrapper to align inputs
		wrapper.style.display = "flex";
		wrapper.style.alignItems = "center";

		// Hex input field
		this.hexInput = document.createElement("input");
		this.hexInput.type = "text";
		this.hexInput.value = hexValue;
		this.hexInput.addClass("hex-color-input"); // Initially hidden

		// Show hex input on hover/focus
		wrapper.addEventListener("mouseenter", (event: MouseEvent) => {
			this.isMouseInside = true;
			if (event.ctrlKey) {
				this.hexInput.style.display = "inline-block";
				colorInputEl.style.display = "none";
			}
		});
		wrapper.addEventListener("mouseleave", () => { // Doesnt need the MouseEvent arg
			this.isMouseInside = false;
			this.hexInput.style.display = "none";
			colorInputEl.style.display = "inline-block";
		});
		document.addEventListener("keydown", (event: KeyboardEvent) => {
			if (event.key === "Control" && this.isMouseInside) {
				this.hexInput.style.display = "inline-block";
				colorInputEl.style.display = "none";
			}
		});
		document.addEventListener("keyup", (event: KeyboardEvent) => {
			if (event.key === "Control" && !this.isMouseInside) {
				this.hexInput.style.display = "none";
				colorInputEl.style.display = "inline-block";
			}
		});

		// Sync color input with hex field
		this.hexInput.addEventListener("change", async () => {
			this.setValue(this.hexInput.value);
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
