// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, Plugin, PluginManifest} from "obsidian";
import {IColoredTagWranglerPlugin} from "src/contracts/plugin/IColoredTagWranglerPlugin";
import {SettingTab} from "src/plugin/ui/setting_tab/SettingTab";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin implements IColoredTagWranglerPlugin {
	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		ServiceProvider.PopulateInstances(this);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async onload() {
		await ServiceProvider.settings.loadFromFile() // loads settings from file as well

		ServiceProvider.cssStyler.processExtensions()

		this.addSettingTab(new SettingTab(this.app, this));

		ServiceProvider.eventHandlers.registerEvents();
	}

	async onunload() {
		await ServiceProvider.settings.saveToFile()
		ServiceProvider.cssStyler.cleanup()
	}
}
