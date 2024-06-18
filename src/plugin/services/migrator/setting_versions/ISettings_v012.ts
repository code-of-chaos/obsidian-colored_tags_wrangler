// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings_v012 {
	// Main settings for colors to tags
	TagColors: {
		ColorPicker: Array<object>,

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
		FolderTagLinks: Array<{ folder_path: string, tag_name: string }>,

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
		EnableExperimentalCommands: boolean,
	},

	Info: {
		SettingsVersion: number
	}
}
