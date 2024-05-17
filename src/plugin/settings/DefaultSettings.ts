// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "../../contracts/plugin/settings/IPluginSettings";
import {ISettingExtensions} from "../../contracts/plugin/settings/ISettingExtensions";
import {ISettingInfo} from "../../contracts/plugin/settings/ISettingInfo";
import {CURRENT_VERSION} from "./migrator/Migrate";
import {IColoredTagRecord} from "../../contracts/plugin/settings/IColoredTagRecord";
import {BoldifyExtension} from "../extensions/boldify/BoldifyExtension";
import {CoreExtension} from "../extensions/core/CoreExtension";
import {ExtensionsList} from "../extensions/Extensions";
import {IExtension} from "../../contracts/plugin/extensions/IExtension";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const defaultSettingsExtensions: ISettingExtensions = {
	EnabledExtensions: []
}

const defaultSettingsInfo : ISettingInfo = {
	SettingsVersion : CURRENT_VERSION // just add a migration and we are up to a new version number.
}

// @ts-ignore
export const defaultTagColorsRecord : () => IColoredTagRecord = () => ExtensionsList
	.reduce(
		(acc:IColoredTagRecord, cur : IExtension) => ({...acc, ...cur.getDefaultRecord()}) ,
		{} as IColoredTagRecord
	)

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const defaultSettings : IPluginSettings = {
	TagColors: [] ,
	Extensions: defaultSettingsExtensions ,
	Info : defaultSettingsInfo
}
