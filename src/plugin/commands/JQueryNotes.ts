// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import $ from "jquery";
import {get_tags} from "src/api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
function get_rgb_string(color:RGB):string{
    return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export async function JQueryNotes(plugin: IColoredTagWrangler){
    // Now you should be able to use $ as jQuery

    const tags = get_tags(plugin);
    tags.map(
        ({tag_name, color, background_color, luminance_offset}) =>{
            const page = $('div.workspace-leaf-content[data-type="markdown"] div.view-content');
            const tag = page.find($(`div.multi-select-pill:has(span:contains("${tag_name}"))`));

            // noinspection JSUnresolvedReference
			if (tag.length !== 0) {
                page.css('background-color', get_rgb_string(background_color))
            }
        }
    )
}
