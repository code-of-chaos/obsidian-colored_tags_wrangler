// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {JqueryWrangler} from "src/plugin/style_manager/jquery_wranglers/JqueryWrangler";
import $ from "jquery";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class JqueryWranglerNoteBackgrounds extends JqueryWrangler{
    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin:IColoredTagWrangler) {
        super(plugin);
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    private findElement(tag_name:string|null):[JQuery<HTMLElement>,JQuery<HTMLElement>|null]{
        // noinspection TypeScriptValidateJSTypes
        const page = $('div.workspace-leaf-content[data-type="markdown"] div.view-content');
        const tag = tag_name !== null
            ? page.find($(`div.multi-select-pill:has(span:contains("${tag_name}"))`))
            : null;

        return [page,tag]
    }

    assembleStyling(): void {
        this.getTags().map(
            ({tag_name, background_color}) =>{
                const [page, tag]  = this.findElement(tag_name);
                // noinspection JSUnresolvedReference
                if (tag !== null && tag.length !== 0) {
                    // automatically applies the background opacity if enabled
                    page.css('background-color', this.getBackgroundWithOpacityString(background_color))
                }
            }
        )
    }
    removeStyling(): void {
        const [page, _]  = this.findElement(null);
        page.removeAttr("style");
    }
}
