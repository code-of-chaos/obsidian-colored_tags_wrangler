// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v002, ISettings_v003} from "../setting_versions";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function migrate_02_to_03(loaded_data: ISettings_v002): Promise<ISettings_v003> {
	// Return data as is, because structure wasn't changed, just added to.
	let transformed_data = loaded_data as unknown as ISettings_v003;
	transformed_data.Info.SettingsVersion = 3;
	return transformed_data;

}
