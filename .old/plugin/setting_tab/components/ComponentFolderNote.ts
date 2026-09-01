// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNote extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable Folder Note integration")
			.setDesc(`
				Applies the tag color, of the tag within a Folder Note, to the background color of the folder in the file viewer.
				It is recommended that you enable 'Enable Multiple Tags' as well, to easily reuse colors for multiple folders.
				The order of these lines is important, as they influence which CSS is eventually used.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.FolderNote.Enable)
						.onChange(async state => {
							this.plugin.settings.FolderNote.Enable = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();  // Yes, because this displays more settings when enabled
						})
				}
			);
	}
}



