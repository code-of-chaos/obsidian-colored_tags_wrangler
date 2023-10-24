// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab}
    from "obsidian";
import ColoredTagWranglerPlugin
    from "src/main";
import {
	ComponentTags,
	ComponentTagsDelete,
	ComponentKanban,
	ComponentKanbanCards,
	ComponentKanbanLists,
	ComponentDebugReloadCSS,
	ComponentDebug,
	ComponentTagsCanvas
} from "src/setting_tab/components";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab {
	plugin: ColoredTagWranglerPlugin;

    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin: ColoredTagWranglerPlugin) {
		super(plugin.app, plugin);
		this.plugin = plugin;
	}

    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
	async display() {
        // Refresh the Element container
		const {containerEl} = this;
		containerEl.empty();

		// Tags Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: "Obsidian tags"});

		new ComponentTags(this.plugin,this,containerEl).create_component();
        new ComponentTagsDelete(this.plugin,this,containerEl).create_component();
		new ComponentTagsCanvas(this.plugin,this,containerEl).create_component();

		// Kanban Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Kanban plugin integration"});

        new ComponentKanban(this.plugin,this,containerEl).create_component();
		new ComponentKanbanCards(this.plugin,this,containerEl).create_component();
		new ComponentKanbanLists(this.plugin,this,containerEl).create_component();

		// Debug Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Debug options"});

		new ComponentDebug(this.plugin,this,containerEl).create_component();

		if (this.plugin.settings.enableDebugSettings){
			new ComponentDebugReloadCSS(this.plugin,this,containerEl).create_component();
		}
    }
}
