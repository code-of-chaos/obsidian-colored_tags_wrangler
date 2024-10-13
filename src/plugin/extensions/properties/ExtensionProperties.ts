// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {AbstractExtension} from "../AbstractExtension";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordToggleComponent} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtensionRecordProperties} from "./IExtensionRecordProperties";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
import {EventHandlerProperties} from "./EventHandlerProperties";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionProperties extends AbstractExtension<IExtensionRecordProperties> {
	public cssWrangler: ICssWrangler | undefined = undefined;
	public extensionName = "Properties";
	public description = "Apply Tag Coloring to file note properties";
	
	public extensionRequirements = ["core"]

	public TableContentPopulators: TableContentPopulator[] = [
		{
			title: "Use tag color in file viewer",
			callback: (rowData) => new SettingTagRecordToggleComponent(rowData, "properties_folder_note_enabled"),
			classes: []
		},
		{
			title: "Use tag color as note background",
			callback: (rowData) => new SettingTagRecordToggleComponent(rowData, "properties_note_background_enabled"),
			classes: []
		},
		{
			title: "Use tag color as property tag",
			callback: (rowData) => new SettingTagRecordToggleComponent(rowData, "properties_note_tags_enabled"),
			classes: []
		},
	]

	public override eventHandlerPopulator: IEventHandlerPopulator = new EventHandlerProperties();

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public override getDefaultRecord(): IExtensionRecordProperties {
		return {
			properties_folder_note_enabled : true,
			properties_note_background_enabled : false,
			properties_note_tags_enabled : true,
		};
	}
}
