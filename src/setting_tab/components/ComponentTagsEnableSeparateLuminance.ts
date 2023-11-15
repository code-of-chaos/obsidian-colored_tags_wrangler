// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting} from "obsidian";
import {SettingsTabComponent} from "src/setting_tab/SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsEnableSeparateLuminance extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): void {
		new Setting(containerEL)
			.setName("Enable separate luminance offsets per tag")
			.setDesc("Allows you to specify a different luminance offset value for each tag. This offset is used in background of items like Canvas Card, Kanban Card/List, ...")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.TagColors.EnableSeparateLuminanceOffset)
						.onChange(async state => {
							this.plugin.settings.TagColors.EnableSeparateLuminanceOffset = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			)
	}
}



