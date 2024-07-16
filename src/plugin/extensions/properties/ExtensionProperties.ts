// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import $ from "jquery";
import {AbstractExtension} from "../AbstractExtension";
import {ICssWrangler} from "../../../contracts/plugin/services/css_styler/ICssWrangler";
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordToggleComponent} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtensionRecordProperties} from "./IExtensionRecordProperties";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
import {TFile} from "obsidian";
import {ServiceProvider} from "../../services/ServiceProvider";
import {rgbToString} from "../../../lib/ColorConverters";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionProperties extends AbstractExtension<IExtensionRecordProperties> {
	public cssWrangler: ICssWrangler | undefined = undefined;
	public extensionName = "Properties";
	public description = "Apply Tag Coloring to file note properties";
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

	public override populateEventHandlers() : IEventHandlerPopulator | undefined {
		return {
			FileOpenCanvas: async (_: TFile)=> {

			},
			FileOpenMd: async (_: TFile)=> {
				ServiceProvider.tagRecords.getTagsFlat(false)
					.filter(record => record.properties_note_tags_enabled)
					.forEach(record => {
						$('div[data-property-key="tags"]')
							.find(`div.multi-select-pill:has(span:contains("${record.core_tagText}"))`)
							.css('background-color', rgbToString(record.core_color_background))
							.css('color', rgbToString(record.core_color_foreground))

							// Find the svg element within the tag, so it can color the X
							// noinspection JSUnresolvedReference
							.find('svg')
							.css('stroke', rgbToString(record.core_color_foreground))

					})
			}

		}
	}
}
