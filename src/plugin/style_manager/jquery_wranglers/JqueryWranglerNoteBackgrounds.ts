// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {JqueryWrangler} from "src/plugin/style_manager/jquery_wranglers/JqueryWrangler";
import $ from "jquery";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {tagMatchesPattern} from "src/api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class JqueryWranglerNoteBackgrounds extends JqueryWrangler{
    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin:IColoredTagWrangler) {
        super(plugin, plugin.settings.TagColors);
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    private findElement(tag_name:string|null):[JQuery<HTMLElement>,JQuery<HTMLElement>|null]{
        // noinspection TypeScriptValidateJSTypes
        const page = $('div.workspace-leaf-content[data-type="markdown"] div.view-content');
        const tag = tag_name !== null
            ? page.find('div.multi-select-pill').filter((_, element) =>
                tagMatchesPattern(tag_name, $(element).find('span').first().text()))
            : null;

        return [page,tag]
    }

    assembleStyling(): void {
        this.getTags(false).map(
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
        const [page]  = this.findElement(null);
        page.removeAttr("style");
    }
}
