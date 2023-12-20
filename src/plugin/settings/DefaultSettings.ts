// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings} from "src/plugin/settings/ISettings";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const DefaultSettings: ISettings = {
	TagColors:{
		ColorPicker: {},

		EnableMultipleTags:true,
		EnableSeparateBackground:false,
		EnableSeparateLuminanceOffset:false,
		EnableDarkLightDifference:true,
		EnableBackgroundOpacity:false,
		Values:{
			BackgroundOpacity:0.2,
			LuminanceOffset:0.15
		}
	},

	FolderNote:{
		Enable:false,
		FolderTagLinks:{},

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

	Debug:{
		Enable:false,
	},

	CSS:{
		Enable: false,
		TagsNoWrap: false,
		TagsNoWrapText: "pre",
	},

	Canvas:{
		Enable:false,

		Values:{
			CardBorderOpacity:0.3,
			CardBackgroundLuminanceOffset:0.15,
		}
	},
	Info: {
		SettingsVersion: 9 // UPDATE THIS WHEN YOU CHANGE ANYTHING IN THE SETTINGS!!!
	}
}
