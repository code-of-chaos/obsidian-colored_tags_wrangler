// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerSettings}
    from "../DefaultSettings";
import {ISettings_v008} from "../old_setting_versions/ISettings_v008";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_8_to_9(loaded_data:ISettings_v008):IColoredTagWranglerSettings {
    let transformed_data = loaded_data as unknown as IColoredTagWranglerSettings;
    transformed_data.CSS = {
        Enable: false,
        TagsNoWrap: false,
        TagsNoWrapText: "pre",
    };
    transformed_data.Info.SettingsVersion = 9;
    return transformed_data as unknown as IColoredTagWranglerSettings;

}
