// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/plugin/style_manager/css_wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerKanbanHashtags extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css_light(): Array<string> {
		return [this.assemble_css()]
	}

	assemble_css_dark(): Array<string> {
		return [this.assemble_css()]
	}

	private assemble_css(){
		return`
		div[data-type="kanban"] a.tag>span,
		div.kanban-plugin a.tag>span,
		div[data-type="kanban"] .cm-hashtag-begin {
			visibility: hidden;
			position: absolute;
		}`

	}

}
