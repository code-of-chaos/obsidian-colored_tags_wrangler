// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Platform, Plugin} from "obsidian";
import {Migrate} from "src/plugin/settings/Migrate";
import {EventHandlerMetadataChange} from "src/plugin/event_handlers/MetadataChange";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {DefaultSettings} from "src/plugin/settings/DefaultSettings";
import {ISettings} from "./plugin/settings/ISettings";
import {StyleManager} from "src/plugin/style_manager/StyleManager";
import {SettingTab} from "src/plugin/setting_tab/SettingTab";
import {EventHandlerFileOpen} from "src/plugin/event_handlers/FileOpen";
import {IColorGroup, IGraphJSON, readGraphJson, writeGraphJson} from "src/api/graph"
import {get_tags} from "src/api/tags"

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

		// Load the styles
		this.app.workspace.onLayoutReady(() => {
			this.style_manager.switchAllStyles();
        });

		if (Platform.isDesktopApp){
			this.addCommand({
				id:"export-FOLDER-to-graph",
				name:"EXPERIMENTAL : export FOLDER NOTES to graph.json. This overwrites your current graph.json. Use at own risk!",
				callback: async () => {
					let graph_data: IGraphJSON | null = await readGraphJson(this.app.vault);
					if (graph_data === null){
						return
					}

					let all_tags = get_tags(this);

					graph_data.colorGroups = Object.keys(this.settings.FolderNote.FolderTagLinks)
						.map(
							folderUUID => {
								const {folder_path, tag_name: folder_tag_name} = this.settings.FolderNote.FolderTagLinks[folderUUID];
								return all_tags
									.filter(({tag_name: known_tag}) => known_tag === folder_tag_name)
									.map(({color}) => {
										console.warn(`${color.r}${color.g}${color.b}`)
										console.warn(color)

										return {
											"query": `path:${folder_path}`,
											"color": {
												"a": 1,
												"rgb": Number.parseInt(`${(color.r << 16) + (color.g << 8) + color.b}`)
											}
										} as IColorGroup
									})
							}
						)
						.flat();

					await writeGraphJson(graph_data, this.app.vault)

					}
				})
			
			this.addCommand({
				id:"export-tags-to-graph",
				name:"EXPERIMENTAL : export tags to graph.json. This overwrites your current graph.json. Use at own risk!",
				callback: async () => {
					let graph_data: IGraphJSON | null = await readGraphJson(this.app.vault);
					if (graph_data === null){
						return
					}

					let all_tags = get_tags(this);

					graph_data.colorGroups = all_tags
						.map(({tag_name, color}) => {
							console.warn(`${color.r}${color.g}${color.b}`)
							console.warn(color)
							return {
								"query": `tag:#${tag_name}`,
								"color": {
									"a": 1,
									"rgb": Number.parseInt(`${(color.r << 16) + (color.g << 8) + color.b}`)
								}
							} as IColorGroup
						})

					await writeGraphJson(graph_data, this.app.vault)

				}
			})
		}
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
