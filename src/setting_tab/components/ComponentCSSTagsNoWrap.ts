// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Notice, Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const INVALID_CHAR = [' ', ';', '}', '{']

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentCSSTagsNoWrap extends SettingsTabComponent{
	public create_component(containerEL:HTMLElement): void {
		let setting = new Setting(containerEL)
			.setName("Enable 'No text Wrapping' for tags")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.CSS.TagsNoWrap)
						.onChange(async state => {
							this.plugin.settings.CSS.TagsNoWrap = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			);

		if(this.plugin.settings.Debug.Enable){
			setting
				.setDesc(`
					You can specify which value to use for the CSS property 'white-space'. 
					Intended uses are 'pre' or 'nowrap'.
				`)
				.addText(component => {
					component
						.setValue(this.plugin.settings.CSS.TagsNoWrapText)
						.onChange(async (value) => {

							if (INVALID_CHAR.some(char => value.includes(char))){
								new Notice(`The inserted value cannot any of the following characters: ${INVALID_CHAR.join(',')}`)
								return
							}

							this.plugin.settings.CSS.TagsNoWrapText = value;
							await this.plugin.saveSettings();
						})
				})
		}

	}
}



