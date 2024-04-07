// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../contracts/plugin/settings/IColoredTagRecord";
import {reSplit} from "./RegexUtils";
import ColoredTagWranglerPlugin from "../plugin/ColoredTagWranglerPlugin";
import {rgbaToHex} from "./ColorConverters";
import {debounce} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export function getFirstTag(record:IColoredTagRecord):string {
	return record.tagText.split(reSplit)[0]
}


export function getTagPreviewIds(record:IColoredTagRecord):[string, string] {
	return [
		`tag-preview-being-${record.id}`,
		`tag-preview-end-${record.id}`
	]
}

export function getTagPreviewEls(record: IColoredTagRecord): HTMLElement[] {
	return getTagPreviewIds(record)
		.map(id => document.getElementById(id))
		.filter(Boolean) as HTMLElement[];
}

export function getTagPreviewTextEl(record: IColoredTagRecord): HTMLElement {
	return getTagPreviewEls(record)[1]
}

export async function updateRecord(record:IColoredTagRecord):Promise<void> {
	await ColoredTagWranglerPlugin.instance.settings.updateTagDebounced(record)
}

export async function updateTagRecordRow(record: IColoredTagRecord) {
	getTagPreviewEls(record)[0].textContent = "#";
	getTagPreviewEls(record)[1].textContent = getFirstTag(record);

	getTagPreviewEls(record).forEach(el => {
		// Return to normal if disabled
		if (!record.enabled){
			el.removeAttribute("style")
			return
		}

		el.style.fontWeight = record.ext_boldify ? "bold" : "normal";
		el.style.color = rgbaToHex(record.color)
		el.style.backgroundColor = rgbaToHex(record.backgroundColor)

	});
}
