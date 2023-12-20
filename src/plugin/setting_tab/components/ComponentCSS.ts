// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentCSS extends SettingsTabComponent{
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable extra CSS options")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.CSS.Enable)
						.onChange(async state => {
							this.plugin.settings.CSS.Enable = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			);
	}
}



