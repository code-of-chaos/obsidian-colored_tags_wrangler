// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, Editor, MarkdownView, Modal, Notice, Plugin}
	from "obsidian";
import {IColoredTagWranglerSettings, DEFAULT_SETTINGS}
	from "src/default_settings";
import {SettingTab}
	from "src/setting_tab";
import {Styler}
	from "./styler";
import {Obj} from "tern";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin {
	settings: IColoredTagWranglerSettings;
	styler:Styler

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async onload() {
		try {
			await this.loadSettings();
		} catch (error) {
			console.error("Error loading settings for obsidian-colored_tags_wrangler:", error);
			return;
		}
		this.styler = new Styler(this);
		this.addSettingTab(new SettingTab(this));
		this.styler.applyTagStyles();

		this.settings.enableKanban ? this.styler.applyKanbanStyles() : this.styler.removeKanbanStyles();
	}

	// -----------------------------------------------------------------------------------------------------------------
	onunload() {
		this.styler.removeTagStyles();
		this.styler.removeKanbanStyles();
	}

	// -----------------------------------------------------------------------------------------------------------------
	async loadSettings() {
		// Retrieve settings from stored data.json file
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	// -----------------------------------------------------------------------------------------------------------------
	async saveSettings() {
		await this.saveData(this.settings);
		// whenever settings are saved, also run this.
		//		This way we know it is always run when needed

		Object.keys(this.settings.customTagColors).length != 0 ? this.styler.applyTagStyles() : this.styler.removeTagStyles();
		this.settings.enableKanban ? this.styler.applyKanbanStyles() : this.styler.removeKanbanStyles();
	}

}
