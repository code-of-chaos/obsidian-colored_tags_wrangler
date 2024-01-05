// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	ButtonComponent,
	RGB,
	Setting, TextAreaComponent,
	TextComponent
} from "obsidian";
import {hexToRgb} from "src/api/ColorConverters"
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
import {arrayMove} from "src/api/ArrayUtils"

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const _NEW_TAG_NAME:string = "new-tag";
const _NEW_DEFAULT_COLOR:RGB = { r: 255, g: 255, b: 255 };
const _NEW_DEFAULT_BACKGROUND_COLOR:RGB = { r: 100, g: 100, b: 100 };

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTags extends SettingsTabComponent{

	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		let setting = new Setting(containerEL)
			.setName("Custom color tags")
			.setDesc(`Define custom colors for tags.`)
			// Keep the button at the top for old times sake
			.addButton((button) => this._add_new_tag_button(button));

		// Only when Debug settings are on, allow the "Clear all" button to appear
		if(this.plugin.settings.Debug.Enable){
			setting.addButton((button) =>
				button
					.setButtonText('Clear all')
					.onClick(async () => {
							this.plugin.settings.TagColors.ColorPicker = [];
							await Promise.all([
								this.plugin.saveSettings(),
								this.settings_tab.display()
							]);
						}
					)
					.setClass('mod-warning')
					.setDisabled(this.plugin.settings.TagColors.ColorPicker.length == 0)
			);
		}

		// Create the amount of tags already stored in the setting_tab
		for (let i = 0; i < this.plugin.settings.TagColors.ColorPicker.length; i++) {
			this._createTagColorSetting(i, this.plugin.settings.TagColors.ColorPicker[i], containerEL);
		}

		// Add the same button to the bottom of the list
		//		Else you need to scroll up all time to create new tag at the bottom
		new Setting(containerEL).addButton((button) => this._add_new_tag_button(button));
	}

	// -----------------------------------------------------------------------------------------------------------------
	private _add_new_tag_button(button:ButtonComponent){
		button
			.setButtonText("Add new tag")
			.onClick(async () => {
				this.plugin.settings.TagColors.ColorPicker.push({
					tag_name: _NEW_TAG_NAME,
					color: _NEW_DEFAULT_COLOR, // Default color
					background_color: _NEW_DEFAULT_BACKGROUND_COLOR, // Default color
					luminance_offset: this.plugin.settings.TagColors.Values.LuminanceOffset,
				});
				await Promise.all([
					this.plugin.saveSettings(),
					this.settings_tab.display()
				]);
			})
			.setClass("mod-cta")
	}

	private _text_callback(text:TextComponent|TextAreaComponent, tag_id:number, new_tag_content:{tag_name:string, color:RGB, background_color:RGB, luminance_offset:number}) {
		return text
			.setPlaceholder(_NEW_TAG_NAME)
			.setValue(new_tag_content.tag_name)
			.onChange(async (value) => {
				// Add the updated tag and color
				new_tag_content.tag_name = value
					.replace("#", "")
					// .toLowerCase() // Currently this has been disabled. Maybe a future setting?
					.trim()
				;
				this.plugin.settings.TagColors.ColorPicker[tag_id] = new_tag_content;
				await this.plugin.saveSettings();
			});
	}
	private _createTagColorSetting(tag_id: number, tag_content: {tag_name:string, color:RGB, background_color:RGB, luminance_offset:number}, containerEL:HTMLElement) {
		let new_tag_id = tag_id;
		let new_tag_content = tag_content;

		const setting = new Setting(containerEL);

		if (this.plugin.settings.TagColors.EnableMultipleTags){
			setting.addTextArea((text) => this._text_callback(text,tag_id, new_tag_content));
		} else {
			setting.addText((text) => this._text_callback(text,tag_id, new_tag_content));
		}

		setting
			.addColorPicker((colorPicker) =>
				colorPicker
					.setValueRgb(new_tag_content.color)
					.onChange(async (value) => {
						// Handle user-defined tag colors here
						new_tag_content.color = hexToRgb(value)

						this.plugin.settings.TagColors.ColorPicker[new_tag_id] = new_tag_content;
						await this.plugin.saveSettings();

					})
			)

			.addColorPicker((colorPicker) =>
				colorPicker
					.setValueRgb(new_tag_content.background_color)
					.onChange(async (value) => {
						// Handle user-defined tag colors here
						new_tag_content.background_color = hexToRgb(value)
						this.plugin.settings.TagColors.ColorPicker[new_tag_id] = new_tag_content;
						await this.plugin.saveSettings();
					})
			);

		// Move stuff around buttons
		setting.addExtraButton((cb) => {
			cb.setIcon("up-chevron-glyph")
				.setTooltip("Move up")
				.onClick(async () => {
					// reorder stuff here!!!
					arrayMove(this.plugin.settings.TagColors.ColorPicker, new_tag_id, new_tag_id-1)
					await this.plugin.saveSettings();
					this.settings_tab.display()
				});
		})
		setting.addExtraButton((cb) => {
			cb.setIcon("down-chevron-glyph")
				.setTooltip("Move down")
				.onClick(async () => {
					// reorder stuff here!!!
					arrayMove(this.plugin.settings.TagColors.ColorPicker, new_tag_id, new_tag_id+1)
					await this.plugin.saveSettings();
					this.settings_tab.display()
				});
		})

		setting.addExtraButton((cb) =>
				cb.setIcon("trash")
					.setTooltip("Delete")
					.onClick(async () => {
						// Remove the tag and color
						this.plugin.settings.TagColors.ColorPicker.splice(new_tag_id, 1);
						await Promise.all([
							this.plugin.saveSettings(),
							this.settings_tab.display()
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}



