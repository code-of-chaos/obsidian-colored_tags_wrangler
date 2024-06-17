// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	ISettingTagRecordComponent
} from "../../../../../contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "../../../../services/ServiceProvider";
import {RowDataType} from "../../../../../contracts/plugin/ui/components/RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordPreview implements ISettingTagRecordComponent {
	disabled: boolean;
	private El: HTMLElement;

	// This is just a recreation of the obsidian tag spans
	//		Although I should be able to create some sort of system to update them easily?
	//		Currently, this is done by giving them specific Ids tied to the uuid of the records.

	constructor(rowData: RowDataType) {
		this.El = rowData.parentEl.createDiv()
		this.El.addClass("tag-preview-div");
		let el2 = this.El.createDiv()

		const previewIds = ServiceProvider.tagRecords.getTagPreviewIds(rowData.record)
		const firstTag = ServiceProvider.tagRecords.getFirstTag(rowData.record)

		const elBegin = el2.createEl("span")
		elBegin.addClasses(["cm-hashtag", "cm-hashtag-begin", "cm-meta", `cm-tag-${firstTag}`]);
		elBegin.id = previewIds.begin

		const elEnd = el2.createEl("span")
		elEnd.addClasses(["cm-hashtag", "cm-hashtag-end", "cm-meta", `cm-tag-${firstTag}`]);
		elEnd.id = previewIds.end

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
