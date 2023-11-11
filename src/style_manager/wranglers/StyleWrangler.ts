// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {removeById}
	from "src/lib";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB}
	from "obsidian";
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
	get_tags():Array<{tag_name:string, color:RGB, background_color:RGB, luminance_offset:number}>;
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

	get_tags():Array<{tag_name:string, color:RGB, background_color:RGB, luminance_offset:number}>{
		return Object.keys(this.plugin.settings?.TagColors.ColorPicker)
			.map(tagUUID => {
				const {tag_name, color, background_color, luminance_offset} = this.plugin.settings.TagColors.ColorPicker[tagUUID];
				if (this.plugin.settings?.TagColors.EnableMultipleTags) {
					return tag_name.split(";").map(tag => {
						return {tag_name: tag, color, background_color, luminance_offset};
					})
				} else {
					return {tag_name: tag_name, color, background_color, luminance_offset};
				}
			})
			.flat();
	}
}
