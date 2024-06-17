// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v008, ISettings_v009} from "../setting_versions";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function migrate_08_to_09(loaded_data: ISettings_v008): Promise<ISettings_v009> {
	let transformed_data = loaded_data as unknown as ISettings_v009;
	transformed_data.CSS = {
		Enable: false,
		TagsNoWrap: false,
		TagsNoWrapText: "pre",
	};
	transformed_data.Info.SettingsVersion = 9;
	return transformed_data as unknown as ISettings_v009;

}
