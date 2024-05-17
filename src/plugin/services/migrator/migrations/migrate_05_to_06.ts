// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v005, ISettings_v006} from "../setting_versions";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function migrate_05_to_06(loaded_data:ISettings_v005):Promise<ISettings_v006> {
    let transformed_data = loaded_data as unknown as ISettings_v006;

    // Fixes mistake
    transformed_data.Kanban.HideHashtags = loaded_data.Kanban.Enable

    transformed_data.Info.SettingsVersion = 6;
    return transformed_data;

}
