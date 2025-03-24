// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "./IColoredTagRecord";
import {ISettingInfo} from "./ISettingInfo";
import {IConfigSettings} from "./IConfigSettings";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IPluginSettings {
	TagColors: IColoredTagRecord[],
	EnabledExtensions: string[]
	Info: ISettingInfo,
	Config: IConfigSettings
}
