// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsEnableSeparateBackground extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable separate background color")
			.setDesc("Allows you to specify a different background color for each tag.")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.TagColors.EnableSeparateBackground)
						.onChange(async state => {
							this.plugin.settings.TagColors.EnableSeparateBackground = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			)
	}
}



