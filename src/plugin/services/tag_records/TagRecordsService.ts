// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ITagRecordsService} from "../../../contracts/plugin/services/tag_records/ITagRecordsService";
import {ISettingsService} from "../../../contracts/plugin/services/settings/ISettingsService";
import {IColoredTagRecord} from "../../../contracts/plugin/settings/IColoredTagRecord";
import {reSLASH, reSplit} from "../../../lib/RegexUtils";
import {IExtensionsService} from "../../../contracts/plugin/services/extensions/IExtensionsService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class TagRecordsService implements ITagRecordsService {
	private _settings: ISettingsService;
	private _extensions: IExtensionsService;
	private get _tagRecords(): IColoredTagRecord[] {return this._settings.data.TagColors;}

	private _flatCache : IColoredTagRecord[] | null = null;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(settings: ISettingsService, extensions: IExtensionsService) {
		this._settings = settings;
		this._extensions = extensions;
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
		getTagsFlat(remove_slash : boolean = true):IColoredTagRecord[] {
		return this._flatCache ??= this._tagRecords
			.flatMap((record) => {
				return record.core_tagText // read the last line if you are confused why we are looping over the tag_name
					.split(reSplit)
					.map(tag => tag.trim().toLowerCase())  // Also trim the tag for leading spaces & map everything to lowercase!
					.filter(Boolean) // filter out empty lines
					.map(tag => remove_slash ? tag.replace(reSLASH, "") : tag)  // replace the "/"
					.map(tag => ({...record, core_tagText: tag}));
			});
	}

	getTags() : IColoredTagRecord[] {
		return this._tagRecords;
	}

	getTagCount() : number{
		return this._tagRecords.length
	}

	async addOrUpdateTag(record:IColoredTagRecord) : Promise<void>{
		const index = this.getTagIndex(record);
		if (index !== -1) {
			this._tagRecords[index] = record;
		} else {
			this._tagRecords.push(record);
		}

		await this._settings.debounceSaveToFile.run()
		this._flatCache = null; // invalidate the cache
	}

	async removeTag(record:IColoredTagRecord) : Promise<void>{
		this._tagRecords.remove(record)
        await this._settings.debounceSaveToFile.run();
		this._flatCache = null; // invalidate the cache
	}

	getTagIndex(record: IColoredTagRecord): number {
		return this._tagRecords.findIndex((r) => r.core_id === record.core_id);
	}

	getFirstTag(record: IColoredTagRecord): string {
		return record.core_tagText.split(reSplit).first() ?? "UNDEFINED";
	}

	getTagPreviewIds(record:IColoredTagRecord) : {begin:string, end:string} {
		return {
			begin : `tag-preview-being-${record.core_id}`,
			end : `tag-preview-end-${record.core_id}`
		}
	}

	async createNewEmptyTag() : Promise<void> {
		const newRecord = this._extensions.getDefaultRecord()

		// Ensure _flatCache is populated
		if (this._flatCache === null){
			this.getTagsFlat();
		}

		// Check for duplicate names
		//		The way we are doing this is by getting all the records which already start with the default tagText
		//		The count of this +1 is the new suffix for the new record
		const defaultPresent = this._flatCache!
			.filter(record => record.core_tagText.startsWith(newRecord.core_tagText))
			.length;

		newRecord.core_tagText += `-${defaultPresent}`;

		this._tagRecords.push(newRecord)
		this._flatCache = null; // invalidate the cache
	}

}
