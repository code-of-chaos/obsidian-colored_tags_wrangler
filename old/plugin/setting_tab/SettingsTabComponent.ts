// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import ColoredTagWranglerPlugin from "old/main";
import {PluginSettingTab,} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettingsTabComponent{
	plugin:ColoredTagWranglerPlugin;
	settings_tab:PluginSettingTab;

	create_component(containerEL:HTMLElement):void;
}
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class SettingsTabComponent implements ISettingsTabComponent{
	plugin:ColoredTagWranglerPlugin;
	settings_tab:PluginSettingTab;

	abstract create_component(containerEL:HTMLElement): void;
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	public constructor(plugin:ColoredTagWranglerPlugin,settings_tab:PluginSettingTab) {
		this.plugin = plugin;
		this.settings_tab = settings_tab;
	}
}
