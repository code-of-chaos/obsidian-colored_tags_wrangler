// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/components/component";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentDebug extends SettingsTabComponent{
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Enable debug options")
			.setDesc(`
				Allows you to view and use some extra debug option. 
				Don't use these if you don't know what you are doing.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.enableDebugSettings)
						.onChange(async state => {
							this.plugin.settings.enableDebugSettings = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			);
	}
}



