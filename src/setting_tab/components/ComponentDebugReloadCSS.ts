// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentDebugReloadCSS extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		return new Setting(containerEL)
			.setName("Refresh CSS styling")
			.setDesc(`
				Reloads the styling elements of this plugin. 
				Warning: Might change order of tags in CSS and therefor chances to alter the look of certain things, 
					like the kanban boards. 
			`).addButton((button) =>
				button
					.setButtonText("Refresh")
					.onClick(async () => {
						this.plugin.style_manager.switchAllStyles();
						this.settings_tab.display();
					})
			);
	}
}



