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
	ComponentTagsCanvas,
	SettingsTabComponent,
	ComponentFolderNote,
	ComponentFolderNoteAutoDetect,
	ComponentFolderNoteFolderTagLinks,
	ComponentTagsEnableMultipleTags,
	ComponentTagsEnableSeparateBackground
} from "src/setting_tab/components";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab {
	plugin: ColoredTagWranglerPlugin;
	_components: {
		comp_tags: 								SettingsTabComponent,
		comp_tags_canvas:						SettingsTabComponent,
		comp_tags_enable_multiple_tags:			SettingsTabComponent,
		comp_tags_enable_background:			SettingsTabComponent,
		comp_folder_note:						SettingsTabComponent,
		comp_folder_note_auto_detect:			SettingsTabComponent,
		comp_folder_note_folder_tag_links:		SettingsTabComponent,
		comp_kanban:							SettingsTabComponent,
		comp_kanban_cards:						SettingsTabComponent,
		comp_kanban_lists:						SettingsTabComponent,
		comp_debug:								SettingsTabComponent,
		comp_debug_reloadcss:					SettingsTabComponent,
	}

	constructor(plugin: ColoredTagWranglerPlugin) {
		super(plugin.app, plugin);
		this.plugin = plugin;
		this._components = {
			comp_tags: 							new ComponentTags(plugin, this),
			comp_tags_canvas:					new ComponentTagsCanvas(plugin, this),
			comp_tags_enable_multiple_tags:		new ComponentTagsEnableMultipleTags(plugin, this),
			comp_tags_enable_background: 		new ComponentTagsEnableSeparateBackground(plugin, this),
			comp_folder_note:					new ComponentFolderNote(plugin, this),
			comp_folder_note_auto_detect:		new ComponentFolderNoteAutoDetect(plugin, this),
			comp_folder_note_folder_tag_links:	new ComponentFolderNoteFolderTagLinks(plugin, this),
			comp_kanban: 						new ComponentKanban(plugin,this),
			comp_kanban_cards:					new ComponentKanbanCards(plugin,this),
			comp_kanban_lists:					new ComponentKanbanLists(plugin,this),
			comp_debug:							new ComponentDebug(plugin,this),
			comp_debug_reloadcss:				new ComponentDebugReloadCSS(plugin,this),
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

 		// Below this should be boolean options for the tags
		this._components.comp_tags_canvas.create_component(containerEl);
		this._components.comp_tags_enable_multiple_tags.create_component(containerEl);
		this._components.comp_tags_enable_background.create_component(containerEl);

		// Kanban Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Kanban plugin integration"});

        this._components.comp_kanban.create_component(containerEl);
		if (this.plugin.settings.Kanban.Enable){
			this._components.comp_kanban_cards.create_component(containerEl);
			this._components.comp_kanban_lists.create_component(containerEl);
		}

		// Folder Note Settings
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Folder Note integration"});
		containerEl.createEl('div', {cls:"setting-item-description",text: "Doesn't integrate with a particular plugin, but relies of the concept of 'Folder Notes'."});

		this._components.comp_folder_note.create_component(containerEl);
		if (this.plugin.settings.FolderNote.Enable){
			this._components.comp_folder_note_auto_detect.create_component(containerEl);
			this._components.comp_folder_note_folder_tag_links.create_component(containerEl);

		}

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
