// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent} from "src/setting_tab/components/component";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentKanbanLists extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin,settings_tab:PluginSettingTab, containerEL:HTMLElement) {
		super(plugin,settings_tab,containerEL);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(): Setting {
		return new Setting(this.containerEL)
			.setName("Apply tag color to kanban list")
			.setDesc("Applies the tag color, of the tag within the list's title, to the background color of the list")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.enableKanbanLists)
						.onChange(async state => {
							this.plugin.settings.enableKanbanLists = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



