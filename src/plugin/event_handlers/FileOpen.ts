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
		const tags = get_tags(this.plugin.settings.TagColors.ColorPicker, this.plugin.settings?.TagColors.EnableMultipleTags, false);
		tags.map(
			({tag_name, color, background_color}) =>{
				// noinspection TypeScriptValidateJSTypes
				const element = $('div[data-property-key="tags"]')
					.find(`div.multi-select-pill:has(span:contains("${tag_name}"))`)

				// noinspection JSUnresolvedReference
				element
					.css('background-color', rgbToString(background_color))
					.css('color', rgbToString(color));

				// Find the svg element within the tag, so it can color the X
				// noinspection JSUnresolvedReference
				element
					.find('svg')
					.css('stroke', rgbToString(color))

			}
		)
	}

	private async remove_css_note_properties(_:TFile):Promise<void>{
		const tags = get_tags(this.plugin.settings.TagColors.ColorPicker, this.plugin.settings?.TagColors.EnableMultipleTags, false);
		tags.map(
			({tag_name}) =>{
				// noinspection TypeScriptValidateJSTypes
				const element = $('div[data-property-key="tags"]')
					.find(`div.multi-select-pill:has(span:contains("${tag_name}"))`)

				// noinspection JSUnresolvedReference
				element
					.removeAttr("style")

				// Find the svg element within the tag, so it can color the X
				// noinspection JSUnresolvedReference
				element
					.find('svg')
					.removeAttr("style")

			}
		)
	}

	private async apply_css_note_backgrounds(_:TFile):Promise<void>{
		const tags = get_tags(this.plugin.settings.TagColors.ColorPicker, this.plugin.settings?.TagColors.EnableMultipleTags, false);
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

	private async remove_css_note_backgrounds(_:TFile):Promise<void>{
		const page = $('div.workspace-leaf-content[data-type="markdown"] div.view-content');
		page.removeAttr("style");
	}
}
