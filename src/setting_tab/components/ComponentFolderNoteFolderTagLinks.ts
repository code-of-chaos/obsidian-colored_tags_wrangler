// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB, Setting}
	from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
import {v4 as uuid4} from "uuid";
import {hexToRgb} from "../../lib";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNoteFolderTagLinks extends SettingsTabComponent{
	private _NEW_TAG_NAME:string = "undefined-tag";
	private _NEW_FOLDER_PATH:string = "undefined-path";
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		let setting = new Setting(containerEL)
			.setName("Top Level Folder ")
			.setDesc(`Define custom colors for tags.`)
			.addButton((button) =>
				button
					.setButtonText("Add new link")
					.onClick(async () => {
						this.plugin.settings.FolderNote.FolderTagLinks[uuid4()] = {folder_path: this._NEW_FOLDER_PATH, tag_name: this._NEW_TAG_NAME,};
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
					.setClass("mod-cta")
			);

		// Only when Debug settings are on, allow the "Clear all" button to appear
		if(this.plugin.settings.Debug.Enable){
			setting.addButton((button) =>
				button
					.setButtonText('Clear all')
					.onClick(async () => {
							Object.keys(this.plugin.settings.FolderNote.FolderTagLinks)
								.forEach((key_name) => delete this.plugin.settings.FolderNote.FolderTagLinks[key_name]);
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display()
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(Object.keys(this.plugin.settings.FolderNote.FolderTagLinks).length == 0)
			);
		}


		// Create the amount of tags already stored in the setting_tab
		for (const linkUUID in this.plugin.settings.FolderNote.FolderTagLinks) {
			if (!this.plugin.settings.FolderNote.FolderTagLinks.hasOwnProperty(linkUUID)) {
				continue;
			}
			this._createFolderTagLinks(linkUUID, this.plugin.settings.FolderNote.FolderTagLinks[linkUUID], containerEL);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createFolderTagLinks(linkUUID: string, link_content: {tag_name:string, folder_path:string}, containerEL:HTMLElement) {
		let link_id = linkUUID;
		let new_link_content = link_content;

		const setting = new Setting(containerEL)
			.addText((text) =>
				text
					.setPlaceholder(this._NEW_TAG_NAME)
					.setValue(new_link_content.tag_name)
					.onChange(async (value) => {
						// Add the updated tag and color
						new_link_content.tag_name = value
							.replace("#","")
							.toLowerCase()
							.trim()
						;
						this.plugin.settings.FolderNote.FolderTagLinks[link_id] = new_link_content;
						await this.plugin.saveSettings();

					})
			)
			.addText((text) =>
				text
					.setPlaceholder(this._NEW_FOLDER_PATH)
					.setValue(new_link_content.folder_path)
					.onChange(async (value) => {
						// Cleanup the value

						// Add the updated tag and color
						new_link_content.folder_path = value
						this.plugin.settings.FolderNote.FolderTagLinks[link_id] = new_link_content;
						await this.plugin.saveSettings();

					})
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.FolderNote.FolderTagLinks[link_id];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}



