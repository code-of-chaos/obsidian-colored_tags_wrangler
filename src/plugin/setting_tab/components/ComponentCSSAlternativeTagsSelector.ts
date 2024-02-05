// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentCSSAlternativeTagsSelector extends SettingsTabComponent{
	public create_component(containerEL:HTMLElement): void {
		let setting = new Setting(containerEL)
			.setName("Use alternative selector for tags")
			.setDesc(
				"Uses JQuery to apply color to tags. " +
				"This should resolve issues when using special characters as tags, like Chinese characters" +
				"WARNING: This feature is highly unstable and still in testing phase"
			)
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.CSS.AlternativeTagsSelector)
						.onChange(async state => {
							this.plugin.settings.CSS.AlternativeTagsSelector = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



