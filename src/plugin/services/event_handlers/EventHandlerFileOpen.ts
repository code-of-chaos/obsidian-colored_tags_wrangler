// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandler} from ".old/plugin/event_handlers/EventHandler";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class EventHandlerFileOpen extends EventHandler implements EventHandler {
	public register()  {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'file-open',
				async (file) => {
					// Exit clause
					if (file === null) return

					switch (file.extension) {
						case "md": {
							console.log("opened MD file")
							break;
						}
						case "canvas":{
							console.log("opened CANVAS file")
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
