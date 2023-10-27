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
	private _NEW_TAG_NAME:string = "new-css-var-tag";
	private _NEW_DEFAULT_COLOR:string = "--undefined-color";
	private _NEW_DEFAULT_BACKGROUND:string = "--undefined-background-color";

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
						this.plugin.settings.TagColors.CssVars[this._NEW_TAG_NAME] = {
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
		for (const tagName in this.plugin.settings.TagColors.CssVars) {
			if (!this.plugin.settings.TagColors.CssVars.hasOwnProperty(tagName)) {
				continue;
			}
			this._createTagColorSetting(
				tagName,
				this.plugin.settings.TagColors.CssVars[tagName].color,
				this.plugin.settings.TagColors.CssVars[tagName].background,
				containerEL
			);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagName: string, css_var_color: string, css_var_background:string, containerEL:HTMLElement) {
		let new_tag_name = tagName; // Initialize newTagName with the existing tag name
		let new_css_var_color = css_var_color; // Initialize newColor with the existing color
		let new_css_var_background = css_var_background; // Initialize newColor with the existing color

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
						delete this.plugin.settings.TagColors.CssVars[new_tag_name];

						// Add the updated tag and color
						this.plugin.settings.TagColors.CssVars[value] = {color:new_css_var_color, background:new_css_var_background};
						await this.plugin.saveSettings();

						// Handle user-defined tag name changes here
						new_tag_name = value; // Update newTagName as the user changes the tag name

					})
			).addText((text_css_var_color) =>
				text_css_var_color
					.setPlaceholder(this._NEW_DEFAULT_COLOR)
					.setValue(css_var_color)
					.onChange(async (value) => {
						// Cleanup the value
						value = value
							.replace(" ", "-")
							.startsWith("--") ? value : `--${value}`
							.toLowerCase();

						// Add the updated tag and color
						this.plugin.settings.TagColors.CssVars[value] = {color:value, background:new_css_var_background};
						await this.plugin.saveSettings();

						new_css_var_color = value

					})
			).addText((text_css_var_background) =>
				text_css_var_background
					.setPlaceholder(this._NEW_DEFAULT_BACKGROUND)
					.setValue(css_var_background)
					.onChange(async (value) => {
						// Cleanup the value
						value = value
							.replace(" ", "-")
							.startsWith("--") ? value : `--${value}`
							.toLowerCase();

						// Add the updated tag and background
						this.plugin.settings.TagColors.CssVars[value] = {color:new_css_var_color, background:value};
						await this.plugin.saveSettings();

						new_css_var_background = value

					})
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagColors.CssVars[tagName];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}
