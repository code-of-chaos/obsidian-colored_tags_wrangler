import { ISettingsV14 } from "../settings-v14";
import { IPluginSettings, IColoredTagRecord } from "../settings";
import { generateId } from "src/lib/string-utils";

export function migrate14to15(old: ISettingsV14): IPluginSettings {
    const tagRecords: IColoredTagRecord[] = old.TagColors.ColorPicker.map((picker) => ({
        id: generateId(),
        tag_name: picker.tag_name,
        color: picker.color,
        background_color: picker.background_color,
        luminance_offset: picker.luminance_offset,
        canvas_enabled: old.Canvas.Enable,
        kanban_cards_enabled: old.Kanban.EnableCards,
        kanban_lists_enabled: old.Kanban.EnableLists,
        folder_note_path: null,
    }));

    const enabledExtensions: string[] = ["core"];
    if (old.Canvas.Enable) enabledExtensions.push("canvas");
    if (old.Kanban.Enable) enabledExtensions.push("kanban");
    if (old.FolderNote.Enable) enabledExtensions.push("folder-note");

    return {
        version: 15,
        enabledExtensions,
        tagRecords,
        extensionSettings: {
            core: {
                enableMultipleTags: old.TagColors.EnableMultipleTags,
                enableSeparateBackground: old.TagColors.EnableSeparateBackground,
                enableBackgroundOpacity: old.TagColors.EnableBackgroundOpacity,
                backgroundOpacity: old.TagColors.Values.BackgroundOpacity,
                luminanceOffset: old.TagColors.Values.LuminanceOffset,
                noteTags: old.CSS.NoteTags,
                noteProperties: old.CSS.NoteProperties,
                noteBackgrounds: old.CSS.NoteBackgrounds,
                tagsNoWrap: old.CSS.TagsNoWrap,
                tagsNoWrapText: old.CSS.TagsNoWrapText,
            },
            canvas: {
                enableBackgroundOpacity: old.Canvas.EnableBackgroundOpacity,
                backgroundOpacity: old.Canvas.Values.BackgroundOpacity,
                cardBorderOpacity: old.Canvas.Values.CardBorderOpacity,
                cardBackgroundLuminanceOffset: old.Canvas.Values.CardBackgroundLuminanceOffset,
            },
            kanban: {
                enableCards: old.Kanban.EnableCards,
                enableLists: old.Kanban.EnableLists,
                hideHashtags: old.Kanban.HideHashtags,
                enableBackgroundOpacity: old.Kanban.EnableBackgroundOpacity,
                backgroundOpacity: old.Kanban.Values.BackgroundOpacity,
                cardBackgroundOpacity: old.Kanban.Values.CardBackgroundOpacity,
                cardBorderOpacity: old.Kanban.Values.CardBorderOpacity,
                listBackgroundOpacity: old.Kanban.Values.ListBackgroundOpacity,
                listBorderOpacity: old.Kanban.Values.ListBorderOpacity,
            },
            "folder-note": {
                enable: old.FolderNote.Enable,
                folderTagLinks: old.FolderNote.FolderTagLinks,
                enableAutoDetect: old.FolderNote.EnableAutoDetect,
                enableBackgroundOpacity: old.FolderNote.EnableBackgroundOpacity,
                backgroundOpacity: old.FolderNote.Values.BackgroundOpacity,
                forceImportant: old.FolderNote.Values.ForceImportant,
                borderRadius: old.FolderNote.Values.BorderRadius,
                padding: old.FolderNote.Values.Padding,
            },
            debug: {
                enable: old.Debug.Enable ?? false,
                enableExperimentalCommands: old.Debug.EnableExperimentalCommands,
            },
        },
    };
}
