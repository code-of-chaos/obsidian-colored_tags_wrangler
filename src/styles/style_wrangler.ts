// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {removeById}
	from "../lib/remove_by_id";
import ColoredTagWranglerPlugin
	from "../main";
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
		removeById(this.id)
	};

	// -----------------------------------------------------------------------------------------------------------------
	// This method is currently unused, and that is by "design" for now.
	//  At some later point in the development of this plugin, this might be useful to make an export to Publish.
	private _writeToCSSFile():void {
		const vault:Vault = this.plugin.app.vault;

		// Write the CSS to a file in the snippets folder
		//      I don't know why `adapter.basePath` is giving an error in my IDE, but it works ... ? why ?
		const cssFilePath:string = normalizePath(
			//      @ts-ignore ( well, now it isn't giving an error anymore sure because it is suppressed,
			//                 but it is still weird...)
			`${vault.adapter.basePath}/${vault.configDir}/snippets/tags-append.css`);

		try {
			fs.writeFileSync(cssFilePath, this.assemble_css());
			console.log('Custom styles file written successfully:', cssFilePath);
		} catch (error) {
			console.error('Error writing custom styles file:', error);
		}
	}


}
