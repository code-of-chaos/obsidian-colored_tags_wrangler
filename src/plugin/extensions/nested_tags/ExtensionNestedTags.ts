// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {AbstractExtension} from "../AbstractExtension";
import {CssWranglerNestedTags} from "./CssWranglerNestedTags";
import {IExtensionRecordNestedTags} from "./IExtensionRecordNestedTags";
import {ServiceProvider} from "../../services/ServiceProvider";
import {debounce, Debouncer} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionNestedTags extends AbstractExtension<IExtensionRecordNestedTags> {
	public override cssWrangler = new CssWranglerNestedTags();
	public override extensionName = 'nested tags';
	public override description = "Allow nested tags to inherit colors";

	public extensionRequirements = ["core"]

	public TableContentPopulators: TableContentPopulator[] = [

	]

	private readonly debouncedUpdate : Debouncer<[], void>;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor() {
		super();

		this.debouncedUpdate = debounce(() => {
			ServiceProvider.vaultTags.invalidate()
			if (ServiceProvider.extensions.EnabledListAsStrings.contains(ServiceProvider.extensions.Extensions.NestedTags.extensionName)) {
				ServiceProvider.cssStyler.processExtensions()
			}
		}, 1000, true)

		ServiceProvider.plugin.registerEvent(ServiceProvider.plugin.app.vault.on("modify", this.debouncedUpdate))
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public getDefaultRecord(): IExtensionRecordNestedTags {
		return {

		}
	}
}
