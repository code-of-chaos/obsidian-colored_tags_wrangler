// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerPlugin} from "src/contracts/plugin/IColoredTagWranglerPlugin";
import {ISettingsService} from "src/contracts/plugin/services/settings/ISettingsService";
import {ITagRecordsService} from "src/contracts/plugin/services/tag_records/ITagRecordsService";
import {SettingsService} from "src/plugin/services/settings/SettingsService";
import {TagRecordsService} from "src/plugin/services/tag_records/TagRecordsService";
import {IMigratorService} from "src/contracts/plugin/services/migrator/IMigratorService";
import {MigratorService} from "src/plugin/services/migrator/MigratorService";
import {IExtensionsService} from "src/contracts/plugin/services/extensions/IExtensionsService";
import {ExtensionsService} from "src/plugin/services/extensions/ExtensionsService";
import {CssStylerService} from "src/plugin/services/css_styler/CssStylerService";
import {ICssStylerService} from "src/contracts/plugin/services/css_styler/ICssStylerService";
import {IVaultTags} from "src/contracts/plugin/services/tag_records/IVaultTags";
import {VaultTags} from "src/plugin/services/tag_records/VaultTags";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ServiceProvider {
	public static plugin:	  IColoredTagWranglerPlugin
	public static vaultTags:  IVaultTags
	public static extensions: IExtensionsService
	public static settings:   ISettingsService;
	public static tagRecords: ITagRecordsService;
	public static migrator:   IMigratorService;
	public static cssStyler:  ICssStylerService

	private static Instantiated: boolean = false;
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public static PopulateInstances(plugin: IColoredTagWranglerPlugin) {
		if (ServiceProvider.Instantiated) return;

		ServiceProvider.plugin = plugin;
		ServiceProvider.vaultTags = new VaultTags(plugin);
		ServiceProvider.migrator = new MigratorService(plugin)
		ServiceProvider.settings = new SettingsService(plugin, ServiceProvider.migrator)
		ServiceProvider.extensions = new ExtensionsService(ServiceProvider.settings)
		ServiceProvider.tagRecords = new TagRecordsService(ServiceProvider.settings, ServiceProvider.extensions)
		ServiceProvider.cssStyler = new CssStylerService(ServiceProvider.extensions)

		ServiceProvider.Instantiated = true;
	}
}
