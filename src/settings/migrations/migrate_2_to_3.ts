// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v002} from "../old_setting_versions/ISettings_v002";
import {IColoredTagWranglerSettings} from "../DefaultSettings";
import {v4 as uuid4} from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_2_to_3(loaded_data:ISettings_v002):IColoredTagWranglerSettings {
    // Return data as is, because structure wasn't changed, just added to.
    let transformed_data = loaded_data as unknown as IColoredTagWranglerSettings;
    transformed_data.Info.SettingsVersion = 3;
    return transformed_data;

}