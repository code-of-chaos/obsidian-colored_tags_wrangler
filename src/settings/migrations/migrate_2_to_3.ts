// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v002}
    from "../old_setting_versions/ISettings_v002";
import {ISettings_v003}
    from "../old_setting_versions/ISettings_v003";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_2_to_3(loaded_data:ISettings_v002):ISettings_v003 {
    // Return data as is, because structure wasn't changed, just added to.
    let transformed_data = loaded_data as unknown as ISettings_v003;
    transformed_data.Info.SettingsVersion = 3;
    return transformed_data;

}