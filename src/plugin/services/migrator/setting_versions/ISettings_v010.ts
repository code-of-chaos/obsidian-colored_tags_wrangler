// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings_v010 {
	// Main settings for colors to tags
	TagColors: {
		ColorPicker: Record<
			string,
			object
		>,

		EnableMultipleTags: boolean,
		EnableSeparateBackground: boolean,
		EnableSeparateLuminanceOffset: boolean,
		EnableDarkLightDifference: boolean,
		EnableBackgroundOpacity: boolean,
		Values: {
			BackgroundOpacity: number,
			LuminanceOffset: number,
		}
	},

	CSS: {
		NoteTags: boolean,
		NoteProperties: boolean,
		NoteBackgrounds: boolean,

		TagsNoWrap: boolean,
		TagsNoWrapText: string,
	},

	// Extra integrations
	FolderNote: {
		Enable: boolean
		FolderTagLinks: Record<
			string,
			{ folder_path: string, tag_name: string }
		>,

		EnableAutoDetect: boolean,

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
		HideHashtags: boolean,

		Values: {
			CardBackgroundOpacity: number,
			CardBorderOpacity: number,
			ListBackgroundOpacity: number,
			ListBorderOpacity: number,
		},
	},

	Canvas: {
		Enable: boolean,

		Values: {
			CardBorderOpacity: number,
			CardBackgroundLuminanceOffset: number,
		},
	},

	// Extra stuff
	Debug: {
		Enable: boolean,
	},

	Info: {
		SettingsVersion: number
	}
}
