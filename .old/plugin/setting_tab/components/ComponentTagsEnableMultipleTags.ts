// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from ".old/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsEnableMultipleTags extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL: HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable multiple tags per line")
			.setDesc("Allows the usage of `;` or `\\n` (new line) to bind multiple tags to one color.")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.TagColors.EnableMultipleTags)
						.onChange(async state => {
							this.plugin.settings.TagColors.EnableMultipleTags = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			)
	}
}



