// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerSettings}
    from "../DefaultSettings";
import {ISettings_v006}
    from "../old_setting_versions/ISettings_v006";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_6_to_7(loaded_data:ISettings_v006):IColoredTagWranglerSettings {
    let transformed_data = loaded_data as unknown as IColoredTagWranglerSettings;
    transformed_data.TagColors.Values.LuminanceOffset = 0.15;
    transformed_data.TagColors.EnableSeparateLuminanceOffset = false;

    // Fixes mistake
    for (const tagUUID of Object.keys(loaded_data.TagColors.ColorPicker)){
        let old_record = loaded_data.TagColors.ColorPicker[tagUUID];
        transformed_data.TagColors.ColorPicker[tagUUID] = {
            tag_name:old_record.tag_name,
            color:old_record.color,
            background_color:old_record.background_color,
            luminance_offset:transformed_data.TagColors.Values.LuminanceOffset,
        }
    }

    transformed_data.Info.SettingsVersion = 7;
    return transformed_data as unknown as IColoredTagWranglerSettings;

}