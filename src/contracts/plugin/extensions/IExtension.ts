// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../ui/components/TableContentPopulator";
import {IExtensionRecord} from "./IExtensionRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtension {
	readonly TableContentPopulators: TableContentPopulator[];
	readonly extensionName: string;

	getDefaultRecord():IExtensionRecord;
}
