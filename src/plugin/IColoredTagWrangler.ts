// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App} from "obsidian";
import {ISettings} from "./settings/ISettings";
import {StyleManager} from "src/plugin/style_manager";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWrangler {
    settings: ISettings;
    style_manager: StyleManager;
    app: App;

    saveSettings(): Promise<void>;
    loadSettings(): Promise<void>;
}