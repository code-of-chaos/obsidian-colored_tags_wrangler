// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerPlugin} from "src/contracts/plugin/IColoredTagWranglerPlugin";
import {IEventHandler} from "../../../contracts/plugin/services/event_handlers/IEventHandler";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class EventHandler implements IEventHandler{
	plugin: IColoredTagWranglerPlugin;

	public constructor(plugin: IColoredTagWranglerPlugin,) {
		this.plugin = plugin;
	}
	public abstract register(populator:IEventHandlerPopulator[]) : Promise<void>;
}
