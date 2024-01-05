// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {hslToRgb, rgbToHsl, rgbToString} from "src/api/ColorConverters";
import {RGB} from "obsidian";
import {get_tags} from "../../api/tags";
import {IColorPicker} from "../../api/interfaces/IColorPicker";
import {IColoredTagWrangler} from "../IColoredTagWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IStyleWrangler{
	plugin:IColoredTagWrangler;

	getBackgroundColor(background_color:RGB, luminance_offset:number, is_light_theme:boolean):RGB;
	getBackgroundString(color:RGB):string;
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
	getTags(remove_slash:boolean=false):IColorPicker[]{
		return get_tags(
			this.plugin.settings.TagColors.ColorPicker,
			this.plugin.settings.TagColors.EnableMultipleTags,
			remove_slash
		);
	}

	getBackgroundColor(background_color:RGB, luminance_offset:number, is_light_theme:boolean):RGB{
		if (is_light_theme && this.plugin.settings.TagColors.EnableDarkLightDifference ){
			luminance_offset = -luminance_offset; // Double negative => +
		}
		let background_hsl = rgbToHsl(background_color);
		background_hsl.l -= luminance_offset;
		return hslToRgb(background_hsl);
	}

	getBackgroundString(color:RGB):string{
		const rgb:string = this.plugin.settings.TagColors.EnableBackgroundOpacity
			?  "rgba"
			: "rgb";
		const opacity:string = this.plugin.settings.TagColors.EnableBackgroundOpacity
			?  `, ${this.plugin.settings.TagColors.Values.BackgroundOpacity}`
			: "";
		return `${rgb}(${color.r}, ${color.g}, ${color.b}${opacity})`
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
