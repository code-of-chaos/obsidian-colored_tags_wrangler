// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings} from "src/plugin/settings/ISettings";
import {ISettings_v014} from "src/plugin/settings/old_setting_versions";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_14_to_15(loaded_data:ISettings_v014):ISettings {
    let transformed_data = loaded_data as unknown as ISettings;
	transformed_data.CSS.AlternativeTagsSelector = false;
    transformed_data.Info.SettingsVersion = 15;
    return transformed_data as unknown as ISettings;
}
