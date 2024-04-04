// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v003, ISettings_v004} from "../setting_versions";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function migrate_03_to_04(loaded_data:ISettings_v003):Promise<ISettings_v004> {
    let transformed_data = loaded_data as unknown as ISettings_v004;
    transformed_data.TagColors = {
        ColorPicker:loaded_data.TagColors.ColorPicker,
        EnableMultipleTags:loaded_data.TagColors.EnableMultipleTags,
        Values:loaded_data.TagColors.Values
    }

    transformed_data.FolderNote.Values = {
        ForceImportant:true,
        BorderRadius:"12px",
        Padding:"5px",
    }

    transformed_data.Info.SettingsVersion = 4;
    return transformed_data ;

}
