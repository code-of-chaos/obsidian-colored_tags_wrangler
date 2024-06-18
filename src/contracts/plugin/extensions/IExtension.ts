// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../ui/components/TableContentPopulator";
import {IExtensionRecord} from "./IExtensionRecord";
import {ICssWrangler} from "../services/css_styler/ICssWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtension<T extends IExtensionRecord> {
	readonly TableContentPopulators: TableContentPopulator[];
	readonly extensionName: string;
	readonly description: string;
	readonly cssWrangler: ICssWrangler;
	readonly extensionRequirements: string[];

	get isEnabled(): boolean
	set isEnabled(value: boolean)

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	getDefaultRecord(): T;
}
