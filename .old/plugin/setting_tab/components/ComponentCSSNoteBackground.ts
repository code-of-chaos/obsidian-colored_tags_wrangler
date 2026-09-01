// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentCSSNoteBackground extends SettingsTabComponent{
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Apply Tag color to note background")
			.setDesc("Uses a tag in the note's properties, and applies its color to the workspace background")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.CSS.NoteBackgrounds)
						.onChange(async state => {
							this.plugin.settings.CSS.NoteBackgrounds = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



