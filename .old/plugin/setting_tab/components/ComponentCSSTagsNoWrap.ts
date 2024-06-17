// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from ".old/plugin/setting_tab/SettingsTabComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentCSSTagsNoWrap extends SettingsTabComponent {
	public create_component(containerEL: HTMLElement): void {
		let setting = new Setting(containerEL)
			.setName("Enable 'No text Wrapping' for tags")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.CSS.TagsNoWrap)
						.onChange(async state => {
							this.plugin.settings.CSS.TagsNoWrap = state;
							await this.plugin.saveSettings();
						})
				}
			);

		if (this.plugin.settings.Debug.Enable) {
			setting
				.setDesc(`
					You can specify which value to use for the CSS property 'white-space'. 
					Intended uses are 'pre' or 'nowrap'.
				`)
				.addDropdown(component => {
					component
						.addOption('pre', 'pre')
						.addOption('nowrap', 'nowrap')
						.setValue(this.plugin.settings.CSS.TagsNoWrapText)
						.onChange(async (value) => {
							this.plugin.settings.CSS.TagsNoWrapText = value;
							await this.plugin.saveSettings();
						});
				})
		}

	}
}



