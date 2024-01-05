// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings} from "src/plugin/settings/ISettings";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const DefaultSettings: ISettings = {
	// Main settings for colors to tags
	TagColors:{
		ColorPicker: [],

		EnableMultipleTags:true,
		EnableSeparateBackground:false,
		EnableSeparateLuminanceOffset:false, 	// can be removed
		EnableDarkLightDifference:true, 		// can be removed
		EnableBackgroundOpacity:false,

		Values:{
			BackgroundOpacity:0.45,
			LuminanceOffset:0.15
		}
	},

	CSS:{
		NoteTags:true,
		NoteProperties:true,
		NoteBackgrounds:false,

		TagsNoWrap: true,
		TagsNoWrapText: "pre",
	},

	// Extra integrations
	FolderNote:{
		Enable:false,
		FolderTagLinks:[],

		EnableAutoDetect:true,

		Values:{
			ForceImportant:true,
			BorderRadius:"12px",
			Padding:"5px",
		}
	},

	Kanban:{
		Enable:false,
		EnableCards:false,
		EnableLists:false,
		HideHashtags:false,

		Values:{
			CardBackgroundOpacity:0.2,
			CardBorderOpacity:0.3,
			ListBackgroundOpacity:0.2,
			ListBorderOpacity:0.3,
		},
	},

	Canvas:{
		Enable:false,

		Values:{
			CardBorderOpacity:0.3,
			CardBackgroundLuminanceOffset:0.15,
		}
	},

	// Extra stuff
	Debug:{
		Enable:false,
		EnableExperimentalCommands:false
	},

	Info: {
		SettingsVersion: 12 // UPDATE THIS WHEN YOU CHANGE ANYTHING IN THE SETTINGS!!!
	}
}
