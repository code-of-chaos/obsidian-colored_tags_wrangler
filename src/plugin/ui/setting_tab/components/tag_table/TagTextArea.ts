// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../../../../../contracts/plugin/settings/IColoredTagRecord";
import ColoredTagWranglerPlugin from "../../../../ColoredTagWranglerPlugin";
import {getFirstTag, getTagPreviewTextEl} from "../../../../../lib/ColoredTagRecordUtils";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function createTagTextArea(parentEl : HTMLElement,record:IColoredTagRecord) : void {
	const plugin = ColoredTagWranglerPlugin.instance;

	let textarea = parentEl
		.createEl('td')
		.createEl('textarea', {text: record.tag_text, type: "text"});

	textarea.style.height = `${textarea.scrollHeight + 5}px`;

	plugin.registerDomEvent(textarea, 'input', async function () {
		this.style.height = 'auto';
		this.style.height = `${this.scrollHeight + 5}px`;

		record.tag_text = textarea.value;
		await plugin.settings.updateTag(record)
		getTagPreviewTextEl(record).textContent = getFirstTag(record);
	});
}
