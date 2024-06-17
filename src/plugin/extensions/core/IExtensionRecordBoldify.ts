// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGBA} from "../../../contracts/types/RGBA";
import {IExtensionRecord} from "../../../contracts/plugin/extensions/IExtensionRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtensionRecordCore extends IExtensionRecord {
	core_enabled: boolean;
	core_id: string
	core_tagText: string,
	core_color_foreground: RGBA, // color for tag's text
	core_color_background: RGBA, // color for tag's background
}
