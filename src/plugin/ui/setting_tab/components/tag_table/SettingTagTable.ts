// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting, SettingTab} from "obsidian";
import {TableContentPopulator} from "../../../../../contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordTextAreaComponent} from "./SettingTagRecordTextAreaComponent";
import {SettingTagRecordPreview} from "./SettingTagRecordPreview";
import {SettingTagRecordNavigators} from "./SettingTagRecordNavigators";
import {ServiceProvider} from "../../../../services/ServiceProvider";
import {RowDataType} from "../../../../../contracts/plugin/ui/components/RowDataType";
import {IColoredTagRecord} from "../../../../../contracts/plugin/settings/IColoredTagRecord";
import {rgbaToHex} from "../../../../../lib/ColorConverters";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagTable {
	private parent: SettingTab;

	private selectedExtension:string | undefined;
	private settingEl: Setting;
	private tableEl: HTMLElement;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(parent: SettingTab) {
		this.parent = parent;
		this._AssignEls()
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _AssignEls(){
		this.settingEl = new Setting(this.parent.containerEl)
		this.tableEl = this.parent.containerEl.createDiv();
	}

	public async display() : Promise<void> {
		if (this.settingEl == undefined && this.tableEl !== undefined) {
			this._AssignEls()
		}

		await this._DisplayExtensionSelector();
		await this._DisplayTable()

	}

	public async redrawTable(){
		this.tableEl.empty()
		await this._DisplayTable()
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	private async _DisplayExtensionSelector() : Promise<void> {
		this.settingEl
			.setName("Custom color tags")
			.setDesc(`Define custom colors for tags. Select which extension to edit, dependant on the `)
			.addDropdown(component => {component
				.addOptions(Object
					.keys(ServiceProvider.extensions.Dictionary)
					.reduce((acc, key) => ({...acc, [key]: key}), {}))
				.onChange(async (value) => {
					// UPDATE THE TABLE
					this.selectedExtension = value;
					await this.redrawTable()
				})

			});

	}
	private async _DisplayTable() : Promise<void> {
		let scrollAreaContainer = this.tableEl.createDiv();
		scrollAreaContainer.addClass("scroll-area-container");

		let tableContainer = scrollAreaContainer.createDiv();
		tableContainer.addClass("scroll-container");

		let overlayGradient = scrollAreaContainer.createDiv();
		overlayGradient.addClass("overlay-gradient");

		// Assign Table columns and callbacks for population
		// 		This is the default which should be shown on every tab!
		const content: TableContentPopulator[] = [
			{
				title:"",
				callback : (rowData : RowDataType) => {
					return new SettingTagRecordNavigators(rowData,
						true, async () => await this.redrawTable())
				},
				classes:[]
			},{
				title:"Tag",
				callback: (rowData : RowDataType) => {
					return new SettingTagRecordTextAreaComponent(rowData,
						"core_tagText");
				},
				classes:[]
			},{
				title:"Preview",
				callback:(rowData : RowDataType) => {
					return new SettingTagRecordPreview(rowData);
				},
				classes:["tag-preview", "sticky-column","border-right"]
			}
		]

		let populators: TableContentPopulator[];
		if (this.selectedExtension != undefined){
			populators = ServiceProvider.extensions.Dictionary[this.selectedExtension].TableContentPopulators
		} else {
			populators = ServiceProvider.extensions.Core.TableContentPopulators
		}
		
		for (const callback of populators){
			content.push(callback)
		}

		// Actually create the table
		let table = tableContainer.createEl('table');
		let thead = table.createEl('thead');
		let headersRow = thead.createEl('tr');
		for (let {title, classes} of content) {
			headersRow.createEl('th', { text: title});
			headersRow.addClasses(classes)
		}

		// Populate table with record rows
		let tbody = table.createEl('tbody');
		for (let record of ServiceProvider.tagRecords.getTags()) {
			const tr = tbody.createEl('tr');
			for (let {callback,classes} of content){
				let td = tr.createEl('td');
				td.addClasses(classes)
				callback({
					record: record,
					rowUpdateCallback: (async () => await this.UpdateRow(record, tr)),
					parentEl:td
				})
			}

			await this.UpdateRow(record, tr)
		}
	}

	private getTagPreviewEls(record: IColoredTagRecord): {begin:HTMLElement | null, end: HTMLElement | null} {
		const ids = ServiceProvider.tagRecords.getTagPreviewIds(record)
		return {
			begin: document.getElementById(ids.begin),
			end: document.getElementById(ids.end)
		}
	}

	public async UpdateRow(record:IColoredTagRecord, _ : HTMLElement): Promise<void>{
		const tag = ServiceProvider.tagRecords.getFirstTag(record);
		const originalLength = tag.length;

		let { begin, end } = this.getTagPreviewEls(record);
		if (!begin || !end) {
			console.warn(`The tag "${record}" BEGIN or END is empty.`);
			return;
		}

		const displayTag = originalLength >= 9 ? `${tag.substring(0,8)}...` : tag;

		begin.textContent = "#";
		end.textContent = displayTag;

		const elems = [begin, end];
		elems.forEach(el => {
			el.style.fontWeight = record.boldify_enabled ? 'bold' : 'normal';
			if (!record.core_enabled) {
				el.removeAttribute('style');
			} else {
				el.style.color = rgbaToHex(record.core_color_foreground);
				el.style.backgroundColor = rgbaToHex(record.core_color_background);
			}
		});

		// ServiceProvider.cssStyler.cleanup()
		// ServiceProvider.cssStyler.processExtensions()
	}

}
