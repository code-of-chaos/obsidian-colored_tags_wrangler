// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGBA} from "../../types/RGBA";
import {IColoredTagRecordBoldifyExtension} from "../../../plugin/extensions/boldify/boldify";
import {ExtraButtonComponent} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagRecord extends IColoredTagRecordBoldifyExtension {
	id: string
	tagText : string,
	color : RGBA, // color for tag's text
	backgroundColor : RGBA, // color for tag's background
	enabled : boolean,
}


export type IColoredTagRecordBooleanProperties = "enabled" | "ext_boldify"
