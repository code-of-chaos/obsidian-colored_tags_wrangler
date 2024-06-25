// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecordCore} from "../../../plugin/extensions/core/IExtensionRecordCssStyling";
import {IExtensionRecordStyling} from "../../../plugin/extensions/styling/IExtensionRecordStyling";
import {IExtensionRecordCanvasCard} from "../../../plugin/extensions/canvas_card/IExtensionRecordCanvasCard";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagRecord extends IExtensionRecordCore, IExtensionRecordStyling,IExtensionRecordCanvasCard {
}
