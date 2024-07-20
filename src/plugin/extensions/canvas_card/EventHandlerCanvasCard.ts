// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandlerPopulator} from "../../services/event_handlers/EventHandlerPopulator";
import {ServiceProvider} from "../../services/ServiceProvider";
import $ from "jquery";
import {TFile} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerCanvasCard extends EventHandlerPopulator{
	override async FileOpenCanvas(file: TFile): Promise<void> {await this.processor()}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private async processor(){
		await sleep(1000);
		ServiceProvider.tagRecords.getTagsFlat(false)
			.filter(record => record.properties_note_tags_enabled)
			.forEach(record => {
				// noinspection CssUnusedSymbol
				$(`div.canvas-node > div.canvas-node-container:has(a.tag[href="#${record.core_tagText}"]), 
				   div.canvas-node:has(div.canvas-node-container:has(a.tag[href="#${record.core_tagText}"])), 
				   div.canvas-node-container:has(div.markdown-embed-content a[href="#${record.core_tagText}"])`)
					.each((_, domElement) => {
						console.warn(domElement)
						domElement.addClass(`ctw-canvas-${record.core_tagText.replace(/\//g, '-')}`);
					});
			})
	}
}
