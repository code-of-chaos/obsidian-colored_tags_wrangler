// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "./IColoredTagRecord";
import {IPluginSettings} from "./IPluginSettings";
import {Debouncer} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export interface ISettingsManager {
	data: IPluginSettings;
	DebounceSaveToFile: Debouncer<[], Promise<void>>;

	loadFromFile(): Promise<void>;
	saveToFile(): Promise<void>;
	getTagsFlat(remove_slash : boolean):Promise<IColoredTagRecord[]>
	getTags():Promise<IColoredTagRecord[]>

	updateTagDebounced(record:IColoredTagRecord):Promise<void>;
	updateTag(record:IColoredTagRecord):Promise<void>;

	getTagIndex(record:IColoredTagRecord):number;
}
