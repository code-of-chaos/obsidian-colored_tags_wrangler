// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettingsService} from "src/contracts/plugin/services/settings/ISettingsService";
import {IColoredTagWranglerPlugin} from "src/contracts/plugin/IColoredTagWranglerPlugin";
import {debounce, Debouncer} from "obsidian";
import {defaultSettings} from "src/plugin/services/settings/DefaultSettings";
import {IPluginSettings} from "src/contracts/plugin/settings/IPluginSettings";
import {IMigratorService} from "src/contracts/plugin/services/migrator/IMigratorService";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingsService implements ISettingsService {
	public data: IPluginSettings;
	public debounceSaveToFile: Debouncer<[], Promise<void>>;
	private _plugin: IColoredTagWranglerPlugin;
	private _migrator: IMigratorService;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: IColoredTagWranglerPlugin, migrator: IMigratorService) {
		this._plugin = plugin;
		this._migrator = migrator;
		this.debounceSaveToFile = debounce(this.saveToFile, 100)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public async loadFromFile() {
		const tempData = await this._plugin.loadData()
		this.data = Object.assign(
			{},
			defaultSettings,
			await this._migrator.migrateData(tempData)
		);

		this.debounceSaveToFile()
	}

	public async saveToFile() {
		await this._plugin.saveData(this.data);
	}
}
