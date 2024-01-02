// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from "../plugin/IColoredTagWrangler";
import {IColorPicker} from "src/api/interfaces/IColorPicker";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function get_tags(plugin:IColoredTagWrangler):Array<IColorPicker>{
    return plugin.settings?.TagColors.ColorPicker
        .map(color_picker => {
            const {tag_name, color, background_color, luminance_offset} = color_picker;
            if (plugin.settings?.TagColors.EnableMultipleTags) {
                return tag_name
                    .split(/[\n;]/) // for organization, I added \n
                    .filter((tag: any) => tag) // filter out empty lines
                    .map((tag: string) => (
                        // Also trim the tag for leading spaces after or before a \n? Should fix some common issues.
                        {tag_name: tag.trim(), color, background_color, luminance_offset})
                    );
            } else {
                return {tag_name: tag_name, color, background_color, luminance_offset};
            }
        })
        .flat();
}
