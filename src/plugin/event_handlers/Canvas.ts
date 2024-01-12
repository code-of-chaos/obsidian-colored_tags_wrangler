// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

import {TFile} from "obsidian";
import $ from "jquery";

import {EventHandler} from "src/plugin/event_handlers/EventHandler";
import {get_tags} from "src/api/tags";
import {rgbToString} from "src/api/ColorConverters";
import {CanvasColoredTags} from "../commands/experimental";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerCanvas extends EventHandler{
	public async register(){
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'editor-change',
				async () => {
					console.warn("triggered")
					await CanvasColoredTags(this.plugin)
		}));
	}
	//
	// private async apply_css_note_properties(_:TFile):Promise<void>{
	// 	this.plugin.style_manager.wrangler_note_property_tags.assembleStyling();
	// }
	//
	// private async remove_css_note_properties(_:TFile):Promise<void>{
	// 	this.plugin.style_manager.wrangler_note_property_tags.removeStyling();
	//
	// }
	//
	// private async apply_css_note_backgrounds(_:TFile):Promise<void>{
	// 	this.plugin.style_manager.wrangler_note_background.assembleStyling();
	// }
	//
	// private async remove_css_note_backgrounds(_:TFile):Promise<void>{
	// 	this.plugin.style_manager.wrangler_note_background.removeStyling();
	// }
}
