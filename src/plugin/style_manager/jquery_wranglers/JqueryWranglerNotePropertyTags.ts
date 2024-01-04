// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {JqueryWrangler} from "./JqueryWrangler";
import $ from "jquery";
import {get_tags} from "src/api/tags";
import {rgbaToString, rgbToString} from "src/api/ColorConverters";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class JqueryWranglerNotePropertyTags extends JqueryWrangler{
    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin:IColoredTagWrangler) {
        super(plugin);
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    assemble_styling(): void {
        const color_picker = this.plugin.settings.TagColors.ColorPicker;
        const enable_multiple_tags = this.plugin.settings.TagColors.EnableMultipleTags;
        const tags = get_tags(color_picker, enable_multiple_tags, false);
		const enable_background_opacity = this.plugin.settings.TagColors.EnableBackgroundOpacity;
		const value_background_opacity = this.plugin.settings.TagColors.Values.BackgroundOpacity;

        tags.map(
            ({tag_name, color, background_color}) =>{
                // noinspection TypeScriptValidateJSTypes
                const element = $('div[data-property-key="tags"]')
                    .find(`div.multi-select-pill:has(span:contains("${tag_name}"))`)

                // noinspection JSUnresolvedReference
                element
                    .css('background-color', enable_background_opacity
						? rgbaToString({...background_color, a:value_background_opacity})
						: rgbToString(background_color))
                    .css('color', rgbToString(color));

                // Find the svg element within the tag, so it can color the X
                // noinspection JSUnresolvedReference
                element
                    .find('svg')
                    .css('stroke', rgbToString(color))

            }
        )
    }
    remove_styling(): void {const color_picker = this.plugin.settings.TagColors.ColorPicker;
        const enable_multiple_tags = this.plugin.settings.TagColors.EnableMultipleTags;
        const tags = get_tags(color_picker, enable_multiple_tags, false);

        tags.map(
            ({tag_name}) =>{
                // noinspection TypeScriptValidateJSTypes
                const element = $('div[data-property-key="tags"]')
                    .find(`div.multi-select-pill:has(span:contains("${tag_name}"))`)

                // noinspection JSUnresolvedReference
                element
                    .removeAttr("style")

                // Find the svg element within the tag, so it can color the X
                // noinspection JSUnresolvedReference
                element
                    .find('svg')
                    .removeAttr("style")

            }
        )
    }
}
