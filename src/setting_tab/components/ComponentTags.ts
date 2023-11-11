// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	RGB,
	Setting, SliderComponent, TextAreaComponent,
	TextComponent
} from "obsidian";
import {hexToRgb, hslToRgb, rgbToHsl}
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
	private _NEW_DEFAULT_BACKGROUND_COLOR:RGB = { r: 255, g: 255, b: 255 };

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
						this.plugin.settings.TagColors.ColorPicker[uuid4()] = {
							tag_name: this._NEW_TAG_NAME,
							color: this._NEW_DEFAULT_COLOR, // Default color
							background_color: this._NEW_DEFAULT_BACKGROUND_COLOR, // Default color
							luminance_offset: this.plugin.settings.TagColors.Values.LuminanceOffset,
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
	private _text_callback(text:TextComponent|TextAreaComponent, tag_id:string, new_tag_content:{tag_name:string, color:RGB, background_color:RGB, luminance_offset:number}) {
		return text
			.setPlaceholder(this._NEW_TAG_NAME)
			.setValue(new_tag_content.tag_name)
			.onChange(async (value) => {
				// Add the updated tag and color
				new_tag_content.tag_name = value
					.replace("#", "")
					.toLowerCase()
					.trim()
				;
				this.plugin.settings.TagColors.ColorPicker[tag_id] = new_tag_content;
				await this.plugin.saveSettings();
			});
	}
	private _createTagColorSetting(tagUUID: string, tag_content: {tag_name:string, color:RGB, background_color:RGB, luminance_offset:number}, containerEL:HTMLElement) {
		let tag_id = tagUUID;
		let new_tag_content = tag_content;

		const setting = new Setting(containerEL);

		if (this.plugin.settings.TagColors.EnableMultipleTags){
			setting.addTextArea((text) => this._text_callback(text,tag_id, new_tag_content));
		} else {
			setting.addText((text) => this._text_callback(text,tag_id, new_tag_content));
		}

		setting.addColorPicker((colorPicker) =>
				colorPicker
					.setValueRgb(new_tag_content.color)
					.onChange(async (value) => {
						// Handle user-defined tag colors here
						new_tag_content.color = hexToRgb(value)

						// Store the edited value to the background color, if we haven't enabled separate backgrounds
						if (!this.plugin.settings.TagColors.EnableSeparateBackground){
							let hsl = rgbToHsl(new_tag_content.color);
							hsl.l = 2 * (hsl.l / 3);
							new_tag_content.background_color = hslToRgb(hsl);
						}
						this.plugin.settings.TagColors.ColorPicker[tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			);

		if (this.plugin.settings.TagColors.EnableSeparateBackground){
			setting.addColorPicker((colorPicker) =>
				colorPicker
					.setValueRgb(new_tag_content.background_color)
					.onChange(async (value) => {
						// Handle user-defined tag colors here
						new_tag_content.background_color = hexToRgb(value)
						this.plugin.settings.TagColors.ColorPicker[tag_id] = new_tag_content;
						await this.plugin.saveSettings();
					})
			);
		}
		if (this.plugin.settings.TagColors.EnableSeparateLuminanceOffset){
			let sliderElement: SliderComponent; // Little work around to make them update together
			let textElement: TextComponent;
			setting
				.addSlider(component => {
						component
							.setLimits(0, .5, 0.05)
							.setValue(this.plugin.settings.TagColors.ColorPicker[tag_id].luminance_offset)
							.onChange(async state => {
								this.plugin.settings.TagColors.ColorPicker[tag_id].luminance_offset = state;
								await this.plugin.saveSettings();

								// Update the text component's value
								textElement.setValue(String(state));
							});
						sliderElement = component;
					}
				).addText((text) => {
				text
					.setPlaceholder(this.plugin.settings.TagColors.Values.LuminanceOffset.toString())
					.setValue(String(this.plugin.settings.TagColors.ColorPicker[tag_id].luminance_offset))
					.onChange(async state => {
						// Because this is a text component it needs to be cast to a number
						let state_as_number = Number(state)
						if (isNaN(state_as_number) || state_as_number === null){
							state_as_number = 0
						}

						this.plugin.settings.TagColors.ColorPicker[tag_id].luminance_offset = state_as_number;
						await this.plugin.saveSettings();

						sliderElement.setValue(state_as_number)
					});
				textElement = text;
			});
		}

		setting.addButton((button) =>
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



