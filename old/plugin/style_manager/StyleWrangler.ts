// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {rgbToString, rgbaToString} from "../../api/ColorConverters";
import {RGB} from "obsidian";
import {get_tags} from "../../api/tags";
import {IColorPicker} from "../../api/interfaces/IColorPicker";
import {IColoredTagWrangler} from "../IColoredTagWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IStyleWrangler{
	plugin:IColoredTagWrangler;

	getBackgroundString(color:RGB):string;
	getBackgroundWithOpacityString(color:RGB):string;
	getForegroundString(color:RGB):string;

	getImportant():string;
	getTags(remove_slash:boolean):IColorPicker[];
}

// TODO rewrite into something more descriptive for the actual settings to use
//		Not simply for the StyleWrangler alone
export interface SettingValues {
	EnableBackgroundOpacity:boolean,
	Values: {
		BackgroundOpacity: number;
	}
}


// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class StyleWrangler implements IStyleWrangler{
	plugin:IColoredTagWrangler;
	SettingLocation:SettingValues;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(plugin:IColoredTagWrangler, settingLocation:SettingValues) {
		this.plugin = plugin;
		this.SettingLocation = settingLocation;
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	getTags(remove_slash:boolean=true):IColorPicker[]{
		return get_tags(
			this.plugin.settings.TagColors.ColorPicker,
			this.plugin.settings.TagColors.EnableMultipleTags,
			remove_slash
		);
	}

	getBackgroundString(color:RGB):string{
		return rgbToString(color)
	}

	getBackgroundWithOpacityString(color:RGB):string{
		return this.SettingLocation.EnableBackgroundOpacity
			? rgbaToString({...color, a:this.SettingLocation.Values.BackgroundOpacity})
			: this.getBackgroundString(color)
	}

	getForegroundString(color:RGB):string{
		return rgbToString(color)
	}

	getImportant(): string {
		// Not that this setting should be used by users,
		// 		but can be helpful for people who want to debug what is going on
		return this.plugin.settings.FolderNote.Values.ForceImportant
			? "!important"
			: ""
	}
}
