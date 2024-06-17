// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettingTagRecordComponent} from "./tag_table/ISettingTagRecordComponent";
import {RowDataType} from "./RowDataType";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export type TableContentPopulator = {
	title: string,
	callback: (rowData: RowDataType) => ISettingTagRecordComponent,
	classes: string[]
}
