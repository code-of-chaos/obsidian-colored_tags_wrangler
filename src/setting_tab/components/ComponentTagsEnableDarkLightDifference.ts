// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsEnableDarkLightDifference extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Enable different luminance formula for dark & light mode")
			.setDesc(`
				When enabled, applies the luminance offset differently depending on Dark or Light mode.
				Formula stays the same in Dark mode, only applies to Light mode.
			`)
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.TagColors.EnableDarkLightDifference)
						.onChange(async state => {
							this.plugin.settings.TagColors.EnableDarkLightDifference = state;
							await this.plugin.saveSettings();
						})
				}
			)
	}
}



