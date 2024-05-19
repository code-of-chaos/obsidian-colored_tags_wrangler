// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as migrations from "./migrations";
import {IPluginSettings} from "../../../contracts/plugin/settings/IPluginSettings";
import {Notice} from "obsidian";
import {IColoredTagWranglerPlugin} from "../../../contracts/plugin/IColoredTagWranglerPlugin";
import {IMigratorService} from "../../../contracts/plugin/services/migrator/IMigratorService";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
export class MigratorService implements IMigratorService{
	private plugin: IColoredTagWranglerPlugin;

	private static MIGRATION_STEPS: ((data : any) => Promise<any>)[] = [ // Using any's isn't perfect but will do for now
		// Add more lambdas in order.
		//      Btw this only works because I am dumb enough to start from 0,
		//      that way I don't need to do any other steps in the for loop
		async (data) => await migrations.migrate_00_to_01(data), // 0
		async (data) => await migrations.migrate_01_to_02(data), // 1
		async (data) => await migrations.migrate_02_to_03(data), // 2
		async (data) => await migrations.migrate_03_to_04(data), // 3
		async (data) => await migrations.migrate_04_to_05(data), // 4
		async (data) => await migrations.migrate_05_to_06(data), // 5
		async (data) => await migrations.migrate_06_to_07(data), // 6
		async (data) => await migrations.migrate_07_to_08(data), // 7
		async (data) => await migrations.migrate_08_to_09(data), // 8
		async (data) => await migrations.migrate_09_to_10(data), // 9
		async (data) => await migrations.migrate_10_to_11(data), // 10
		async (data) => await migrations.migrate_11_to_12(data), // 11
		async (data) => await migrations.migrate_12_to_13(data), // 12
		async (data) => await migrations.migrate_13_to_14(data), // 13
		async (data) => await migrations.migrate_14_to_15(data), // 14
	];

	// I have become too lazy to keep track of which version we are on.
	public static CURRENT_VERSION = MigratorService.MIGRATION_STEPS.length + 1

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: IColoredTagWranglerPlugin) {
		this.plugin = plugin;
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public async migrateData(data: any, ): Promise<any> {
		// If the plugin hasn't been used before, no data will be present aka no migrations needed
		if (data === null){
			return null
		}

		// Set a default version, else the migrations won't work.
		let version = data?.Info?.SettingsVersion ?? -1;
		if (version === -1 || version <= 14){
			// copy the data file to the backup location
			await this.plugin.app.vault.adapter.copy(
				`${this.plugin.manifest.dir}/data.json`,
				`${this.plugin.manifest.dir}/data_backup.json`
			);
		}

		if (version === -1){
			// Exit clause
			console.warn("Version could not be established, assigning as is. Created a data_backup.json file.")
			new Notice("ColoredTagsWrangler : <br>Version could not be read from data.json. Backup created as data_backup.json file.");
			return data;
		}

		if (version <= 14){
			new Notice("ColoredTagsWrangler : <br>data.json was made for a lower version, upgrading it to the newest version. Backup created as data_backup.json file.")
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
