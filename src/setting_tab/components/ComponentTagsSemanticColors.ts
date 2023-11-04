// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB, Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
import {ObsidianSemanticColors}
	from "src/lib/ObsidianSemanticColors";
import {v4 as uuid4}
	from "uuid";
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
						this.plugin.settings.TagColors.SemanticObsidianColors[uuid4()] = {
							tag_name:this._NEW_TAG_NAME,
							obsidian_css_var:this._NEW_DEFAULT_COLOR // Default color
						};
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
		for (const tagUUID in this.plugin.settings.TagColors.SemanticObsidianColors) {
			if (!this.plugin.settings.TagColors.SemanticObsidianColors.hasOwnProperty(tagUUID)) {
				continue;
			}
			this._createTagColorSetting(tagUUID, this.plugin.settings.TagColors.SemanticObsidianColors[tagUUID],containerEL);
		}

		return setting
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _createTagColorSetting(tagUUID: string, tag_content: {tag_name:string, obsidian_css_var:string}, containerEL:HTMLElement) {
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
						this.plugin.settings.TagColors.SemanticObsidianColors[tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			).addDropdown(
				(component)=> {
					component
						.addOptions(ObsidianSemanticColors)
						.setValue(new_tag_content.obsidian_css_var) // Make sure new_css_var corresponds to a key in ObsidianSemanticColors
						.onChange(async value => {
							new_tag_content.obsidian_css_var = value
							this.plugin.settings.TagColors.SemanticObsidianColors[tag_id] = new_tag_content;
							await this.plugin.saveSettings();
						});
				}
			).addButton((button) =>
				button
					.setButtonText('-')
					.onClick(async () => {
						// Remove the tag and color
						delete this.plugin.settings.TagColors.SemanticObsidianColors[tag_id];
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}



