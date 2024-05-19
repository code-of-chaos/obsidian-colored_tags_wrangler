// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, Plugin, PluginManifest} from "obsidian";
import {IColoredTagWranglerPlugin} from "../contracts/plugin/IColoredTagWranglerPlugin";
import {SettingTab} from "./ui/setting_tab/SettingTab";
import {ServiceProvider} from "./services/ServiceProvider";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin implements IColoredTagWranglerPlugin{
	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		ServiceProvider.PopulateInstances(this);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async onload() {
		await ServiceProvider.settings.loadFromFile() // loads settings from file as well

		console.warn(ServiceProvider.settings.data.EnabledExtensions);

		ServiceProvider.cssStyler.processExtensions()

		this.addSettingTab(new SettingTab(this.app, this));

	}

	async onunload(){
		await ServiceProvider.settings.saveToFile()
		ServiceProvider.cssStyler.cleanup()
	}

	// -----------------------------------------------------------------------------------------------------------------
	// SettingsManager
	// -----------------------------------------------------------------------------------------------------------------
}
