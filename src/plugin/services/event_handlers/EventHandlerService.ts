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
import {EventHandlerEditorChange} from "./registrars/EventHandlerEditorChange";
import {EventHandlerCodeMirror} from "./registrars/EventHandlerCodeMirror";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerService implements IEventHandlerService {
	plugin: IColoredTagWranglerPlugin;
	fileOpen : EventHandlerFileOpen;
	activeLeafChange : EventHandlerFileOpen;
	metaDataCacheChanged : EventHandlerMetaDataCacheChanged;
	editorChanged : EventHandlerEditorChange;
	codeMirror: EventHandlerCodeMirror;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	public constructor(plugin: IColoredTagWranglerPlugin,) {
		this.plugin = plugin;
		this.fileOpen = new EventHandlerFileOpen(plugin)
		this.activeLeafChange = new EventHandlerActiveLeafChange(plugin)
		this.metaDataCacheChanged = new EventHandlerMetaDataCacheChanged(plugin)
		this.editorChanged = new EventHandlerEditorChange(plugin)
		this.codeMirror = new EventHandlerCodeMirror(plugin)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public async registerEvents(){
		const populators = ServiceProvider.extensions.EnabledList
			.map((extension) => extension.eventHandlerPopulator)

		return Promise.all([
			this.fileOpen.register(populators),
			this.activeLeafChange.register(populators),
			this.metaDataCacheChanged.register(populators),
			this.editorChanged.register(populators),
			this.codeMirror.register(populators)
		]);
	}
}
