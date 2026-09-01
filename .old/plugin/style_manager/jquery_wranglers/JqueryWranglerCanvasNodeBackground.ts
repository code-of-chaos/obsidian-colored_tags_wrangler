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
		if (!tag_name) return null;

		return $(`div.canvas-node > div.canvas-node-container:has(a.tag)`).filter((_, el) => {
			return $(el).find('a.tag').toArray().some((tag) => {
				const href = $(tag).attr('href');
				return href !== undefined && tagMatchesPattern(tag_name, href);
			});
		});
	}

    assembleStyling(): void {
        this.getTags(false).map(
            ({tag_name, color, background_color}) =>{
                const canvasNode  = this.findElement(tag_name);
				if (canvasNode === null) return;
				canvasNode.css({
					"--canvas-color": `${color.r}, ${color.g}, ${color.b}`,
					"background-color": this.getBackgroundWithOpacityString(background_color)
				});
            }
        )
    }
	
    removeStyling(): void {
    }
}
