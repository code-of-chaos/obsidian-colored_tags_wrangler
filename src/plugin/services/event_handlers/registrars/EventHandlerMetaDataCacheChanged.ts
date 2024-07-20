// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {EventHandler} from "../EventHandler";
import {IEventHandler} from "../../../../contracts/plugin/services/event_handlers/IEventHandler";
import {IEventHandlerPopulator} from "../../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
import {TFile} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerMetaDataCacheChanged extends EventHandler implements IEventHandler {
	public override async register(populators:IEventHandlerPopulator[]) : Promise<void> {
		this.plugin.registerEvent(
			this.plugin.app.metadataCache.on(
				'changed',
				async (file : TFile) => {
					// Exit clause
					if (file === null) return
					for (const populator of populators) {
						await populator.MetaDataCacheChanged(file);
					}
				}));
	}
}
