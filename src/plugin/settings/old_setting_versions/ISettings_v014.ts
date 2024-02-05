// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColorPicker} from "src/api/interfaces/IColorPicker";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings_v014 {
	// Main settings for colors to tags
	TagColors:{
        ColorPicker: Array<IColorPicker>,

        EnableMultipleTags:boolean,
        EnableSeparateBackground:boolean,
        EnableBackgroundOpacity:boolean,
        Values:{
            BackgroundOpacity:number,
            LuminanceOffset:number,
        }
    },

	CSS:{
		NoteTags:boolean,
		NoteProperties:boolean,
		NoteBackgrounds:boolean,

		TagsNoWrap:boolean,
		TagsNoWrapText:string,
	},

	// Extra integrations
	FolderNote:{
        Enable:boolean
        FolderTagLinks:Array<{folder_path:string, tag_name:string}>,

        EnableAutoDetect:boolean,
        EnableBackgroundOpacity:boolean,

        Values:{
            BackgroundOpacity:number,
            ForceImportant:boolean,
            BorderRadius:string,
            Padding:string,
        }
    },

    Kanban:{
        Enable: boolean,
        EnableCards:boolean,
        EnableLists:boolean,
        HideHashtags:boolean,
        EnableBackgroundOpacity:boolean,

        Values:{
            BackgroundOpacity:number,
            CardBackgroundOpacity:number,
            CardBorderOpacity:number,
            ListBackgroundOpacity:number,
            ListBorderOpacity:number,
        },
    },

    Canvas:{
        Enable:boolean,
        EnableBackgroundOpacity:boolean,

        Values:{
            BackgroundOpacity:number,
            CardBorderOpacity:number,
            CardBackgroundLuminanceOffset:number,
        },
    },

	// Extra stuff
	Debug:{
		Enable:boolean,
        EnableExperimentalCommands:boolean,
	},

	Info: {
        SettingsVersion: number
    }
}
