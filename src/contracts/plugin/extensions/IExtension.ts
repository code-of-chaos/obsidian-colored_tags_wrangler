// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../ui/components/TableContentPopulator";
import {IExtensionRecord} from "./IExtensionRecord";
import {ICssWrangler} from "../services/css_styler/ICssWrangler";
import {IEventHandlerPopulator} from "../services/event_handlers/IEventHandlerPopulator";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtension<T extends IExtensionRecord> {
	readonly TableContentPopulators: TableContentPopulator[];
	readonly extensionName: string;
	readonly description: string;
	readonly cssWrangler: ICssWrangler | undefined;
	readonly extensionRequirements: string[];

	get isEnabled(): boolean
	set isEnabled(value: boolean)

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	getDefaultRecord(): T;
	populateEventHandlers() : IEventHandlerPopulator | undefined;
}
