// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent}
	from "src/setting_tab/components/component";
import {ObsidianSemanticColors}
	from "src/lib/obsidian_semantic_colors";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsSemanticColors extends SettingsTabComponent{
	private _NEW_TAG_NAME:string = "new-tag";
	private _NEW_DEFAULT_COLOR:string = ObsidianSemanticColors.text_accent;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin,settings_tab:PluginSettingTab, containerEL:HTMLElement) {
		super(plugin,settings_tab,containerEL);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(): Setting {
		let setting = new Setting(this.containerEL)
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
						this.plugin.settings.TagSemanticColors[this._NEW_TAG_NAME] = this._NEW_DEFAULT_COLOR; // Default color
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
							Object.keys(this.plugin.settings.TagSemanticColors)
								.forEach((key_name) => delete this.plugin.settings.TagSemanticColors[key_name]);
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display()
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(Object.keys(this.plugin.settings.TagSemanticColors).length == 0)
			);
		}


		// Create the amount of tags already stored in the setting_tab
		for (const tagName in this.plugin.settings.TagSemanticColors) {
			if (!this.plugin.settings.TagSemanticColors.hasOwnProperty(tagName)) {
				continue;
			}
			this._createTagColorSetting(tagName, this.plugin.settings.TagSemanticColors[tagName]);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagName: string, css_var: string) {
		let {containerEL} = this;
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
						delete this.plugin.settings.TagSemanticColors[new_tag_name];

						// Add the updated tag and color
						this.plugin.settings.TagSemanticColors[value] = new_css_var;
						await this.plugin.saveSettings();

						// Handle user-defined tag name changes here
						new_tag_name = value; // Update newTagName as the user changes the tag name

					})
			).addDropdown(
				(component)=> {
					component
						.setValue(new_css_var)
						.addOptions(ObsidianSemanticColors)
						.onChange(value => this.plugin.settings.TagSemanticColors[new_tag_name] = value)
				}
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagSemanticColors[tagName];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		this.containerEL.appendChild(setting.settingEl);
	}
}



