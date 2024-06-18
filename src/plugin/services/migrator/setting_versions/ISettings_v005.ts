// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings_v005 {
	TagColors: {
		ColorPicker: Record<string, {
			tag_name: string,
			color: RGB,
			background_color: RGB,
			background_opacity: number
		}>,

		EnableMultipleTags: boolean,
		EnableSeparateBackground: boolean,
		Values: {
			BackgroundOpacity: number,
			BackgroundOpacityHover: number,
			SemanticColorsLuminanceOffset: number,
		}
	},

	FolderNote: {
		Enable: boolean
		FolderTagLinks: Record<string, { folder_path: string, tag_name: string }>,

		Values: {
			ForceImportant: boolean,
			BorderRadius: string,
			Padding: string,
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
