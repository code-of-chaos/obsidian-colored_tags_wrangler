// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

import {TFile} from "obsidian";
import $ from "jquery";

import {EventHandler} from "src/plugin/event_handlers/EventHandler";
import {get_tags} from "src/api/tags";
import {rgbToString} from "src/api/ColorConverters";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerFileOpen extends EventHandler{
	public async register(){
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'file-open',
				async (file) => {
					// Exit clause
					if (file === null) {
						return
					}

					this.plugin.settings.CSS.NoteProperties
						? await this.apply_css_note_properties(file)
						: await this.remove_css_note_properties(file);

					this.plugin.settings.CSS.NoteBackgrounds
						? await this.apply_css_note_backgrounds(file)
						: await this.remove_css_note_backgrounds(file);
		}));
	}

	private async apply_css_note_properties(_:TFile):Promise<void>{
		this.plugin.style_manager.wrangler_note_property_tags.assembleStyling();
	}

	private async remove_css_note_properties(_:TFile):Promise<void>{
		this.plugin.style_manager.wrangler_note_property_tags.removeStyling();

	}

	private async apply_css_note_backgrounds(_:TFile):Promise<void>{
		this.plugin.style_manager.wrangler_note_background.assembleStyling();
	}

	private async remove_css_note_backgrounds(_:TFile):Promise<void>{
		this.plugin.style_manager.wrangler_note_background.removeStyling();
	}
}
