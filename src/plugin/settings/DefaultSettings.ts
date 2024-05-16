// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "../../contracts/plugin/settings/IPluginSettings";
import {ISettingExtensions} from "../../contracts/plugin/settings/ISettingExtensions";
import {ISettingInfo} from "../../contracts/plugin/settings/ISettingInfo";
import {CURRENT_VERSION} from "./migrator/Migrate";
import {IColoredTagRecord} from "../../contracts/plugin/settings/IColoredTagRecord";
import {BoldifyExtension} from "../extensions/boldify/boldify";
import {CoreExtension} from "../extensions/core/core";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const defaultSettingsExtensions: ISettingExtensions = {
	EnabledExtensions: []
}

const defaultSettingsInfo : ISettingInfo = {
	SettingsVersion : CURRENT_VERSION // just add a migration and we are up to a new version number.
}

export const defaultTagColorsRecord : () => IColoredTagRecord = () => { return {
	...CoreExtension.getDefaultRecord(), // THIS IS THE CORE EXTENSION, should hold stuff like the color and so on.

	// Extensions
	...BoldifyExtension.getDefaultRecord()
}}

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const defaultSettings : IPluginSettings = {
	TagColors: [] ,
	Extensions: defaultSettingsExtensions ,
	Info : defaultSettingsInfo
}
