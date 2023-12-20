// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings} from "src/plugin/settings/ISettings";
import {ISettings_v008} from "src/plugin/settings/old_setting_versions/ISettings_v008";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_8_to_9(loaded_data:ISettings_v008):ISettings {
    let transformed_data = loaded_data as unknown as ISettings;
    transformed_data.CSS = {
        Enable: false,
        TagsNoWrap: false,
        TagsNoWrapText: "pre",
    };
    transformed_data.Info.SettingsVersion = 9;
    return transformed_data as unknown as ISettings;

}
