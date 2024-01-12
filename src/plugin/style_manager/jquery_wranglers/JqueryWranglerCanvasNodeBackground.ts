// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {JqueryWrangler} from "src/plugin/style_manager/jquery_wranglers/JqueryWrangler";
import $ from "jquery";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class JqueryWranglerCanvasNodeBackground extends JqueryWrangler{
    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin:IColoredTagWrangler) {
        super(plugin, plugin.settings.TagColors);
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    private findElement(tag_name:string|null):JQuery<HTMLElement>|null{
        return $(`div.canvas-node > div.canvas-node-container:has(a.tag[href="#${tag_name}"])`)
    }

    assembleStyling(): void {
        this.getTags(false).map(
            ({tag_name, color, background_color}) =>{
                const canvasNode  = this.findElement(tag_name);
                // noinspection JSUnresolvedReference
                if (canvasNode !== null) {
                    // console.warn(canvasNode)
                    canvasNode.css({"--canvas-color": `${color.r}, ${color.g}, ${color.b}`});
                    canvasNode.css({"background-color": this.getBackgroundWithOpacityString(background_color)});
                }
            }
        )
    }
    removeStyling(): void {
    }
}
