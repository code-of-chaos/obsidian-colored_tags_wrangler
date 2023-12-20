// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v004} from "../old_setting_versions/ISettings_v004";
import {ISettings_v005} from "../old_setting_versions/ISettings_v005";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_4_to_5(loaded_data:ISettings_v004):ISettings_v005 {
    let transformed_data = loaded_data as unknown as ISettings_v005;

    for (const tagUUID of Object.keys(loaded_data.TagColors.ColorPicker)){
        transformed_data.TagColors.ColorPicker[tagUUID] = {
            tag_name:loaded_data.TagColors.ColorPicker[tagUUID].tag_name,
            color:loaded_data.TagColors.ColorPicker[tagUUID].color,
            background_color:loaded_data.TagColors.ColorPicker[tagUUID].color,
            background_opacity:0.2,
        }
    }

    transformed_data.Info.SettingsVersion = 5;
    return transformed_data as unknown as ISettings_v005;

}