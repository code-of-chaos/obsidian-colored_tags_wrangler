// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { Setting, SettingTab } from "obsidian";
import { TableContentPopulator } from "src/contracts/plugin/ui/components/TableContentPopulator";
import { SettingTagRecordTextAreaComponent } from "src/plugin/ui/setting_tab/components/tag_table/SettingTagRecordTextAreaComponent";
import { SettingTagRecordPreview } from "src/plugin/ui/setting_tab/components/tag_table/SettingTagRecordPreview";
import { SettingTagRecordNavigators } from "src/plugin/ui/setting_tab/components/tag_table/SettingTagRecordNavigators";
import { ServiceProvider } from "src/plugin/services/ServiceProvider";
import { RowDataType } from "src/contracts/plugin/ui/components/RowDataType";
import { IColoredTagRecord } from "src/contracts/plugin/settings/IColoredTagRecord";
import { capitalizeFirstLetter } from "src/lib/StringUtils";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagTable {
	private parent: SettingTab;
	private selectedExtension: string | undefined;
	private settingEl: Setting;
	private settingElFilter: Setting;
	private settingElOptions: Setting;
	private settingElBottom: Setting;
	private tableEl: HTMLElement;
	private sortCriterion: string;
	private searchQuery: string;
	private showOnlyEnabled: boolean;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(parent: SettingTab) {
		this.parent = parent;
		this.sortCriterion = "default"; // default sort criterion
		this.searchQuery = ""; // default search query
		this.showOnlyEnabled = false; // default state for the "Only show Enabled" filter
		this._AssignEls();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public async display(): Promise<void> {
		if (this.settingEl == undefined && this.tableEl !== undefined) {
			this._AssignEls();
		}

		await this._DisplayExtensionSelector();
		await this._DisplayTable();

		await this.addNewButton(this.settingElBottom);
	}

	public async redrawTable() {
		this.tableEl.empty();
		await this._DisplayTable();
	}

	public async UpdateRow(record: IColoredTagRecord, _: HTMLElement): Promise<void> {
		const tag = ServiceProvider.tagRecords.getFirstTag(record);
		const originalLength = tag.length;

		let { begin, end } = this.getTagPreviewEls(record);

		if (!begin || !end) {
			console.warn(`The tag "${record}" BEGIN or END is empty.`);
			return;
		}

		const displayTag = originalLength >= 9
			? `${tag.substring(0, 8)}...`
			: tag;
		if (begin.textContent !== "#") begin.textContent = "#";
		if (end.textContent !== displayTag) end.textContent = displayTag;

		SettingTagRecordPreview.setClasses(begin, end, record);
		// Styling provided by record updater
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _AssignEls() {
		this.settingEl = new Setting(this.parent.containerEl);
		this.settingElFilter = new Setting(this.parent.containerEl);
		this.settingElOptions = new Setting(this.parent.containerEl);
		this.tableEl = this.parent.containerEl.createDiv();
		this.settingElBottom = new Setting(this.parent.containerEl);
	}

	private async _DisplayExtensionSelector(): Promise<void> {
		const element = this.settingEl
			.setName("Custom color tags")
			.setDesc(`Define custom colors for tags. Select which extension to edit, dependant on the `);

		if (ServiceProvider.extensions.EnabledList.length > 1) {
			element.addDropdown(component => {
				component
					.addOptions(
						ServiceProvider.extensions.EnabledList
							.map(extension => extension.extensionName)
							.reduce(
								(acc, key) => (
									{ ...acc, [key]: capitalizeFirstLetter(key) }
								), {}
							)
					)
					.onChange(async (value) => {
						// UPDATE THE TABLE
						this.selectedExtension = value;
						await this.redrawTable();
					});
			});
		}

		// Adding search input and sort dropdown
		this.settingElFilter
			.setName("Search and Filters")
			.addText(text => {
				text.inputEl.addClass("regex-search-input");
				text
					.setPlaceholder("Search (regex supported)...") // Updated placeholder
					.onChange(async (value) => {
						this.searchQuery = value.trim().toLowerCase();
						await this.redrawTable();
					});
			})
			.addDropdown(component => {
				component
					.addOptions({
						"default": "Default",
						"name": "Sort by Name",
						"id": "Sort by ID",
					})
					.setValue("default") // Default sorting
					.onChange(async (value) => {
						this.sortCriterion = value;
						await this.redrawTable();
					});
			});

		// Adding "Only show Enabled" checkbox with spacing
		const div = this.settingElOptions.settingEl.createDiv();
		const checkboxLabel = div.createEl('label', { text: 'Only show Enabled' });
		checkboxLabel.addClass('checkbox-label'); // Applying the CSS class
		checkboxLabel.style.marginRight = '8px'; // Adding space between label and checkbox
		const checkbox = div.createEl('input', { type: 'checkbox' });
		checkbox.onchange = async () => {
			this.showOnlyEnabled = checkbox.checked;
			await this.redrawTable();
		};

		await this.addNewButton(element); // add a bottom button, for navigation
	}

	private async addNewButton(settingEl: Setting) {
		settingEl.addButton(component => {
			component
				.setClass("mod-cta")
				.setButtonText("New Tag")
				.onClick(async () => {
					await ServiceProvider.tagRecords.createNewDefaultTag();
					await this.redrawTable();
				});
		});
	}

	private async _DisplayTable(): Promise<void> {
		let scrollAreaContainer = this.tableEl.createDiv();
		scrollAreaContainer.addClass("scroll-area-container");

		let tableContainer = scrollAreaContainer.createDiv();
		tableContainer.addClass("scroll-container");

		let overlayGradient = scrollAreaContainer.createDiv();
		overlayGradient.addClass("overlay-gradient");

		const content: TableContentPopulator[] = [
			{
				title: "",
				callback: (rowData: RowDataType) => {
					return new SettingTagRecordNavigators(rowData,
						true, async () => await this.redrawTable());
				},
				classes: []
			}, {
				title: "Tag",
				callback: (rowData: RowDataType) => {
					return new SettingTagRecordTextAreaComponent(rowData,
						"core_tagText");
				},
				classes: []
			}, {
				title: "Preview",
				callback: (rowData: RowDataType) => {
					return new SettingTagRecordPreview(rowData);
				},
				classes: ["tag-preview", "sticky-column", "border-right"]
			}
		];

		const selectedExt = this.selectedExtension !== undefined
			? ServiceProvider.extensions.Dictionary[this.selectedExtension]
			: ServiceProvider.extensions.EnabledList.first();

		selectedExt?.TableContentPopulators.forEach(callback => content.push(callback));

		// Sort and filter the records based on the selected criterion, search query, and "Only show Enabled" checkbox
		const records = ServiceProvider.tagRecords.getTags();

		let filteredRecords = records;
		if (this.showOnlyEnabled) {
			filteredRecords = records.filter(record => record.core_enabled);
		}

		if (this.searchQuery) {
			try {
				const regex = new RegExp(this.searchQuery); // Create regex from search
				filteredRecords = filteredRecords.filter(record =>
					regex.test(record.core_tagText.toLowerCase())
				);
			} catch (e) {
				// Invalid regex, skip filtering
				console.warn(`Invalid regex pattern: ${this.searchQuery}`);
			}
		}

		filteredRecords.sort((a, b) => {
			switch (this.sortCriterion) {
				case 'name':
					return a.core_tagText.localeCompare(b.core_tagText);
				case 'id':
				default :
					return a.core_id.localeCompare(b.core_id);
			}
		});

		// Create table headers
		let table = tableContainer.createEl('table');
		let thead = table.createEl('thead');
		let headersRow = thead.createEl('tr');
		for (let { title, classes } of content) {
			headersRow.createEl('th', { text: title, cls: classes });
			headersRow.addClasses(classes);
		}

		// Populate table with record rows
		let tbody = table.createEl('tbody');
		for (let record of filteredRecords) {
			const tr = tbody.createEl('tr');
			for (let { callback, classes } of content) {
				let td = tr.createEl('td');
				td.addClasses(classes);
				callback({
					record: record,
					rowUpdateCallback: (async () => {
						await this.UpdateRow(record, tr);
						ServiceProvider.cssStyler.processExtensions(); // This is so we can update all the styling when something changes
					}),
					parentEl: td
				});
			}

			await this.UpdateRow(record, tr);
		}
	}

	private getTagPreviewEls(record: IColoredTagRecord): { begin: HTMLElement | null, end: HTMLElement | null } {
		const ids = ServiceProvider.tagRecords.getTagPreviewIds(record);
		return {
			begin: document.getElementById(ids.begin),
			end: document.getElementById(ids.end)
		};
	}
}
