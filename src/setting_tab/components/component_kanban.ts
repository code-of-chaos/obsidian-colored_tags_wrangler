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
export class ComponentKanban extends SettingsTabComponent{
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
			.setName("Omit '#' in kanban plugin ")
			.setDesc("Hides the # from the kanban view. Mind you, they still have to be typed out")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.enableKanban)
						.onChange(async state => {
							this.plugin.settings.enableKanban = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



