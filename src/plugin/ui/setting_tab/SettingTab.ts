// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab} from "obsidian";
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

		// Scrollable container for the table
		await new SettingExtensionSelector(this).display()
		await new SettingTagTable(this).display() // clumsy, but should work
	}
}
