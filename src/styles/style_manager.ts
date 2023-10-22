// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import MyPlugin
	from "src/main";
import {StyleWranglerTags}
	from "./style_wrangler_tags";
import {StyleWranglerKanban}
	from "./style_wrangler_kanban";
import {IStyleWrangler}
	from "./style_wrangler";
import {StyleWranglerKanbanCards}
	from "./style_wrangler_kanban_cards";
import {StyleWranglerKanbanTitles} from "./style_wrangler_kanban_titles";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleManager{
	plugin: MyPlugin;
	wrangler_tags: StyleWranglerTags;
	wrangler_kanban: StyleWranglerKanban;
	wrangler_kanban_cards: StyleWranglerKanbanCards;
	wrangler_kanban_titles: StyleWranglerKanbanTitles;

	private _style_wranglers: Array<IStyleWrangler>;


	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: MyPlugin) {
		this.plugin = plugin;
		this.wrangler_tags = new StyleWranglerTags(plugin)
		this.wrangler_kanban = new StyleWranglerKanban(plugin)
		this.wrangler_kanban_cards = new StyleWranglerKanbanCards(plugin)
		this.wrangler_kanban_titles = new StyleWranglerKanbanTitles(plugin)

		this._style_wranglers = new Array<IStyleWrangler>(
			this.wrangler_tags,
			this.wrangler_kanban,
			this.wrangler_kanban_cards,
			this.wrangler_kanban_titles,
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

		this.plugin.settings.enableKanbanTitles
			? this.wrangler_kanban_titles.apply_styles()
			: this.wrangler_kanban_titles.remove_styles() ;
	}

	applyAllStyles():void {
		this._style_wranglers.forEach(value => {value.apply_styles()})
	}

	removeAllStyles():void {
		this._style_wranglers.forEach(value => {value.remove_styles()})
	}
}
