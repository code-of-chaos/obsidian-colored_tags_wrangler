// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecordCore} from "../../../plugin/extensions/core/IExtensionRecordCssStyling";
import {IExtensionRecordCssStyling} from "../../../plugin/extensions/styling/IExtensionRecordCssStyling";
import {IExtensionRecordCanvasCard} from "../../../plugin/extensions/canvas_card/IExtensionRecordCanvasCard";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagRecord extends IExtensionRecordCore, IExtensionRecordCssStyling,IExtensionRecordCanvasCard {
}
