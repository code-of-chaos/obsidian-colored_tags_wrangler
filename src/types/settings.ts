import { RGB } from "obsidian";

export interface IColoredTagRecord {
    id: string;
    tag_name: string;
    color: RGB;
    background_color: RGB;
    luminance_offset: number;
    canvas_enabled?: boolean;
    kanban_cards_enabled?: boolean;
    kanban_lists_enabled?: boolean;
    folder_note_path?: string | null;
}

export interface ICoreSettings {
    enableMultipleTags: boolean;
    enableSeparateBackground: boolean;
    enableBackgroundOpacity: boolean;
    backgroundOpacity: number;
    luminanceOffset: number;
    noteTags: boolean;
    noteProperties: boolean;
    noteBackgrounds: boolean;
    tagsNoWrap: boolean;
    tagsNoWrapText: string;
}

export interface ICanvasSettings {
    enableBackgroundOpacity: boolean;
    backgroundOpacity: number;
    cardBorderOpacity: number;
    cardBackgroundLuminanceOffset: number;
}

export interface IKanbanSettings {
    enableCards: boolean;
    enableLists: boolean;
    hideHashtags: boolean;
    enableBackgroundOpacity: boolean;
    backgroundOpacity: number;
    cardBackgroundOpacity: number;
    cardBorderOpacity: number;
    listBackgroundOpacity: number;
    listBorderOpacity: number;
}

export interface IFolderNoteSettings {
    enable: boolean;
    folderTagLinks: Array<{ folder_path: string; tag_name: string }>;
    enableAutoDetect: boolean;
    enableBackgroundOpacity: boolean;
    backgroundOpacity: number;
    forceImportant: boolean;
    borderRadius: string;
    padding: string;
}

export interface IDebugSettings {
    enable: boolean;
    enableExperimentalCommands: boolean;
}

export interface IPluginSettings {
    version: 15;
    enabledExtensions: string[];
    tagRecords: IColoredTagRecord[];
    extensionSettings: {
        core: ICoreSettings;
        canvas: ICanvasSettings;
        kanban: IKanbanSettings;
        "folder-note": IFolderNoteSettings;
        debug: IDebugSettings;
    };
}

export type ISettings = IPluginSettings;
