// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecord} from "src/contracts/plugin/extensions/IExtensionRecord";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtensionRecordProperties extends IExtensionRecord {
	properties_folder_note_enabled: boolean;
	properties_note_background_enabled: boolean;
}
