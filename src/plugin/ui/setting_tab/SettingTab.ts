// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab} from "obsidian";
import {ISettingTab} from "../../../contracts/plugin/ui/ISettingTab";
import {SettingTagTable} from "./components/tag_table/SettingTagTable";

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
		await new SettingTagTable(this).display() // clumsy, but should work
	}
}
