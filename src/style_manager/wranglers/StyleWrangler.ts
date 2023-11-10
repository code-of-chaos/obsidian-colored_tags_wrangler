// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {removeById} from "src/lib";
import ColoredTagWranglerPlugin from "src/main";
import {RGB} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IStyleWrangler{
	id:string;
	styleEL:HTMLStyleElement;
	plugin:ColoredTagWranglerPlugin;

	assemble_css():string;
	apply_styles(): void;
	remove_styles(): void;
	get_tags():Array<{tag_name:string, color:RGB, background_color:RGB, background_opacity:number}>;
}
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class StyleWrangler implements IStyleWrangler{
	id: string;
	styleEL: HTMLStyleElement;
	plugin:ColoredTagWranglerPlugin;

	abstract assemble_css(): string;
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(id:string, plugin:ColoredTagWranglerPlugin) {
		!id.startsWith("#") ? id = `#${id}` : null;

		this.id = id;
		this.plugin = plugin;

		this.styleEL = document.createElement('style');
		this.styleEL.id = this.id;
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	apply_styles(): void{
		// first remove the old style element, else we will keep appending data to the dom
		this.remove_styles();

		this.styleEL.innerText = this.assemble_css().split("\n").map(line => line.trim()).join("");
		document.head.appendChild(this.styleEL);
	};

	remove_styles(): void{
		this.styleEL?.parentNode?.removeChild(this.styleEL);
		removeById(this.id);
	};

	get_tags():Array<{tag_name:string, color:RGB, background_color:RGB, background_opacity:number}>{
		return Object.keys(this.plugin.settings?.TagColors.ColorPicker)
			.map(tagUUID => {
				const {tag_name, color, background_color, background_opacity} = this.plugin.settings.TagColors.ColorPicker[tagUUID];
				if (this.plugin.settings?.TagColors.EnableMultipleTags) {
					return tag_name.split(";").map(tag => {
						return {tag_name: tag, color, background_color, background_opacity};
					})
				} else {
					return {tag_name: tag_name, color, background_color, background_opacity};
				}
			})
			.flat();
	}
}
