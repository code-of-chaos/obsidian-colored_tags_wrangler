// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "src/contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordToggleComponent} from "src/plugin/ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {AbstractExtension} from "src/plugin/extensions/AbstractExtension";
import {CssWranglerCanvasCard} from "src/plugin/extensions/canvas_card/CssWranglerCanvasCard";
import {IExtensionRecordCanvasCard} from "src/plugin/extensions/canvas_card/IExtensionRecordCanvasCard";
import {SettingTagRecordSliderComponent} from "src/plugin/ui/setting_tab/components/tag_table/SettingTagRecordSliderComponent";
import {
	SettingTagRecordNumberInputComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordNumberInputComponent";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";
import {EventHandlerCanvasCard} from "./EventHandlerCanvasCard";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionCanvasCard extends AbstractExtension<IExtensionRecordCanvasCard> {
	public override cssWrangler = new CssWranglerCanvasCard();
	public override extensionName = 'canvas cards';
	public override description = "Apply Tag formatting to Canvas Cards";

	public extensionRequirements = ["core"]

	public TableContentPopulators: TableContentPopulator[] = [
		{
			title: "Enable Border",
			callback: (rowData) => {
				return new SettingTagRecordToggleComponent(rowData,
					"canvas_card_enable_border");
			},
			classes: ["header-wrap-every-word"]
		}, {
			title: "Enable Background",
			callback: (rowData) => {
				return new SettingTagRecordToggleComponent(rowData,
					"canvas_card_enable_background");
			},
			classes: ["header-wrap-every-word"]
		},{
			title: "Background Opacity",
			callback: (rowData) => {
				return new SettingTagRecordSliderComponent(rowData,
					"canvas_card_background_opacity",
					0.0, 1.0, .01,
					true,
					this.getDefaultRecord().canvas_card_background_opacity
				);
			},
			classes: ["header-wrap-every-word"]
		},{
			title: "Priority",
			callback: (rowData) => {
				return new SettingTagRecordNumberInputComponent(rowData,
					"canvas_card_priority"
				);
			},
			classes: ["header-wrap-every-word"]
		},
	]

	public override eventHandlerPopulator : IEventHandlerPopulator = new EventHandlerCanvasCard();

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public getDefaultRecord(): IExtensionRecordCanvasCard {
		return {
			canvas_card_enable_border: true,
			canvas_card_enable_background: true,
			canvas_card_background_opacity: 0.45,
			canvas_card_priority : undefined
		}
	}
}
