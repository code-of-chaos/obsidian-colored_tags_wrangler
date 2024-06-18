// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings_v003 {
	TagColors: {
		ColorPicker: Record<string, { tag_name: string, color: RGB }>,
		SemanticObsidianColors: Record<string, { tag_name: string, obsidian_css_var: string }>,
		CssVars: Record<string, { tag_name: string, color: string, background: string }>,

		EnableMultipleTags: boolean,

		Values: {
			BackgroundOpacity: number,
			BackgroundOpacityHover: number,
			SemanticColorsLuminanceOffset: number,
		}
	},

	FolderNote: {
		Enable: boolean
		FolderTagLinks: Record<string, { folder_path: string, tag_name: string }>;
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
