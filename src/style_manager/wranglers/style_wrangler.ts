// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {remove_by_id}
	from "src/lib";
import ColoredTagWranglerPlugin
	from "src/main";
import {normalizePath, Vault}
	from "obsidian";
import * as fs
	from "fs";
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

		this.styleEL.innerText = this.assemble_css();
		document.head.appendChild(this.styleEL);
	};

	remove_styles(): void{
		this.styleEL?.parentNode?.removeChild(this.styleEL);
		remove_by_id(this.id)
	};
}
