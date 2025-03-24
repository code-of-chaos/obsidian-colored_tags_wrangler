// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerPlugin} from "src/contracts/plugin/IColoredTagWranglerPlugin";
import {TagCache, getAllTags, MetadataCache, TFile, CachedMetadata} from "obsidian";
import {IVaultTags} from "src/contracts/plugin/services/tag_records/IVaultTags";
// ---------------------------------------------------------------------------------------------------------------------
// support Code
// ---------------------------------------------------------------------------------------------------------------------
const Slash = /\//gim;
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class VaultTags implements IVaultTags{
	private _plugin : IColoredTagWranglerPlugin;

	private _tagsCache : string[] | undefined;
	public get allTags() : string[] {
		return this._tagsCache ??= this.getAllTags()
	}

	private _nestedTagsAsDictCache : Record<string, unknown> | undefined;
	public get allNestedTagsAsDict() : Record<string, unknown> {
		return this._nestedTagsAsDictCache ??= this.getAllNestedTagsAsDict()
	}

	private _nestedTagsCache :  string[][] | undefined;
	public get allNestedTags() : string[][] {
		return this._nestedTagsCache ??= this.getAllTags()
			.filter(tag => tag.match(Slash))
			.map(tag => tag.split(Slash))
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin : IColoredTagWranglerPlugin,) {
		this._plugin = plugin;

		plugin.registerEvent(plugin.app.vault.on("modify", () => {
			// Invalidate cache so it gets refreshed whenever a style changes
			this._tagsCache = undefined;
		}))
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private getAllTags(): string[] {
		return this._plugin.app.vault.getFiles()
			.map((file: TFile) => this._plugin.app.metadataCache.getFileCache(file))
			.filter((cache: CachedMetadata | null): cache is CachedMetadata => cache !== null && cache.tags !== undefined)
			.flatMap((cache: CachedMetadata) => getAllTags(cache)) // Get all tags from each cache
			.filter((tag: string | null): tag is string => tag !== null) // Filter out null tags
			.map((tag: string) => tag.replace("#", ""));
	}

	private getAllNestedTagsAsDict() : Record<string, unknown> {
		const dict : Record<string, unknown> = {}
		this.allTags
			.filter(tag => tag.match(Slash))
			.map(tag => tag.split(Slash))
			.forEach(parts => {
				let currentLevel = dict; // Start at the top level of the dictionary

				parts.forEach((part, index) => {
					if (!currentLevel[part]) currentLevel[part] = {};
					if (index === parts.length - 1) currentLevel[part] = undefined; // For last level of the tag
					else currentLevel = currentLevel[part] as Record<string, unknown>; // Go one level deeper
				});
			});
		return dict
	}

	invalidate(){
		this._nestedTagsCache = undefined;
		this._tagsCache = undefined;
		this._nestedTagsAsDictCache = undefined;
	}
}
