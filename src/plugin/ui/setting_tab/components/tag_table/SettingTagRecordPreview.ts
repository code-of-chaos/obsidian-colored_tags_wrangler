// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettingTagRecordComponent} from "src/contracts/plugin/ui/components/tag_table/ISettingTagRecordComponent";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {RowDataType} from "src/contracts/plugin/ui/components/RowDataType";
import {IColoredTagRecord} from "../../../../../contracts/plugin/settings/IColoredTagRecord";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordPreview implements ISettingTagRecordComponent {
	disabled: boolean;
	private El: HTMLElement;
	rowDataType: RowDataType;
	
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(rowData: RowDataType) {
		this.rowDataType = rowData;
		this.El = rowData.parentEl.createDiv()
		this.El.addClass("tag-preview-div");
		let el2 = this.El.createDiv()

		const previewIds = ServiceProvider.tagRecords.getTagPreviewIds(rowData.record)

		this.ElBegin = el2.createEl("span")
		this.ElBegin.id = previewIds.begin

		this.ElEnd = el2.createEl("span")
		this.ElEnd.id = previewIds.end

		// Colors are applied after the fact by the table rendering
		SettingTagRecordPreview.setClasses(this.ElBegin, this.ElEnd, rowData.record);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	static setClasses(elBegin: HTMLElement, elEnd: HTMLElement, record: IColoredTagRecord) {
		const firstTag = ServiceProvider.tagRecords.getFirstTag(record)
		elBegin.className = '';
		elEnd.className = '';
		
		elBegin.addClasses(["cm-hashtag", "cm-hashtag-begin", "cm-meta", `cm-tag-${firstTag}`]);
		elEnd.addClasses(["cm-hashtag", "cm-hashtag-end", "cm-meta", `cm-tag-${firstTag}`]);
	}
	
	setDisabled(disabled: boolean): this {
		this.disabled = disabled;
		this.El.hidden = disabled;
		return this;
	}

	then(_cb: (component: this) => any): this {
		return this;
	}
}
