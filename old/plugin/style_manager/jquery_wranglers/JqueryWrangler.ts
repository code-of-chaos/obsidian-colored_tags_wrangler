// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from "old/plugin/IColoredTagWrangler";
import {IStyleWrangler, SettingValues, StyleWrangler} from "../StyleWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IJqueryWrangler extends IStyleWrangler{
	assembleStyling():void;
	removeStyling():void;
}

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class JqueryWrangler extends StyleWrangler implements IJqueryWrangler{
	abstract assembleStyling():void;
	abstract removeStyling(): void;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(plugin:IColoredTagWrangler, settingLocation:SettingValues) {
		super(plugin, settingLocation);
	}
}
