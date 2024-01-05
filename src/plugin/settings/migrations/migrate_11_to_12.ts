// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings} from "src/plugin/settings/ISettings";
import {ISettings_v011} from "src/plugin/settings/old_setting_versions";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_11_to_12(loaded_data:ISettings_v011):ISettings {
    let transformed_data = loaded_data as unknown as ISettings;
    transformed_data.FolderNote.FolderTagLinks = Object.values(loaded_data.FolderNote.FolderTagLinks)
    transformed_data.Info.SettingsVersion = 12;
    return transformed_data as unknown as ISettings;
}
