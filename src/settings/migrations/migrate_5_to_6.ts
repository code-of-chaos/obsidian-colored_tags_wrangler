// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerSettings}
    from "../DefaultSettings";
import {ISettings_v005}
    from "../old_setting_versions/ISettings_v005";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_5_to_6(loaded_data:ISettings_v005):IColoredTagWranglerSettings {
    let transformed_data = loaded_data as unknown as IColoredTagWranglerSettings;

    // Fixes mistake
    transformed_data.Kanban.HideHashtags = loaded_data.Kanban.Enable

    transformed_data.Info.SettingsVersion = 6;
    return transformed_data as unknown as IColoredTagWranglerSettings;

}