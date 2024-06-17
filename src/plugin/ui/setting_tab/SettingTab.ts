// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting} from "obsidian";
import {ISettingTab} from "../../../contracts/plugin/ui/ISettingTab";
import {SettingTagTable} from "./components/tag_table/SettingTagTable";
import {SettingExtensionSelector} from "./components/extension_selector/SettingExtensionSelector";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab implements ISettingTab {
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async display(): Promise<void> {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl).setName("Tag table").setHeading()
		await new SettingTagTable(this).display() // Scrollable container for the table

		new Setting(containerEl).setName("Extension selector").setHeading()
		await new SettingExtensionSelector(this).display()
	}
}
