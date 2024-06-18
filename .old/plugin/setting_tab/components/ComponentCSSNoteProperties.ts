// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent}
	from ".old/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentCSSNoteProperties extends SettingsTabComponent {
	public create_component(containerEL: HTMLElement): void {
		new Setting(containerEL)
			.setName("Apply Tag color to note's properties 'tags' field")
			.setDesc("Colors the tags in a note's properties.")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.CSS.NoteProperties)
						.onChange(async state => {
							this.plugin.settings.CSS.NoteProperties = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



