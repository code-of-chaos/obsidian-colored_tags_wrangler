// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Platform, Plugin } from "obsidian";
import {Migrate} from "src/plugin/settings/Migrate";
import {EventHandlerMetadataChange} from "src/plugin/event_handlers/MetadataChange";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {DefaultSettings} from "src/plugin/settings/DefaultSettings";
import {ISettings} from "./plugin/settings/ISettings";
import {StyleManager} from "src/plugin/style_manager/StyleManager";
import {SettingTab} from "src/plugin/setting_tab/SettingTab";
import {EventHandlerFileOpen} from "src/plugin/event_handlers/FileOpen";
import * as experimental from "src/plugin/commands/experimental"
import * as commands from "src/plugin/commands"
import {EventHandlerActiveLeafChange} from "src/plugin/event_handlers/ActiveLeafChange";

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
		await new EventHandlerMetadataChange(this).register();
		await new EventHandlerFileOpen(this).register();
		await new EventHandlerActiveLeafChange(this).register();

		// Load the styles
		this.app.workspace.onLayoutReady(() => {
			this.style_manager.switchAllStyles();
        });

		// Commands
		this.addCommand({
			id:"export-tags-to-graph-codeblock",
			name:"Creates a code block at caret of color groups, which you can manually copy into the graph.json file.",
			editorCallback: async (editor, ctx) => await commands.ExportGraphJsonTagsCodeblock(editor, ctx, this)
		})

		// Experimental Commands
		if (Platform.isDesktopApp && this.settings.Debug.EnableExperimentalCommands){
			this.addCommand({
				id:"export-tags-to-graph",
				name:"EXPERIMENTAL : export tags to graph.json. This overwrites your current graph.json. Use at own risk!",
				callback: async () => await experimental.exportGraphJsonTags(this)
			})
			this.addCommand({
				id:"export-FOLDER-to-graph",
				name:"EXPERIMENTAL : export TAGS LINKED TO FOLDER NOTES to graph.json. This overwrites your current graph.json. Use at own risk!",
				callback: async () => await experimental.exportGraphJsonFolderNotes(this)
			})
		}
	}

	// -----------------------------------------------------------------------------------------------------------------
	onunload() {
		this.style_manager.removeStyles();
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
