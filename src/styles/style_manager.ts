// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import MyPlugin from "src/main";
import {StyleWranglerTags} from "./style_wrangler_tags";
import {StyleWranglerKanban} from "./style_wrangler_kanban";
import {IStyleWrangler} from "./style_wrangler";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleManager{
	plugin: MyPlugin;
	wrangler_tags: StyleWranglerTags;
	wrangler_kanban: StyleWranglerKanban;

	private _style_wranglers: Array<IStyleWrangler>;


	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin: MyPlugin) {
		this.plugin = plugin;
		this.wrangler_tags = new StyleWranglerTags(plugin)
		this.wrangler_kanban = new StyleWranglerKanban(plugin)

		this._style_wranglers = new Array<IStyleWrangler>(
			this.wrangler_tags,
			this.wrangler_kanban
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
	}

	applyAllStyles():void {
		this._style_wranglers.forEach(value => {value.apply_styles()})
	}

	removeAllStyles():void {
		this._style_wranglers.forEach(value => {value.remove_styles()})
	}
}
