// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {hslToRgb, rgbToHsl} from "src/api/ColorConverters";
import ColoredTagWranglerPlugin from "src/main";
import {RGB} from "obsidian";
import {removeById} from "src/api/RemoveById";
import {IColorPicker} from "src/api/interfaces/IColorPicker";
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IStyleWrangler{
	id:string;
	styleEL_light:HTMLStyleElement;
	styleEL_dark:HTMLStyleElement;
	plugin:ColoredTagWranglerPlugin;

	assemble_css_light():Array<string>;
	assemble_css_dark():Array<string>;
	apply_styles(): void;
	remove_styles(): void;
	get_tags():Array<IColorPicker>;
	get_background_color(background_color:RGB, luminance_offset:number, is_light_theme:boolean):RGB;
	get_background_string(color:RGB):string;
	get_important():string;
}
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class StyleWrangler implements IStyleWrangler{
	id: string;
	styleEL_light: HTMLStyleElement;
	styleEL_dark: HTMLStyleElement;
	plugin:ColoredTagWranglerPlugin;

	abstract assemble_css_light(): Array<string>;
	abstract assemble_css_dark(): Array<string>;
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(id:string, plugin:ColoredTagWranglerPlugin) {
		!id.startsWith("#") ? id = `#${id}` : null;

		this.id = id;
		this.plugin = plugin;

		this.styleEL_light = document.createElement('style');
		this.styleEL_dark = document.createElement('style');
		this.styleEL_light.id = `${this.id}_light`;
		this.styleEL_dark.id = `${this.id}_dark`;
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	apply_styles(): void{
		// first remove the old style element, else we will keep appending data to the dom
		this.remove_styles();

		this.styleEL_light.innerText = this.assemble_css_light().map(line => line.split("\n").map(l=>l.trim()).join(" ")).join(" ");
		this.styleEL_dark.innerText =  this.assemble_css_dark().map(line => line.split("\n").map(l=>l.trim()).join(" ")).join(" ");
		document.head.appendChild(this.styleEL_light);
		document.head.appendChild(this.styleEL_dark);
	};

	remove_styles(): void{
		this.styleEL_light?.parentNode?.removeChild(this.styleEL_light);
		this.styleEL_dark?.parentNode?.removeChild(this.styleEL_dark);
		removeById(this.id);
	};

	get_tags():Array<IColorPicker>{
		return this.plugin.settings?.TagColors.ColorPicker
			.map(tag_color_picker => {
				const {tag_name, color, background_color, luminance_offset} = tag_color_picker;
				if (this.plugin.settings?.TagColors.EnableMultipleTags) {
					return tag_name
						.split(/[\n;]/) // for organization, I added \n
						.filter(tag => tag) // filter out empty lines
						.map(tag => (
							// Also trim the tag for leading spaces after or before a \n? Should fix some common issues.
							{tag_name: tag.trim(), color, background_color, luminance_offset})
						);
				} else {
					return {tag_name: tag_name, color, background_color, luminance_offset};
				}
			})
			.flat();
	}

	get_background_color(background_color:RGB, luminance_offset:number, is_light_theme:boolean):RGB{
		if (is_light_theme && this.plugin.settings.TagColors.EnableDarkLightDifference ){
			luminance_offset = -luminance_offset; // Double negative => +
		}
		let background_hsl = rgbToHsl(background_color);
		background_hsl.l -= luminance_offset;
		return hslToRgb(background_hsl);
	}

	get_background_string(color:RGB):string{
		const rgb:string = this.plugin.settings.TagColors.EnableBackgroundOpacity
			?  "rgba"
			: "rgb";
		const opacity:string = this.plugin.settings.TagColors.EnableBackgroundOpacity
			?  `, ${this.plugin.settings.TagColors.Values.BackgroundOpacity}`
			: "";
		return `${rgb}(${color.r}, ${color.g}, ${color.b}${opacity})`
	}

	get_important(): string {
		// Not that this setting should be used by users,
		// 		but can be helpful for people who want to debug what is going on
		return this.plugin.settings.FolderNote.Values.ForceImportant
			? "!important"
			: ""
	}
}
