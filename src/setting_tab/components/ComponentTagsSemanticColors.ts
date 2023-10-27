// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
import {ObsidianSemanticColors}
	from "src/lib/ObsidianSemanticColors";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsSemanticColors extends SettingsTabComponent{
	private _NEW_TAG_NAME:string = "new-semantic-tag";
	private _NEW_DEFAULT_COLOR:string = ObsidianSemanticColors.text_accent.valueOf();

	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		let setting = new Setting(containerEL)
			.setName("Color tags by Obsidian semantic")
			.setDesc(`
				Define custom colors for tags.
			`)
			.addButton((button) =>
				button
					.setButtonText("Add new tag")
					.onClick(async () => {
						this.plugin.settings.TagColors.SemanticObsidianColors[this._NEW_TAG_NAME] = this._NEW_DEFAULT_COLOR; // Default color
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
							Object.keys(this.plugin.settings.TagColors.SemanticObsidianColors)
								.forEach((key_name) => delete this.plugin.settings.TagColors.SemanticObsidianColors[key_name]);
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display()
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(Object.keys(this.plugin.settings.TagColors.SemanticObsidianColors).length == 0)
			);
		}


		// Create the amount of tags already stored in the setting_tab
		for (const tagName in this.plugin.settings.TagColors.SemanticObsidianColors) {
			if (!this.plugin.settings.TagColors.SemanticObsidianColors.hasOwnProperty(tagName)) {
				continue;
			}
			this._createTagColorSetting(tagName, this.plugin.settings.TagColors.SemanticObsidianColors[tagName],containerEL);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagName: string, css_var: string, containerEL:HTMLElement) {
		let new_tag_name = tagName; // Initialize newTagName with the existing tag name
		let new_css_var = css_var; // Initialize newColor with the existing color

		console.warn(this.plugin.settings.TagColors.SemanticObsidianColors);

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
						delete this.plugin.settings.TagColors.SemanticObsidianColors[new_tag_name];

						// Add the updated tag and color
						this.plugin.settings.TagColors.SemanticObsidianColors[value] = new_css_var;
						await this.plugin.saveSettings();

						// Handle user-defined tag name changes here
						new_tag_name = value; // Update newTagName as the user changes the tag name

					})
			).addDropdown(
				(component)=> {
					component
						.addOptions(ObsidianSemanticColors)
						.setValue(new_css_var) // Make sure new_css_var corresponds to a key in ObsidianSemanticColors
						.onChange(async value => {
							new_css_var = value;
							this.plugin.settings.TagColors.SemanticObsidianColors[new_tag_name] = new_css_var.valueOf();
							await Promise.all([
								this.plugin.saveSettings()
							]);
						});
				}
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagColors.SemanticObsidianColors[tagName];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}



