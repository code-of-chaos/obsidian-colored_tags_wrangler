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
	override async FileOpenMd(file: TFile): Promise<void> {await sleep(500);this.processor()}
	override CodeMirror(): void | Promise<void> {this.processor()}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private processor(){
		ServiceProvider.tagRecords.getTagsFlat(false)
			.filter(record => record.properties_note_tags_enabled && !/[^a-z0-9-_]/i.test(record.core_tagText))
			.forEach(record => {
				$(".cm-hashtag-end")
					.filter((_, elem) => /[^a-z0-9-_]/i.test($(elem).text()))
					.each((_, elem) => {
						// Add the class based on the inner text
						const className = `ctw-tag-${$(elem).text().replace(/\//g, '-')}`;
						$(elem).addClass(className);
						$(elem).prev('.cm-hashtag-begin').addClass(className);
					});
			})
	}
}
