// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsEnableBackgroundOpacity extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		let setting = new Setting(containerEL)
			.setName("Enable background opacity")
			.setDesc(`
				Makes the backgrounds of any tags, Canvas cards, etc... slightly opaque.
				Recreates a pre 0.12.0 state.
			`)
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.TagColors.EnableBackgroundOpacity)
						.onChange(async state => {
							this.plugin.settings.TagColors.EnableBackgroundOpacity = state;
							await this.plugin.saveSettings();
							await this.settings_tab.display();
						})
				}
			)

		if (this.plugin.settings.TagColors.EnableBackgroundOpacity){
			setting.addText((text) => {
				text
					.setPlaceholder(this.plugin.settings.TagColors.Values.BackgroundOpacity.toString())
					.setValue(this.plugin.settings.TagColors.Values.BackgroundOpacity.toString())
					.onChange(async state => {
						// Because this is a text component it needs to be cast to a number
						let state_as_number = Number(state)
						if (isNaN(state_as_number) || state_as_number === null){
							state_as_number = 0
						}

						this.plugin.settings.TagColors.Values.BackgroundOpacity = state_as_number;
						await this.plugin.saveSettings();
					});
			});
		}
	}
}



