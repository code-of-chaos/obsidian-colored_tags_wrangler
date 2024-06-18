// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v013, ISettings_v014} from "../setting_versions";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function migrate_13_to_14(loaded_data: ISettings_v013): Promise<ISettings_v014> {
	let transformed_data = loaded_data as unknown as ISettings_v014;

	transformed_data.Info.SettingsVersion = 14;
	return transformed_data as unknown as ISettings_v014;
}
