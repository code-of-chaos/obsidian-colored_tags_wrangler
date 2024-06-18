// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from ".old/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentDebugExperimentalCommands extends SettingsTabComponent {
	public create_component(containerEL: HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable experimental commands")
			.setDesc(`
				Allows you utilize experimental commands. Most of these are only available in the Desktop App.
				These commands are clearly defined by "EXPERIMENTAL" and should be used with extreme caution.
				Restart Obsidian after enabling and use at your own risk!
			`).addToggle(component => {
				component
					.setValue(this.plugin.settings.Debug.EnableExperimentalCommands)
					.onChange(async state => {
						this.plugin.settings.Debug.EnableExperimentalCommands = state;
						await this.plugin.saveSettings();
					})
			}
		);
	}
}



