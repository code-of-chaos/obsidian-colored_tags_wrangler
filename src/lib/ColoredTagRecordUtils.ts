// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../contracts/plugin/settings/IColoredTagRecord";
import {reSplit} from "./RegexUtils";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export const getFirstTag = (record:IColoredTagRecord) => {
	return record.tag_text.split(reSplit)[0]
}


export const getTagPreviewIds = (record:IColoredTagRecord) => {
	return [
		`tag-preview-being-${record.id}`,
		`tag-preview-end-${record.id}`
	]
}

export const getTagPreviewEls : (record: IColoredTagRecord) => HTMLElement[] = (record:IColoredTagRecord) => {
	return getTagPreviewIds(record)
		.map(id => document.getElementById(id))
		.filter(Boolean) as HTMLElement[];
}

export const getTagPreviewTextEl : (record: IColoredTagRecord) => HTMLElement = (record:IColoredTagRecord) => {
	return getTagPreviewEls(record)[1]
}
