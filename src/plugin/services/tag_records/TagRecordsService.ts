// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ITagRecordsService} from "../../../contracts/plugin/services/tag_records/ITagRecordsService";
import {ISettingsService} from "../../../contracts/plugin/services/settings/ISettingsService";
import {IColoredTagRecord} from "../../../contracts/plugin/settings/IColoredTagRecord";
import {reSLASH, reSplit} from "../../../lib/RegexUtils";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class TagRecordsService implements ITagRecordsService {
	private _settings: ISettingsService;
	private get _tagRecords(): IColoredTagRecord[] {return this._settings.data.TagColors;}

	private _flatCache : IColoredTagRecord[] | null = null;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(settings: ISettingsService) {
		this._settings = settings;
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	getTagsFlat(remove_slash : boolean = true):IColoredTagRecord[] {
		return this._flatCache ??= this._tagRecords
			.flatMap((record) => {
				return record.core_tagText // read the last line if you are confused why we are looping over the tag_name
					.split(reSplit)
					.map(tag => tag.trim())  // Also trim the tag for leading spaces & map everything to lowercase!
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
}
