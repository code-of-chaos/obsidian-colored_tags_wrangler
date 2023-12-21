// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";
import {IColoredTagWrangler} from "../IColoredTagWrangler";
import $ from "jquery";
import {get_tags} from "src/api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
function get_rgb_string(color:RGB):string{
    return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export async function JQueryTest(plugin: IColoredTagWrangler){
    // Now you should be able to use $ as jQuery

    const tags = get_tags(plugin);
    tags.map(
        ({tag_name, color, background_color, luminance_offset}) =>{
            // noinspection TypeScriptValidateJSTypes
            const element = $('div[data-property-key="tags"]')
                .find(`div.multi-select-pill:has(span:contains("${tag_name}"))`)

            console.warn({tag_name, element})

            element
                .css('background-color', get_rgb_string(background_color))
                .css('color', get_rgb_string(color));

            element
                .find('svg')
                .css('stroke', get_rgb_string(color))

        }
    )
}
