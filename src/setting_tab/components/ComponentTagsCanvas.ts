// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsCanvas extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Apply tag color to canvas card")
			.setDesc(`
			Applies the tag color, of the tag within the canvas's card, to the background color of the canvas card.
			The Value slider and setter to the right, are the luminance offsets for the background.
			`)
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.Canvas.Enable)
						.onChange(async state => {
							this.plugin.settings.Canvas.Enable = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			)
	}
}



