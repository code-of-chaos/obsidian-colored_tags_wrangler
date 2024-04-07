// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../../../../../contracts/plugin/settings/IColoredTagRecord";
import {getFirstTag, getTagPreviewIds} from "../../../../../lib/ColoredTagRecordUtils";
import {
	ISettingTagRecordComponent
} from "../../../../../contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordPreview implements ISettingTagRecordComponent{
	private El: HTMLElement;
	disabled: boolean;

	// This is just a recreation of the obsidian tag spans
	//		Although I should be able to create some sort of system to update them easily?
	//		Currently, this is done by giving them specific Ids tied to the uuid of the records.

	constructor(parentEl : HTMLElement, record:IColoredTagRecord) {
		this.El = parentEl.createDiv()
		this.El.addClass("tag-preview-div");
		let el2 = this.El.createDiv()

		getTagPreviewIds(record).forEach((id,i) => {
			let el = el2.createEl('span')
			el.addClasses([
				"cm-hashtag",
				i === 0 ? "cm-hashtag-begin" : "cm-hashtag-end",
				"cm-meta",
				`cm-tag-${getFirstTag(record)}`, // needed for auto css stuff?
			])
			el.id = id
		})
		// Colors are applied after the fact by the table rendering
	}

	setDisabled(disabled: boolean): this {
		this.disabled = disabled;
		this.El.hidden = disabled;
		return this;
	}

	then(cb: (component: this) => any): this {
		return this;
	}
}
