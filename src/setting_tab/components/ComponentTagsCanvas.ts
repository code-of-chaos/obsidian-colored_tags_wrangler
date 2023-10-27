// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting, SliderComponent, TextComponent}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsCanvas extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		let setting = new Setting(containerEL)
			.setName("Apply tag color to canvas card")
			.setDesc(`Applies the tag color, of the tag within the canvas's card, to the background color of the canvas card.`)
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.Canvas.Enable)
						.onChange(async state => {
							this.plugin.settings.Canvas.Enable = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			);

		// Only show this setting when debug mode is enabled
		//		TODO maybe change this later
		let sliderElement: SliderComponent; // Little work around to make them update together
		let textElement: TextComponent;

		if (this.plugin.settings.Debug.Enable) {
			setting
				.addSlider(component => {
					component
						.setLimits(0, .5, 0.05)
						.setDisabled(!this.plugin.settings.Canvas.Enable)
						.setValue(this.plugin.settings.Canvas.Values.CardBackgroundLuminanceOffset)
						.onChange(async state => {
							this.plugin.settings.Canvas.Values.CardBackgroundLuminanceOffset = state;
							await this.plugin.saveSettings();

							// Update the text component's value
							textElement.setValue(String(state));
						});
					sliderElement = component;
					}
				).addText((text) => {
					text
						.setDisabled(!this.plugin.settings.Canvas.Enable)
						.setValue(String(this.plugin.settings.Canvas.Values.CardBackgroundLuminanceOffset))
						.onChange(async state => {
							// Because this is a text component it needs to be cast to a number
							let state_as_number = Number(state)
							if (isNaN(state_as_number) || state_as_number === null){
								state_as_number = 0
							}

							this.plugin.settings.Canvas.Values.CardBackgroundLuminanceOffset = state_as_number;
							await this.plugin.saveSettings();

							sliderElement.setValue(state_as_number)
						});
					textElement = text;
				});
		}

		return setting
	}
}



