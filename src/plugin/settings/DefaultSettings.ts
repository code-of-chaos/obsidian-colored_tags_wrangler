// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "../../contracts/plugin/settings/IPluginSettings";
import {ISettingExtensions} from "../../contracts/plugin/settings/ISettingExtensions";
import {ISettingInfo} from "../../contracts/plugin/settings/ISettingInfo";
import {CURRENT_VERSION} from "./migrator/Migrate";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const defaultSettingsExtensions: ISettingExtensions = {
	EnabledExtensions: []
}

const defaultSettingsInfo : ISettingInfo = {
	SettingsVersion : CURRENT_VERSION // just add a migration and we are up to a new version number.
}

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const defaultSettings : IPluginSettings = {
	TagColors: [] ,
	Extensions: defaultSettingsExtensions ,
	Info : defaultSettingsInfo
}
