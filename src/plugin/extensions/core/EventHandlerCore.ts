// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandlerPopulator} from "../../services/event_handlers/EventHandlerPopulator";
import {ServiceProvider} from "../../services/ServiceProvider";
import $ from "jquery";
import {Editor, MarkdownFileInfo, MarkdownView, TFile, WorkspaceLeaf} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerCore extends EventHandlerPopulator{
	override ActiveLeafChange(_: WorkspaceLeaf): void | Promise<void> {this.processor()}
	override MetaDataCacheChanged(_: TFile): void | Promise<void> {this.processor()}
	override EditorChange(_: Editor, __: MarkdownView | MarkdownFileInfo): void | Promise<void> {this.processor()}
	override async FileOpenMd(_: TFile): Promise<void> {await sleep(500);this.processor()}
	override CodeMirror(): void | Promise<void> {this.processor()}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private processor() {
		ServiceProvider.tagRecords.getTagsFlat(false)
			.filter(record => record.properties_note_tags_enabled)
			.forEach(_ => {
				// Handle normal tags (without special characters causing split spans)
				$(".cm-hashtag-end")
					.filter((_, elem) => /[^a-z0-9-_]/i.test($(elem).text()))
					.each((_, elem) => {
						// Add the class based on the inner text
						const className = `ctw-tag-${$(elem).text().replace(/\//g, '-')}`;
						$(elem).addClass(className);
						$(elem).prev('.cm-hashtag-begin').addClass(className);
					});

				// Handle tags split by underscores or special characters
				$(".cm-hashtag-begin").each((_, elem) => {
					let currentElem = $(elem);
					let tagText = currentElem.text().slice(1);  // Remove the leading # symbol

					// Traverse through sibling spans for tags split by underscores or special chars
					let nextElem = currentElem.next();
					while (nextElem.length && nextElem.hasClass('cm-hashtag')) {
						tagText += nextElem.text();  // Combine text from all parts of the tag
						nextElem = nextElem.next();  // Move to the next element
					}

					// Create class name without the #
					const className = `ctw-tag-${tagText.replace(/\//g, '-')}`;

					// Apply the class to all spans that are part of the tag
					currentElem.addClass(className);  // Do not add the class to the #
					nextElem = currentElem.next();
					while (nextElem.length && nextElem.hasClass('cm-hashtag')) {
						nextElem.addClass(className);  // Apply class to tag parts
						nextElem = nextElem.next();  // Continue applying class to all parts
					}
				});
			});
	}

}
