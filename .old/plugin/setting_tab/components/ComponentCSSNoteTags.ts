// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from ".old/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentCSSNoteTags extends SettingsTabComponent {
	public create_component(containerEL: HTMLElement): void {
		new Setting(containerEL)
			.setName("Apply Tag colors in notes")
			.setDesc("Colors the tags in the body of a note. Main setting to disable most usages.")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.CSS.NoteTags)
						.onChange(async state => {
							this.plugin.settings.CSS.NoteTags = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



