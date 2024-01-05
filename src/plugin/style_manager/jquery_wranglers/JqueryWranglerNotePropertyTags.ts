// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {JqueryWrangler} from "./JqueryWrangler";
import $ from "jquery";
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
    private findElement(tag_name:string):JQuery<HTMLElement>{
        // noinspection TypeScriptValidateJSTypes
        return $('div[data-property-key="tags"]')
            .find(`div.multi-select-pill:has(span:contains("${tag_name}"))`)
    }

    assembleStyling(): void {
        this.getTags().map(
            ({tag_name, color, background_color}) =>{
                this.findElement(tag_name)
                    .css('background-color', this.getBackgroundString(background_color))
                    .css('color', this.getForegroundString(color))

                // Find the svg element within the tag, so it can color the X
                // noinspection JSUnresolvedReference
                    .find('svg')
                    .css('stroke', this.getForegroundString(color))

            }
        )
    }
    removeStyling(): void {
        this.getTags().map(
            ({tag_name}) =>{
                this.findElement(tag_name)
                    .removeAttr("style")

                // Find the svg element within the tag, so it can color the X
                // noinspection JSUnresolvedReference
                    .find('svg')
                    .removeAttr("style")

            }
        )
    }
}
