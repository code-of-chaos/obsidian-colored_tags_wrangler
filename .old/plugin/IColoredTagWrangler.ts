// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, Plugin} from "obsidian";
import {ISettings} from "./settings/ISettings";
import {StyleManager} from "./style_manager";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWrangler extends Plugin {
	settings: ISettings;
	style_manager: StyleManager;
	app: App;

	saveSettings(): Promise<void>;

	loadSettings(): Promise<void>;
}
