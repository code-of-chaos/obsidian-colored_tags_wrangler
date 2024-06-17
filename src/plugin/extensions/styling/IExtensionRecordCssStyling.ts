// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecord} from "../../../contracts/plugin/extensions/IExtensionRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtensionRecordCssStyling extends IExtensionRecord {
	css_styling_enabled: boolean
	css_styling_bold_enabled: boolean;
	css_styling_font_family: string;
	css_styling_font_size: number;
	css_styling_italic_enabled: boolean;
	css_styling_opacity:number;
}
