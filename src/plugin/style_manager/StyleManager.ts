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

	// private style_wranglers_css: Array<ICSSWrangler>;
	// private style_wranglers_jquery: Array<IJqueryWrangler>;

	styleElement:HTMLStyleElement;

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

		// this.style_wranglers_css = new Array<ICSSWrangler>(
		// 	this.wrangler_css_note_tags,
		// 	this.wrangler_css_note_tags_no_wrap,
		// 	this.wrangler_tags_canvas,
		// 	this.wrangler_kanban_hashtags,
		// 	this.wrangler_kanban_cards,
		// 	this.wrangler_kanban_lists,
		// 	this.wrangler_folder_note,
		// )

		this.wrangler_note_property_tags = new JqueryWranglerNotePropertyTags(plugin);
		this.wrangler_note_background = new JqueryWranglerNoteBackgrounds(plugin);
		this.wrangler_canvas_node_background = new JqueryWranglerCanvasNodeBackground(plugin);

		// this.style_wranglers_jquery = new Array<IJqueryWrangler>(
		// 	this.wrangler_note_property_tags,
		// 	this.wrangler_note_background,
		// 	this.wrangler_canvas_node_background,
		// )

		this.styleElement = document.createElement("style");
		this.styleElement.id = "colored-tags-wrangler"

	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	switchAllStyles():void {
		const css_text:string[] = [];

		css_text.push(...(this.plugin.settings.TagColors.ColorPicker.length != 0
		&& this.plugin.settings.CSS.NoteTags)
			? this.wrangler_css_note_tags.applyStyles()
			: []
		);

		css_text.push(...this.plugin.settings.CSS.TagsNoWrap
			? this.wrangler_css_note_tags_no_wrap.applyStyles()
			: []
		);

		css_text.push(...this.plugin.settings.Canvas.Enable
			? this.wrangler_tags_canvas.applyStyles()
			: []
		);

		css_text.push(...this.plugin.settings.Kanban.HideHashtags
			? this.wrangler_kanban_hashtags.applyStyles()
			: []
		);

		css_text.push(...this.plugin.settings.Kanban.EnableCards
			? this.wrangler_kanban_cards.applyStyles()
			: []
		);

		css_text.push(...this.plugin.settings.Kanban.EnableLists
			? this.wrangler_kanban_lists.applyStyles()
			: []
		);

		css_text.push(...this.plugin.settings.FolderNote.Enable
			? this.wrangler_folder_note.applyStyles()
			: [] );

		// actually generate the element
        this.styleElement.innerHTML = css_text.join();
        document.head.appendChild(this.styleElement);
	}

	public removeStyles(){
		document.head.removeChild(this.styleElement);
	}
}
