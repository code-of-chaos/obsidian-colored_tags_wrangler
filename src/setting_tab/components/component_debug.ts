// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent} from "src/setting_tab/components/component";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentDebug extends SettingsTabComponent{
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
			.setName("Enable debug options")
			.setDesc(`
				Allows you to view and use some extra debug option. 
				Don't use these if you don't know what you are doing.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.enableDebugSettings)
						.onChange(async state => {
							this.plugin.settings.enableDebugSettings = state;
							await this.plugin.saveSettings();
							this.settings_tab.display()
						})
				}
			);
	}
}



