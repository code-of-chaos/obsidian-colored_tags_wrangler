// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import MyPlugin
	from "src/main";
import {
	IStyleWrangler,
	StyleWranglerKanban,
	StyleWranglerKanbanCards,
	StyleWranglerKanbanLists,
	StyleWranglerTags
} from "./wranglers";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleManager{
	plugin: MyPlugin;
	wrangler_tags: StyleWranglerTags;
	wrangler_kanban: StyleWranglerKanban;
	wrangler_kanban_cards: StyleWranglerKanbanCards;
	wrangler_kanban_lists: StyleWranglerKanbanLists;

	private _style_wranglers: Array<IStyleWrangler>;
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: MyPlugin) {
		this.plugin = plugin;
		this.wrangler_tags = new StyleWranglerTags(plugin)
		this.wrangler_kanban = new StyleWranglerKanban(plugin)
		this.wrangler_kanban_cards = new StyleWranglerKanbanCards(plugin)
		this.wrangler_kanban_lists = new StyleWranglerKanbanLists(plugin)

		this._style_wranglers = new Array<IStyleWrangler>(
			this.wrangler_tags,
			this.wrangler_kanban,
			this.wrangler_kanban_cards,
			this.wrangler_kanban_lists,
		)
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	switchAllStyles():void {
		Object.keys(this.plugin.settings.customTagColors).length != 0
			? this.wrangler_tags.apply_styles()
			: this.wrangler_tags.remove_styles() ;

		this.plugin.settings.enableKanban
			? this.wrangler_kanban.apply_styles()
			: this.wrangler_kanban.remove_styles() ;

		this.plugin.settings.enableKanbanCards
			? this.wrangler_kanban_cards.apply_styles()
			: this.wrangler_kanban_cards.remove_styles() ;

		this.plugin.settings.enableKanbanLists
			? this.wrangler_kanban_lists.apply_styles()
			: this.wrangler_kanban_lists.remove_styles() ;
	}

	applyAllStyles():void {
		this._style_wranglers.forEach(value => {value.apply_styles()})
	}

	removeAllStyles():void {
		this._style_wranglers.forEach(value => {value.remove_styles()})
	}
}
