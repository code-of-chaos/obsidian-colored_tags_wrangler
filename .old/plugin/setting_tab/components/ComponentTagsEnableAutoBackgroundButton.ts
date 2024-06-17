// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from ".old/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsEnableAutoBackgroundButton extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable button for Auto Background coloring")
			.setDesc(`
				Adds a small button next to each color picker, allowing users to auto generate an appropriate background color.
				This chosen color isn't always 100%, so please adjust when needed
			`)
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.TagColors.EnableSeparateBackground)
						.onChange(async state => {
							this.plugin.settings.TagColors.EnableSeparateBackground = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			);
	}
}



