// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export enum ObsidianSemanticColors {
	background_primary = 				"--background-primary",
	background_primary_alt = 			"--background-primary-alt",
	background_secondary = 				"--background-secondary",
	background_secondary_alt = 			"--background-secondary-alt",
	background_modifier_hover = 		"--background-modifier-hover",
	background_modifier_active_hover = 	"--background-modifier-active-hover",
	background_modifier_border = 		"--background-modifier-border",
	background_modifier_border_hover = 	"--background-modifier-border-hover",
	background_modifier_border_focus = 	"--background-modifier-border-focus",
	background_modifier_error_rgb = 	"--background-modifier-error-rgb",
	background_modifier_error = 		"--background-modifier-error",
	background_modifier_error_hover = 	"--background-modifier-error-hover",
	background_modifier_success_rgb = 	"--background-modifier-success-rgb",
	background_modifier_success = 		"--background-modifier-success",
	background_modifier_message = 		"--background-modifier-message",
	background_modifier_form_field = 	"--background-modifier-form-field",

	interactive_normal =				"--interactive-normal",
	interactive_hover =					"--interactive-hover",
	interactive_accent =				"--interactive-accent",
	interactive_accent_hsl =			"--interactive-accent-hsl",
	interactive_accent_hover =			"--interactive-accent-hover",

	text_normal =						"--text-normal",
	text_muted =						"--text-muted",
	text_faint =						"--text-faint",
	text_on_accent =					"--text-on-accent",
	text_on_accent_inverted =			"--text-on-accent-inverted",
	text_success =						"--text-success",
	text_warning =						"--text-warning",
	text_error =						"--text-error",
	text_accent =						"--text-accent",
	text_accent_hover =					"--text-accent-hover",

	text_selection =					"--text-selection",
	text_highlight_bg =					"--text-highlight-bg"

}

export interface IObsidianSemanticColorsIndex{
	[key: string]: ObsidianSemanticColors;
}
