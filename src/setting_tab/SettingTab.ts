// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab}
    from "obsidian";
import ColoredTagWranglerPlugin
    from "src/main";
import {
	ComponentTags,
	ComponentKanban,
	ComponentKanbanCards,
	ComponentKanbanLists,
	ComponentDebugReloadCSS,
	ComponentDebug,
	ComponentTagsSemanticColors,
	ComponentTagsCanvas,
	SettingsTabComponent,
	ComponentTagsVarColors,
} from "src/setting_tab/components";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab {
	plugin: ColoredTagWranglerPlugin;
	_components: {
		comp_tags: SettingsTabComponent,
		comp_tags_canvas:SettingsTabComponent,
		comp_tags_semantic:SettingsTabComponent,
		comp_tags_var:SettingsTabComponent,
		comp_kanban:SettingsTabComponent,
		comp_kanban_cards:SettingsTabComponent,
		comp_kanban_lists:SettingsTabComponent,
		comp_debug:SettingsTabComponent,
		comp_debug_reloadcss:SettingsTabComponent,
	}

	constructor(plugin: ColoredTagWranglerPlugin) {
		super(plugin.app, plugin);
		this.plugin = plugin;
		this._components = {
			comp_tags: 				new ComponentTags(plugin, this),
			comp_tags_canvas:		new ComponentTagsCanvas(plugin, this),
			comp_tags_semantic:		new ComponentTagsSemanticColors(plugin, this),
			comp_tags_var:			new ComponentTagsVarColors(plugin, this),
			comp_kanban: 			new ComponentKanban(plugin,this),
			comp_kanban_cards:		new ComponentKanbanCards(plugin,this),
			comp_kanban_lists:		new ComponentKanbanLists(plugin,this),
			comp_debug:				new ComponentDebug(plugin,this),
			comp_debug_reloadcss:	new ComponentDebugReloadCSS(plugin,this),
		}
	}
	async display() {
        // Refresh the Element container
		const {containerEl} = this;
		containerEl.empty();

		// Tags Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: "Obsidian tags"});
		containerEl.createDiv({cls:"setting-item-description",text: `Don't add the '#' before the tag. Write everything in lowercase without spaces.`});
		containerEl.createDiv({cls:"setting-item-description",text: `If you forget this, this done for you in code, resulting in the input being changed if you reload this page.`});
		containerEl.createEl('br');

		// Tags lists and which component they should adhere to
		this._components.comp_tags.create_component(containerEl);
		this._components.comp_tags_semantic.create_component(containerEl);
		this._components.comp_tags_var.create_component(containerEl);

 		// Below this should be boolean options for the tags
		this._components.comp_tags_canvas.create_component(containerEl);

		// Kanban Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Kanban plugin integration"});

        this._components.comp_kanban.create_component(containerEl);
		this._components.comp_kanban_cards.create_component(containerEl);
		this._components.comp_kanban_lists.create_component(containerEl);

		// Debug Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Debug options"});

		this._components.comp_debug.create_component(containerEl);

		if (this.plugin.settings.Debug.Enable){
			this._components.comp_debug_reloadcss.create_component(containerEl);
    	}
	}
}
