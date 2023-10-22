// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Plugin}
	from "obsidian";
import {IColoredTagWranglerSettings, DEFAULT_SETTINGS}
	from "src/default_settings";
import {SettingTab}
	from "src/setting_tab";
import {StyleManager}
	from "./styles/style_manager";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin {
	settings: IColoredTagWranglerSettings;
	style_manager:StyleManager

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

		this.style_manager = new StyleManager(this);
		this.addSettingTab(new SettingTab(this));

		this.style_manager.switchAllStyles();
	}

	// -----------------------------------------------------------------------------------------------------------------
	onunload() {
		this.style_manager.removeAllStyles()
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
		this.style_manager.switchAllStyles();
	}

}
