// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v007, ISettings_v008} from "../setting_versions";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function migrate_07_to_08(loaded_data:ISettings_v007):Promise<ISettings_v008> {
    let transformed_data = loaded_data as unknown as ISettings_v008;
    transformed_data.FolderNote.EnableAutoDetect = true;
    transformed_data.Info.SettingsVersion = 8;
    return transformed_data as unknown as ISettings_v008;

}
