// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import ColoredTagWranglerPlugin
	from "src/main";
import {
	ICSSWrangler,
	CSSWranglerTags,
	CSSWranglerTagsCanvas,
	CSSWranglerFolderNote,
	CSSWranglerKanbanHashtags,
	CSSWranglerKanbanCards,
	CSSWranglerKanbanLists,
	CSSWranglerTagsNoWrap,
} from "src/plugin/style_manager/css_wranglers";
import {
	IJqueryWrangler, JqueryWranglerCanvasNodeBackground, JqueryWranglerNoteBackgrounds,
	JqueryWranglerNotePropertyTags
} from "./jquery_wranglers";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleManager{
	plugin: ColoredTagWranglerPlugin;
	wrangler_css_note_tags: ICSSWrangler;
	wrangler_css_note_tags_no_wrap: ICSSWrangler;
	wrangler_tags_canvas: ICSSWrangler;
	wrangler_kanban_hashtags: ICSSWrangler;
	wrangler_kanban_cards: ICSSWrangler;
	wrangler_kanban_lists: ICSSWrangler;
	wrangler_folder_note: ICSSWrangler;

	wrangler_note_property_tags:IJqueryWrangler;
	wrangler_note_background:IJqueryWrangler;
	wrangler_canvas_node_background:IJqueryWrangler;

	private style_wranglers_css: Array<ICSSWrangler>;
	private style_wranglers_jquery: Array<IJqueryWrangler>;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: ColoredTagWranglerPlugin) {
		this.plugin = plugin;
		this.wrangler_css_note_tags = new CSSWranglerTags(plugin);
		this.wrangler_css_note_tags_no_wrap = new CSSWranglerTagsNoWrap(plugin);
		this.wrangler_tags_canvas = new CSSWranglerTagsCanvas(plugin);
		this.wrangler_kanban_hashtags = new CSSWranglerKanbanHashtags(plugin);
		this.wrangler_kanban_cards = new CSSWranglerKanbanCards(plugin);
		this.wrangler_kanban_lists = new CSSWranglerKanbanLists(plugin);
		this.wrangler_folder_note = new CSSWranglerFolderNote(plugin);

		this.style_wranglers_css = new Array<ICSSWrangler>(
			this.wrangler_css_note_tags,
			this.wrangler_css_note_tags_no_wrap,
			this.wrangler_tags_canvas,
			this.wrangler_kanban_hashtags,
			this.wrangler_kanban_cards,
			this.wrangler_kanban_lists,
			this.wrangler_folder_note,
		)

		this.wrangler_note_property_tags = new JqueryWranglerNotePropertyTags(plugin);
		this.wrangler_note_background = new JqueryWranglerNoteBackgrounds(plugin);
		this.wrangler_canvas_node_background = new JqueryWranglerCanvasNodeBackground(plugin);

		this.style_wranglers_jquery = new Array<IJqueryWrangler>(
			this.wrangler_note_property_tags,
			this.wrangler_note_background,
			this.wrangler_canvas_node_background,
		)

	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	switchAllStyles():void {
		this.plugin.settings.TagColors.ColorPicker.length != 0
		&& this.plugin.settings.CSS.NoteTags
			? this.wrangler_css_note_tags.applyStyles()
			: this.wrangler_css_note_tags.removeStyles() ;

		this.plugin.settings.CSS.TagsNoWrap
			? this.wrangler_css_note_tags_no_wrap.applyStyles()
			: this.wrangler_css_note_tags_no_wrap.removeStyles() ;

		this.plugin.settings.Canvas.Enable
			? this.wrangler_tags_canvas.applyStyles()
			: this.wrangler_tags_canvas.removeStyles() ;

		this.plugin.settings.Kanban.HideHashtags
			? this.wrangler_kanban_hashtags.applyStyles()
			: this.wrangler_kanban_hashtags.removeStyles() ;

		this.plugin.settings.Kanban.EnableCards
			? this.wrangler_kanban_cards.applyStyles()
			: this.wrangler_kanban_cards.removeStyles() ;

		this.plugin.settings.Kanban.EnableLists
			? this.wrangler_kanban_lists.applyStyles()
			: this.wrangler_kanban_lists.removeStyles() ;

		this.plugin.settings.FolderNote.Enable
			? this.wrangler_folder_note.applyStyles()
			: this.wrangler_folder_note.removeStyles() ;
	}

	// -----------------------------------------------------------------------------------------------------------------
	// applyAllStyles():void {
	// 	this._style_wranglers.forEach(value => {value.applyStyles()});
	// }	// -----------------------------------------------------------------------------------------------------------------

	removeAllStyles():void {
		this.style_wranglers_css.forEach(value => {value.removeStyles()});
		this.style_wranglers_jquery.forEach(value => {value.removeStyling()})
	}
}
