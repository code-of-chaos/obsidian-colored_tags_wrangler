// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "./IColoredTagRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export interface ISettingsManager {
	loadFromFile(): Promise<void>;
	saveToFile(): Promise<void>;
	getTagsFlat(remove_slash : boolean):Promise<IColoredTagRecord[]>
	getTags():Promise<IColoredTagRecord[]>
	updateTag(record:IColoredTagRecord):Promise<void>;
}
