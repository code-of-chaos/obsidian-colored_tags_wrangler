// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB, Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
import {hexToRgb} from "../../lib";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsVarColors extends SettingsTabComponent{
	private _NEW_TAG_NAME:string = "new-tag";
	private _NEW_DEFAULT_VAR:string = "--undefined";

	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		let setting = new Setting(containerEL)
			.setName("Custom color tags by CSS var")
			.setDesc(`
				Define custom colors for tags by assigning a CSS var. 
				Make sure this var is defined in the Theme or loose snippets.
				Don't add the '#' before the tag, and write everything in lowercase without spaces.
				This is sanitized in code as well, resulting in the tag being edited when you reload this setting tab.
			`)
			.addButton((button) =>
				button
					.setButtonText("Add new tag")
					.onClick(async () => {
						this.plugin.settings.TagVarColors[this._NEW_TAG_NAME] = this._NEW_DEFAULT_VAR; // Default color
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
					.setClass("mod-cta")
			);

		// Only when Debug settings are on, allow the "Clear all" button to appear
		if(this.plugin.settings.enableDebugSettings){
			setting.addButton((button) =>
				button
					.setButtonText('Clear all')
					.onClick(async () => {
							Object.keys(this.plugin.settings.TagVarColors)
								.forEach((key_name) => delete this.plugin.settings.TagVarColors[key_name]);
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display()
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(Object.keys(this.plugin.settings.TagVarColors).length == 0)
			);
		}


		// Create the amount of tags already stored in the setting_tab
		for (const tagName in this.plugin.settings.TagVarColors) {
			if (!this.plugin.settings.TagVarColors.hasOwnProperty(tagName)) {
				continue;
			}
			this._createTagColorSetting(tagName, this.plugin.settings.TagVarColors[tagName], containerEL);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagName: string, css_var: string, containerEL:HTMLElement) {
		let new_tag_name = tagName; // Initialize newTagName with the existing tag name
		let new_css_var = css_var; // Initialize newColor with the existing color

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
						delete this.plugin.settings.TagVarColors[new_tag_name];

						// Add the updated tag and color
						this.plugin.settings.TagVarColors[value] = new_css_var;
						await this.plugin.saveSettings();

						// Handle user-defined tag name changes here
						new_tag_name = value; // Update newTagName as the user changes the tag name

					})
			).addText((text_css_var) =>
				text_css_var
					.setPlaceholder(this._NEW_DEFAULT_VAR)
					.setValue(css_var)
					.onChange(async (value) => {
						// Cleanup the value
						value = value
							.replace(" ", "-")
							.startsWith("--") ? value : `--${value}`
							.toLowerCase();

						// Add the updated tag and color
						this.plugin.settings.TagVarColors[new_tag_name] = value;
						await this.plugin.saveSettings();

						new_css_var = value

					})
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagVarColors[tagName];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}
