// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../../settings/IColoredTagRecord";
import {ISettingTagRecordComponent} from "./tag_table/ISettingTagRecordComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export type TableContentPopulator = {
	title:string,
	callback:(td:HTMLTableCellElement, record:IColoredTagRecord) => ISettingTagRecordComponent,
	classes:string[]
}
