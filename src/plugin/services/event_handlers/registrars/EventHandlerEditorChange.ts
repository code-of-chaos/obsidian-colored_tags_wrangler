// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandler} from "../EventHandler";
import {IEventHandler} from "../../../../contracts/plugin/services/event_handlers/IEventHandler";
import {IEventHandlerPopulator} from "../../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
import {Editor, MarkdownFileInfo, MarkdownView} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerEditorChange extends EventHandler implements IEventHandler {
	public override async register(populators:IEventHandlerPopulator[]) : Promise<void> {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'editor-change',
				async (editor: Editor, info: MarkdownView | MarkdownFileInfo) => {
					for (const populator of populators) {
						await populator.EditorChange(editor, info);
					}
				})
		)
	}
}
