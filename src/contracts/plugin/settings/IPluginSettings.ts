// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "./IColoredTagRecord";
import {ISettingInfo} from "./ISettingInfo";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IPluginSettings {
	TagColors: IColoredTagRecord[],
	EnabledExtensions : string[]
	Info: ISettingInfo,
}