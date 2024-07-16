// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as migrations from "./migrations";
import {IPluginSettings} from "src/contracts/plugin/settings/IPluginSettings";
import {Notice} from "obsidian";
import {IColoredTagWranglerPlugin} from "src/contracts/plugin/IColoredTagWranglerPlugin";
import {IMigratorService} from "src/contracts/plugin/services/migrator/IMigratorService";
import {
	ISettings_v001,	ISettings_v002,	ISettings_v003,	ISettings_v004,	ISettings_v005, ISettings_v006, ISettings_v007, 
	ISettings_v008, ISettings_v009, ISettings_v010,	ISettings_v011, ISettings_v012, ISettings_v013, ISettings_v014
} from "src/plugin/services/migrator/setting_versions";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
export class MigratorService implements IMigratorService {
	private static MIGRATION_STEPS: ((data: any) => Promise<any>)[] = [ // Using any's isn't perfect but will do for now
		// Add more lambdas in order.
		//      Btw this only works because I am dumb enough to start from 0,
		//      that way I don't need to do any other steps in the for loop
		async (data) : Promise<ISettings_v001 > => await migrations.migrate_00_to_01(data),
		async (data) : Promise<ISettings_v002 > => await migrations.migrate_01_to_02(data),
		async (data) : Promise<ISettings_v003 > => await migrations.migrate_02_to_03(data),
		async (data) : Promise<ISettings_v004 > => await migrations.migrate_03_to_04(data),
		async (data) : Promise<ISettings_v005 > => await migrations.migrate_04_to_05(data),
		async (data) : Promise<ISettings_v006 > => await migrations.migrate_05_to_06(data),
		async (data) : Promise<ISettings_v007 > => await migrations.migrate_06_to_07(data),
		async (data) : Promise<ISettings_v008 > => await migrations.migrate_07_to_08(data),
		async (data) : Promise<ISettings_v009 > => await migrations.migrate_08_to_09(data),
		async (data) : Promise<ISettings_v010 > => await migrations.migrate_09_to_10(data),
		async (data) : Promise<ISettings_v011 > => await migrations.migrate_10_to_11(data),
		async (data) : Promise<ISettings_v012 > => await migrations.migrate_11_to_12(data),
		async (data) : Promise<ISettings_v013 > => await migrations.migrate_12_to_13(data),
		async (data) : Promise<ISettings_v014 > => await migrations.migrate_13_to_14(data),
		async (data) : Promise<IPluginSettings> => await migrations.migrate_14_to_15(data),
	];

	// I have become too lazy to keep track of which version we are on.
	public static CURRENT_VERSION = MigratorService.MIGRATION_STEPS.length + 1
	private plugin: IColoredTagWranglerPlugin;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: IColoredTagWranglerPlugin) {
		this.plugin = plugin;
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public async migrateData(data: any,): Promise<any> {
		// If the plugin hasn't been used before, no data will be present aka no migrations needed
		if (data === null) {
			return null
		}

		// Set a default version, else the migrations won't work.
		let version = data?.Info?.SettingsVersion ?? -1;
		if (version === -1 || version <= 14) {
			// copy the data file to the backup location
			await this.plugin.app.vault.adapter.copy(
				`${this.plugin.manifest.dir}/data.json`,
				`${this.plugin.manifest.dir}/data_backup-${Date.now().toString()}.json`
			);
		}

		// Exit clause
		if (version === -1) {
			console.warn("Version could not be established, assigning as is. Created a data_backup.json file.")
			new Notice("ColoredTagsWrangler : Version could not be read from data.json. Backup created as data_backup.json file.");
			return data;
		}

		if (version <= 14) {
			new Notice("ColoredTagsWrangler : data.json was made for a lower version, upgrading it to the newest version. Backup created as data_backup.json file.")
		}

		// Actual migrations
		let migratedData: IPluginSettings = data;
		for (version; version < MigratorService.MIGRATION_STEPS.length; version++) {
			migratedData = await MigratorService.MIGRATION_STEPS[version](migratedData);
			console.log(`Migrated data.json from ColoredTagsWrangler to version ${migratedData.Info.SettingsVersion}`)
		}

		return migratedData;
	}

}
