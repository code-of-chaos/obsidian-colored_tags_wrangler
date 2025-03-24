// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting} from "obsidian";
import {ISettingTab} from "src/contracts/plugin/ui/ISettingTab";
import {SettingTagTable} from "src/plugin/ui/setting_tab/components/tag_table/SettingTagTable";
import {SettingExtensionSelector} from "src/plugin/ui/setting_tab/components/extension_selector/SettingExtensionSelector";
import {ServiceProvider} from "../../services/ServiceProvider";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab implements ISettingTab {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async display(): Promise<void> {
		const {containerEl} = this;
		containerEl.empty();

		new Setting(containerEl).setName("Extension selector").setHeading()
		await new SettingExtensionSelector(this).display()

		new Setting(containerEl).setName("Tag table").setHeading()
		await new SettingTagTable(this).display() // Scrollable container for the table

		new Setting(containerEl).setName("Config").setHeading();
		new Setting(containerEl)
			.setName("Enable tooltips")
			.setDesc("Will show tooltips on hover over elements in the settings tab.")
			.addToggle((toggle) => {
				const settings = ServiceProvider.settings;

				toggle.setValue(settings.data.Config.SettingsTooltipEnabled);
				toggle.onChange(async (value) => {
					settings.data.Config.SettingsTooltipEnabled = value;
					await settings.debounceSaveToFile.run();
				});
			})
	}
}
