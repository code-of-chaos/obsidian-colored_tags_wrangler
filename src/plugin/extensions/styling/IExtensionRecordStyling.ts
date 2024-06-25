// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionRecord} from "../../../contracts/plugin/extensions/IExtensionRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IExtensionRecordStyling extends IExtensionRecord {
	// css_styling_enabled: boolean // No longer present as this is handled differently
	css_styling_bold_enabled: boolean;
	css_styling_font_family: string;
	css_styling_font_size: number;
	css_styling_italic_enabled: boolean;
	css_styling_opacity:number;
}
