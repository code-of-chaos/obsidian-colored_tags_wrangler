// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandler} from "../EventHandler";
import {IEventHandler} from "../../../../contracts/plugin/services/event_handlers/IEventHandler";
import {IEventHandlerPopulator} from "../../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
import {Editor} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerCodeMirror extends EventHandler implements IEventHandler {
	public override async register(populators:IEventHandlerPopulator[]) : Promise<void> {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'codemirror',
				async (cm) => {
					for (const populator of populators) {
						await populator.CodeMirror();
					}
				}
			)
		);
	}
}
