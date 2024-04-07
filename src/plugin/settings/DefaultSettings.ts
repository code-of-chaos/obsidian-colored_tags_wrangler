// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "../../contracts/plugin/settings/IPluginSettings";
import {ISettingExtensions} from "../../contracts/plugin/settings/ISettingExtensions";
import {ISettingInfo} from "../../contracts/plugin/settings/ISettingInfo";
import {CURRENT_VERSION} from "./migrator/Migrate";
import {IColoredTagRecord} from "../../contracts/plugin/settings/IColoredTagRecord";
import {v4 as uuidv4} from "uuid";
import {BoldifyExtension} from "../extensions/boldify/boldify";

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
	id: uuidv4(),
	tagText : "new-tag",
	color : {r:255,g:255,b:255,a:1},
	backgroundColor : {r:0,g:0,b:0,a:1},
	enabled : true,

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
