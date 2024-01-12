// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {get_tags} from "src/api/tags";
import $ from "jquery";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function CanvasColoredTags(plugin:IColoredTagWrangler) {
    // <div class="canvas-node" style="z-index: 2; transform: translate(-38px, -24px); width: 250px; height: 60px; --canvas-node-width: 250px; --canvas-node-height: 60px;"><div class="canvas-node-container"><div class="canvas-node-content markdown-embed"><div class="markdown-embed-content node-insert-event" style=""><div class="markdown-preview-view markdown-rendered node-insert-event show-indentation-guide allow-fold-headings allow-fold-lists"><div class="markdown-preview-sizer markdown-preview-section" style="padding-bottom: 0px; min-height: 22px;"><div class="markdown-preview-pusher" style="width: 1px; height: 0.1px; margin-bottom: 0px;"></div><div><p><a href="#active-development" class="tag" target="_blank" rel="noopener">#active-development</a> </p></div></div></div></div><div class="markdown-embed-content node-insert-event" style="display: none;"></div></div><div class="canvas-node-content-blocker"></div></div></div>
    const tags = get_tags(plugin.settings.TagColors.ColorPicker, plugin.settings?.TagColors.EnableMultipleTags, false)
    tags
        .map(({tag_name, color}) => {
            let canvasNode = $(`div.canvas-node > div.canvas-node-container:has(a.tag[href="#${tag_name}"])`);
            // console.warn(canvasNode)
            canvasNode.css({"--canvas-color": `${color.r}, ${color.g}, ${color.b}`});
    })
}
