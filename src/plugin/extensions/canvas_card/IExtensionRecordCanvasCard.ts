// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecord} from "src/contracts/plugin/extensions/IExtensionRecord";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtensionRecordCanvasCard extends IExtensionRecord {
	canvas_card_enable_border: boolean,
	canvas_card_enable_background: boolean,
	canvas_card_background_opacity: number,
	canvas_card_priority: number|undefined,
}
