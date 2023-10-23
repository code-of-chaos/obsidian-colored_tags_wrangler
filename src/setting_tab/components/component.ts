// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import ColoredTagWranglerPlugin
	from "../../main";
import {PluginSettingTab, Setting} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettingsTabComponent{
	plugin:ColoredTagWranglerPlugin;
	containerEL:HTMLElement;
	settings_tab:PluginSettingTab;

	create_component():Setting;
}
// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export abstract class SettingsTabComponent implements ISettingsTabComponent{
	plugin:ColoredTagWranglerPlugin;
	containerEL:HTMLElement;
	settings_tab:PluginSettingTab;

	abstract create_component(): Setting;
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	protected constructor(plugin:ColoredTagWranglerPlugin,settings_tab:PluginSettingTab, containerEL:HTMLElement) {
		this.plugin = plugin;
		this.containerEL = containerEL;
		this.settings_tab = settings_tab;
	}
}
