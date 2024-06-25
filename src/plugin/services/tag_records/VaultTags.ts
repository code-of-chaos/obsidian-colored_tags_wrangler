// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerPlugin} from "../../../contracts/plugin/IColoredTagWranglerPlugin";
import {TagCache} from "obsidian";
import {IVaultTags} from "../../../contracts/plugin/services/tag_records/IVaultTags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class VaultTags implements IVaultTags{
	private _plugin : IColoredTagWranglerPlugin;

	private _tagsCache : string[] | undefined;
	public get allTags() : string[] {
		return this._tagsCache ??= this.getAllTags()
	}

	private _nestedTagsCache : Record<string, unknown> | undefined;
	public get allNestedTags() : Record<string, unknown> {
		return this._nestedTagsCache ??= this.getAllNestedTags()
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
	private getAllTags() : string[] {
		return this._plugin.app.vault.getFiles()
			.flatMap(file => this._plugin.app.metadataCache.getFileCache(file)?.tags )
			.filter((tag): tag is TagCache => tag !== undefined)
			.map(tag => tag.tag.replace("#", ""))
	}

	private getAllNestedTags() : Record<string, unknown> {
		const dict : Record<string, unknown> = {}
		this.allTags
			.filter(tag => tag.match(/\//gim))
			.map(tag => tag.split(/\//gim))
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
	}
}
