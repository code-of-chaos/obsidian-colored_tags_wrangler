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
	public override register(populators:IEventHandlerPopulator[]) : void {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'file-open',
				async (file) => {
					// Exit clause
					if (file === null) return

					switch (file.extension) {
						case "md": {
							console.log("opened MD file")
							populators.forEach(populator => populator.FileOpenMd(file))
							break;
						}
						case "canvas":{
							console.log("opened CANVAS file")
							populators.forEach(populator => populator.FileOpenCanvas(file))
							break;
						}
						default : {
							console.log("opened unknown filetype")
							break;
						}
					}
				}));
	}
}
