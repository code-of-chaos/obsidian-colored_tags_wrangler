// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings {
    TagColors:{
        ColorPicker: Record<
            string,
            {tag_name:string, color:RGB, background_color:RGB,luminance_offset:number}
        >,

        EnableMultipleTags:boolean,
        EnableSeparateBackground:boolean,
        EnableSeparateLuminanceOffset:boolean,
        EnableDarkLightDifference:boolean,
        EnableBackgroundOpacity:boolean,
        Values:{
            BackgroundOpacity:number,
            LuminanceOffset:number,
        }
    },

    FolderNote:{
        Enable:boolean
        FolderTagLinks:Record<
            string,
            {folder_path:string, tag_name:string}
        >,

        EnableAutoDetect:boolean,

        Values:{
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

        Values:{
            CardBackgroundOpacity:number,
            CardBorderOpacity:number,
            ListBackgroundOpacity:number,
            ListBorderOpacity:number,
        },
    },

    CSS:{
        Enable: boolean,
        TagsNoWrap:boolean,
        TagsNoWrapText:string,
    },

    Debug:{
        Enable:boolean,
    },

    Canvas:{
        Enable:boolean,

        Values:{
            CardBorderOpacity:number,
            CardBackgroundLuminanceOffset:number,
        },
    },
    Info: {
        SettingsVersion: number
    }
}