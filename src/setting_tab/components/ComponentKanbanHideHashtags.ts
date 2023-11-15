// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting}
	from "obsidian";
import {SettingsTabComponent}
	from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentKanbanHideHashtags extends SettingsTabComponent{
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Omit '#' in kanban boards")
			.setDesc(`
				Hides the '#' from the kanban view, 
					though they still have to be typed out within the used areas.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.Kanban.HideHashtags)
						.onChange(async state => {
							this.plugin.settings.Kanban.HideHashtags = state;
							await this.plugin.saveSettings();
						})
				}
			);
	}
}



