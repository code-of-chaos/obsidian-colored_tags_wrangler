// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Plugin} from "obsidian";
import {Migrate} from "src/plugin/settings/Migrate";
import {MetadataChange} from "src/plugin/event_handlers/MetadataChange";
import {IColoredTagWrangler} from "./plugin/IColoredTagWrangler";
import {DefaultSettings, IColoredTagWranglerSettings} from "./plugin/settings/DefaultSettings";
import {StyleManager} from "src/plugin/style_manager/StyleManager";
import {SettingTab} from "src/plugin/setting_tab/SettingTab";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin implements IColoredTagWrangler {
	settings: IColoredTagWranglerSettings;
	style_manager:StyleManager;
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async onload() {
		try {
			await this.loadSettings();
		} catch (error) {
			console.error("Error loading setting_tab for obsidian-colored_tags_wrangler:", error);
			return;
		}

		this.style_manager = new StyleManager(this);
		this.addSettingTab(new SettingTab(this));

		// maybe store this somewhere?
		new MetadataChange(this).register();

		// Load the styles
		this.app.workspace.onLayoutReady(() => {
			this.style_manager.switchAllStyles();
        });
	}

	// -----------------------------------------------------------------------------------------------------------------
	onunload() {
		this.style_manager.removeAllStyles();
	}
	// -----------------------------------------------------------------------------------------------------------------
	async loadSettings() {
		// Retrieve setting_tab from stored data.json file
		this.settings = Object.assign({}, DefaultSettings, Migrate(await this.loadData()));
		await this.saveData(this.settings);
	}
	// -----------------------------------------------------------------------------------------------------------------
	async saveSettings() {
		await this.saveData(this.settings);
		// whenever setting_tab are saved, also run this.
		//		This way we know it is always run when needed
		this.style_manager.switchAllStyles();
	}

}
