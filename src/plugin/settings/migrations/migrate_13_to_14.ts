// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings} from "src/plugin/settings/ISettings";
import {ISettings_v013} from "src/plugin/settings/old_setting_versions";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_13_to_14(loaded_data:ISettings_v013):ISettings {
    let transformed_data = loaded_data as unknown as ISettings;

    transformed_data.Info.SettingsVersion = 14;
    return transformed_data as unknown as ISettings;
}
