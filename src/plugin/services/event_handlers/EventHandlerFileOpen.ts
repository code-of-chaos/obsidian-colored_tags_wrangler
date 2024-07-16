// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandler} from "./EventHandler";
import {IEventHandler} from "../../../contracts/plugin/services/event_handlers/IEventHandler";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerFileOpen extends EventHandler implements IEventHandler {
	public override async register(populators:IEventHandlerPopulator[]) : Promise<void> {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'file-open',
				async (file) => {
					// Exit clause
					if (file === null) return

					switch (file.extension) {
						case "md": {
							for (const populator of populators) {
								await populator.FileOpenMd(file);
							}
							break;
						}
						case "canvas":{
							for (const populator of populators) {
								await populator.FileOpenCanvas(file);
							}
							break;
						}
						default : {
							break;
						}
					}
				}));
	}
}
