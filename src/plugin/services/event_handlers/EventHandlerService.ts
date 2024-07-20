// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IEventHandlerService} from "../../../contracts/plugin/services/event_handlers/IEventHandlerService";
import {EventHandlerFileOpen} from "./registrars/EventHandlerFileOpen";
import {IColoredTagWranglerPlugin} from "../../../contracts/plugin/IColoredTagWranglerPlugin";
import {ServiceProvider} from "../ServiceProvider";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
import {EventHandlerActiveLeafChange} from "./registrars/EventHandlerActiveLeafChange";
import {EventHandlerMetaDataCacheChanged} from "./registrars/EventHandlerMetaDataCacheChanged";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerService implements IEventHandlerService {
	plugin: IColoredTagWranglerPlugin;
	fileOpen : EventHandlerFileOpen;
	activeLeafChange : EventHandlerFileOpen;
	metaDataCacheChanged : EventHandlerMetaDataCacheChanged;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	public constructor(plugin: IColoredTagWranglerPlugin,) {
		this.plugin = plugin;
		this.fileOpen = new EventHandlerFileOpen(plugin)
		this.activeLeafChange = new EventHandlerActiveLeafChange(plugin)
		this.metaDataCacheChanged = new EventHandlerMetaDataCacheChanged(plugin)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public async registerEvents(){
		const populators = ServiceProvider.extensions.EnabledList
			.map((extension) => extension.eventHandlerPopulator)

		await this.fileOpen.register(populators)
		await this.activeLeafChange.register(populators)
		await this.metaDataCacheChanged.register(populators)
	}
}
