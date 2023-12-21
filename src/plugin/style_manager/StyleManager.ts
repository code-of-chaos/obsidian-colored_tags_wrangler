// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import ColoredTagWranglerPlugin
	from "src/main";
import {
	IStyleWrangler,
	StyleWranglerCSSNoteTags,
	StyleWranglerTagsCanvas,
	StyleWranglerFolderNote,
	StyleWranglerKanbanHashtags,
	StyleWranglerKanbanCards,
	StyleWranglerKanbanLists, StyleWranglerCSSTagsNoWrap,
} from "src/plugin/style_manager/css_wranglers";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleManager{
	plugin: ColoredTagWranglerPlugin;
	wrangler_css_note_tags: StyleWranglerCSSNoteTags;
	wrangler_css_note_tags_no_wrap: StyleWranglerCSSTagsNoWrap;
	wrangler_tags_canvas: StyleWranglerTagsCanvas;
	wrangler_kanban_hashtags: StyleWranglerKanbanHashtags;
	wrangler_kanban_cards: StyleWranglerKanbanCards;
	wrangler_kanban_lists: StyleWranglerKanbanLists;
	wrangler_folder_note: StyleWranglerFolderNote;

	private _style_wranglers: Array<IStyleWrangler>;
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: ColoredTagWranglerPlugin) {
		this.plugin = plugin;
		this.wrangler_css_note_tags = new StyleWranglerCSSNoteTags(plugin);
		this.wrangler_css_note_tags_no_wrap = new StyleWranglerCSSTagsNoWrap(plugin);
		this.wrangler_tags_canvas = new StyleWranglerTagsCanvas(plugin);
		this.wrangler_kanban_hashtags = new StyleWranglerKanbanHashtags(plugin);
		this.wrangler_kanban_cards = new StyleWranglerKanbanCards(plugin);
		this.wrangler_kanban_lists = new StyleWranglerKanbanLists(plugin);
		this.wrangler_folder_note = new StyleWranglerFolderNote(plugin);

		this._style_wranglers = new Array<IStyleWrangler>(
			this.wrangler_css_note_tags,
			this.wrangler_css_note_tags_no_wrap,
			this.wrangler_tags_canvas,
			this.wrangler_kanban_hashtags,
			this.wrangler_kanban_cards,
			this.wrangler_kanban_lists,
			this.wrangler_folder_note,
		)
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	switchAllStyles():void {
		Object.keys(this.plugin.settings.TagColors.ColorPicker).length != 0
		&& this.plugin.settings.CSS.NoteTags
			? this.wrangler_css_note_tags.apply_styles()
			: this.wrangler_css_note_tags.remove_styles() ;

		this.plugin.settings.CSS.TagsNoWrap
			? this.wrangler_css_note_tags_no_wrap.apply_styles()
			: this.wrangler_css_note_tags_no_wrap.remove_styles() ;

		this.plugin.settings.Canvas.Enable
			? this.wrangler_tags_canvas.apply_styles()
			: this.wrangler_tags_canvas.remove_styles() ;

		this.plugin.settings.Kanban.HideHashtags
			? this.wrangler_kanban_hashtags.apply_styles()
			: this.wrangler_kanban_hashtags.remove_styles() ;

		this.plugin.settings.Kanban.EnableCards
			? this.wrangler_kanban_cards.apply_styles()
			: this.wrangler_kanban_cards.remove_styles() ;

		this.plugin.settings.Kanban.EnableLists
			? this.wrangler_kanban_lists.apply_styles()
			: this.wrangler_kanban_lists.remove_styles() ;

		this.plugin.settings.FolderNote.Enable
			? this.wrangler_folder_note.apply_styles()
			: this.wrangler_folder_note.remove_styles() ;
	}

	// -----------------------------------------------------------------------------------------------------------------
	// applyAllStyles():void {
	// 	this._style_wranglers.forEach(value => {value.apply_styles()});
	// }

	// -----------------------------------------------------------------------------------------------------------------
	removeAllStyles():void {
		this._style_wranglers.forEach(value => {value.remove_styles()});
	}
}
