// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecordCore} from "../../../plugin/extensions/core/IExtensionRecordCssStyling";
import {IExtensionRecordStyling} from "../../../plugin/extensions/styling/IExtensionRecordStyling";
import {IExtensionRecordCanvasCard} from "../../../plugin/extensions/canvas_card/IExtensionRecordCanvasCard";
import {IExtensionRecordNestedTags} from "../../../plugin/extensions/nested_tags/IExtensionRecordNestedTags";
import {IExtensionRecordProperties} from "../../../plugin/extensions/properties/IExtensionRecordProperties";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagRecord extends
	IExtensionRecordCore,
	IExtensionRecordStyling,
	IExtensionRecordCanvasCard,
	IExtensionRecordNestedTags,
	IExtensionRecordProperties
{}
