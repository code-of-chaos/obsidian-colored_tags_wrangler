// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerSettings}
    from "../DefaultSettings";
import {ISettings_v007} from "../old_setting_versions/ISettings_v007";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_7_to_8(loaded_data:ISettings_v007):IColoredTagWranglerSettings {
    let transformed_data = loaded_data as unknown as IColoredTagWranglerSettings;
    transformed_data.FolderNote.EnableAutoDetect = true;
    transformed_data.Info.SettingsVersion = 8;
    return transformed_data as unknown as IColoredTagWranglerSettings;

}
