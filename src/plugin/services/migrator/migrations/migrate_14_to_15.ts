// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v014} from "../setting_versions";
import {IPluginSettings} from "../../../../contracts/plugin/settings/IPluginSettings";
import {IColoredTagRecord} from "../../../../contracts/plugin/settings/IColoredTagRecord";
import {RGB} from "obsidian";
import {defaultSettings} from "../../settings/DefaultSettings";
import {ServiceProvider} from "../../ServiceProvider";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
interface OLD_IColorPicker {
	tag_name: string,
	color: RGB,
	background_color: RGB,
	luminance_offset: number
}

export async function migrate_14_to_15(loaded_data: ISettings_v014): Promise<IPluginSettings> {
	let new_data: IPluginSettings = Object.assign({}, defaultSettings); // TODO this is dangerous, change this to a specific pattern!

	// ingest the .old data
	new_data.TagColors = loaded_data.TagColors.ColorPicker.map(
		(old_tag: OLD_IColorPicker) => {
			const newTagColor: IColoredTagRecord = ServiceProvider.tagRecords.getDefaultRecord();

			newTagColor.core_tagText = old_tag.tag_name;
			newTagColor.core_color_foreground = {...old_tag.color};
			newTagColor.core_color_background = {...old_tag.background_color};
			
			if (loaded_data.TagColors.EnableBackgroundOpacity){
				newTagColor.css_styling_opacity = loaded_data.TagColors.Values.BackgroundOpacity;
			}

			return newTagColor;
		}
	);

	new_data.Info.SettingsVersion = 15;
	return new_data as unknown as IPluginSettings;
}
