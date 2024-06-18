// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagRecord} from "../../settings/IColoredTagRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface ITagRecordsService {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	getTagsFlat(remove_slash: boolean): IColoredTagRecord[]
	getTags(): IColoredTagRecord[]
	getTagCount(): number
	addOrUpdateTag(record: IColoredTagRecord): Promise<void>
	removeTag(record: IColoredTagRecord): Promise<void>
	getTagIndex(record: IColoredTagRecord): number
	getFirstTag(record: IColoredTagRecord): string
	getTagPreviewIds(record: IColoredTagRecord): { begin: string, end: string }

	/**
	 * Retrieves the default colored tag record.
	 * Does not store this new record to the settings.
	 * @returns {IColoredTagRecord} The default colored tag record.
	 */
	getDefaultRecord(): IColoredTagRecord
	createNewDefaultTag(): Promise<void>
}
