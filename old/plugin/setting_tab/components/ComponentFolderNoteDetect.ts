// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "old/plugin/setting_tab/SettingsTabComponent";
import {detect_all_links} from "old/api/FolderNoteLogic"
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNoteDetect extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Detect tags in folder notes")
			.setDesc(`Traverses your vault and stores all tags found in notes with the same name as the folder they are found in.`)
			.addButton((button) =>
				button
				.setButtonText('Detect Manually')
				.onClick(async () => {
					// Reset the table and then detect
					this.plugin.settings.FolderNote.FolderTagLinks = []

					const found_folder_tags = await detect_all_links(this.plugin);
					this.plugin.settings.FolderNote.FolderTagLinks = found_folder_tags
						.sort((a, b) => a.folder_path.localeCompare(b.folder_path))
					;

					await Promise.all([
						this.plugin.saveSettings(),
						this.settings_tab.display()  // Yes, because this setting adds to the list of FolderNotes
					]);
				})
				.setClass('mod-warning')
		);
	}
}



