// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "src/contracts/plugin/settings/IPluginSettings";
import {ISettingInfo} from "src/contracts/plugin/settings/ISettingInfo";
import {MigratorService} from "src/plugin/services/migrator/MigratorService";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const defaultSettingsInfo: ISettingInfo = {
	SettingsVersion: MigratorService.CURRENT_VERSION // just add a migration and we are up to a new version number.
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const defaultSettings: IPluginSettings = {
	TagColors: [],
	EnabledExtensions: ["core"],
	Info: defaultSettingsInfo
}
