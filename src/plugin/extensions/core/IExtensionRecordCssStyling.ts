// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecord} from "src/contracts/plugin/extensions/IExtensionRecord";
import {RGB} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtensionRecordCore extends IExtensionRecord {
	core_enabled: boolean;
	core_id: string
	core_dateGenerated: number,
	core_tagText: string,
	core_color_foreground: RGB, // color for tag's text
	core_color_background: RGB, // color for tag's background
}
