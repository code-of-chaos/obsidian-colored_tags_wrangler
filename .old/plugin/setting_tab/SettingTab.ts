// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab}
	from "obsidian";
import ColoredTagWranglerPlugin
	from ".old/main";
import {
	ComponentCSSNoteBackground,
	ComponentCSSNoteProperties,
	ComponentCSSNoteTags,
	ComponentCSSTagsNoWrap,
	ComponentDebug,
	ComponentDebugReloadCSS,
	ComponentDebugExperimentalCommands,
	ComponentFolderNote,
	ComponentFolderNoteAutoDetect,
	ComponentFolderNoteDetect,
	ComponentFolderNoteFolderTagLinks,
	ComponentKanban,
	ComponentKanbanCards,
	ComponentKanbanHideHashtags,
	ComponentKanbanLists,
	ComponentTags,
	ComponentCanvas,
	ComponentTagsEnableMultipleTags,
	ComponentTagsEnableBackgroundOpacity,
	ComponentTagsEnableAutoBackgroundButton,
	ComponentCanvasEnableBackgroundOpacity,
	ComponentFolderNoteEnableBackgroundOpacity,
	ComponentKanbanEnableBackgroundOpacity
} from ".old/plugin/setting_tab/components";
import {SettingsTabComponent} from "./SettingsTabComponent";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab {
	plugin: ColoredTagWranglerPlugin;
	_components: {
		canvas: SettingsTabComponent,
		canvas_enable_background_opacity: SettingsTabComponent,

		css_note_background: SettingsTabComponent,
		css_note_properties: SettingsTabComponent,
		css_note_tags: SettingsTabComponent,
		css_tags_no_wrap: SettingsTabComponent,

		debug: SettingsTabComponent,
		debug_experimental_commands: SettingsTabComponent,
		debug_reloadcss: SettingsTabComponent,

		folder_note: SettingsTabComponent,
		folder_note_auto_detect: SettingsTabComponent,
		folder_note_detect: SettingsTabComponent,
		folder_note_folder_tag_links: SettingsTabComponent,
		folder_note_enable_background_opacity: SettingsTabComponent,

		kanban: SettingsTabComponent,
		kanban_cards: SettingsTabComponent,
		kanban_hashtags: SettingsTabComponent,
		kanban_lists: SettingsTabComponent,
		kanban_enable_background_opacity: SettingsTabComponent,

		tags: SettingsTabComponent,
		tags_enable_background_button: SettingsTabComponent,
		tags_enable_background_opacity: SettingsTabComponent,
		tags_enable_multiple_tags: SettingsTabComponent,
	}

	constructor(plugin: ColoredTagWranglerPlugin) {
		super(plugin.app, plugin);
		this.plugin = plugin;
		this._components = {
			canvas: new ComponentCanvas(plugin, this),
			canvas_enable_background_opacity: new ComponentCanvasEnableBackgroundOpacity(plugin, this),

			css_note_background: new ComponentCSSNoteBackground(plugin, this),
			css_note_properties: new ComponentCSSNoteProperties(plugin, this),
			css_note_tags: new ComponentCSSNoteTags(plugin, this),
			css_tags_no_wrap: new ComponentCSSTagsNoWrap(plugin, this),

			debug: new ComponentDebug(plugin, this),
			debug_experimental_commands: new ComponentDebugExperimentalCommands(plugin, this),
			debug_reloadcss: new ComponentDebugReloadCSS(plugin, this),

			folder_note: new ComponentFolderNote(plugin, this),
			folder_note_auto_detect: new ComponentFolderNoteAutoDetect(plugin, this),
			folder_note_detect: new ComponentFolderNoteDetect(plugin, this),
			folder_note_folder_tag_links: new ComponentFolderNoteFolderTagLinks(plugin, this),
			folder_note_enable_background_opacity: new ComponentFolderNoteEnableBackgroundOpacity(plugin, this),

			kanban: new ComponentKanban(plugin, this),
			kanban_cards: new ComponentKanbanCards(plugin, this),
			kanban_hashtags: new ComponentKanbanHideHashtags(plugin, this),
			kanban_lists: new ComponentKanbanLists(plugin, this),
			kanban_enable_background_opacity: new ComponentKanbanEnableBackgroundOpacity(plugin, this),

			tags: new ComponentTags(plugin, this),
			tags_enable_background_button: new ComponentTagsEnableAutoBackgroundButton(plugin, this),
			tags_enable_background_opacity: new ComponentTagsEnableBackgroundOpacity(plugin, this),
			tags_enable_multiple_tags: new ComponentTagsEnableMultipleTags(plugin, this),

		}
	}

	async display() {
		// Refresh the Element container
		const {containerEl} = this;
		containerEl.empty();
		containerEl.addClass("cwt-settings-tab")

		// Tags SettingsManager
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: "Obsidian tags"});
		containerEl.createDiv({cls: "setting-item-description", text: `Don't add the '#' before the tag.`});
		containerEl.createDiv({
			cls: "setting-item-description",
			text: `If you forget this, this is done in code for you, resulting in the input being changed.`
		});
		containerEl.createEl('br');

		// Tags lists and which component they should adhere to
		this._components.tags.create_component(containerEl);

		// Below this should be boolean options for the tags
		this._components.tags_enable_background_button.create_component(containerEl)
		this._components.canvas.create_component(containerEl);
		this._components.canvas_enable_background_opacity.create_component(containerEl);
		this._components.tags_enable_multiple_tags.create_component(containerEl);
		this._components.tags_enable_background_opacity.create_component(containerEl);

		// CSS SettingsManager
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "CSS options"});
		containerEl.createEl('div', {cls: "setting-item-description", text: "A collection of CSS tweaks for tags"});

		this._components.css_note_tags.create_component(containerEl);
		this._components.css_note_properties.create_component(containerEl);
		this._components.css_tags_no_wrap.create_component(containerEl);
		this._components.css_note_background.create_component(containerEl);

		// Kanban SettingsManager
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Kanban plugin integration"});

		this._components.kanban.create_component(containerEl);
		if (this.plugin.settings.Kanban.Enable) {
			this._components.kanban_cards.create_component(containerEl);
			this._components.kanban_lists.create_component(containerEl);
			this._components.kanban_hashtags.create_component(containerEl);
			this._components.kanban_enable_background_opacity.create_component(containerEl);
		}

		// Folder Note SettingsManager
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Folder Note integration"});
		containerEl.createEl('div', {
			cls: "setting-item-description",
			text: "Doesn't integrate with a particular plugin, but relies of the concept of 'Folder Notes'."
		});

		this._components.folder_note.create_component(containerEl);
		if (this.plugin.settings.FolderNote.Enable) {
			this._components.folder_note_auto_detect.create_component(containerEl);
			this._components.folder_note_enable_background_opacity.create_component(containerEl);
			this._components.folder_note_detect.create_component(containerEl);
			this._components.folder_note_folder_tag_links.create_component(containerEl);

		}

		// Debug SettingsManager
		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Debug options"});

		this._components.debug.create_component(containerEl);

		if (this.plugin.settings.Debug.Enable) {
			this._components.debug_reloadcss.create_component(containerEl);
			this._components.debug_experimental_commands.create_component(containerEl);
		}
	}
}
