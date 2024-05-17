// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../contracts/plugin/settings/IColoredTagRecord";
import {reSplit} from "./RegexUtils";
import ColoredTagWranglerPlugin from "../plugin/ColoredTagWranglerPlugin";
import {rgbaToHex} from "./ColorConverters";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export function getFirstTag(record:IColoredTagRecord):string {
	return record.core_tagText.split(reSplit).first() ?? "UNDEFINED";
}


export function getTagPreviewIds(record:IColoredTagRecord):[string, string] {
	return [
		`tag-preview-being-${record.core_id}`,
		`tag-preview-end-${record.core_id}`
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
	const tag = getFirstTag(record);
	const originalLength = tag.length;

	getTagPreviewEls(record)[0].textContent = "#";
	getTagPreviewEls(record)[1].textContent = originalLength >= 9
		? `${tag.substring(0,8)}...`
		: tag

	getTagPreviewEls(record).forEach(el => {
		// Return to normal if disabled
		if (!record.core_enabled){
			el.removeAttribute("style")
			return
		}

		el.style.fontWeight = record.boldify_enabled ? "bold" : "normal";
		el.style.color = rgbaToHex(record.core_color_foreground)
		el.style.backgroundColor = rgbaToHex(record.core_color_background)

	});
}

export async function removeRecord(record:IColoredTagRecord):Promise<void> {
	ColoredTagWranglerPlugin.instance.settings.data.TagColors.remove(record)
	ColoredTagWranglerPlugin.instance.settings.DebounceSaveToFile()
}
