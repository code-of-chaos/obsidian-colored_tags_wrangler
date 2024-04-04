// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IPluginSettings} from "../../contracts/plugin/settings/IPluginSettings";
import {ISettingsManager} from "../../contracts/plugin/settings/ISettingsManager";
import ColoredTagWranglerPlugin from "../ColoredTagWranglerPlugin";
import {defaultSettings} from "./DefaultSettings";
import {IColoredTagRecord} from "../../contracts/plugin/settings/IColoredTagRecord";
import {Migrate} from "./migrator/Migrate";
import {debounce} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const reSLASH = /\//g;
const reSplit = /[\n;]/; // for organization, I added \n

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingsManager implements ISettingsManager {
	public data: IPluginSettings;
	private _loaded : boolean = false;

	// -----------------------------------------------------------------------------------------------------------------
	// data.json manipulation
	// -----------------------------------------------------------------------------------------------------------------
	async loadFromFile(){
		const plugin = ColoredTagWranglerPlugin.instance;

		this.data = Object.assign(
			{},
			defaultSettings,
			await Migrate(await plugin.loadData())
		);

		console.error(this.data)

		this._loaded = true;

		await this.saveToFile();

	}

	async saveToFile(){
		const plugin = ColoredTagWranglerPlugin.instance;

		await plugin.saveData(this.data);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Quick class for settings manipulation
	// -----------------------------------------------------------------------------------------------------------------
	async getTagsFlat(remove_slash : boolean = true):Promise<IColoredTagRecord[]> {
		if (!this._loaded) await this.loadFromFile();

		return this.data.TagColors
			.flatMap((record) => {
				return record.tag_text // read the last line if you are confused why we are looping over the tag_name
					.split(reSplit)
					.map(tag => tag.trim())  // Also trim the tag for leading spaces & map everything to lowercase!
					.filter(Boolean) // filter out empty lines
					.map(tag => remove_slash ? tag.replace(reSLASH, "") : tag)  // replace the "/"
					.map(tag => ({...record, tag: tag}));
			});
	}

	async getTags() : Promise<IColoredTagRecord[]> {
		if (!this._loaded) await this.loadFromFile();
		return this.data.TagColors;
	}

	async updateTag(record:IColoredTagRecord):Promise<void>{
		const index = this.data.TagColors.findIndex((r) => r.id === record.id);
        if (index !== -1) {
          this.data.TagColors[index] = record;
        } else {
          this.data.TagColors.push(record);
        }

		debounce(async () => await this.saveToFile(), 100)
	}
}
