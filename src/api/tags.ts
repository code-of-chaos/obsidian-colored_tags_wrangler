// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColorPicker} from "src/api/interfaces/IColorPicker";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const reSLASH = /\//g;
export const reSplit = /[\n;]/; // for organization, I added \n

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function get_tags(data: Array<IColorPicker>, enable_multiple_tags: boolean, remove_slash: boolean=true): Array<IColorPicker> {
    return data
        .flatMap(({ tag_name, color, background_color, luminance_offset }) => {
            if (!enable_multiple_tags) {
                const cleaned_tag = tag_name.trim().replace(/^#+/, "");
                return [{ tag_name: cleaned_tag, color, background_color, luminance_offset }];
            }

            return tag_name // read the last line if you are confused why we are looping over the tag_name
                .split(reSplit)
                .map(tag => tag.trim().replace(/^#+/, ""))  // Also trim the tag for leading spaces & remove leading #
                .filter(Boolean) // filter out empty lines
                .map(tag => remove_slash ? tag.replace(reSLASH, "") : tag)  // replace the "/"
                .map(tag => ({ tag_name: tag, color, background_color, luminance_offset }));
        });
}

