// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Plugin} from "obsidian";
import {Migrate} from "src/plugin/settings/Migrate";
import {MetadataChange} from "src/plugin/event_handlers/MetadataChange";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {DefaultSettings} from "src/plugin/settings/DefaultSettings";
import {ISettings} from "./plugin/settings/ISettings";
import {StyleManager} from "src/plugin/style_manager/StyleManager";
import {SettingTab} from "src/plugin/setting_tab/SettingTab";
import {JQueryTest} from "./plugin/commands/JQueryTest";
import {JQueryNotes} from "./plugin/commands/JQueryNotes";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWrangler extends Plugin implements IColoredTagWrangler {
	settings: ISettings;
	style_manager:StyleManager;

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	async onload() {
		await this.loadSettings();

		this.style_manager = new StyleManager(this);
		this.addSettingTab(new SettingTab(this));

		// maybe store this somewhere?
		await new MetadataChange(this).register();

		// Load the styles
		this.app.workspace.onLayoutReady(() => {
			this.style_manager.switchAllStyles();
        });

		// -------------------------------------------------------------------------------------------------------------
		// register the commands
		const commands = new Map([
			["test-jquery",          {callback: JQueryNotes,      desc: "TEST jquery"}],
		]);

		commands.forEach(({callback, desc}, key) => {
			this.addCommand({
				id: key,
				name: desc,
				editorCallback: (editor, ctx) => callback(this)
			})
		})

		this.registerEvent(this.app.workspace.on('file-open', (file) => {
			JQueryTest(this)
		}));

	}

	// -----------------------------------------------------------------------------------------------------------------
	onunload() {
		this.style_manager.removeAllStyles();
	}

	// -----------------------------------------------------------------------------------------------------------------
	async loadSettings() {
		// Retrieve setting_tab from stored data.json file
		this.settings = Object.assign({}, DefaultSettings, Migrate(await this.loadData()));
		await this.saveData(this.settings);
	}

	// -----------------------------------------------------------------------------------------------------------------
	async saveSettings() {
		await this.saveData(this.settings);
		// whenever setting_tab are saved, also run this.
		//		This way we know it is always run when needed
		this.style_manager.switchAllStyles();
	}
}
