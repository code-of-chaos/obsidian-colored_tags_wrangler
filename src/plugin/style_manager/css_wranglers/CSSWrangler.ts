// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import ColoredTagWranglerPlugin from "src/main";
import {IStyleWrangler, SettingValues, StyleWrangler} from "../StyleWrangler";


// ---------------------------------------------------------------------------------------------------------------------
// Interface & Support code
// ---------------------------------------------------------------------------------------------------------------------
export interface ICSSWrangler extends IStyleWrangler{
	assembleCss(theme:string):Array<string>;
	getCssStyling(): string[];
}

const rxCssComment = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
const lineCleanup = (line: string) =>
	line.split("\n")
		.map(l => l.replace(rxCssComment, '').trim())  // Remove CSS comments
		.join(" ");

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class CSSWrangler extends StyleWrangler implements ICSSWrangler{
	abstract assembleCss(theme:string): Array<string>;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(plugin:ColoredTagWranglerPlugin, settingLocation:SettingValues) {
		super(plugin, settingLocation);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	getCssStyling(): string[]{
		// first remove the old style element, else we will keep appending data to the dom
		return [
			this.assembleCss("body.theme-light").map(lineCleanup).join(" "),
			this.assembleCss("body.theme-dark" ).map(lineCleanup).join(" ")
		]
	};
}
