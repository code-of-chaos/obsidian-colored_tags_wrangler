// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "src/contracts/plugin/settings/IPluginSettings";
import {ISettingInfo} from "src/contracts/plugin/settings/ISettingInfo";
import {MigratorService} from "src/plugin/services/migrator/MigratorService";
import {IConfigSettings} from "../../../contracts/plugin/settings/IConfigSettings";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const defaultSettingsInfo: ISettingInfo = {
	SettingsVersion: MigratorService.CURRENT_VERSION // just add a migration and we are up to a new version number.
}

export const defaultConfigSettings : IConfigSettings = {
	SettingsTooltipEnabled: true,
	SpaceReplacement: "-"
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const defaultSettings: IPluginSettings = {
	TagColors: [],
	EnabledExtensions: ["core"],
	Info: defaultSettingsInfo,
	Config: defaultConfigSettings
}
