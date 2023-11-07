// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNote extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Folder Note's Tags to file viewer")
			.setDesc(`
				Applies the tag color, of the tag within a Folder Note, to the background color of the folder in the file viewer.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.FolderNote.Enable)
						.onChange(async state => {
							this.plugin.settings.FolderNote.Enable = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



