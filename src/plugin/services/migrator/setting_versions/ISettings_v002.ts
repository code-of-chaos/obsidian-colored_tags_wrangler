// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings_v002 {
	TagColors: {
		ColorPicker: Record<string, { tag_name: string, color: RGB }>,
		SemanticObsidianColors: Record<string, { tag_name: string, obsidian_css_var: string }>,
		CssVars: Record<string, { tag_name: string, color: string, background: string }>,

		Values: {
			BackgroundOpacity: number,
			BackgroundOpacityHover: number,
			SemanticColorsLuminanceOffset: number,
		}
	},

	Kanban: {
		Enable: boolean,
		EnableCards: boolean,
		EnableLists: boolean,

		Values: {
			CardBackgroundOpacity: number,
			CardBorderOpacity: number,
			ListBackgroundOpacity: number,
			ListBorderOpacity: number,
		},
	},

	Debug: {
		Enable: boolean,
	},

	Canvas: {
		Enable: boolean,

		Values: {
			CardBorderOpacity: number,
			CardBackgroundLuminanceOffset: number,
		},
	},
	Info: {
		SettingsVersion: number
	}
}
