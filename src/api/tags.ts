// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColorPicker} from "src/api/interfaces/IColorPicker";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const reSLASH = /\//g

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function get_tags(data: Array<IColorPicker>, enable_multiple_tags: boolean, remove_slash: boolean=true): Array<IColorPicker> {
    return data
        .flatMap(({ tag_name, color, background_color, luminance_offset }) => {
            if (!enable_multiple_tags) {
                return [{ tag_name, color, background_color, luminance_offset }];
            }

            return tag_name // read the last line if you are confused why we are looping over the tag_name
                .split(/[\n;]/) // for organization, I added \n
                .map(tag => tag.trim())  // Also trim the tag for leading spaces after or before a \n? Should fix some common issues.
                .filter(Boolean) // filter out empty lines
                .map(tag => remove_slash ? tag.replace(reSLASH, "") : tag)  // replace the "/"
                .map(tag => ({ tag_name: tag, color, background_color, luminance_offset }));
        });
}