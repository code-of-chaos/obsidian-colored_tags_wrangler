// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagRecord {
	tag : string,
	color_foreground : RGB, // color for tag's text
	color_background : RGB, // color for tag's background

	// Extra options below this point.
	allow_nested: boolean,
	nested_offset: number,	// offset for nested tag's ( #a/b ) color. Default should be 0
}
