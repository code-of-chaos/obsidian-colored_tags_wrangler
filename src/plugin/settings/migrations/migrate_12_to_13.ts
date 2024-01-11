// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings} from "src/plugin/settings/ISettings";
import {ISettings_v012} from "src/plugin/settings/old_setting_versions";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_12_to_13(loaded_data:ISettings_v012):ISettings {
    let transformed_data = loaded_data as unknown as ISettings;

    transformed_data.FolderNote.EnableBackgroundOpacity = loaded_data.TagColors.EnableBackgroundOpacity;
    transformed_data.FolderNote.Values.BackgroundOpacity = loaded_data.TagColors.Values.BackgroundOpacity;

    transformed_data.Kanban.EnableBackgroundOpacity = loaded_data.TagColors.EnableBackgroundOpacity;
    transformed_data.Kanban.Values.BackgroundOpacity = loaded_data.TagColors.Values.BackgroundOpacity;

    transformed_data.Canvas.EnableBackgroundOpacity = loaded_data.TagColors.EnableBackgroundOpacity;
    transformed_data.Canvas.Values.BackgroundOpacity = loaded_data.TagColors.Values.BackgroundOpacity;

    transformed_data.Info.SettingsVersion = 13;
    return transformed_data as unknown as ISettings;
}
