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

					if (this.plugin.settings.CSS.NoteProperties){
						await this.callback_css_note_properties(file);
					}

					if (this.plugin.settings.CSS.NoteBackgrounds){
						await this.callback_css_note_backgrounds(file);
					}
		}));
	}

	private async callback_css_note_properties(_:TFile):Promise<void>{
		const tags = get_tags(this.plugin);
		tags.map(
			({tag_name, color, background_color}) =>{
				// noinspection TypeScriptValidateJSTypes
				const element = $('div[data-property-key="tags"]')
					.find(`div.multi-select-pill:has(span:contains("${tag_name}"))`)

				console.warn({tag_name, element})

				element
					.css('background-color', rgbToString(background_color))
					.css('color', rgbToString(color));

				// Find the svg element within the tag, so it can color the X
				element
					.find('svg')
					.css('stroke', rgbToString(color))

			}
		)
	}
	private async callback_css_note_backgrounds(_:TFile):Promise<void>{
		const tags = get_tags(this.plugin);
		tags.map(
			({tag_name, background_color}) =>{
				const page = $('div.workspace-leaf-content[data-type="markdown"] div.view-content');
				const tag = page.find($(`div.multi-select-pill:has(span:contains("${tag_name}"))`));

				// noinspection JSUnresolvedReference
				if (tag.length !== 0) {
					page.css('background-color', rgbToString(background_color))
				}
			}
		)
	}
}
