// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB, Setting}
	from "obsidian";
import {hexToRgb}
	from "src/lib";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
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
			.setDesc(`
				Define custom colors for tags.
				Don't add the '#' before the tag, and write everything in lowercase without spaces.
				This is sanitized in code as well, resulting in the tag being edited when you reload this setting tab.
			`)
			.addButton((button) =>
				button
					.setButtonText("Add new tag")
					.onClick(async () => {
						this.plugin.settings.TagColors.ColorPicker[this._NEW_TAG_NAME] = this._NEW_DEFAULT_COLOR; // Default color
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
		for (const tagName in this.plugin.settings.TagColors.ColorPicker) {
			if (!this.plugin.settings.TagColors.ColorPicker.hasOwnProperty(tagName)) {
				continue;
			}
			this._createTagColorSetting(tagName, this.plugin.settings.TagColors.ColorPicker[tagName], containerEL);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagName: string, color: RGB, containerEL:HTMLElement) {
		let new_tag_name = tagName; // Initialize newTagName with the existing tag name
		let new_color = color; // Initialize newColor with the existing color

		const setting = new Setting(containerEL)
			.addText((text) =>
				text
					.setPlaceholder(this._NEW_TAG_NAME)
					.setValue(tagName)
					.onChange(async (value) => {
						// Cleanup the value
						value = value.replace("#","");
						value = value.toLowerCase();

						// delete the "old" tag name, before the edit
						delete this.plugin.settings.TagColors.ColorPicker[new_tag_name];

						// Add the updated tag and color
						this.plugin.settings.TagColors.ColorPicker[value] = new_color;
						await this.plugin.saveSettings();

						// Handle user-defined tag name changes here
						new_tag_name = value; // Update newTagName as the user changes the tag name

					})
			).addColorPicker((colorPicker) =>
				colorPicker
					.setValueRgb(color)
					.onChange(async (value) => {
						// Handle user-defined tag colors here
						new_color = hexToRgb(value); // Update newColor as the user changes the color
						// Add the updated tag and color
						this.plugin.settings.TagColors.ColorPicker[new_tag_name] = new_color;
						await this.plugin.saveSettings();

					})
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagColors.ColorPicker[tagName];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}



