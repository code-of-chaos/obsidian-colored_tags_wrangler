// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerPlugin} from "../../contracts/plugin/IColoredTagWranglerPlugin";
import {ISettingsService} from "../../contracts/plugin/services/ISettingsService";
import {ITagRecordsService} from "../../contracts/plugin/services/ITagRecordsService";
import {SettingsService} from "./settings/SettingsService";
import {TagRecordsService} from "./tagrecords/TagRecordsService";
import {IMigratorService} from "../../contracts/plugin/services/IMigratorService";
import {MigratorService} from "./migrator/MigratorService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ServiceProvider {
	public static plugin : IColoredTagWranglerPlugin
	public static settings : ISettingsService;
	public static tagRecords : ITagRecordsService;
	public static migrator : IMigratorService;

	private static Instantiated : boolean = false;
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public static PopulateInstances(plugin: IColoredTagWranglerPlugin){
		if (ServiceProvider.Instantiated) return;

		ServiceProvider.plugin = plugin;
		ServiceProvider.migrator = new MigratorService(plugin)
		ServiceProvider.settings = new SettingsService(plugin, ServiceProvider.migrator)
		ServiceProvider.tagRecords = new TagRecordsService(ServiceProvider.settings);

		ServiceProvider.Instantiated = true;
	}
}
