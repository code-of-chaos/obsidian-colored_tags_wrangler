// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
import {arrayMove} from "../../../api/ArrayUtils";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentFolderNoteFolderTagLinks extends SettingsTabComponent{
	private _NEW_TAG_NAME:string = "undefined-tag";
	private _NEW_FOLDER_PATH:string = "undefined-path";
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		let setting = new Setting(containerEL)
			.setName("Top Level Folder ")
			.setDesc(`Define custom colors for tags.`)
			.addButton((button) =>
				button
					.setButtonText("Add new link")
					.onClick(async () => {
						this.plugin.settings.FolderNote.FolderTagLinks.push({folder_path: this._NEW_FOLDER_PATH, tag_name: this._NEW_TAG_NAME,});
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()  // Yes, because this adds more elements to the list
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
							this.plugin.settings.FolderNote.FolderTagLinks=[];
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display() // Yes, because this removes elements from the list
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(this.plugin.settings.FolderNote.FolderTagLinks.length == 0)
			);
		}


		// Create the amount of tags already stored in the setting_tab
		for (let i = 0; i < this.plugin.settings.FolderNote.FolderTagLinks.length; i++) {
			this._createFolderTagLinks(i, this.plugin.settings.FolderNote.FolderTagLinks[i], containerEL);
		}
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createFolderTagLinks(link_id: number, link_content: {tag_name:string, folder_path:string}, containerEL:HTMLElement) {
		let new_link_id = link_id;
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
						this.plugin.settings.FolderNote.FolderTagLinks[new_link_id] = new_link_content;
						await this.plugin.saveSettings();

					})
			)

			.addExtraButton((cb) => {
				cb.setIcon("up-chevron-glyph")
					.setTooltip("Move up")
					.onClick(async () => {
						// reorder stuff here!!!
						arrayMove(this.plugin.settings.FolderNote.FolderTagLinks, new_link_id, new_link_id-1)
						await this.plugin.saveSettings();
						this.settings_tab.display()  // Yes, because this alters the list
					});
			})
			.addExtraButton((cb) => {
				cb.setIcon("down-chevron-glyph")
					.setTooltip("Move down")
					.onClick(async () => {
						// reorder stuff here!!!
						arrayMove(this.plugin.settings.FolderNote.FolderTagLinks, new_link_id, new_link_id+1)
						await this.plugin.saveSettings();
						this.settings_tab.display() // Yes, because this alters the list
					});
			})

			.addExtraButton((cb) =>
				cb.setIcon("trash")
					.setTooltip("Delete")
					.onClick(async () => {
						// Remove the tag and color
						this.plugin.settings.FolderNote.FolderTagLinks.splice(new_link_id, 1);
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display() // Yes, because this alters the list
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}



