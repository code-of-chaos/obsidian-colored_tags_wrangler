// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentKanban extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable Kanban integration")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.Kanban.Enable)
						.onChange(async state => {
							this.plugin.settings.Kanban.Enable = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();  // Yes, because this displays more settings when enabled
						})
				}
			);
	}
}



