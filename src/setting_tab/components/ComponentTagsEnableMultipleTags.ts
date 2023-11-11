// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsEnableMultipleTags extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Enable multiple tags per line")
			.setDesc("Allows the usage of `;` to bind multiple tags to one color. (Currently only works with the Color picker).")
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



