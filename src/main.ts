// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, Editor, MarkdownView, Modal, Notice, Plugin}
	from "obsidian";
import {IColoredTagWranglerSettings, DEFAULT_SETTINGS}
	from "src/settings";
import {SettingsTab}
	from "src/settings_tab";
import {Styler}
	from "./styler";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin {
	settings: IColoredTagWranglerSettings;
	styleElement: HTMLStyleElement | null = null;
	styler:Styler

	async onload() {

		try {
			await this.loadSettings();
			this.styler = new Styler(this);
			this.addSettingTab(new SettingsTab(this.app, this));
			this.styler.applyTagStyles();
		} catch (error) {
			console.error("Error loading settings:", error);
			return;
		}

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(this.applyTagStyles, 100));
	}

	onunload() {
		this.styler.removeCustomStyles();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.styler.applyTagStyles();
	}

}
