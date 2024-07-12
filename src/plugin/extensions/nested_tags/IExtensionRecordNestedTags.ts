// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecord} from "src/contracts/plugin/extensions/IExtensionRecord";
import {DropDownOptions} from "src/plugin/extensions/nested_tags/DropDownOptions";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtensionRecordNestedTags extends IExtensionRecord {
	nested_tags_dropdown : DropDownOptions
}
