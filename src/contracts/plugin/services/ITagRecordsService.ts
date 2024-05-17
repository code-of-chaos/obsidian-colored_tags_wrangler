// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../settings/IColoredTagRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface ITagRecordsService {
	getTagsFlat(remove_slash : boolean):IColoredTagRecord[]
	getTags() : IColoredTagRecord[]
	getTagCount() : number

	addOrUpdateTag(record:IColoredTagRecord) : Promise<void>
	removeTag(record:IColoredTagRecord) : Promise<void>
	getTagIndex(record: IColoredTagRecord): number
	getFirstTag(record:IColoredTagRecord):string
	getTagPreviewIds(record:IColoredTagRecord) : {begin:string, end:string}
}
