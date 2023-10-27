// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentKanbanLists extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Apply tag color to kanban list")
			.setDesc(`
				Applies the tag color, of the tag within the list's title, to the background color of the list. 
				Known issue: When a list has multiple tags, the color of the list is randomly chosen.
			`).addToggle(component => {
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



