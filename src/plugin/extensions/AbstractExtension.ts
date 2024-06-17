// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtension} from "../../contracts/plugin/extensions/IExtension";
import {TableContentPopulator} from "../../contracts/plugin/ui/components/TableContentPopulator";
import {ICssWrangler} from "../../contracts/plugin/services/css_styler/ICssWrangler";
import {IExtensionRecord} from "../../contracts/plugin/extensions/IExtensionRecord";
import {ServiceProvider} from "../services/ServiceProvider";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class AbstractExtension implements IExtension {
	abstract readonly TableContentPopulators: TableContentPopulator[];
	abstract readonly cssWrangler: ICssWrangler;
	abstract readonly extensionName: string;
	abstract readonly description: string;

	public get isEnabled(): boolean {
		return ServiceProvider.extensions.EnabledList.contains(this)
	}

	public set isEnabled(value: boolean) {
		ServiceProvider.extensions.setExtension(this, value)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	abstract getDefaultRecord(): IExtensionRecord
}
