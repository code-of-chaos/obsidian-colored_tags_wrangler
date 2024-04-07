// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting, SettingTab} from "obsidian";
import {TableContentPopulator} from "../../../../../contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordTextAreaComponent} from "./SettingTagRecordTextAreaComponent";
import {SettingTagRecordToggleComponent} from "./SettingTagRecordToggleComponent";
import {SettingTagRecordColorComponent} from "./SettingTagRecordColorComponent";
import {SettingTagRecordPreview} from "./SettingTagRecordPreview";
import {Extensions} from "../../../../extensions/Extensions";
import {updateTagRecordRow} from "../../../../../lib/ColoredTagRecordUtils";
import ColoredTagWranglerPlugin from "../../../../ColoredTagWranglerPlugin";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagTable {
	private parent: SettingTab;

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
				.addOptions({
					"": "Default",
					"ext_boldify": "Boldify"
				})
				.onChange(async (value) => {
					// UPDATE THE TABLE
					await this.redrawTable()
				})

			});

	}
	private async _DisplayTable() : Promise<void> {
		let scrollAreaContainer = this.tableEl.createDiv();
		scrollAreaContainer.addClass("scroll-area-container");

		let tableContainer = scrollAreaContainer.createDiv();
		tableContainer.addClass("scroll-container");

		let overlayGradient = scrollAreaContainer.createEl('div');
		overlayGradient.addClass("overlay-gradient");

		// Assign Table columns and callbacks for population
		const content: TableContentPopulator[] = [
			{
				title:"Tag",
				callback: (td, record) => {
					return new SettingTagRecordTextAreaComponent(td, record);
				},
				classes:[]
			},{
				title:"Enabled",
				callback:(td,record) => {
					return new SettingTagRecordToggleComponent(td, record, "enabled");
				},
				classes:[]
			},{
				title:"Text",
				callback:(td, record) => {
					return new SettingTagRecordColorComponent(td, record, "color");
				},
				classes:[]
			},{
				title:"Background",
				callback:(td, record) => {
					return new SettingTagRecordColorComponent(td, record, "backgroundColor");
				},
				classes:[]
			},{
				title:"Preview",
				callback:(td, record) => {
					return new SettingTagRecordPreview(td, record);
				},
				classes:["border-right", "tag-preview", "sticky-column"]
			},
		]

		for (let i = 0; i < 20; i++) {
			content.push({
				title:"Enabled",
				callback:(td,record) => {
					return new SettingTagRecordToggleComponent(td, record, "enabled");
				},
				classes:["border-right-dotted"]
			})
		}

		for (const extension of Extensions) {
			content.push(extension.TableContentPopulator)
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
		const plugin = ColoredTagWranglerPlugin.instance;

		let tbody = table.createEl('tbody');
		for (let record of await plugin.settings.getTags()) {
			let tr = tbody.createEl('tr');
			for (let {callback,classes} of content){
				let td = tr.createEl('td');
				td.addClasses(classes)
				callback(td, record)
			}

			await updateTagRecordRow(record)
		}
	}

}
