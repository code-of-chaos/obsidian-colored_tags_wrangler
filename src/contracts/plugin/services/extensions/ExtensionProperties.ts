// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export type BooleanProperties =
	"core_enabled"

	// Css Styling Extension
	| "css_styling_enabled"
	| "css_styling_bold_enabled"
	| "css_styling_italic_enabled"
	| "canvas_card_enable_border"
	| "canvas_card_enable_background"
;

export type NumberProperties =

	// Css Styling Extension
	"css_styling_font_size"
	| "css_styling_opacity"
	| "canvas_card_background_opacity"
	| "canvas_card_priority"
;

export type TextProperties =

	// Css Styling Extension
	"css_styling_font_family"
;

export type TextAreaProperties =
	"core_tagText"
;

export type RGBSelectorProperties =
	"core_color_foreground"
	| "core_color_background"
;

export type DropdownProperties =
	"nested_tags_dropdown"
