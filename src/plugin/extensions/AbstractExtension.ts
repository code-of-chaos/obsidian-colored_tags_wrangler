// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtension} from "src/contracts/plugin/extensions/IExtension";
import {TableContentPopulator} from "src/contracts/plugin/ui/components/TableContentPopulator";
import {ICssWrangler} from "src/contracts/plugin/services/css_styler/ICssWrangler";
import {IExtensionRecord} from "src/contracts/plugin/extensions/IExtensionRecord";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {IEventHandlerPopulator} from "../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class AbstractExtension<T extends IExtensionRecord> implements IExtension<T> {
	public abstract readonly TableContentPopulators: TableContentPopulator[];
	public abstract readonly cssWrangler: ICssWrangler | undefined;
	public abstract readonly extensionName: string;
	public abstract readonly description: string;
	public readonly extensionRequirements: string[] = [];
	
	public get isEnabled(): boolean {
		return ServiceProvider.extensions.EnabledList.contains(this)
	}

	public set isEnabled(value: boolean) {
		ServiceProvider.extensions.setExtension(this, value)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	abstract getDefaultRecord(): T
	populateEventHandlers() : IEventHandlerPopulator | undefined {
		return undefined;
	}
}
