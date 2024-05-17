// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting, SettingTab} from "obsidian";
import {TableContentPopulator} from "../../../../../contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordTextAreaComponent} from "./SettingTagRecordTextAreaComponent";
import {SettingTagRecordPreview} from "./SettingTagRecordPreview";
import {Extensions} from "../../../../extensions/Extensions";
import {updateTagRecordRow} from "../../../../../lib/ColoredTagRecordUtils";
import ColoredTagWranglerPlugin from "../../../../ColoredTagWranglerPlugin";
import {SettingTagRecordNavigators} from "./SettingTagRecordNavigators";

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
					.keys(Extensions.Dictionary)
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

		let overlayGradient = scrollAreaContainer.createEl('div');
		overlayGradient.addClass("overlay-gradient");

		// Assign Table columns and callbacks for population
		// 		This is the default which should be shown on every tab!
		const content: TableContentPopulator[] = [
			{
				title:"",
				callback : (td, record) => {
					return new SettingTagRecordNavigators(
						td,
						record, false, async () => await this.redrawTable())

				},
				classes:[]
			}, {
				title:"Tag",
				callback: (td, record) => {
					return new SettingTagRecordTextAreaComponent(td, record, "core_tagText");
				},
				classes:[]
			},{
				title:"Preview",
				callback:(td, record) => {
					return new SettingTagRecordPreview(td, record);
				},
				classes:["tag-preview", "sticky-column","border-right"]
			}
		]

		let populators: TableContentPopulator[];
		if (this.selectedExtension != undefined){
			populators = Extensions.Dictionary[this.selectedExtension].TableContentPopulators
		} else {
			populators = Extensions.Core.TableContentPopulators
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
