// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from ".old/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentDebug extends SettingsTabComponent{
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable debug options")
			.setDesc(`
				Allows you to view and use some extra debug option. 
				Don't use these if you don't know what you are doing.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.Debug.Enable)
						.onChange(async state => {
							this.plugin.settings.Debug.Enable = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();  // Yes, because this displays more settings when enabled
						})
				}
			);
	}
}



