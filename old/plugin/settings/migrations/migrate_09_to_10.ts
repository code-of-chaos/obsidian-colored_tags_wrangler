// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v009,ISettings_v010} from "old/plugin/settings/old_setting_versions";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_09_to_10(loaded_data:ISettings_v009):ISettings_v010 {
	const temp_data : any = loaded_data;
	delete temp_data.CSS.Enable; // CSS is always enabled in some way or another.

    let transformed_data = temp_data as ISettings_v010;

	transformed_data.CSS.NoteTags = true;
    transformed_data.CSS.NoteBackgrounds = false;
    transformed_data.CSS.NoteProperties = true;

    transformed_data.Info.SettingsVersion = 10;
    return transformed_data as unknown as ISettings_v010;

}
