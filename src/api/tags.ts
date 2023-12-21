// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from "../plugin/IColoredTagWrangler";
import {IColorPicker} from "src/api/interfaces/IColorPicker";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function get_tags(plugin:IColoredTagWrangler):Array<IColorPicker>{
    return Object.keys(plugin.settings?.TagColors.ColorPicker)
        .map(tagUUID => {
            const {tag_name, color, background_color, luminance_offset} = plugin.settings?.TagColors.ColorPicker[tagUUID];
            if (plugin.settings?.TagColors.EnableMultipleTags) {
                return tag_name
                    .split(/[\n;]/) // for organization, I added \n
                    .filter(tag => tag) // filter out empty lines
                    .map(tag => (
                        // Also trim the tag for leading spaces after or before a \n? Should fix some common issues.
                        {tag_name: tag.trim(), color, background_color, luminance_offset})
                    );
            } else {
                return {tag_name: tag_name, color, background_color, luminance_offset};
            }
        })
        .flat();
}
