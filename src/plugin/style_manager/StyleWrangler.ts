// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {rgbToString, rgbaToString} from "src/api/ColorConverters";
import {RGB} from "obsidian";
import {get_tags} from "src/api/tags";
import {IColorPicker} from "src/api/interfaces/IColorPicker";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";

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

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class StyleWrangler implements IStyleWrangler{
	plugin:IColoredTagWrangler;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(plugin:IColoredTagWrangler) {
		this.plugin = plugin;
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
		return rgbaToString({...color, a:this.plugin.settings.TagColors.Values.BackgroundOpacity})
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
