// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
import {v4 as uuid4}
	from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsVarColors extends SettingsTabComponent{
	private _NEW_TAG_NAME:string = "new-css-var-tag";
	private _NEW_DEFAULT_COLOR:string = "--undefined-color";
	private _NEW_DEFAULT_BACKGROUND:string = "--undefined-background";

	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		let setting = new Setting(containerEL)
			.setName("Custom color tags by CSS var")
			.setDesc(`
				Define custom colors for tags by assigning a CSS var. 
				Make sure this var is defined in the Theme or loose snippets.
			`)
			.addButton((button) =>
				button
					.setButtonText("Add new tag")
					.onClick(async () => {
						this.plugin.settings.TagColors.CssVars[uuid4()] = {
							tag_name:this._NEW_TAG_NAME,
							color:this._NEW_DEFAULT_COLOR,
							background:this._NEW_DEFAULT_BACKGROUND
						}; // Default color
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
							Object.keys(this.plugin.settings.TagColors.CssVars)
								.forEach((key_name) => delete this.plugin.settings.TagColors.CssVars[key_name]);
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display()
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(Object.keys(this.plugin.settings.TagColors.CssVars).length == 0)
			);
		}


		// Create the amount of tags already stored in the setting_tab
		for (const tagUUID in this.plugin.settings.TagColors.CssVars) {
			if (!this.plugin.settings.TagColors.CssVars.hasOwnProperty(tagUUID)) {
				continue;
			}
			this._createTagColorSetting(
				tagUUID,
				this.plugin.settings.TagColors.CssVars[tagUUID],
				containerEL
			);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagUUID: string, tag_content:{tag_name:string,color:string,background:string}, containerEL:HTMLElement) {
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

						new_tag_content.tag_name = value
						this.plugin.settings.TagColors.CssVars[tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			).addText((text_css_var_color) =>
				text_css_var_color
					.setPlaceholder(this._NEW_DEFAULT_COLOR)
					.setValue(new_tag_content.color)
					.onChange(async (value) => {
						// Cleanup the value
						value = value
							.replace(" ", "-")
							.startsWith("--") ? value : `--${value}`
							.toLowerCase();

						// Add the updated tag and color
						new_tag_content.color = value
						this.plugin.settings.TagColors.CssVars[tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			).addText((text_css_var_background) =>
				text_css_var_background
					.setPlaceholder(this._NEW_DEFAULT_BACKGROUND)
					.setValue(new_tag_content.background)
					.onChange(async (value) => {
						// Cleanup the value
						value = value
							.replace(" ", "-")
							.startsWith("--") ? value : `--${value}`
							.toLowerCase();

						// Add the updated tag and background
						new_tag_content.background = value
						this.plugin.settings.TagColors.CssVars[tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagColors.CssVars[tag_id];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}
