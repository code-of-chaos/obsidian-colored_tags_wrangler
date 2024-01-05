// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerKanbanHashtags extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCssLight(): Array<string> {
		return this.assemble_css()
	}

	assembleCssDark(): Array<string> {
		return this.assemble_css()
	}

	private assemble_css(){
		return[`
		div[data-type="kanban"] a.tag>span,
		div.kanban-plugin a.tag>span,
		div[data-type="kanban"] .cm-hashtag-begin {
			visibility: hidden;
			position: absolute;
		}`]

	}

}
