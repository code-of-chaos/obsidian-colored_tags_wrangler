// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB, Setting}
	from "obsidian";
import {hexToRgb}
	from "src/lib";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
import {v4 as uuid4}
	from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTags extends SettingsTabComponent{
	private _NEW_TAG_NAME:string = "new-tag";
	private _NEW_DEFAULT_COLOR:RGB = { r: 255, g: 255, b: 255 };

	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		let setting = new Setting(containerEL)
			.setName("Custom color tags")
			.setDesc(`Define custom colors for tags.`)
			.addButton((button) =>
				button
					.setButtonText("Add new tag")
					.onClick(async () => {
						this.plugin.settings.TagColors.ColorPicker[uuid4()] = {tag_name: this._NEW_TAG_NAME, color:this._NEW_DEFAULT_COLOR}; // Default color
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
							Object.keys(this.plugin.settings.TagColors.ColorPicker)
								.forEach((key_name) => delete this.plugin.settings.TagColors.ColorPicker[key_name]);
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display()
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(Object.keys(this.plugin.settings.TagColors.ColorPicker).length == 0)
			);
		}


		// Create the amount of tags already stored in the setting_tab
		for (const tagUUID in this.plugin.settings.TagColors.ColorPicker) {
			if (!this.plugin.settings.TagColors.ColorPicker.hasOwnProperty(tagUUID)) {
				continue;
			}
			this._createTagColorSetting(tagUUID, this.plugin.settings.TagColors.ColorPicker[tagUUID], containerEL);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagUUID: string, tag_content: {tag_name:string, color:RGB}, containerEL:HTMLElement) {
		let tag_id = tagUUID;
		let new_tag_content = tag_content;

		const setting = new Setting(containerEL)
			.addText((text) =>
				text
					.setPlaceholder(this._NEW_TAG_NAME)
					.setValue(new_tag_content.tag_name)
					.onChange(async (value) => {
						// Cleanup the value
						value = value.replace("#","");
						value = value.toLowerCase();

						// Add the updated tag and color
						new_tag_content.tag_name = value
						this.plugin.settings.TagColors.ColorPicker[tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			).addColorPicker((colorPicker) =>
				colorPicker
					.setValueRgb(new_tag_content.color)
					.onChange(async (value) => {
						// Handle user-defined tag colors here
						new_tag_content.color = hexToRgb(value)
						this.plugin.settings.TagColors.ColorPicker[tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagColors.ColorPicker[tag_id];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}



