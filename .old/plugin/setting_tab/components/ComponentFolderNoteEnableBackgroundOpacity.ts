// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNoteEnableBackgroundOpacity extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		let setting = new Setting(containerEL)
			.setName("Apply Opacity to Folder Note's background color")
			.setDesc("Allows you define if an item's background should have an opacity offset")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.FolderNote.EnableBackgroundOpacity)
						.onChange(async state => {
							this.plugin.settings.FolderNote.EnableBackgroundOpacity = state;
							await this.plugin.saveSettings();
							await this.settings_tab.display();  // Yes, because this displays more settings when enabled
						})
				}
			)

		if (this.plugin.settings.FolderNote.EnableBackgroundOpacity){
			setting.addText((text) => {
				text
					.setPlaceholder(this.plugin.settings.FolderNote.Values.BackgroundOpacity.toString())
					.setValue(this.plugin.settings.FolderNote.Values.BackgroundOpacity.toString())
					.onChange(async state => {
						// Because this is a text component it needs to be cast to a number
						let state_as_number = Number(state)
						if (isNaN(state_as_number) || state_as_number === null){
							state_as_number = 0
						}

						this.plugin.settings.FolderNote.Values.BackgroundOpacity = state_as_number;
						await this.plugin.saveSettings();
					});
			});
		}
	}
}



