import { RGB } from "obsidian";

export interface ISettingsV14 {
    TagColors: {
        ColorPicker: Array<{
            tag_name: string;
            color: RGB;
            background_color: RGB;
            luminance_offset: number;
        }>;
        EnableMultipleTags: boolean;
        EnableSeparateBackground: boolean;
        EnableBackgroundOpacity: boolean;
        Values: {
            BackgroundOpacity: number;
            LuminanceOffset: number;
        };
    };
    CSS: {
        NoteTags: boolean;
        NoteProperties: boolean;
        NoteBackgrounds: boolean;
        TagsNoWrap: boolean;
        TagsNoWrapText: string;
    };
    FolderNote: {
        Enable: boolean;
        FolderTagLinks: Array<{ folder_path: string; tag_name: string }>;
        EnableAutoDetect: boolean;
        EnableBackgroundOpacity: boolean;
        Values: {
            BackgroundOpacity: number;
            ForceImportant: boolean;
            BorderRadius: string;
            Padding: string;
        };
    };
    Kanban: {
        Enable: boolean;
        EnableCards: boolean;
        EnableLists: boolean;
        HideHashtags: boolean;
        EnableBackgroundOpacity: boolean;
        Values: {
            BackgroundOpacity: number;
            CardBackgroundOpacity: number;
            CardBorderOpacity: number;
            ListBackgroundOpacity: number;
            ListBorderOpacity: number;
        };
    };
    Canvas: {
        Enable: boolean;
        EnableBackgroundOpacity: boolean;
        Values: {
            BackgroundOpacity: number;
            CardBorderOpacity: number;
            CardBackgroundLuminanceOffset: number;
        };
    };
    Debug: {
        Enable: boolean;
        EnableExperimentalCommands: boolean;
    };
    Info: {
        SettingsVersion: number;
    };
}
