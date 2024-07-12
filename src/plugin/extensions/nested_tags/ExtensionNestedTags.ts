// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "src/contracts/plugin/ui/components/TableContentPopulator";
import {AbstractExtension} from "src/plugin/extensions/AbstractExtension";
import {CssWranglerNestedTags} from "src/plugin/extensions/nested_tags/CssWranglerNestedTags";
import {IExtensionRecordNestedTags} from "src/plugin/extensions/nested_tags/IExtensionRecordNestedTags";
import {ServiceProvider} from "src/plugin/services/ServiceProvider";
import {debounce, Debouncer} from "obsidian";
import {DropDownOptions, DropDownOptionsAsRecord, DropdownOptionsFromString} from "src/plugin/extensions/nested_tags/DropDownOptions";
import {SettingTagRecordDropdownComponent} from "src/plugin/ui/setting_tab/components/tag_table/SettingTagRecordDropdown";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionNestedTags extends AbstractExtension<IExtensionRecordNestedTags> {
	public override cssWrangler = new CssWranglerNestedTags();
	public override extensionName = 'nested tags';
	public override description = "Allow nested tags to inherit colors";

	public extensionRequirements = ["core"]

	public TableContentPopulators: TableContentPopulator[] = [
		{
			title: "Select Color progression",
			callback: (rowData) => new SettingTagRecordDropdownComponent(
				rowData,
				"nested_tags_dropdown",
				DropDownOptionsAsRecord(),
				DropdownOptionsFromString
			),
			classes: ["header-wrap-every-word", "border-right-dotted"]
		}

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
		}, 100, true)

		ServiceProvider.plugin.registerEvent(ServiceProvider.plugin.app.vault.on("modify", this.debouncedUpdate))
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public getDefaultRecord(): IExtensionRecordNestedTags {
		return {
			nested_tags_dropdown: DropDownOptions.Same
		}
	}
}
