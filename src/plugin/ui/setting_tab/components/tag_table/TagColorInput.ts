// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../../../../../contracts/plugin/settings/IColoredTagRecord";
import {hexToRGBA, rgbaToHex} from "../../../../../lib/ColorConverters";
import {RGBA} from "../../../../../contracts/types/RGBA";
import ColoredTagWranglerPlugin from "../../../../ColoredTagWranglerPlugin";
import {getTagPreviewEls} from "../../../../../lib/ColoredTagRecordUtils";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export function createTagColorInput(parentEl : HTMLElement, record:IColoredTagRecord, property_name: "color_foreground" | "color_background"){
	const plugin = ColoredTagWranglerPlugin.instance;

	let value : RGBA = record[property_name] as RGBA;
	let colorInput = parentEl
		.createEl('td')
		.createEl('input', {value: rgbaToHex(value), type: "color"})

	plugin.registerDomEvent(colorInput, 'input', async function () {
		record[property_name] = hexToRGBA(colorInput.value,1.)
		getTagPreviewEls(record).forEach(el => {
			el.style.color = rgbaToHex(record.color_foreground);
			el.style.backgroundColor = rgbaToHex(record.color_background);
		})
	});
}

export function createTagColorForegroundInput(parentEl : HTMLElement, record:IColoredTagRecord){
	createTagColorInput(parentEl, record, "color_foreground")
}

export function createTagColorBackgroundInput(parentEl : HTMLElement, record:IColoredTagRecord){
	createTagColorInput(parentEl, record, "color_background")
}
