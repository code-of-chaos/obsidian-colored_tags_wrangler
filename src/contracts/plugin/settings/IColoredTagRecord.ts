// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecordCore} from "../../../plugin/extensions/core/IExtensionRecordBoldify";
import {IExtensionRecordBoldify} from "../../../plugin/extensions/boldify/IExtensionRecordBoldify";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagRecord extends
	IExtensionRecordCore,
	IExtensionRecordBoldify
{}
