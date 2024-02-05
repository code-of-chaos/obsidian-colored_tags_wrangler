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
		if (!tag_name) return null;

		const regex = new RegExp(`#${tag_name}`, 'i');

		return $(`div.canvas-node > div.canvas-node-container:has(a.tag)`).filter((_, el) => {
			const href = $(el).find('a.tag').attr('href');
			if (href === undefined) return false;

			return regex.test(href);
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
