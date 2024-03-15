// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v010,ISettings_v011} from "old/plugin/settings/old_setting_versions";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_10_to_11(loaded_data:ISettings_v010):ISettings_v011 {
    let transformed_data = loaded_data as unknown as ISettings_v011;
    transformed_data.TagColors.ColorPicker = Object.values(loaded_data.TagColors.ColorPicker)
    transformed_data.Debug.EnableExperimentalCommands = false;
    transformed_data.Info.SettingsVersion = 11;
    return transformed_data as unknown as ISettings_v011;
}
