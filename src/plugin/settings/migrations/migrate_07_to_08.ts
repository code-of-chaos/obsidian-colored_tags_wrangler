// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v007} from "../old_setting_versions/ISettings_v007";
import {ISettings_v008} from "../old_setting_versions/ISettings_v008";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_07_to_08(loaded_data:ISettings_v007):ISettings_v008 {
    let transformed_data = loaded_data as unknown as ISettings_v008;
    transformed_data.FolderNote.EnableAutoDetect = true;
    transformed_data.Info.SettingsVersion = 8;
    return transformed_data as unknown as ISettings_v008;

}
