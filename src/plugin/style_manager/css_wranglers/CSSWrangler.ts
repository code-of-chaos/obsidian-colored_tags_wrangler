// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import ColoredTagWranglerPlugin from "src/main";
import {removeById} from "src/api/RemoveById";
import {IStyleWrangler, SettingValues, StyleWrangler} from "../StyleWrangler";


// ---------------------------------------------------------------------------------------------------------------------
// Interface & Support code
// ---------------------------------------------------------------------------------------------------------------------
export interface ICSSWrangler extends IStyleWrangler{
	id:string;
	styleEL_light:HTMLStyleElement;
	styleEL_dark:HTMLStyleElement;

	assembleCss(theme:string):Array<string>;
	applyStyles(): string[];
}
const lineCleanup = (line:string) =>  line.split("\n").map(l=>l.trim()).join(" ")

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class CSSWrangler extends StyleWrangler implements ICSSWrangler{
	id: string;
	styleEL_light: HTMLStyleElement;
	styleEL_dark: HTMLStyleElement;

	abstract assembleCss(theme:string): Array<string>;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(id:string, plugin:ColoredTagWranglerPlugin, settingLocation:SettingValues) {
		super(plugin, settingLocation);

		this.id = !id.startsWith("#")
			? `#${id}`
			: id;

		this.styleEL_light = document.createElement('style');
		this.styleEL_dark = document.createElement('style');
		this.styleEL_light.id = `${this.id}_light`;
		this.styleEL_dark.id = `${this.id}_dark`;
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	applyStyles(): string[]{
		// first remove the old style element, else we will keep appending data to the dom
		return [
			this.assembleCss("body.theme-light").map(lineCleanup).join(" "),
			this.assembleCss("body.theme-dark").map(lineCleanup).join(" ")
		]
	};
}
