// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandler} from "../EventHandler";
import {IEventHandler} from "../../../../contracts/plugin/services/event_handlers/IEventHandler";
import {IEventHandlerPopulator} from "../../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerActiveLeafChange extends EventHandler implements IEventHandler {
	public override async register(populators:IEventHandlerPopulator[]) : Promise<void> {
		this.plugin.registerEvent(
			this.plugin.app.workspace.on(
				'active-leaf-change',
				async (leaf) => {
					// Exit clause
					if (leaf === null) return
					for (const populator of populators) {
						await populator.ActiveLeafChange(leaf);
					}
				}));
	}
}
