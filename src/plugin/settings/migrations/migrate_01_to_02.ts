// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v001} from "../old_setting_versions/ISettings_v001";
import {v4 as uuid4} from "uuid";
import {ISettings_v002} from "../old_setting_versions/ISettings_v002";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_01_to_02(loaded_data:ISettings_v001):ISettings_v002 {
    // Update SemanticObsidianColors
    let original_semantic_tags: Record<string, string> = loaded_data.TagColors.SemanticObsidianColors;
    let transformed_semantic_tags: Record<string, {tag_name:string, obsidian_css_var:string }> = {};

    for (const key of Object.keys(original_semantic_tags)) {
        const originalData = original_semantic_tags[key];

        // Transform the data as needed
        // Store the transformed data in the new object
        transformed_semantic_tags[uuid4()] = {
            tag_name: key, // You can set the 'tag_name' as the key
            obsidian_css_var:originalData
        };
    }

    // Update SemanticObsidianColors
    let original_css_var_tags: Record<string, {color:string, background:string}> = loaded_data.TagColors.CssVars;
    let transformed_css_var_tags: Record<string, {tag_name:string, color:string, background:string}> = {};

    for (const key of Object.keys(original_css_var_tags)) {
        const originalData = original_css_var_tags[key];

        // Transform the data as needed
        // Store the transformed data in the new object
        transformed_css_var_tags[uuid4()] = {
            tag_name: key, // You can set the 'tag_name' as the key
            color:originalData.color,
            background:originalData.background
        };
    }

    // Return the updated data with the new structure
    let transformed_data = loaded_data as unknown as ISettings_v002;
    transformed_data.TagColors.SemanticObsidianColors = transformed_semantic_tags;
    transformed_data.TagColors.CssVars = transformed_css_var_tags;
    transformed_data.Info.SettingsVersion = 2;
    return transformed_data;

}
