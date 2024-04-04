// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGBA} from "../../../../../contracts/types/RGBA";
import {rgbaToHex} from "../../../../../lib/ColorConverters";
import {IColoredTagRecord} from "../../../../../contracts/plugin/settings/IColoredTagRecord";
import {getFirstTag, getTagPreviewIds} from "../../../../../lib/ColoredTagRecordUtils";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function createTagPreview(parentEl : HTMLElement, record:IColoredTagRecord) {
	let tagPreview = parentEl.createEl('td').createSpan()
	tagPreview.addClass("tag-preview");

	const foregroundColor = rgbaToHex(record.color_foreground);
	const backgroundColor = rgbaToHex(record.color_background);
	const tagPreviewIds = getTagPreviewIds(record);
	tagPreviewIds.forEach((id,i) => {
		let el = tagPreview.createEl('span')
		el.addClasses(["cm-hashtag", `cm-hashtag-${i === 0 ? "begin" : "end"}`, "cm-meta"])
		el.style.color = foregroundColor
		el.style.backgroundColor = backgroundColor;
		el.setText(i === 0 ? "#" : getFirstTag(record));
		el.id = id
	})
}

