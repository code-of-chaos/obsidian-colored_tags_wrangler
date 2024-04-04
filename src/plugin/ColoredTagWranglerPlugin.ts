// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, Plugin, PluginManifest} from "obsidian";
import {IColoredTagWranglerPlugin} from "../contracts/plugin/IColoredTagWranglerPlugin";
import {SettingsManager} from "./settings/SettingsManager";
import {SettingTab} from "./ui/setting_tab/SettingTab";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin implements IColoredTagWranglerPlugin{
	public static get instance(): IColoredTagWranglerPlugin {return this._instance;}
	private static set instance(value: IColoredTagWranglerPlugin) {this._instance = value;}
	private static _instance: IColoredTagWranglerPlugin; // Static property to hold the instance

	settings: SettingsManager;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
		ColoredTagWranglerPlugin.instance = this;

		this.settings = new SettingsManager();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async onload() {
		await this.settings.loadFromFile() // loads settings from file as well
		this.addSettingTab(new SettingTab(this.app, this));
	}

	async onunload(){
		await this.settings.saveToFile()
	}

	// -----------------------------------------------------------------------------------------------------------------
	// SettingsManager
	// -----------------------------------------------------------------------------------------------------------------
}
