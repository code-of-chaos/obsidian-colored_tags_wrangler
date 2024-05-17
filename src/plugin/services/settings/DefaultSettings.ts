// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "../../../contracts/plugin/settings/IPluginSettings";
import {ISettingInfo} from "../../../contracts/plugin/settings/ISettingInfo";
import {MigratorService} from "../migrator/MigratorService";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const defaultSettingsInfo : ISettingInfo = {
	SettingsVersion : MigratorService.CURRENT_VERSION // just add a migration and we are up to a new version number.
}

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const defaultSettings : IPluginSettings = {
	TagColors: [] ,
	EnabledExtensions: [] ,
	Info : defaultSettingsInfo
}
