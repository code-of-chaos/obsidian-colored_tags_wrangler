// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Plugin}
	from "obsidian";
import {IColoredTagWranglerSettings, DefaultSettings}
	from "src/settings/DefaultSettings";
import {SettingTab}
	from "src/setting_tab";
import {StyleManager}
	from "src/style_manager";
import {migrate_0_to_1} from "./settings/SettingsMigrations";
import {ISettings_v000} from "./settings/old_setting_versions/ISettings_v000";
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

	}
	// -----------------------------------------------------------------------------------------------------------------
	onunload() {
		this.style_manager.removeAllStyles();
	}
	// -----------------------------------------------------------------------------------------------------------------
	async loadSettings() {
		// Retrieve setting_tab from stored data.json file
		let loaded_data:any =  await this.loadData()

		let migrated_data:IColoredTagWranglerSettings;
		let save_settings :boolean = false;

		switch (loaded_data?.Info?.SettingsVersion ?? -1) {
			case 0 :
				let loaded_data_v0: ISettings_v000 = loaded_data as ISettings_v000;
				migrated_data = migrate_0_to_1(loaded_data_v0);
				save_settings = true
				break;

			case DefaultSettings.Info.SettingsVersion :
				// Everything is normal
				migrated_data = loaded_data as IColoredTagWranglerSettings;
				break;

			default:
				console.warn("Version could not be established, assigning as is. Please check for updates")
				migrated_data = loaded_data as IColoredTagWranglerSettings;
				break;
		}

		this.settings = Object.assign({}, DefaultSettings, migrated_data);
		if (save_settings){
			await this.saveData(this.settings);
		}
	}
	// -----------------------------------------------------------------------------------------------------------------
	async saveSettings() {
		await this.saveData(this.settings);
		// whenever setting_tab are saved, also run this.
		//		This way we know it is always run when needed
		this.style_manager.switchAllStyles();
	}

}
