// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNoteAutoDetect extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable auto detection")
			.setDesc("Auto detects changes in a file's property's tags and updates the file viewer.")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.FolderNote.EnableAutoDetect)
						.onChange(async state => {
							this.plugin.settings.FolderNote.EnableAutoDetect = state;
							await this.plugin.saveSettings();
						})
				}
			)
	}
}



