// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, CachedMetadata, Plugin}
	from "obsidian";
import {
	IColoredTagWranglerSettings,
	DefaultSettings
} from "src/settings/DefaultSettings";
import {SettingTab}
	from "src/setting_tab";
import {StyleManager}
	from "src/style_manager";
import {Migrate}
	from "./settings/Migrate";
import {EventHandlerMetadataChange}
	from "./event_handlers/EventHandlerMetadataChange";
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWranglerPlugin{
	settings: IColoredTagWranglerSettings;
	style_manager:StyleManager;
	app:App;

	saveSettings():Promise<void>;
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin {
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

		this.style_manager.switchAllStyles();

		// maybe store this somewhere?
		new EventHandlerMetadataChange(this).register()
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
