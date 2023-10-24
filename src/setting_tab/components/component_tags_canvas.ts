// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent}
	from "src/setting_tab/components/component";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsCanvas extends SettingsTabComponent{
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
		return new Setting(this.containerEL)
			.setName("Apply tag color to canvas card")
			.setDesc(`
				Applies the tag color, of the tag within the canvas's card, to the background color of the canvas card. 
				Known issue: When a canvas card has multiple tags, the color of the canvas card is randomly chosen.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.enableCanvas)
						.onChange(async state => {
							this.plugin.settings.enableCanvas = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



