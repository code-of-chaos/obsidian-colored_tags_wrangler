// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
	ButtonComponent, ColorComponent, Platform,
	RGB,
	Setting, TextAreaComponent,
	TextComponent
} from "obsidian";
import {adjustBrightness, getContrastBool, hexToRgb} from "src/api/ColorConverters"
import {SettingsTabComponent} from "src/plugin/setting_tab/SettingsTabComponent";
import {arrayMove} from "src/api/ArrayUtils"

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const _NEW_TAG_NAME = "new-tag";
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
		const setting = new Setting(containerEL)
			.setName("Custom color tags")
			.setDesc(`Define custom colors for tags. Use a trailing /* to match descendants; for example, project/* matches project/HR and project/Budget.`)
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
				const trimmed = value.trim();
				// Validate wildcard syntax: /* must be at the end and have a non-empty prefix
				const wildcardIndex = trimmed.indexOf("/*");
				if (wildcardIndex !== -1) {
					if (wildcardIndex !== trimmed.length - 2) {
						// /* is not at the end - strip it from the middle
						new_tag_content.tag_name = trimmed.replace(/\/\*/g, "");
					} else if (wildcardIndex === 0) {
						// /* is at the start with no prefix - strip it
						new_tag_content.tag_name = trimmed.slice(2);
					} else {
						new_tag_content.tag_name = trimmed;
					}
				} else {
					new_tag_content.tag_name = trimmed;
				}
				this.plugin.settings.TagColors.ColorPicker[tag_id] = new_tag_content;
				await this.plugin.saveSettings();
			});
	}
	private _createTagColorSetting(tag_id: number, tag_content: {tag_name:string, color:RGB, background_color:RGB, luminance_offset:number}, containerEL:HTMLElement) {
		const new_tag_id = tag_id;
		const new_tag_content = tag_content;

		const setting = new Setting(containerEL);
		if (Platform.isMobileApp || Platform.isMobile){
			setting.setClass("cwt-setting-tags")
		}

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
					this.plugin.settings.TagColors.ColorPicker[new_tag_id] = new_tag_content;
					await this.plugin.saveSettings();
				})
		);

		let colorPickerBackground :ColorComponent;
		setting.addColorPicker((colorPicker) =>{
			colorPickerBackground = colorPicker;
			colorPickerBackground
				.setValueRgb(new_tag_content.background_color)
				.onChange(async (value) => {
					// Handle user-defined tag colors here
					new_tag_content.background_color = hexToRgb(value)
					this.plugin.settings.TagColors.ColorPicker[new_tag_id] = new_tag_content;
					await this.plugin.saveSettings();
				})
		});

		if(this.plugin.settings.TagColors.EnableSeparateBackground){
			setting.addButton((cb) => {
				cb.setIcon("paintbrush")
					.setTooltip("Automatically generate a background color")
					.onClick(async () => {
						new_tag_content.background_color = adjustBrightness(
							new_tag_content.color,
							getContrastBool(new_tag_content.color)
								? .5 	// dark foreground
								: 1.75	// light foreground
						);
						colorPickerBackground.setValueRgb(new_tag_content.background_color)
						await this.plugin.saveSettings();
					});
			})

		}
		setting.addExtraButton((cb) => {
			cb.setIcon("up-chevron-glyph")
				.setTooltip("Move up")
				.onClick(async () => {
					// reorder stuff here!!!
					arrayMove(this.plugin.settings.TagColors.ColorPicker, new_tag_id, new_tag_id-1)
					await this.plugin.saveSettings();
					this.settings_tab.display() // Yes, because this alters the list
				});
		})
		setting.addExtraButton((cb) => {
			cb.setIcon("down-chevron-glyph")
				.setTooltip("Move down")
				.onClick(async () => {
					// reorder stuff here!!!
					arrayMove(this.plugin.settings.TagColors.ColorPicker, new_tag_id, new_tag_id+1)
					await this.plugin.saveSettings();
					this.settings_tab.display() // Yes, because this alters the list
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
							this.settings_tab.display() // Yes, because this alters the list
						]);
					})
			);

		containerEL.appendChild(setting.settingEl);
	}
}

