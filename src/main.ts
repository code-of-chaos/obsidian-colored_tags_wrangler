// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, Editor, MarkdownView, Modal, Notice, Plugin}
	from "obsidian";
import {IColoredTagWranglerSettings, DEFAULT_SETTINGS}
	from "src/settings";
import {SettingsTab}
	from "src/settings_tab";
import {applyTagStyles,removeCustomStyles}
	from "./style";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin {
	settings: IColoredTagWranglerSettings;
	styleElement: HTMLStyleElement | null = null;

	async onload() {

		try {
			await this.loadSettings();
			this.addSettingTab(new SettingsTab(this.app, this));
			applyTagStyles(this);
		} catch (error) {
			console.error("Error loading settings:", error);
			return;
		}

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(this.applyTagStyles, 100));
	}

	onunload() {
		removeCustomStyles(this);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		applyTagStyles(this);
	}

}
