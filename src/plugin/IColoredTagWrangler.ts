// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App} from "obsidian";
import {IColoredTagWranglerSettings} from "src/plugin/settings/DefaultSettings";
import {StyleManager} from "src/plugin/style_manager";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWrangler {
    settings: IColoredTagWranglerSettings;
    style_manager: StyleManager;
    app: App;

    saveSettings(): Promise<void>;
}