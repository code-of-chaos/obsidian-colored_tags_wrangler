// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandler} from "src/plugin/event_handlers/EventHandler";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerActiveLeafChange extends EventHandler{
	public async register() {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'active-leaf-change',
				async (leaf) => {
					if (this.plugin.settings.Canvas.Enable
						&& leaf?.getViewState().type === "canvas"){
							await delay(1000);
							// Now the leaf has finished loading, hopefully
							this.plugin.style_manager.wrangler_canvas_node_background.assembleStyling();
						}
					}
			))
	}
}
