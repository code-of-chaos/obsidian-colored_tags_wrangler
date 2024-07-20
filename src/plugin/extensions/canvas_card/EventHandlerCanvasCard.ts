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
		await sleep(500); // eh, it works because we need to wait a bit for all items to load
		ServiceProvider.tagRecords.getTagsFlat(false)
			.filter(record => record.properties_note_tags_enabled)
			.forEach(record => {
				$(`div.canvas-node-container:has(div.markdown-embed-content a[href="#${record.core_tagText}"])`)
					.each((_, domElement) => {
						domElement.addClass(`ctw-canvas-${record.core_tagText.replace(/\//g, '-')}`);
					});

				if (ServiceProvider.extensions.Extensions.NestedTags.isEnabled){
					$(`div.canvas-node-container:has(div.markdown-embed-content a[href^="#${record.core_tagText}/"])`)
						.each((_, domElement) => {
							domElement.addClass(`ctw-canvas-${record.core_tagText.replace(/\//g, '-')}`);
						});
				}
			})
	}
}
