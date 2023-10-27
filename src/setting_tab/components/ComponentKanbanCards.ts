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
export class ComponentKanbanCards extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Apply tag color to kanban card")
			.setDesc(`
				Applies the tag color, of the tag within the card, to the background color of the card. 
				Known issue: When a card has multiple tags, the color of the card is randomly chosen.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.enableKanbanCards)
						.onChange(async state => {
							this.plugin.settings.enableKanbanCards = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



