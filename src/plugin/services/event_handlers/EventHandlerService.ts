// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IEventHandlerService} from "../../../contracts/plugin/services/event_handlers/IEventHandlerService";
import {EventHandlerFileOpen} from "./EventHandlerFileOpen";
import {IColoredTagWranglerPlugin} from "../../../contracts/plugin/IColoredTagWranglerPlugin";
import {ServiceProvider} from "../ServiceProvider";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerService implements IEventHandlerService {
	plugin: IColoredTagWranglerPlugin;
	fileOpen : EventHandlerFileOpen;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	public constructor(plugin: IColoredTagWranglerPlugin,) {
		this.plugin = plugin;
		this.fileOpen = new EventHandlerFileOpen(plugin)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public registerEvents(){
		const populators = ServiceProvider.extensions.EnabledList
			.map((extension) => extension.populateEventHandlers())
			.filter((eventPopulator) => {
				return eventPopulator !== undefined;
			})
			.map((eventPopulator) => eventPopulator as IEventHandlerPopulator)

		this.fileOpen.register(populators)
	}
}
