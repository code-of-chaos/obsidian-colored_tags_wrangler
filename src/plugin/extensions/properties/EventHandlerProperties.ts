// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandlerPopulator} from "../../services/event_handlers/EventHandlerPopulator";
import {ServiceProvider} from "../../services/ServiceProvider";
import $ from "jquery";
import {TFile, WorkspaceLeaf} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerProperties extends EventHandlerPopulator{
	override ActiveLeafChange(_: WorkspaceLeaf): void | Promise<void> {this.processor()}
	override MetaDataCacheChanged(_: TFile): void | Promise<void> {this.processor()}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private processor(){
		ServiceProvider.tagRecords.getTagsFlat(false)
			.filter(record => record.properties_note_tags_enabled)
			.forEach(record => {
				$('div[data-property-key="tags"]')
					.find(`div.multi-select-pill:has(span:contains("${record.core_tagText}"))`)
					.each((_, domElement) => {
						const querySpanContains = $(domElement).find(`span:contains("${record.core_tagText}")`);
						if (querySpanContains.length == 0) return;

						const tag_body = querySpanContains[0];
						const new_class = `ctw-tag-${tag_body.innerText.replace(/\//g, '-')}`;
						domElement.addClass(new_class);
						tag_body.addClass(new_class);
						$(domElement).find('svg').each((_, e) => {$(e).addClass(new_class);});
				});

			})
	}
}
