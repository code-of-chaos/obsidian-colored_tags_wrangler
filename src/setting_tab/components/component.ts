// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import ColoredTagWranglerPlugin
	from "src/main";
import {PluginSettingTab, Setting} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettingsTabComponent{
	plugin:ColoredTagWranglerPlugin;
	settings_tab:PluginSettingTab;

	create_component(containerEL:HTMLElement):Setting;
}
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class SettingsTabComponent implements ISettingsTabComponent{
	plugin:ColoredTagWranglerPlugin;
	settings_tab:PluginSettingTab;

	abstract create_component(containerEL:HTMLElement): Setting;
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	public constructor(plugin:ColoredTagWranglerPlugin,settings_tab:PluginSettingTab) {
		this.plugin = plugin;
		this.settings_tab = settings_tab;
	}
}
