// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab} from "obsidian";
import ColoredTagWranglerPlugin from "../../ColoredTagWranglerPlugin";
import {createTagTextArea} from "./components/tag_table/TagTextArea";
import {createTagColorForegroundInput, createTagColorBackgroundInput} from "./components/tag_table/TagColorInput";
import {createTagPreview} from "./components/tag_table/TagPreview";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab{
	async display(): Promise<void> {
		const { containerEl } = this;
		containerEl.empty();

		const plugin = ColoredTagWranglerPlugin.instance;

		// Generate data rows
		let data = await plugin.settings.getTags()

		// Scrollable container for the table
		let tableContainer = containerEl.createDiv();
		tableContainer.addClass("scroll-container");

		// Gradient overlay at the right edge
		let gradientOverlay = tableContainer.createEl('div');
		gradientOverlay.addClass("overlay-gradient");

		// Create table with headers
		let table = tableContainer.createEl('table');
		let thead = table.createEl('thead');
		let headersRow = thead.createEl('tr');
		for (let title of ["Tag", "Color Text", "Color Back", "extra option extra option 1", "extra option 1","extra option 1","extra option 1","extra option 1","extra option 1","extra option 1","extra option 1", "extra option 1", "Color extra option 1", "extra option 1", "azeazeazeazeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"]) {
			headersRow.createEl('th', { text: title })
		}

		// Populate table with data rows
		let tbody = table.createEl('tbody');
		for (let row of data) {
			let tr = tbody.createEl('tr');
			createTagTextArea(tr, row);
			createTagColorForegroundInput(tr, row);
			createTagColorBackgroundInput(tr, row);
			createTagPreview(tr, row);
		}
	}
}
